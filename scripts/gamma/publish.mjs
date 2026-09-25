#!/usr/bin/env node
/**
 * Publish the pages in scripts/gamma/pages/*.md to Gamma via the Generate API.
 *
 * Usage:
 *   GAMMA_API_KEY=sk-gamma-... node scripts/gamma/publish.mjs            # publish every page
 *   node scripts/gamma/publish.mjs --only=02-broadway-plan               # one page (file stem)
 *   node scripts/gamma/publish.mjs --dry-run                             # print payloads, no API calls
 *   node scripts/gamma/publish.mjs --format=webpage --theme=<themeId>    # overrides
 *
 * The key is read from GAMMA_API_KEY, or from .env.local if the variable is
 * unset. It is never printed. Get one at https://gamma.app/settings/api-keys
 * (Pro, Ultra, Team or Business plan).
 *
 * Every page is generated with textMode "preserve" so the text on the page is
 * exactly what is in the markdown file: no AI rewriting, no AI images. The
 * brokerage name is also set as a footer on every card so the BCFSA
 * brokerage-prominence requirement holds even if a reader lands mid-page.
 *
 * Results are appended to scripts/gamma/published.json. Re-running creates a
 * new gamma for each page; delete the superseded one in the Gamma UI.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://public-api.gamma.app/v1.0";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = path.join(HERE, "pages");
const RESULTS = path.join(HERE, "published.json");
const FOOTER = "Aparna Kapur, REALTOR® · Oakwyn Realty Ltd. · 604-612-7694";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

async function readApiKey() {
  if (process.env.GAMMA_API_KEY) return process.env.GAMMA_API_KEY;
  try {
    const env = await fs.readFile(
      path.join(HERE, "..", "..", ".env.local"),
      "utf8",
    );
    const m = env.match(/^GAMMA_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  } catch {
    /* no .env.local */
  }
  return null;
}

function parsePage(raw) {
  if (!raw.startsWith("---\n")) throw new Error("page is missing front matter");
  const end = raw.indexOf("\n---\n", 4);
  const meta = Object.fromEntries(
    raw
      .slice(4, end)
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const i = line.indexOf(":");
        return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
      }),
  );
  const body = raw.slice(end + 5).trim();
  return { meta, body };
}

function buildPayload({ meta, body }) {
  return {
    inputText: body,
    textMode: "preserve",
    format: args.format || "document",
    cardSplit: "inputTextBreaks",
    title: meta.title,
    ...(args.theme ? { themeId: args.theme } : {}),
    textOptions: { language: "en" },
    // "preserve" keeps the body text but Gamma still invents card labels and
    // taglines for its layouts (e.g. "TOA Specialist"). Forbid that so nothing
    // on the page is a claim we did not write.
    additionalInstructions:
      "Use only the words in the input text. Do not add, invent, summarize or paraphrase any text, including card titles, labels, callouts, badges, taglines or descriptions of the author. If a layout needs a label that is not in the input, choose a plainer layout instead.",
    imageOptions: { source: "noImages" },
    cardOptions: {
      headerFooter: {
        bottomCenter: { type: "text", value: FOOTER },
      },
    },
    sharingOptions: {
      workspaceAccess: "view",
      externalAccess: "view",
    },
  };
}

async function api(key, method, route, body) {
  const res = await fetch(`${API}${route}`, {
    method,
    headers: { "Content-Type": "application/json", "X-API-KEY": key },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(
      `${method} ${route} -> ${res.status}: ${text.slice(0, 300)}`,
    );
  }
  return json;
}

async function waitForGeneration(key, id) {
  const started = Date.now();
  while (Date.now() - started < 10 * 60 * 1000) {
    const status = await api(key, "GET", `/generations/${id}`);
    if (status.status === "completed") return status;
    if (status.status === "failed") {
      throw new Error(
        `generation ${id} failed: ${JSON.stringify(status).slice(0, 300)}`,
      );
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error(`generation ${id} timed out`);
}

async function loadResults() {
  try {
    return JSON.parse(await fs.readFile(RESULTS, "utf8"));
  } catch {
    return [];
  }
}

async function main() {
  const files = (await fs.readdir(PAGES_DIR))
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !args.only || f.replace(/\.md$/, "") === args.only)
    .sort();

  if (files.length === 0) {
    console.error("no pages matched");
    process.exit(1);
  }

  const key = args["dry-run"] ? "dry" : await readApiKey();
  if (!key) {
    console.error(
      "GAMMA_API_KEY is not set. Create one at https://gamma.app/settings/api-keys and export it or add it to .env.local.",
    );
    process.exit(1);
  }

  const results = await loadResults();

  for (const file of files) {
    const raw = await fs.readFile(path.join(PAGES_DIR, file), "utf8");
    const page = parsePage(raw);
    const payload = buildPayload(page);
    const cards = page.body.split(/\n---\n/).length;
    console.log(`\n${file}: "${page.meta.title}" (${cards} cards)`);

    if (args["dry-run"]) {
      console.log(
        JSON.stringify(
          { ...payload, inputText: `[${page.body.length} chars]` },
          null,
          2,
        ),
      );
      continue;
    }

    const created = await api(key, "POST", "/generations", payload);
    if (created.warnings) console.log("  warnings:", created.warnings);
    process.stdout.write(`  generation ${created.generationId} …`);
    const done = await waitForGeneration(key, created.generationId);
    console.log(` done\n  ${done.gammaUrl}`);
    if (done.credits) {
      console.log(
        `  credits: -${done.credits.deducted}, ${done.credits.remaining} left`,
      );
    }

    results.push({
      file,
      slug: page.meta.slug,
      campaign: page.meta.campaign,
      title: page.meta.title,
      gammaId: done.gammaId,
      gammaUrl: done.gammaUrl,
      publishedAt: new Date().toISOString(),
    });
    await fs.writeFile(RESULTS, JSON.stringify(results, null, 2) + "\n");
  }

  if (!args["dry-run"]) {
    console.log(`\nWrote ${RESULTS}`);
    console.log(
      "Next: open each gammaUrl, confirm it is publicly viewable while logged out, and check the footer shows the brokerage name on every card.",
    );
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
