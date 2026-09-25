/**
 * Generates one Open Graph card per tool into client/public/tools/.
 *
 *   node scripts/build-tool-og.mjs
 *
 * These are needed because a missing image on this site does NOT 404: the SPA
 * rewrite answers it with index.html at 200 text/html, so a scraper gets an
 * HTML document where it expected a JPEG and the share preview breaks
 * silently. Every ogImage referenced in data/tools.ts must therefore exist as
 * a real file.
 *
 * Re-run after adding a tool.
 *
 * Playwright is NOT a project dependency — it is only needed to regenerate
 * these cards, and pulling it into every install of a marketing site is not
 * worth it. Run `npm i --no-save playwright` first if the import fails.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { chromium } from "playwright";

const OUT = path.join("client", "public", "tools");
fs.mkdirSync(OUT, { recursive: true });

// tools.ts is TypeScript with a "@" alias, so transpile rather than duplicate.
const bundlePath = path.join("dist", ".tools.mjs");
fs.mkdirSync("dist", { recursive: true });
await build({
  entryPoints: [path.join("client", "src", "data", "tools.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: bundlePath,
  logLevel: "error",
  alias: { "@": path.resolve("client", "src") },
});
const { TOOLS, TOOL_IDS } = await import(`${pathToFileURL(path.resolve(bundlePath)).href}?v=${Date.now()}`);

const NAVY = "#0A1E3F";
const CYAN = "#00E5FF";

const card = (title, tagline) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;800&family=Cairo:wght@500;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:${NAVY};color:#fff;
    font-family:'Plus Jakarta Sans','Cairo',sans-serif;overflow:hidden;position:relative}
  .glow{position:absolute;width:760px;height:760px;border-radius:50%;
    background:radial-gradient(circle,rgba(0,229,255,.20),transparent 62%);top:-270px;right:-190px}
  .grid{position:absolute;inset:0;opacity:.30;
    background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),
                     linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);
    background-size:52px 52px}
  .pad{position:relative;padding:72px 78px;height:100%;display:flex;flex-direction:column}
  .pill{display:inline-block;align-self:flex-start;border:1px solid ${CYAN}66;color:${CYAN};
    padding:9px 20px;border-radius:999px;font-size:19px;font-weight:800;letter-spacing:.10em;
    text-transform:uppercase}
  h1{font-size:64px;font-weight:800;line-height:1.1;letter-spacing:-.022em;margin-top:34px;max-width:1010px}
  p{font-size:27px;line-height:1.45;color:rgba(255,255,255,.72);margin-top:24px;max-width:930px}
  .foot{margin-top:auto;display:flex;align-items:center;gap:15px;font-size:24px;font-weight:800}
  .dot{width:13px;height:13px;border-radius:50%;background:${CYAN}}
  .muted{color:rgba(255,255,255,.55);font-weight:500}
</style></head><body>
  <div class="glow"></div><div class="grid"></div>
  <div class="pad">
    <span class="pill">Free tool</span>
    <h1>${title}</h1>
    <p>${tagline}</p>
    <div class="foot"><span class="dot"></span>Fox Systems<span class="muted">· foxsystemstech.com</span></div>
  </div>
</body></html>`;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

let n = 0;
for (const id of TOOL_IDS) {
  const tool = TOOLS[id];
  // English copy: these cards are shared into mixed-language feeds and the
  // Arabic page carries its own Arabic title in og:title regardless.
  await page.setContent(card(esc(tool.en.name), esc(tool.en.tagline)), { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT, `${id}-og.jpg`), type: "jpeg", quality: 88 });
  n++;
}

// The hub card, referenced by TOOLS_INDEX_SEO.
await page.setContent(
  card("Free Business Tools &amp; Calculators", "CRM cost, bandwidth, commission, payment plans, invoices, VAT and more."),
  { waitUntil: "networkidle" },
);
await page.screenshot({ path: path.join(OUT, "tools-og.jpg"), type: "jpeg", quality: 88 });

await browser.close();
console.log(`${n + 1} Open Graph cards written to ${OUT}`);
