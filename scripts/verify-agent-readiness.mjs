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

/**
 * Crawl every page reachable from the homepage and assert nothing 404s.
 * The audit-era site had five dead links that no per-page check would have
 * caught: two mistyped neighbourhood slugs, the two legal pages, and the
 * Cloudflare email-protection href.
 */
async function verifyNoBrokenLinks() {
  group("No broken links anywhere on the site");

  const status = new Map();
  const linkedFrom = new Map();
  const queue = ["/"];

  const normalize = (href) => {
    if (!href) return null;
    let path = href;
    if (/^https?:\/\//.test(href)) {
      try {
        const url = new URL(href);
        if (url.origin !== new URL(BASE).origin) return null;
        path = url.pathname;
      } catch {
        return null;
      }
    }
    if (!path.startsWith("/")) return null;
    if (path.startsWith("/_next/") || path.startsWith("/api/")) return null;
    path = path.split("#")[0].split("?")[0];
    return path.replace(/\/+$/, "") || "/";
  };

  while (queue.length) {
    const path = queue.shift();
    if (status.has(path)) continue;

    let response;
    let body = "";
    try {
      response = await fetch(`${BASE}${path}`, {
        headers: { accept: BROWSER_ACCEPT },
        redirect: "manual",
      });
      const type = response.headers.get("content-type") ?? "";
      if (type.includes("text/html")) body = await response.text();
      else await response.arrayBuffer();
    } catch (error) {
      status.set(path, `ERR ${error.message}`);
      continue;
    }

    status.set(path, response.status);

    if (response.status >= 300 && response.status < 400) {
      const target = normalize(response.headers.get("location"));
      if (target && !status.has(target)) queue.push(target);
      continue;
    }
    if (response.status !== 200 || !body) continue;

    for (const match of body.matchAll(/href="([^"]+)"/g)) {
      const target = normalize(match[1]);
      if (!target) continue;
      if (!linkedFrom.has(target)) linkedFrom.set(target, new Set());
      linkedFrom.get(target).add(path);
      if (!status.has(target) && !queue.includes(target)) queue.push(target);
    }
  }

  const broken = [...status.entries()].filter(
    ([, value]) => typeof value !== "number" || value >= 400,
  );

  check(status.size > 60, "crawled the whole site", `${status.size} paths`);
  check(
    broken.length === 0,
    "every internal link resolves",
    broken
      .map(
        ([path, value]) =>
          `${path} -> ${value} (linked from ${[...(linkedFrom.get(path) ?? [])].slice(0, 3).join(", ")})`,
      )
      .join("; "),
  );

  // Cloudflare's Email Address Obfuscation rewrites mailto links into this
  // path and hides the address from anything that does not run JavaScript.
  check(
    !broken.some(([path]) => path.startsWith("/cdn-cgi/")),
    "no Cloudflare email-protection placeholder links",
  );
}

const EMAIL = "ak@aparnakapur.com";

/**
 * Cloudflare consumes the opening `<!--email_off-->` marker once it has acted
 * on it, so the markers are only observable on an origin that is not behind
 * Cloudflare. Assert the outcome instead, which holds on both: the address is
 * present, no obfuscated placeholder replaced it, and no rewritten
 * `/cdn-cgi/l/email-protection` href was left behind.
 */
function emailObfuscationArtifacts(html) {
  const body = html.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  return {
    placeholders: (body.match(/__cf_email__|\[email(&#160;|&nbsp;|\s)*protected\]/gi) ?? []).length,
    rewrittenHrefs: (body.match(/cdn-cgi\/l\/email-protection/gi) ?? []).length,
    addresses: (body.match(new RegExp(EMAIL, "g")) ?? []).length,
  };
}

/** The contact address must be readable without running JavaScript. */
async function verifyContactDetailsAreReadable() {
  group("Contact details survive in the raw HTML");

  const pages = ["/", "/contact", "/about/why-work-with-me", "/privacy", "/terms"];
  for (const path of pages) {
    const { body } = await get(path, BROWSER_ACCEPT);
    const artifacts = emailObfuscationArtifacts(body);
    check(
      artifacts.addresses > 0,
      `${path} shows the email address in rendered text`,
      `${artifacts.addresses} occurrences`,
    );
    check(
      artifacts.placeholders === 0,
      `${path} has no obfuscated email placeholder`,
      `${artifacts.placeholders} found`,
    );
    check(
      artifacts.rewrittenHrefs === 0,
      `${path} has no rewritten email-protection href`,
      `${artifacts.rewrittenHrefs} found`,
    );
  }

  for (const path of ["/", "/contact"]) {
    const { body } = await get(path, BROWSER_ACCEPT);
    check(visibleText(body).includes("604-612-7694"), `${path} shows the phone number`);
  }
}

async function verifyLegalPages() {
  group("Legal pages");
  for (const path of ["/privacy", "/terms"]) {
    const { response, body } = await get(path, BROWSER_ACCEPT);
    check(response.status === 200, `${path} returns 200`, String(response.status));
    const text = visibleText(body);
    check(text.length > 3000, `${path} has substantive content`, `${text.length} chars`);
    check(
      headings(body).some((heading) => heading.level === 1),
      `${path} has an H1`,
    );

    const md = await get(path, "text/markdown");
    check(
      (md.response.headers.get("content-type") ?? "").startsWith("text/markdown"),
      `${path} has a markdown twin`,
    );
    check(md.body.includes("## "), `${path} markdown carries the full section list`);
  }

  const { body } = await get("/terms", BROWSER_ACCEPT);
  const text = visibleText(body);
  check(
    text.includes("agents.md") && text.includes("Accept: text/markdown"),
    "/terms states the licence automated agents operate under",
  );
}

function jsonLdNodes(html) {
  const nodes = [];
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(match[1]);
    } catch {
      nodes.push({ __unparseable: true });
      continue;
    }
    nodes.push(...(parsed["@graph"] ?? [parsed]));
  }
  return nodes;
}

const typesOf = (node) =>
  [node["@type"]].flat().filter((value) => typeof value === "string");

async function verifyStructuredData() {
  group("JSON-LD identity graph");
  const { body } = await get("/", BROWSER_ACCEPT);
  const nodes = jsonLdNodes(body);

  check(
    nodes.length > 0 && !nodes.some((node) => node.__unparseable),
    "every JSON-LD block parses",
    `${nodes.length} nodes`,
  );

  const organizations = nodes.filter((node) => typesOf(node).includes("Organization"));
  check(organizations.length > 0, "an Organization node is present");

  // The audit reads whichever Organization it finds, so all of them have to
  // stand on their own rather than only the primary one being complete.
  for (const field of ["name", "description", "url", "address", "contactPoint", "logo"]) {
    const missing = organizations
      .filter((node) => !node[field])
      .map((node) => node["@id"] ?? node.name ?? "(anonymous)");
    check(
      missing.length === 0,
      `every Organization node has ${field}`,
      missing.join(", "),
    );
  }

  const primary = organizations.find((node) =>
    String(node["@id"] ?? "").endsWith("#organization"),
  );
  check(Boolean(primary), "the primary Organization node is addressable by @id");
  check(
    Array.isArray(primary?.sameAs) && primary.sameAs.length > 0,
    "the primary Organization lists sameAs profiles",
  );
  check(
    primary?.address?.streetAddress && primary?.address?.postalCode,
    "the Organization address is a complete PostalAddress",
  );
  check(
    [primary?.contactPoint].flat().every((point) => point?.telephone && point?.contactType),
    "every contactPoint has a telephone and a contactType",
  );

  check(
    nodes.some((node) => typesOf(node).includes("Person")),
    "a Person node identifies the licensed agent",
  );
  check(
    nodes.some((node) => typesOf(node).includes("WebSite")),
    "a WebSite node is present",
  );

  // Thin duplicates of the business are what made the audit report an
  // incomplete Organization in the first place.
  const anonymousOrgs = organizations.filter((node) => !node["@id"]);
  check(
    anonymousOrgs.length === 0,
    "no anonymous duplicate Organization nodes",
    anonymousOrgs.map((node) => node.name).join(", "),
  );
}

async function verifyHeadingStructure() {
  group("Document structure");
  const { body } = await get("/", BROWSER_ACCEPT);
  const main = mainContent(body);
  const hs = headings(main);

  check(hs.filter((h) => h.level === 1).length === 1, "exactly one H1 in <main>");
  check(
    hs.some((h) => h.level === 2) && hs.some((h) => h.level === 3),
    "the outline nests H2 and H3 under the H1",
  );

  let previous = 1;
  const skips = [];
  for (const heading of hs) {
    if (heading.level > previous + 1) skips.push(heading.text);
    previous = heading.level;
  }
  check(skips.length === 0, "no heading level is skipped", skips.join(", "));

  // Deep-linkable structure: an agent should be able to cite a section.
  const h2s = [...main.matchAll(/<h2\b([^>]*)>/gi)].map((m) => m[1]);
  const withoutId = h2s.filter((attrs) => !/\sid="/.test(attrs)).length;
  check(withoutId === 0, "every H2 has an id to link to", `${withoutId} without`);

  const sections = [...main.matchAll(/<section\b([^>]*)>/gi)].map((m) => m[1]);
  const labelled = sections.filter((attrs) => /aria-labelledby="/.test(attrs)).length;
  check(
    labelled >= 6,
    "sections are tied to their headings with aria-labelledby",
    `${labelled} of ${sections.length}`,
  );
}

async function verifyCanonicalHost() {
  group("Canonical host");
  const target = new URL(BASE);
  if (target.hostname !== "www.aparnakapur.com") {
    console.log("  skip canonical-host checks (not running against production)");
    return;
  }

  const apex = await fetch("https://aparnakapur.com/", { redirect: "manual" });
  check(
    [301, 308].includes(apex.status),
    "the apex domain redirects permanently to www",
    `got ${apex.status} — a 307 does not consolidate ranking signals`,
  );
  check(
    apex.headers.get("location") === "https://www.aparnakapur.com/",
    "the apex redirect points straight at the canonical host",
    apex.headers.get("location") ?? "(none)",
  );

  const { body } = await get("/", BROWSER_ACCEPT);
  check(
    body.includes('rel="canonical" href="https://www.aparnakapur.com/"') ||
      body.includes('<link rel="canonical" href="https://www.aparnakapur.com"'),
    "the homepage declares its canonical URL",
  );
}

/**
 * The MLS feed failing is invisible: every listing surface degrades to an
 * empty state rather than an error, so the site looks fine while showing no
 * properties at all. It sat broken in production because nothing checked.
 */
async function verifyListingsFeed() {
  group("MLS listing feed");

  const { body } = await get("/buying/search", BROWSER_ACCEPT);
  const properties = new Set([...body.matchAll(/\/property\/([A-Za-z0-9]+)/g)].map((m) => m[1]));
  check(
    properties.size >= 6,
    "/buying/search renders listings",
    `${properties.size} distinct properties`,
  );

  const counted = visibleText(body).match(/([\d,]+) active listings/);
  check(
    counted !== null && Number(counted[1].replace(/,/g, "")) > 0,
    "/buying/search reports a live listing count",
    counted ? counted[0] : "no count rendered",
  );

  // A guide that renders its empty state for weeks is a soft 404 waiting to
  // happen, so spot-check the neighbourhoods with the most search traffic.
  const empty = [];
  for (const slug of ["riley-park", "oakridge", "marpole", "south-cambie"]) {
    const page = await get(`/neighborhoods/${slug}`, BROWSER_ACCEPT);
    const text = visibleText(page.body);
    if (!/\d+ active listings? on the MLS/.test(text)) empty.push(slug);
  }
  check(
    empty.length === 0,
    "neighbourhood guides show live listings",
    empty.length ? `empty: ${empty.join(", ")}` : "",
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
  await verifyListingsFeed();
  await verifyStructuredData();
  await verifyHeadingStructure();
  await verifyCanonicalHost();
  await verifyLegalPages();
  await verifyContactDetailsAreReadable();
  await verifyNoBrokenLinks();

  console.log(
    `\n${checks - failures}/${checks} checks passed${failures ? ` — ${failures} FAILED` : ""}`,
  );
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
