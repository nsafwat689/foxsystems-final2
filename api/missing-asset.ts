/**
 * 404 for /assets/* files that do not exist, sent with no-store.
 *
 * Without this, Vercel's own 404 picked up the immutable one-year Cache-Control
 * of the /assets header rule, and Cloudflare kept it: a chunk requested a moment
 * before a deploy went live stayed broken for every visitor (2026-09-29).
 * Existing files are served from the filesystem first and never reach here.
 */
export default function handler(_req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Cloudflare-CDN-Cache-Control", "no-store");
  res.status(404).send("Not found");
}
