/**
 * Turns the raw Fox Medical CRM captures into web-sized showcase assets.
 *
 * Source captures are 4K PNGs (200 KB – 1.1 MB each) from medical.rar; shipping
 * those to visitors would undo the bundle work. This resizes and converts to
 * WebP, which lands each screen around 40–90 KB.
 *
 *   node scripts/build-showcase-images.mjs [path-to-extracted-medical-folder]
 *
 * Default source: ../medical-extract/medical relative to the repo.
 *
 * Only screens without personal data are included. The HCP list, coverage,
 * frequency, hcp-detail, institution-detail and mobile my-day captures show
 * named physicians alongside commercial prescribing profiles ("prescribes
 * branded over generic 80% of the time", segment grades, KOL flags). Even as
 * seed data that reads as leaked client intelligence on a public marketing
 * site, so it stays off the website.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2] ?? path.join("..", "medical-extract", "medical");
const OUT = path.join("client", "public", "showcase", "medical-crm");

const SCREENS = [
  { from: "desktop-dark/dashboard.png",    to: "dashboard.webp",    width: 1800 },
  { from: "desktop-dark/orders.png",       to: "orders.webp",       width: 1800 },
  { from: "desktop-dark/samples.png",      to: "samples.webp",      width: 1800 },
  { from: "desktop-dark/ai-assistant.png", to: "ai-assistant.webp", width: 1800 },
  { from: "mobile-dark/gps-check-in.png",  to: "gps-check-in.webp", width: 560 },
];

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Source captures not found at ${SRC}`);
    console.error("Extract medical.rar first, or pass the folder as an argument.");
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;

  for (const { from, to, width } of SCREENS) {
    const source = path.join(SRC, from);
    if (!fs.existsSync(source)) throw new Error(`Missing capture: ${source}`);

    const target = path.join(OUT, to);
    const info = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(target);

    total += info.size;
    console.log(`  ${to.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }

  console.log(`\n${SCREENS.length} screens, ${(total / 1024).toFixed(0)} KB total, written to ${OUT}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
