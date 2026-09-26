/**
 * Checks every URL in the live sitemap for the things that stop a page
 * earning a search impression.
 *
 *   node scripts/audit-seo.mjs                      (audits production)
 *   node scripts/audit-seo.mjs http://localhost:5173
 *
 * No dependencies — plain fetch, so it runs anywhere.
 *
 * This exists because of a bug it found on 2026-09-26: /industries,
 * /case-studies and /resources/it-guide kept their SEO config inside their
 * React component, so the prerenderer never emitted a file for them, so they
 * fell through to the SPA catch-all and served index.html — whose canonical
 * is the HOME PAGE. Six pages were quietly telling Google they were
 * duplicates of the homepage. React set the right canonical once it ran, so
 * nothing looked wrong in a browser; only the raw HTML gave it away.
 *
 * Run it after any routing change, and after adding a page.
 */
const ORIGIN = (process.argv[2] || "https://foxsystemstech.com").replace(/\/$/, "");
const GOOGLEBOT =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

/**
 * One transient ETIMEDOUT used to abort the whole run a hundred URLs in, so
 * every request retries briefly before it is believed.
 */
async function get(url, opts = {}) {
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await fetch(url, {
        headers: { "user-agent": GOOGLEBOT },
        signal: AbortSignal.timeout(20000),
        ...opts,
      });
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw lastErr;
}

const decodeEntities = s =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const res = await get(`${ORIGIN}/sitemap.xml`);
if (!res.ok) {
  console.error(`sitemap.xml returned ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (locs.length === 0) {
  console.error("no <loc> entries in sitemap.xml");
  process.exit(1);
}

const issues = [];
const seen = new Set();
for (const url of locs) {
  if (seen.has(url)) issues.push(`${url} → listed twice in the sitemap`);
  seen.add(url);
}

for (const url of locs) {
  let r;
  try {
    r = await get(url, { redirect: "manual" });
  } catch (err) {
    issues.push(`${url} → unreachable after retries: ${err.message}`);
    continue;
  }
  if (r.status !== 200) {
    issues.push(`${url} → HTTP ${r.status}${r.headers.get("location") ? ` → ${r.headers.get("location")}` : ""}`);
    continue;
  }

  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("text/html")) issues.push(`${url} → content-type ${ct}`);

  const xRobots = r.headers.get("x-robots-tag");
  if (xRobots && /noindex/i.test(xRobots)) issues.push(`${url} → X-Robots-Tag: ${xRobots}`);

  const html = await r.text();

  if (/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) issues.push(`${url} → meta robots noindex`);

  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  if (!canonical) issues.push(`${url} → no canonical`);
  else if (canonical !== url && canonical !== url.replace(/\/$/, "")) {
    issues.push(`${url} → canonical points elsewhere: ${canonical}`);
  }

  // Measure the DECODED title: "&amp;" is one character to Google and five
  // in the markup, which was reporting six pages as over-length when they
  // were comfortably inside the limit.
  const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "");
  if (!title) issues.push(`${url} → empty title`);
  else {
    if (/undefined|null/i.test(title)) issues.push(`${url} → title contains a placeholder: ${title}`);
    // Google truncates around 60 characters.
    if (title.length > 60) issues.push(`${url} → title ${title.length} chars: ${title}`);
  }

  const desc = decodeEntities(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1] || "");
  if (!desc) issues.push(`${url} → no meta description`);
  else if (desc.length > 160) issues.push(`${url} → description ${desc.length} chars`);

  const hreflangs = [...html.matchAll(/hreflang=["']([^"']+)["']/gi)].map(m => m[1]);
  if (!hreflangs.includes("en") || !hreflangs.includes("ar")) {
    issues.push(`${url} → hreflang incomplete (${hreflangs.join(",") || "none"})`);
  }

  const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i)?.[1];
  if (!ogImage) issues.push(`${url} → no og:image`);
  else {
    // A missing asset here does NOT 404 — the SPA rewrite answers with
    // index.html at 200 text/html, so a broken card looks fine until a
    // scraper asks for it.
    try {
      const img = await get(ogImage);
      const imgType = img.headers.get("content-type") || "";
      if (!imgType.startsWith("image/")) issues.push(`${url} → og:image serves ${imgType}: ${ogImage}`);
    } catch {
      issues.push(`${url} → og:image unreachable: ${ogImage}`);
    }
  }
}

console.log(`audited ${locs.length} sitemap URLs at ${ORIGIN} as Googlebot`);
if (issues.length === 0) {
  console.log("no indexability blockers found");
} else {
  console.log(`\n${issues.join("\n")}`);
}
console.log(`\n${issues.length} issue(s)`);
process.exit(issues.length === 0 ? 0 : 1);
