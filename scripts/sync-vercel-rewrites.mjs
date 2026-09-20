/**
 * Regenerates vercel.json's rewrites so each prerendered route maps to its own
 * .html file, with the SPA catch-all last.
 *
 *   node scripts/sync-vercel-rewrites.mjs     (run after changing routeMeta.ts)
 *
 * Why not "cleanUrls": true — it does map /solutions/medical-crm to
 * solutions/medical-crm.html, but it also stops the SPA catch-all from
 * matching paths that have no file, which 404'd /industries, /case-studies,
 * /resources/it-guide and every article page in production. Explicit rewrites
 * only affect the routes named here; everything else still falls through to
 * the catch-all exactly as before.
 *
 * vercel.json is read before the build runs, so this cannot be generated
 * during the build — the output is committed.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const CONFIG = "vercel.json";
const SPA_FALLBACK = { source: "/((?!api/|assets/).*)", destination: "/index.html" };

const bundlePath = path.join("dist", ".routeMeta.sync.mjs");
fs.mkdirSync("dist", { recursive: true });
await build({
  entryPoints: [path.join("client", "src", "data", "routeMeta.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: bundlePath,
  logLevel: "error",
  alias: { "@": path.resolve("client", "src") },
});

const { buildRouteMeta } = await import(`${pathToFileURL(path.resolve(bundlePath)).href}?v=${Date.now()}`);
fs.rmSync(bundlePath, { force: true });

const routes = Object.keys(buildRouteMeta())
  .filter(r => r !== "/") // "/" is index.html already
  .sort();

const config = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
config.rewrites = [
  ...routes.map(r => ({ source: r, destination: `${r}.html` })),
  SPA_FALLBACK,
];
fs.writeFileSync(CONFIG, `${JSON.stringify(config, null, 2)}\n`);

console.log(`${routes.length} route rewrites + SPA fallback written to ${CONFIG}`);
for (const r of routes) console.log(`  ${r}`);
