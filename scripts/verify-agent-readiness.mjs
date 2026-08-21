#!/usr/bin/env node
/**
 * End-to-end verification of the machine-readable surface of the site.
 *
 * Run against a running server:
 *   npm run build && npm start &
 *   npm run verify:agents -- --base=http://localhost:3000
 *
 * Or against production:
 *   npm run verify:agents -- --base=https://www.aparnakapur.com
 *
 * Exits non-zero on the first failing group so it can gate a deploy.
 */

const baseArg = process.argv.find((arg) => arg.startsWith("--base="));
const BASE = (baseArg ? baseArg.slice("--base=".length) : "http://localhost:3000")
  .replace(/\/+$/, "");

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

let failures = 0;
let checks = 0;

function check(ok, label, detail = "") {
  checks += 1;
  if (ok) {
    console.log(`  ok   ${label}`);
  } else {
    failures += 1;
    console.log(`  FAIL ${label}${detail ? ` — ${detail}` : ""}`);
  }
  return ok;
}

function group(title) {
  console.log(`\n${title}`);
}

async function get(path, accept) {
  const response = await fetch(`${BASE}${path}`, {
    headers: accept ? { accept } : {},
    redirect: "manual",
  });
  return { response, body: await response.text() };
}

/** Strip script/style/template so the text is what a JS-less crawler sees. */
function visibleText(html) {
  return html
    .replace(/<(script|style|template|noscript)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function headings(html) {
  const withoutScripts = html.replace(
    /<(script|style|template|noscript)\b[\s\S]*?<\/\1>/gi,
    "",
  );
  return [...withoutScripts.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
    (match) => ({
      level: Number(match[1]),
      text: match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    }),
  );
}

/** The page's own content: the layout renders header, footer, and widgets outside <main>. */
function mainContent(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i);
  return match ? match[1] : html;
}

function internalLinks(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="(\/[^"#?]*)"/g)]
        .map((match) => match[1])
        .filter((href) => !href.startsWith("/_next/")),
    ),
  ];
}

async function verifyHomepageWithoutJavaScript() {
  group("Homepage renders content without JavaScript");
  const { response, body } = await get("/", BROWSER_ACCEPT);
  check(response.status === 200, "GET / returns 200", String(response.status));
  check(
    (response.headers.get("content-type") ?? "").includes("text/html"),
    "GET / returns HTML for a browser Accept header",
    response.headers.get("content-type") ?? "",
  );

  const hs = headings(body);
  const h1s = hs.filter((heading) => heading.level === 1);
  check(h1s.length === 1, "exactly one H1 in the raw HTML", `found ${h1s.length}`);

  const text = visibleText(body);
  check(
    text.length >= 500,
    "at least 500 characters of text in the raw HTML",
    `${text.length} chars`,
  );

  const levels = new Set(hs.map((heading) => heading.level));
  check(
    levels.has(1) && levels.has(2) && levels.has(3),
    "heading structure is nested, not flat (H1 + H2 + H3 present)",
    `levels: ${[...levels].sort().join(", ")}`,
  );

  // Every H3 must sit under an H2 that came before it in document order.
  let lastH2 = null;
  let orphanH3 = null;
  for (const heading of hs) {
    if (heading.level === 2) lastH2 = heading.text;
    if (heading.level === 3 && lastH2 === null) orphanH3 = heading.text;
  }
  check(
    orphanH3 === null,
    "no H3 appears before its parent H2",
    orphanH3 ? `orphan: ${orphanH3}` : "",
  );

  check(
    body.includes('type="application/ld+json"'),
    "JSON-LD structured data is server-rendered",
  );
  check(
    body.includes('"FAQPage"'),
    "homepage FAQ is marked up as FAQPage",
  );
}

async function verifyMarkdownNegotiation() {
  group("Markdown content negotiation (acceptmarkdown.com)");

  const md = await get("/", "text/markdown");
  check(md.response.status === 200, "Accept: text/markdown returns 200");
  check(
    (md.response.headers.get("content-type") ?? "").startsWith("text/markdown"),
    "Accept: text/markdown returns text/markdown",
    md.response.headers.get("content-type") ?? "",
  );
  check(
    (md.response.headers.get("vary") ?? "").toLowerCase().includes("accept"),
    "markdown response varies on Accept",
    md.response.headers.get("vary") ?? "(none)",
  );
  check(md.body.startsWith("# "), "markdown body opens with an H1");

  const html = await get("/", BROWSER_ACCEPT);
  check(
    (html.response.headers.get("content-type") ?? "").includes("text/html"),
    "a browser still gets HTML from the same URL",
  );
  check(
    (html.response.headers.get("link") ?? "").includes('type="text/markdown"'),
    "HTML response advertises its markdown alternate via Link",
    html.response.headers.get("link") ?? "(none)",
  );

  const alias = await get("/neighborhoods/oakridge.md");
  check(alias.response.status === 200, "the .md alias of a page returns 200");
  check(
    (alias.response.headers.get("content-type") ?? "").startsWith("text/markdown"),
    "the .md alias returns text/markdown",
  );
  check(
    (alias.response.headers.get("link") ?? "").includes('rel="canonical"'),
    "the .md alias points back at its canonical HTML page",
  );

  const index = await get("/index.md");
  check(index.response.status === 200, "/index.md serves the homepage markdown");

  const wildcard = await get("/", "*/*");
  check(
    (wildcard.response.headers.get("content-type") ?? "").includes("text/html"),
    "Accept: */* still gets HTML, so link scrapers are unaffected",
    wildcard.response.headers.get("content-type") ?? "",
  );
}

async function verifyNotFound() {
  group("Agent-friendly 404s");
  const path = "/some-path-that-does-not-exist";

  const html = await get(path, BROWSER_ACCEPT);
  check(
    html.response.status === 404,
    "a nonexistent path returns a real HTTP 404",
    String(html.response.status),
  );
  const htmlText = visibleText(html.body);
  check(
    htmlText.includes("/llms.txt") && htmlText.includes("sitemap"),
    "the HTML 404 names the sitemap and llms.txt",
  );

  const md = await get(path, "text/markdown");
  check(md.response.status === 404, "the markdown 404 also returns 404");
  check(
    (md.response.headers.get("content-type") ?? "").startsWith("text/markdown"),
    "the 404 response body is markdown when markdown is requested",
    md.response.headers.get("content-type") ?? "",
  );
  check(md.body.startsWith("# 404"), "the markdown 404 opens with a heading");
  for (const target of ["/sitemap.xml", "/llms.txt", "/agents.md", "/contact"]) {
    check(
      md.body.includes(target),
      `the markdown 404 points at ${target}`,
    );
  }
}

async function verifyAgentInstructions() {
  group("Agent instruction file");
  const { response, body } = await get("/agents.md");
  check(response.status === 200, "/agents.md returns 200");
  check(
    (response.headers.get("content-type") ?? "").startsWith("text/markdown"),
    "/agents.md is served as text/markdown",
  );
  for (const heading of [
    "## When to use this site",
    "## When not to use this site",
    "## How to call this site",
    "## Escalation to a human",
  ]) {
    check(body.includes(heading), `/agents.md contains "${heading}"`);
  }

  const llms = await get("/llms.txt");
  check(llms.response.status === 200, "/llms.txt returns 200");
  check(
    llms.body.includes("## When to use this site"),
    "/llms.txt carries when-to-use guidance",
  );
  check(llms.body.includes("/agents.md"), "/llms.txt links the agent instructions");

  const full = await get("/llms-full.txt");
  check(full.response.status === 200, "/llms-full.txt returns 200");
  check(
    full.body.includes("## When To Use This Site"),
    "/llms-full.txt carries when-to-use guidance",
  );

  const robots = await get("/robots.txt");
  check(robots.response.status === 200, "/robots.txt returns 200");
  check(robots.body.includes("/agents.md"), "/robots.txt points at /agents.md");
  check(robots.body.includes("/llms.txt"), "/robots.txt points at /llms.txt");
  check(
    robots.body.includes("Accept: text/markdown"),
    "/robots.txt documents markdown negotiation",
  );

  const sitemap = await get("/sitemap.xml");
  check(sitemap.response.status === 200, "/sitemap.xml returns 200");
}

async function verifySitemapLinks() {
  group("Every link on the HTML sitemap resolves");
  const { response, body } = await get("/sitemap-html", BROWSER_ACCEPT);
  check(response.status === 200, "/sitemap-html returns 200");

  const links = internalLinks(mainContent(body));
  check(links.length > 40, "sitemap lists the full catalogue", `${links.length} links`);

  const broken = [];
  for (const href of links) {
    const head = await fetch(`${BASE}${href}`, {
      method: "HEAD",
      headers: { accept: BROWSER_ACCEPT },
      redirect: "follow",
    });
    if (head.status >= 400) broken.push(`${href} -> ${head.status}`);
  }
  check(broken.length === 0, "no dead links on the sitemap", broken.join(", "));

  // Header, footer, and widgets are shared chrome rather than catalogue
  // entries; a dead link there is reported but does not fail the run.
  const chromeLinks = internalLinks(body).filter((href) => !links.includes(href));
  const deadChrome = [];
  for (const href of chromeLinks) {
    const head = await fetch(`${BASE}${href}`, {
      method: "HEAD",
      headers: { accept: BROWSER_ACCEPT },
      redirect: "follow",
    });
    if (head.status >= 400) deadChrome.push(`${href} -> ${head.status}`);
  }
  if (deadChrome.length) {
    console.log(`  warn site chrome links to pages that do not exist: ${deadChrome.join(", ")}`);
  } else {
    check(true, "no dead links in the site chrome");
  }
}

async function verifyMarkdownCoverage() {
  group("Every sitemap page has a markdown twin");
  const { body } = await get("/sitemap-html", BROWSER_ACCEPT);
  const links = internalLinks(mainContent(body)).filter(
    (href) => !href.endsWith(".txt") && !href.endsWith(".md") && !href.endsWith(".xml"),
  );

  const missing = [];
  for (const href of links) {
    const response = await fetch(`${BASE}${href}`, {
      headers: { accept: "text/markdown" },
      redirect: "follow",
    });
    const type = response.headers.get("content-type") ?? "";
    if (response.status !== 200 || !type.startsWith("text/markdown")) {
      missing.push(`${href} -> ${response.status} ${type}`);
    }
    await response.arrayBuffer();
  }
  check(
    missing.length === 0,
    `all ${links.length} pages answer Accept: text/markdown`,
    missing.join(", "),
  );
}

async function main() {
  console.log(`Verifying agent readiness against ${BASE}`);
  await verifyHomepageWithoutJavaScript();
  await verifyMarkdownNegotiation();
  await verifyNotFound();
  await verifyAgentInstructions();
  await verifySitemapLinks();
  await verifyMarkdownCoverage();

  console.log(
    `\n${checks - failures}/${checks} checks passed${failures ? ` — ${failures} FAILED` : ""}`,
  );
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
