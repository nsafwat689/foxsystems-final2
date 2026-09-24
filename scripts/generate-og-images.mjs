/**
 * Generates the Open Graph / Twitter card images referenced by index.html and
 * client/src/utils/seo.ts.
 *
 * Every one of these was a 404 before, so each share on WhatsApp, LinkedIn or
 * Facebook rendered a blank card. Re-run after changing titles or branding:
 *
 *   node scripts/generate-og-images.mjs
 *
 * Output: client/public/*-og.jpg at 1200x630 (the size every platform crops to).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.join("client", "public");
const LOGO = path.join(OUT_DIR, "logo.jpg");
const W = 1200;
const H = 630;

const NAVY = "#0f172a";
const NAVY_MID = "#1e293b";
const PRIMARY = "#1d4ed8";
const ACCENT = "#0ea5e9";

/** Cards to produce: [output filename, headline, kicker]. */
const CARDS = [
  ["og-image.jpg", "CRM & IT Solutions for Egypt and the Gulf", "Fox Systems"],
  ["services-og.jpg", "IT Services Built for Egyptian Business", "Services"],
  ["industries-og.jpg", "Industry Expertise Across the Middle East", "Industries"],
  ["case-studies-og.jpg", "Real Deployments, Measured Results", "Case Studies"],
  ["articles-og.jpg", "Practical Guides on CRM, VoIP and Security", "Articles"],
  ["contact-og.jpg", "Talk to a CRM and IT Engineer", "Contact"],
  ["guide-og.jpg", "The IT Readiness Guide for Egyptian Business", "Free Download"],
  ["services/internet-og.jpg", "Call Center and Internet Connectivity", "Service"],
  ["services/crm-og.jpg", "CRM and ERP Software Implementation", "Service"],
  ["services/hardware-og.jpg", "Servers, Workstations and Hardware Supply", "Service"],
  ["services/cybersecurity-og.jpg", "Firewalls and Cybersecurity Operations", "Service"],
  ["services/infrastructure-og.jpg", "Network and Structured Cabling Infrastructure", "Service"],
  ["services/web-development-og.jpg", "Web Development and Digital Presence", "Service"],
  ["solutions/solutions-og.jpg", "CRM Systems Built for One Industry", "Solutions"],
  ["solutions/medical-crm-og.jpg", "Medical and Pharmaceutical Field Force CRM", "Product"],
  ["solutions/real-estate-crm-og.jpg", "Real Estate CRM for Brokers and Developers", "Product"],
  ["solutions/pest-control-crm-og.jpg", "Pest Control Job and Route Management", "Product"],
];

const escapeXml = s =>
  s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]);

/**
 * Greedy wrap using an average glyph width. Bold Arial at a given size averages
 * a little over half the point size per character, which is close enough for
 * headlines that always sit well inside the card.
 */
function wrap(text, fontSize, maxWidth) {
  const perChar = fontSize * 0.54;
  const maxChars = Math.floor(maxWidth / perChar);
  const lines = [];
  let line = "";

  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function buildSvg(headline, kicker) {
  const fontSize = headline.length > 44 ? 62 : 72;
  const lines = wrap(headline, fontSize, W - 200);
  const lineHeight = fontSize * 1.18;
  const blockTop = 300 - ((lines.length - 1) * lineHeight) / 2;

  const headlineTspans = lines
    .map((line, i) => `<tspan x="100" y="${Math.round(blockTop + i * lineHeight)}">${escapeXml(line)}</tspan>`)
    .join("");

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="${NAVY_MID}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.18" r="0.55">
      <stop offset="0%" stop-color="${PRIMARY}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${PRIMARY}"/>

  <text x="100" y="152" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700"
        fill="${ACCENT}" letter-spacing="4">${escapeXml(kicker.toUpperCase())}</text>

  <text font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700"
        fill="#ffffff">${headlineTspans}</text>

  <text x="100" y="472" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#cbd5e1">
    CRM · Call Center · Firewall · VoIP · Network
  </text>

  <rect x="100" y="516" width="64" height="4" fill="${PRIMARY}"/>

  <text x="100" y="572" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff">
    foxsystemstech.com
  </text>
  <text x="${W - 100}" y="572" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#94a3b8">
    Egypt · Saudi Arabia · Kuwait
  </text>
</svg>`);
}

async function main() {
  if (!fs.existsSync(LOGO)) throw new Error(`Logo not found at ${LOGO}`);

  const logo = await sharp(LOGO).resize(96, 96, { fit: "cover" }).png().toBuffer();
  const logoMask = Buffer.from(
    `<svg width="96" height="96"><rect width="96" height="96" rx="22" fill="#fff"/></svg>`
  );
  const roundedLogo = await sharp(logo)
    .composite([{ input: logoMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  for (const [file, headline, kicker] of CARDS) {
    const target = path.join(OUT_DIR, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });

    await sharp(buildSvg(headline, kicker))
      .composite([{ input: roundedLogo, top: 60, left: W - 196 }])
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(target);

    const { size } = fs.statSync(target);
    console.log(`  ${file.padEnd(38)} ${(size / 1024).toFixed(0)} KB`);
  }

  console.log(`\n${CARDS.length} Open Graph images written to ${OUT_DIR}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
