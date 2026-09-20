/**
 * Turns raw CRM captures into the web-sized showcase assets the solution pages
 * load from /showcase/<set>/.
 *
 * Companion to build-showcase-images.mjs, which does the same job for the
 * medical CRM from a different source layout. This one takes a flat folder of
 * PNGs named after the screen stem the page expects:
 *
 *   node scripts/build-solution-showcase.mjs <set> <path-to-captures>
 *
 *   set = realestate-crm | pestcontrol-crm
 *
 * Desktop screens land around 40-90 KB as WebP at 1800px wide, which is what
 * keeps the gallery off the bundle budget.
 *
 * Only screens without personal data belong here. These are marketing pages on
 * a public site: a capture showing a real buyer's name and phone number, or a
 * real client site address, does not go in even though the source is demo seed
 * data — it still reads as leaked client information.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/** Desktop screens render at 1800px; the phone shot is portrait, so it gets 560. */
const MOBILE_WIDTH = 560;
const DESKTOP_WIDTH = 1800;

const SETS = {
  "realestate-crm": [
    "dashboard", "pipeline", "properties", "payments",
    "leads", "matching", "automations", "payouts",
    "mobile",
  ],
  "pestcontrol-crm": [
    "dispatch", "schedule", "reports", "analytics",
    "clients", "devices", "contracts", "invoices",
    "mobile",
  ],
};

const [set, src] = process.argv.slice(2);

if (!set || !SETS[set]) {
  console.error(`Usage: node scripts/build-solution-showcase.mjs <${Object.keys(SETS).join("|")}> <captures-dir>`);
  process.exit(1);
}
if (!src || !fs.existsSync(src)) {
  console.error(`Captures folder not found: ${src}`);
  process.exit(1);
}

const out = path.join("client", "public", "showcase", set);
fs.mkdirSync(out, { recursive: true });

let written = 0;
let missing = 0;

for (const stem of SETS[set]) {
  const from = path.join(src, `${stem}.png`);
  if (!fs.existsSync(from)) {
    console.warn(`  ${stem.padEnd(12)} SKIPPED — no ${from}`);
    missing++;
    continue;
  }
  const to = path.join(out, `${stem}.webp`);
  const width = stem === "mobile" ? MOBILE_WIDTH : DESKTOP_WIDTH;
  await sharp(from).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(to);
  const kb = Math.round(fs.statSync(to).size / 1024);
  console.log(`  ${stem.padEnd(12)} ${String(kb).padStart(4)} KB  ->  ${to}`);
  written++;
}

console.log(`\n${written} screen(s) written to ${out}${missing ? `, ${missing} missing` : ""}`);
if (missing) process.exitCode = 1;
