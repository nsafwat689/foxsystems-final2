/**
 * Bakes per-route <title>, description, Open Graph, Twitter, canonical and
 * hreflang into real HTML files, so crawlers that do not run JavaScript get
 * the right metadata for the page they asked for.
 *
 * Without this, every URL served index.html's single generic title. Google
 * renders JS and would eventually see the real tags, but Facebook, WhatsApp
 * and LinkedIn scrapers do not render — so every shared link, whatever the
 * page, previewed as the homepage.
 *
 *   node scripts/prerender-meta.mjs        (run after `vite build`)
 *
 * Writes dist/public/<route>.html. Each of those paths needs an explicit
 * rewrite in vercel.json pointing at it — run scripts/sync-vercel-rewrites.mjs
 * after adding a route, or the new page silently keeps serving the generic
 * shell. Do NOT reach for "cleanUrls": true to avoid that: it does map clean
 * URLs to .html files, but it also stops the SPA catch-all from matching paths
 * with no file, which 404'd /industries, /case-studies and every article page
 * in production.
 *
 * React hydrates on top of these files and sets the same values again, so the
 * served HTML and the rendered page cannot disagree.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import { extractArticles } from "./lib/extract-articles.mjs";

const DIST = path.join("dist", "public");
const SHELL = path.join(DIST, "index.html");

if (!fs.existsSync(SHELL)) {
  console.error(`${SHELL} not found — run "vite build" first.`);
  process.exit(1);
}

// The route map is TypeScript with a "@" alias, so transpile it to something
// Node can import rather than duplicating the metadata in this script.
const bundlePath = path.join("dist", ".routeMeta.mjs");
await build({
  entryPoints: [path.join("client", "src", "data", "routeMeta.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: bundlePath,
  logLevel: "error",
  alias: { "@": path.resolve("client", "src") },
});

// pathToFileURL, because a bare Windows path ("C:\...") is not a valid ESM specifier.
const bundleUrl = `${pathToFileURL(path.resolve(bundlePath)).href}?v=${Date.now()}`;
const { buildRouteMeta } = await import(bundleUrl);
const routes = buildRouteMeta();

// Article pages keep their metadata inside ArticleDetail.tsx next to the body
// content, so it is read from there rather than duplicated into routeMeta.ts.
const { count: articleCount, articles } = extractArticles();
for (const a of articles) {
  const prefix = a.language === "ar" ? "/ar" : "";
  const route = `${prefix}/articles/${a.id}`;
  const branded = `${a.title} | Fox Systems`;
  routes[route] = {
    // Matches ArticleDetail's rule: only append the brand when it still fits
    // in the ~60 characters Google shows.
    title: branded.length <= 60 ? branded : a.title,
    description: a.subtitle,
    keywords: `${a.category}, Fox Systems, CRM Egypt, IT Egypt, ${a.title}`,
    ogTitle: a.title,
    ogDescription: a.subtitle,
    ogImage: a.image,
    canonicalUrl: `https://foxsystemstech.com${route}`,
    language: a.language,
    ogType: "article",
    publishedTime: a.date,
  };
}
console.log(`  (+${articleCount} articles x2 languages from ArticleDetail.tsx)\n`);

const shell = fs.readFileSync(SHELL, "utf8");

const esc = s =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Replace a meta tag's content, or append the tag if the shell lacks it. */
function setMeta(html, attr, name, content) {
  const re = new RegExp(`(<meta\\s+${attr}=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*content=["'])[^"']*(["'])`, "i");
  if (re.test(html)) return html.replace(re, `$1${esc(content)}$2`);
  return html.replace("</head>", `    <meta ${attr}="${name}" content="${esc(content)}" />\n  </head>`);
}

function hreflangFor(pathname) {
  const enPath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const en = `https://foxsystemstech.com${enPath}`;
  const ar = `https://foxsystemstech.com${enPath === "/" ? "/ar" : `/ar${enPath}`}`;
  return [
    `<link rel="alternate" hreflang="en" href="${en}" />`,
    `<link rel="alternate" hreflang="ar" href="${ar}" />`,
    `<link rel="alternate" hreflang="x-default" href="${en}" />`,
  ].join("\n    ");
}

let written = 0;
for (const [route, cfg] of Object.entries(routes)) {
  let html = shell;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(cfg.title)}</title>`);
  html = setMeta(html, "name", "description", cfg.description);
  html = setMeta(html, "name", "keywords", cfg.keywords);
  html = setMeta(html, "property", "og:title", cfg.ogTitle);
  html = setMeta(html, "property", "og:description", cfg.ogDescription);
  html = setMeta(html, "property", "og:image", cfg.ogImage);
  html = setMeta(html, "property", "og:url", cfg.canonicalUrl);
  html = setMeta(html, "property", "og:locale", cfg.language === "ar" ? "ar_EG" : "en_US");
  html = setMeta(html, "property", "og:type", cfg.ogType ?? "website");
  if (cfg.ogType === "article" && cfg.publishedTime) {
    html = setMeta(html, "property", "article:published_time", cfg.publishedTime);
  }
  html = setMeta(html, "name", "twitter:title", cfg.ogTitle);
  html = setMeta(html, "name", "twitter:description", cfg.ogDescription);
  html = setMeta(html, "name", "twitter:image", cfg.ogImage);

  // Canonical
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${cfg.canonicalUrl}" />`);
  } else {
    html = html.replace("</head>", `    <link rel="canonical" href="${cfg.canonicalUrl}" />\n  </head>`);
  }

  // Replace the shell's static hreflang pair with this route's.
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/gi, "");
  html = html.replace("</head>", `    ${hreflangFor(route)}\n  </head>`);

  // lang/dir so a non-rendering reader sees the right direction too.
  html = html.replace(/<html[^>]*>/i, `<html lang="${cfg.language}" dir="${cfg.language === "ar" ? "rtl" : "ltr"}">`);

  const out = route === "/" ? SHELL : path.join(DIST, `${route.replace(/^\//, "")}.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  written++;
  console.log(`  ${route.padEnd(34)} ${cfg.title.slice(0, 52)}`);
}

fs.rmSync(bundlePath, { force: true });
console.log(`\n${written} routes prerendered into ${DIST}`);
