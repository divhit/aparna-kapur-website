#!/usr/bin/env node
/**
 * Validate and zip the ChatGPT plugin package in plugins/chatgpt.
 *
 *   npm run plugin:pack                 # validate + write plugins/chatgpt/dist/<name>-<version>.zip
 *   npm run plugin:pack -- --check      # validate only
 *   npm run plugin:pack -- --allow-placeholders   # zip even if the demo URL is still a placeholder
 *
 * The zip has the plugin folder at its root, as OpenAI's upload expects.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "plugins",
  "chatgpt",
);
const args = new Set(process.argv.slice(2));
const problems = [];

function fail(msg) {
  problems.push(msg);
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

const manifest = JSON.parse(
  await fs.readFile(path.join(ROOT, "plugin.json"), "utf8"),
);
const mcp = JSON.parse(await fs.readFile(path.join(ROOT, "mcp.json"), "utf8"));
const ui = manifest.extensions?.["com.openai"]?.interface ?? {};
const review = manifest.extensions?.["com.openai"]?.review ?? {};

// --- identity -------------------------------------------------------------
if (
  !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name) ||
  manifest.name.length > 64
) {
  fail(`name must be kebab-case, ≤64 chars: ${manifest.name}`);
}
if (!/^\d+\.\d+\.\d+$/.test(manifest.version))
  fail(`version must be semver: ${manifest.version}`);
if ((manifest.description ?? "").length > 4000)
  fail("description > 4000 chars");

// --- listing limits from the submission docs --------------------------------
const limits = {
  displayName: 30,
  shortDescription: 30,
  longDescription: 4000,
  developerName: 80,
};
for (const [key, max] of Object.entries(limits)) {
  const v = ui[key] ?? "";
  if (!v) fail(`interface.${key} is required`);
  else if (v.length > max)
    fail(`interface.${key} is ${v.length} chars, max ${max}`);
}
for (const key of [
  "websiteURL",
  "supportURL",
  "privacyPolicyURL",
  "termsOfServiceURL",
]) {
  if (!/^https:\/\//.test(ui[key] ?? ""))
    fail(`interface.${key} must be an https URL (required for MCP review)`);
}
if (!ui.category) fail("interface.category is required");
if ((ui.capabilities ?? []).length > 20) fail("interface.capabilities max 20");
for (const c of ui.capabilities ?? [])
  if (c.length > 120) fail(`capability > 120 chars: ${c}`);
if ((ui.defaultPrompt ?? []).length > 3) fail("interface.defaultPrompt max 3");
for (const p of ui.defaultPrompt ?? [])
  if (p.length > 128) fail(`defaultPrompt > 128 chars: ${p}`);
for (const key of ["brandColor", "brandColorDark"]) {
  if (ui[key] && !/^#[0-9A-Fa-f]{6}$/.test(ui[key]))
    fail(`interface.${key} must be #RRGGBB`);
}

// --- assets -----------------------------------------------------------------
for (const key of ["composerIcon", "logo"]) {
  const rel = ui[key];
  if (!rel) fail(`interface.${key} is required`);
  else if (!rel.startsWith("./")) fail(`interface.${key} must start with ./`);
  else if (!(await exists(path.join(ROOT, rel))))
    fail(`interface.${key} file missing: ${rel}`);
}
for (const rel of ui.screenshots ?? []) {
  if (!(await exists(path.join(ROOT, rel)))) fail(`screenshot missing: ${rel}`);
}

// --- MCP ----------------------------------------------------------------------
const servers = Object.entries(mcp.mcpServers ?? {});
if (servers.length !== 1)
  fail(`exactly one MCP server allowed, found ${servers.length}`);
for (const [name, cfg] of servers) {
  if (cfg.type !== "streamable-http")
    fail(`mcpServers.${name}.type must be streamable-http`);
  if (!/^https:\/\//.test(cfg.url ?? ""))
    fail(`mcpServers.${name}.url must be https`);
}

// --- review -------------------------------------------------------------------
const pos = review.test_cases?.positive ?? [];
const neg = review.test_cases?.negative ?? [];
if (pos.length !== 5)
  fail(`review needs exactly 5 positive test cases, found ${pos.length}`);
if (neg.length !== 3)
  fail(`review needs exactly 3 negative test cases, found ${neg.length}`);
pos.forEach((t, i) => {
  for (const k of [
    "description",
    "prompt",
    "tools_triggered",
    "expected_behavior",
  ]) {
    if (!t[k] || (Array.isArray(t[k]) && t[k].length === 0))
      fail(`positive[${i}].${k} missing`);
  }
});
neg.forEach((t, i) => {
  for (const k of ["description", "prompt", "expected_behavior"])
    if (!t[k]) fail(`negative[${i}].${k} missing`);
});
if (typeof review.commerce !== "boolean")
  fail("review.commerce must be boolean");
const demo = review.demo_recording_url;
if (demo === undefined) {
  console.warn("note: review.demo_recording_url is not set; paste the public walkthrough video URL into the dashboard's Review section before submitting.");
} else if (!/^https:\/\//.test(demo)) {
  fail(`review.demo_recording_url must be a public https URL ("${demo}")`);
}

// --- secrets guard ----------------------------------------------------------------
const raw = await fs.readFile(path.join(ROOT, "plugin.json"), "utf8");
if (/sk-[A-Za-z0-9-]{10,}|api[_-]?key/i.test(raw))
  fail("plugin.json appears to contain a secret");

// --- live server sanity ---------------------------------------------------------------
try {
  const url = servers[0]?.[1]?.url;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
  });
  const body = await res.json();
  const names = (body.result?.tools ?? []).map((t) => t.name);
  if (names.length === 0)
    fail(`live MCP server returned no tools (${res.status})`);
  const referenced = new Set(pos.flatMap((t) => t.tools_triggered));
  for (const n of referenced)
    if (!names.includes(n)) fail(`test case references unknown tool: ${n}`);
  console.log(`live MCP tools: ${names.join(", ")}`);
} catch (err) {
  fail(`could not reach live MCP server: ${err.message}`);
}

if (problems.length) {
  console.error("\nPackage is not ready:");
  for (const p of problems) console.error(" -", p);
  process.exit(1);
}
console.log("plugin.json and mcp.json validate.");
if (args.has("--check")) process.exit(0);

// --- zip ---------------------------------------------------------------------------------
const dist = path.join(ROOT, "dist");
await fs.mkdir(dist, { recursive: true });
const zipName = `${manifest.name}-${manifest.version}.zip`;
const zipPath = path.join(dist, zipName);
await fs.rm(zipPath, { force: true });
// Zip from the parent so the archive contains one folder ("chatgpt/") at its root.
execFileSync(
  "zip",
  [
    "-r",
    "-q",
    zipPath,
    "chatgpt",
    "-x",
    "chatgpt/dist/*",
    "chatgpt/README.md",
    "chatgpt/.DS_Store",
  ],
  { cwd: path.dirname(ROOT) },
);
const { size } = await fs.stat(zipPath);
console.log(
  `wrote ${path.relative(process.cwd(), zipPath)} (${(size / 1024).toFixed(0)} KB)`,
);
console.log(
  execFileSync("unzip", ["-l", zipPath])
    .toString()
    .split("\n")
    .slice(3, -3)
    .join("\n"),
);
