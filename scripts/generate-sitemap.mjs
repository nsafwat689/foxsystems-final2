/**
 * Builds client/public/sitemap.xml from the routes the app actually serves.
 *
 * The hand-maintained sitemap had drifted: five of the six service pages —
 * the highest commercial-intent URLs on the site — were missing, while
 * robots.txt explicitly allowed them. Generating it keeps the two in step.
 *
 *   node scripts/generate-sitemap.mjs
 *
 * Every entry is emitted twice, once per language, with reciprocal hreflang
 * alternates. /about is deliberately excluded: it renders the home page, so
 * listing it would be duplicate content.
 */
import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://foxsystemstech.com";
const OUT = path.join("client", "public", "sitemap.xml");
const ARTICLES_SRC = path.join("client", "src", "pages", "ArticleDetail.tsx");
const STORIES_SRC = path.join("client", "src", "data", "productStories.ts");

const SOLUTIONS = ["medical-crm", "real-estate-crm", "pest-control-crm", "hr-crm", "finance-crm"];
// Keep in step with COMPARISON_IDS in client/src/data/comparisonIds.ts.
const COMPARISONS = ["real-estate-crm", "pharma-crm", "pest-control-software", "hr-payroll-software", "finance-lending-software"];
// Keep in step with SERVICE_IDS in client/src/App.tsx. "software" was renamed
// to "crm" on 2026-09-24; leaving it here would have kept a redirecting URL in
// the sitemap, which wastes crawl budget and is flagged in Search Console.
const SERVICES = ["internet", "crm", "hardware", "cybersecurity", "infrastructure", "web-development"];
// Keep in step with TOOL_IDS in client/src/data/toolIds.ts.
const TOOLS = ["crm-cost-calculator", "bandwidth-calculator", "commission-calculator", "installment-plan-generator", "invoice-generator", "vat-calculator", "end-of-service-calculator", "security-self-check", "pest-control-job-costing", "field-force-roi"];

/** Read the article ids straight from the content map so the two can't diverge. */
function readArticleIds() {
  const source = fs.readFileSync(ARTICLES_SRC, "utf8");
  const ids = [...source.matchAll(/^ {2}"([a-z0-9-]+)":\s*\{/gm)].map(m => m[1]);
  if (ids.length === 0) throw new Error(`No article ids found in ${ARTICLES_SRC}`);
  return ids;
}

/** Client stories: uncommented `id:` lines of the PRODUCT_STORIES list (may be none). */
function readStoryIds() {
  const source = fs.readFileSync(STORIES_SRC, "utf8");
  return [...source.matchAll(/^ {4}id: "([a-z0-9-]+)",/gm)].map(m => m[1]);
}

// Product tour videos on the solution pages (video sitemap tags help them appear in video results).
// Keep in step with the video field in client/src/data/solutions.ts; seconds are the real file lengths.
const VIDEOS = {
  "medical-crm": { base: "fox-medical-tour", v: 2, secs: { en: 170, ar: 174 }, name: { en: "Fox Medical CRM", ar: "فوكس للمبيعات الطبية" } },
  "real-estate-crm": { base: "fox-realestate-tour", v: 2, secs: { en: 150, ar: 144 }, name: { en: "Fox Real Estate CRM", ar: "فوكس لإدارة العقارات" } },
  "pest-control-crm": { base: "fox-pestcontrol-tour", v: 2, secs: { en: 157, ar: 145 }, name: { en: "Fox Pest Control CRM", ar: "فوكس لإدارة مكافحة الآفات" } },
  "hr-crm": { base: "fox-hr-tour", v: 2, secs: { en: 173, ar: 162 }, name: { en: "Fox HR", ar: "فوكس للموارد البشرية" } },
  "finance-crm": { base: "fox-finance-tour", v: 1, secs: { en: 145, ar: 116 }, name: { en: "Fox Finance", ar: "فوكس للتمويل" } },
};
const xmlEsc = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function videoTag(route, lang) {
  const id = route.path.startsWith("/solutions/") ? route.path.slice(11) : null, v = id && VIDEOS[id];
  if (!v) return "";
  const ar = lang === "ar", file = `${ORIGIN}/videos/${v.base}-${lang}`;
  const title = ar ? `جولة بالفيديو في ${v.name.ar}` : `Video tour: ${v.name.en}`;
  const desc = ar ? `جولة على النظام الحقيقي في ${v.name.ar}، شاشةً بعد شاشة، مع شرح مكتوب لكل خطوة.`
    : `A tour of the real ${v.name.en} system, screen by screen, with a written explanation of every step.`;
  return `
    <video:video>
      <video:thumbnail_loc>${file}.jpg?v=${v.v}</video:thumbnail_loc>
      <video:title>${xmlEsc(title)}</video:title>
      <video:description>${xmlEsc(desc)}</video:description>
      <video:content_loc>${file}.mp4?v=${v.v}</video:content_loc>
      <video:duration>${v.secs[lang]}</video:duration>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`;
}

function buildRoutes() {
  const articles = readArticleIds();
  return [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "/services", changefreq: "weekly", priority: "0.9" },
    ...SERVICES.map(s => ({ path: `/services/${s}`, changefreq: "monthly", priority: "0.9" })),
    { path: "/solutions", changefreq: "monthly", priority: "0.9" },
    ...SOLUTIONS.map(s => ({ path: `/solutions/${s}`, changefreq: "monthly", priority: "0.9" })),
    { path: "/pricing", changefreq: "monthly", priority: "0.9" },
    ...COMPARISONS.map(s => ({ path: `/compare/${s}`, changefreq: "monthly", priority: "0.8" })),
    { path: "/book", changefreq: "monthly", priority: "0.8" },
    { path: "/tools", changefreq: "monthly", priority: "0.8" },
    ...TOOLS.map(s => ({ path: `/tools/${s}`, changefreq: "monthly", priority: "0.8" })),
    { path: "/industries", changefreq: "monthly", priority: "0.8" },
    { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
    ...readStoryIds().map(id => ({ path: `/case-studies/${id}`, changefreq: "monthly", priority: "0.8" })),
    { path: "/resources/it-guide", changefreq: "monthly", priority: "0.7" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/articles", changefreq: "weekly", priority: "0.7" },
    ...articles.map(id => ({ path: `/articles/${id}`, changefreq: "monthly", priority: "0.6" })),
  ];
}

const enUrl = p => `${ORIGIN}${p === "" ? "/" : p}`;
const arUrl = p => `${ORIGIN}/ar${p}`;

function entry(loc, route, lastmod, lang = "en") {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl(route.path)}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl(route.path)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl(route.path)}" />${videoTag(route, lang)}
  </url>`;
}

const routes = buildRoutes();
const lastmod = new Date().toISOString().slice(0, 10);

const body = routes
  .flatMap(route => [entry(enUrl(route.path), route, lastmod), entry(arUrl(route.path), route, lastmod, "ar")])
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/generate-sitemap.mjs — do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${body}
</urlset>
`;

fs.writeFileSync(OUT, xml);
console.log(`${routes.length * 2} URLs written to ${OUT}`);
