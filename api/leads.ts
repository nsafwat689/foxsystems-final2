/**
 * /api/leads — the follow-up list behind /admin/leads.
 *   GET   ?days=120            → the leads
 *   PATCH { id, status, notes, next_action_at } → update one
 * Authorization: Bearer <LEADS_ADMIN_KEY>. Not linked anywhere public.
 */
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { leadsRpc } from "./_leads.js";

export const config = { runtime: "nodejs" };

export function authorised(header: unknown): boolean {
  const key = process.env.LEADS_ADMIN_KEY;
  const given = String(header ?? "").replace(/^Bearer\s+/i, "");
  if (!key || key.length < 16 || !given) return false;
  const a = Buffer.from(key), b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

const patchSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["new", "contacted", "meeting", "proposal", "won", "lost"]).optional(),
  notes: z.string().max(4000).optional(),
  next_action_at: z.string().datetime({ offset: true }).nullable().optional(),
});

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  if (!authorised(req.headers?.authorization)) {
    // Slow down guessing a little; the key itself is long and random.
    await new Promise(r => setTimeout(r, 400));
    return res.status(401).json({ ok: false, code: "unauthorised" });
  }

  if (req.method === "GET") {
    const days = Math.min(730, Math.max(1, Number(req.query?.days) || 120));
    const r = await leadsRpc("fox_leads_list", { p_days: days });
    if (!r.ok) return res.status(502).json({ ok: false, code: "store_unavailable" });
    return res.status(200).json({ ok: true, leads: r.data });
  }

  if (req.method === "PATCH") {
    let body: unknown;
    try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {}); }
    catch { return res.status(400).json({ ok: false, code: "invalid" }); }
    const p = patchSchema.safeParse(body);
    if (!p.success) return res.status(400).json({ ok: false, code: "invalid" });
    const r = await leadsRpc("fox_lead_update", {
      p_id: p.data.id, p_status: p.data.status ?? null, p_notes: p.data.notes ?? null, p_next_action_at: p.data.next_action_at ?? null,
    });
    if (!r.ok) return res.status(r.status === 404 ? 404 : 502).json({ ok: false, code: "update_failed" });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, PATCH");
  return res.status(405).json({ ok: false, code: "method_not_allowed" });
}
