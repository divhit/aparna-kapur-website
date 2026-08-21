#!/usr/bin/env node
/**
 * Buy-intent keyword universe for aparnakapur.com.
 *
 * Step 2 and 3 of the pSEO playbook: parent keywords crossed with who the
 * buyer is and where they are looking, scored so the most commercial
 * combinations get written first.
 *
 * The locations are not invented — they are the 24 neighbourhoods the site
 * already publishes GVR sub-area HPI benchmarks for. That matters: a page is
 * only worth publishing here if it can answer its own query with a real
 * figure, and those are the only areas where we have one.
 *
 *   node scripts/keyword-universe.mjs               # top 40
 *   node scripts/keyword-universe.mjs --all         # everything
 *   node scripts/keyword-universe.mjs --csv > kw.csv
 *   node scripts/keyword-universe.mjs --json > kw.json
 */

import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../src/lib/neighborhoods.ts", import.meta.url),
  "utf8",
);
const NEIGHBOURHOODS = [
  ...source.matchAll(
    /name: "([^"]+)",\n    slug: "([^"]+)"[\s\S]*?avgPrice: "([^"]+)",\n    priceChange: "([^"]+)"/g,
  ),
].map(([, name, slug, benchmark, change]) => ({
  name,
  slug,
  benchmark,
  change,
}));

/** Layer one: what they are trying to do. `weight` is commercial intent. */
const INTENTS = [
  { id: "buy", template: (a) => `buying a home in ${a}`, weight: 9 },
  {
    id: "cost",
    template: (a) => `how much does a house cost in ${a}`,
    weight: 10,
  },
  { id: "worth", template: (a) => `what is my home worth in ${a}`, weight: 10 },
  { id: "sell", template: (a) => `selling a home in ${a}`, weight: 9 },
  { id: "condo-price", template: (a) => `condo prices in ${a}`, weight: 8 },
  {
    id: "detached-price",
    template: (a) => `detached home prices in ${a}`,
    weight: 8,
  },
  {
    id: "best-for",
    template: (a) => `is ${a} a good place to live`,
    weight: 5,
  },
  { id: "realtor", template: (a) => `real estate agent in ${a}`, weight: 10 },
  { id: "market", template: (a) => `${a} real estate market`, weight: 6 },
  { id: "schools", template: (a) => `school catchment in ${a}`, weight: 4 },
  {
    id: "compare",
    template: (a) => `${a} vs other Vancouver neighbourhoods`,
    weight: 5,
  },
  { id: "first-time", template: (a) => `first time buyer in ${a}`, weight: 9 },
];

/** Layer two: who is asking. Weight reflects transaction value and urgency. */
const SEGMENTS = [
  { id: "none", label: null, weight: 5 },
  { id: "first-time-buyer", label: "for first-time buyers", weight: 9 },
  { id: "families", label: "for families", weight: 8 },
  { id: "downsizers", label: "for downsizers", weight: 8 },
  { id: "investors", label: "for investors", weight: 9 },
  { id: "newcomers", label: "for newcomers to Canada", weight: 7 },
  { id: "move-up", label: "for move-up buyers", weight: 8 },
  { id: "retirees", label: "for retirees", weight: 6 },
];

/** Layer three: the budget band, which is how buyers actually search. */
const BANDS = [
  { id: "none", label: null, weight: 4, min: 0, max: Infinity },
  { id: "u750", label: "under $750K", weight: 8, min: 0, max: 750_000 },
  { id: "u1m", label: "under $1M", weight: 9, min: 0, max: 1_000_000 },
  { id: "u1-5m", label: "under $1.5M", weight: 9, min: 0, max: 1_500_000 },
  { id: "u2m", label: "under $2M", weight: 7, min: 0, max: 2_000_000 },
  { id: "o2m", label: "over $2M", weight: 6, min: 2_000_000, max: Infinity },
];

function benchmarkValue(text) {
  const match = text.match(/\$([\d.]+)([MK])/);
  if (!match) return null;
  return Number(match[1]) * (match[2] === "M" ? 1_000_000 : 1_000);
}

/**
 * A band only earns a page where it is plausible against the real benchmark.
 * "Homes under $750K in Shaughnessy" has no honest answer, so it is not a
 * page — publishing it would be the thin content the policy exists to catch.
 */
function bandFits(band, benchmark) {
  if (band.id === "none" || benchmark === null) return true;
  if (band.max !== Infinity) return benchmark <= band.max * 1.6;
  return benchmark >= band.min * 0.6;
}

const rows = [];
for (const area of NEIGHBOURHOODS) {
  const benchmark = benchmarkValue(area.benchmark);
  for (const intent of INTENTS) {
    for (const segment of SEGMENTS) {
      for (const band of BANDS) {
        if (!bandFits(band, benchmark)) continue;
        const query = [intent.template(area.name), segment.label, band.label]
          .filter(Boolean)
          .join(" ");
        rows.push({
          query,
          area: area.name,
          slug: area.slug,
          intent: intent.id,
          segment: segment.id,
          band: band.id,
          benchmark: area.benchmark,
          yoy: area.change,
          score: intent.weight * 2 + segment.weight + band.weight,
        });
      }
    }
  }
}

rows.sort((a, b) => b.score - a.score || a.query.localeCompare(b.query));

const args = process.argv.slice(2);
if (args.includes("--json")) {
  process.stdout.write(JSON.stringify(rows, null, 1));
} else if (args.includes("--csv")) {
  process.stdout.write("score,query,area,intent,segment,band,benchmark,yoy\n");
  for (const r of rows) {
    process.stdout.write(
      `${r.score},"${r.query}",${r.area},${r.intent},${r.segment},${r.band},${r.benchmark},${r.yoy}\n`,
    );
  }
} else {
  const shown = args.includes("--all") ? rows : rows.slice(0, 40);
  console.log(
    `${rows.length.toLocaleString()} buy-intent queries from ${NEIGHBOURHOODS.length} neighbourhoods ` +
      `× ${INTENTS.length} intents × ${SEGMENTS.length} segments × ${BANDS.length} price bands\n`,
  );
  console.log("score  query");
  for (const r of shown) console.log(String(r.score).padStart(5), " ", r.query);
  if (!args.includes("--all"))
    console.log(
      `\n… ${rows.length - shown.length} more (--all, --csv, --json)`,
    );
}
