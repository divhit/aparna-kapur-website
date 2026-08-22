#!/usr/bin/env node
/**
 * Repeatable rank check.
 *
 * Runs a fixed query set against a search API and records where
 * aparnakapur.com appears, so movement is measurable rather than remembered.
 * Results append to scripts/rank-history.json.
 *
 *   SERPAPI_KEY=... node scripts/rank-check.mjs
 *   node scripts/rank-check.mjs --show      # print the history, no network
 *
 * The query set is deliberately mixed: brand queries that should already win,
 * neighbourhood queries that are competitive, and the long-tail comparison
 * queries the /market pages target. Keep it stable — changing the queries
 * makes the history meaningless.
 *
 * A caveat worth remembering when reading the numbers: local-intent queries
 * ("realtor near me") depend on the searcher's location, so a result measured
 * from outside Vancouver is directional only. Brand and informational queries
 * are reliable.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DOMAIN = "aparnakapur.com";
const HISTORY = new URL("./rank-history.json", import.meta.url);

/** Stable query set. `intent` records what each one is meant to prove. */
const QUERIES = [
  { q: "Aparna Kapur Real Estate", intent: "brand" },
  { q: "Aparna Kapur Vancouver realtor Oakwyn Realty", intent: "brand" },
  {
    q: "best realtor Oakridge Marpole South Cambie Vancouver",
    intent: "local",
  },
  { q: "Oakridge Vancouver real estate guide neighbourhood", intent: "guide" },
  {
    q: "Kerrisdale Vancouver neighbourhood guide real estate",
    intent: "guide",
  },
  {
    q: "how to choose a realtor in Vancouver questions to ask",
    intent: "informational",
  },
  {
    q: "which Vancouver neighbourhood is holding its value best",
    intent: "ranking",
  },
  {
    q: "most affordable Vancouver neighbourhoods benchmark price",
    intent: "ranking",
  },
  {
    q: "Kitsilano condo benchmark price vs Metro Vancouver",
    intent: "comparison",
  },
  { q: "Oakridge townhouse benchmark price Vancouver", intent: "comparison" },
  {
    q: "Vancouver condo benchmark price by neighbourhood",
    intent: "comparison",
  },
  {
    q: "BC property transfer tax first time buyer exemption",
    intent: "informational",
  },
];

function loadHistory() {
  if (!existsSync(HISTORY)) return [];
  try {
    return JSON.parse(readFileSync(HISTORY, "utf8"));
  } catch {
    return [];
  }
}

function show() {
  const history = loadHistory();
  if (history.length === 0) {
    console.log(
      "No history yet. Run with SERPAPI_KEY set to record a first pass.",
    );
    return;
  }
  const runs = history.slice(-3);
  const width = Math.max(...QUERIES.map((entry) => entry.q.length));
  console.log(
    `\n${"query".padEnd(width)}  ${runs.map((r) => r.date).join("  ")}`,
  );
  console.log("-".repeat(width + runs.length * 12));
  for (const { q, intent } of QUERIES) {
    const cells = runs.map((run) => {
      const hit = run.results.find((result) => result.q === q);
      return (hit?.position ? `#${hit.position}` : "—").padStart(10);
    });
    console.log(`${q.padEnd(width)}  ${cells.join("  ")}   ${intent}`);
  }
  console.log();
}

async function search(query, key) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", key);
  url.searchParams.set("num", "20");
  // Vancouver, so local-intent queries reflect the real audience.
  url.searchParams.set("location", "Vancouver, British Columbia, Canada");
  url.searchParams.set("gl", "ca");
  url.searchParams.set("hl", "en");

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);
  const data = await response.json();
  const organic = data.organic_results ?? [];
  const index = organic.findIndex((result) =>
    (result.link ?? "").includes(DOMAIN),
  );
  return {
    position: index >= 0 ? (organic[index].position ?? index + 1) : null,
    url: index >= 0 ? organic[index].link : null,
    top: organic.slice(0, 3).map((result) => new URL(result.link).hostname),
  };
}

async function main() {
  if (process.argv.includes("--show")) return show();

  const key = process.env.SERPAPI_KEY;
  if (!key) {
    console.error(
      "SERPAPI_KEY is not set.\n" +
        "Get a key at serpapi.com (the free tier covers this query set), then:\n" +
        "  SERPAPI_KEY=... node scripts/rank-check.mjs\n\n" +
        "Or run with --show to print the recorded history.",
    );
    process.exit(1);
  }

  const results = [];
  for (const { q, intent } of QUERIES) {
    try {
      const found = await search(q, key);
      results.push({ q, intent, ...found });
      console.log(
        `${found.position ? `#${found.position}`.padStart(4) : "   —"}  ${q}` +
          (found.position
            ? `\n       ${found.url}`
            : `\n       top: ${found.top.join(", ")}`),
      );
    } catch (error) {
      results.push({ q, intent, position: null, error: String(error) });
      console.log(` ERR  ${q} — ${error}`);
    }
  }

  const history = loadHistory();
  history.push({ date: new Date().toISOString().slice(0, 10), results });
  writeFileSync(HISTORY, JSON.stringify(history, null, 1));

  const ranked = results.filter((result) => result.position).length;
  console.log(`\n${ranked} of ${results.length} queries rank in the top 20.`);
  console.log(`Recorded to ${HISTORY.pathname}. Run --show to compare passes.`);
}

main();
