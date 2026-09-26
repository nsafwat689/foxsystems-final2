/**
 * Finds tall empty bands down one side of a page, and horizontal overflow.
 *
 *   node scripts/audit-layout.mjs /services/crm /ar/services/crm
 *   node scripts/audit-layout.mjs --all          (every sitemap URL)
 *
 * Playwright is NOT a project dependency — run `npm i --no-save playwright`
 * first. Same arrangement as scripts/build-tool-og.mjs.
 *
 * Two things this gets right that naive versions do not, both learned the
 * hard way on 2026-09-25:
 *
 *  1. It measures what is painted PER VIEWPORT, scrolling down the page.
 *     Measuring element rects once at scroll 0 makes a `position: sticky`
 *     element look like a void when it is not one.
 *
 *  2. It ignores `document.documentElement.scrollWidth` for overflow and
 *     instead tries to scroll the window sideways. scrollWidth over-reports
 *     through a clipped `overflow-x: auto` container, which sent me chasing
 *     a 293px "overflow" that no user could ever see.
 *
 * Validate any change to this against a page you know is broken. Two earlier
 * versions of this detector cheerfully reported "all clean" on a page with a
 * 2,352px hole in it.
 */
import { chromium } from "playwright";

const ORIGIN = "https://foxsystemstech.com";
const args = process.argv.slice(2);

/**
 * Git Bash rewrites a leading-slash argument into a Windows path, so
 * "/services/crm" arrives as "C:/Program Files/Git/services/crm". Recover the
 * intended path rather than making every caller remember MSYS_NO_PATHCONV=1.
 */
const normalise = a => {
  if (a.startsWith("http")) return new URL(a).pathname;
  const mangled = a.match(/Git(\/.*)$/i);
  if (mangled) return mangled[1];
  return a.startsWith("/") ? a : `/${a}`;
};

let paths = args.filter(a => !a.startsWith("--")).map(normalise);
if (args.includes("--all")) {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
}
if (paths.length === 0) {
  console.error("usage: node scripts/audit-layout.mjs <path>... | --all");
  process.exit(1);
}

/** Runs in the page: what is painted in the CURRENT viewport, by band. */
const MEASURE = () => {
  const W = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const bandH = 48;
  const n = Math.ceil(vh / bandH);
  const minX = new Array(n).fill(null);
  const maxX = new Array(n).fill(null);

  const parentBg = el => {
    let p = el.parentElement;
    while (p) {
      const c = getComputedStyle(p).backgroundColor;
      if (c && c !== "rgba(0, 0, 0, 0)") return c;
      p = p.parentElement;
    }
    return "rgb(255, 255, 255)";
  };

  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") continue;
    const r = el.getBoundingClientRect();
    if (r.width < 6 || r.height < 6) continue;
    if (r.bottom < 0 || r.top > vh) continue;
    // Anything near full width is a layout container or a section background,
    // not content, and counting it hides every void inside it.
    if (r.width > W * 0.92) continue;

    const isMedia = el.matches("img, svg, video, canvas, input, select, textarea, button");
    const hasText = [...el.childNodes].some(x => x.nodeType === 3 && x.textContent.trim());
    const bg = cs.backgroundColor;
    const isCard = bg && bg !== "rgba(0, 0, 0, 0)" && bg !== parentBg(el);
    if (!isMedia && !hasText && !isCard) continue;

    for (let b = Math.max(0, Math.floor(r.top / bandH)); b <= Math.min(n - 1, Math.floor(r.bottom / bandH)); b++) {
      minX[b] = minX[b] === null ? r.left : Math.min(minX[b], r.left);
      maxX[b] = maxX[b] === null ? r.right : Math.max(maxX[b], r.right);
    }
  }
  return { W, bandH, minX, maxX, scrollY: window.scrollY };
};

const browser = await chromium.launch();
let failures = 0;

for (const path of paths) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  // Trigger whileInView animations before measuring, or half the page is invisible.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 40));
    }
  });

  const H = await page.evaluate(() => document.body.scrollHeight);
  const best = new Map();
  for (let top = 0; top < H; top += 450) {
    await page.evaluate(y => window.scrollTo(0, y), top);
    await page.waitForTimeout(80);
    const m = await page.evaluate(MEASURE);
    for (let b = 0; b < m.minX.length; b++) {
      const y = m.scrollY + b * m.bandH;
      if (y >= H) continue;
      const k = Math.floor(y / m.bandH);
      const span = m.maxX[b] !== null ? m.maxX[b] - m.minX[b] : -1;
      const prev = best.get(k);
      const prevSpan = prev && prev.maxX !== null ? prev.maxX - prev.minX : -1;
      if (!prev || span > prevSpan) best.set(k, { y, minX: m.minX[b], maxX: m.maxX[b] });
    }
  }

  const W = 1440;
  const runs = [];
  let cur = null;
  for (const b of [...best.entries()].sort((a, c) => a[0] - c[0]).map(e => e[1])) {
    if (b.minX === null) {
      if (cur) { runs.push(cur); cur = null; }
      continue;
    }
    const side = b.minX > W * 0.28 ? "LEFT" : b.maxX < W * 0.72 ? "RIGHT" : null;
    if (side) {
      if (cur && cur.side === side) cur.to = b.y;
      else { if (cur) runs.push(cur); cur = { side, from: b.y, to: b.y }; }
    } else if (cur) { runs.push(cur); cur = null; }
  }
  if (cur) runs.push(cur);
  const voids = runs.filter(r => r.to - r.from >= 600);

  // Real overflow means the window can actually pan, not that scrollWidth says so.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle" });
  await mobile.waitForTimeout(600);
  const pans = await mobile.evaluate(() => {
    window.scrollTo(400, 0);
    const x = window.scrollX;
    window.scrollTo(0, 0);
    return x;
  });
  await mobile.close();

  const problems = [
    ...voids.map(v => `${v.side} void ${v.to - v.from}px (y${v.from}-${v.to})`),
    ...(pans !== 0 ? [`pans sideways ${pans}px at 390px wide`] : []),
  ];
  if (problems.length) failures++;
  console.log(`${path.padEnd(38)} h=${H}  ${problems.length ? problems.join(" | ") : "clean"}`);
  await page.close();
}

await browser.close();
console.log(`\n${failures} page(s) with problems`);
process.exit(failures === 0 ? 0 : 1);
