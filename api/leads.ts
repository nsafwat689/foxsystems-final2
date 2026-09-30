/**
 * /api/leads — the follow-up list behind /admin/leads.
 *   GET   ?days=120            → the leads
 *   PATCH { id, status, notes, next_action_at } → update one
 *   POST  { name, company, phone, email, product, language, notes } → add a
 *         prospect the team is contacting (source "outreach", follow up now)
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

const prospectSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(40).optional(),
  email: z.union([z.string().trim().email().max(200), z.literal("")]).optional(),
  product: z.enum(["real-estate-crm", "medical-crm", "pest-control-crm", "hr-crm", "finance-crm", "it-services"]),
  language: z.enum(["en", "ar"]).default("en"),
  notes: z.string().max(4000).optional(),
});

const readBody = (req: any): unknown => typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});

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

  if (req.method === "POST") {
    let body: unknown;
    try { body = readBody(req); } catch { return res.status(400).json({ ok: false, code: "invalid" }); }
    const p = prospectSchema.safeParse(body);
    if (!p.success) return res.status(400).json({ ok: false, code: "invalid" });
    const { notes, ...lead } = p.data;
    const r = await leadsRpc("fox_lead_add", { p_lead: { source: "outreach", ...lead, details: { added_by: "team" } } });
    if (!r.ok) return res.status(502).json({ ok: false, code: "store_unavailable" });
    const id = Number(r.data);
    // fox_lead_add has no notes field; the first follow-up is due now.
    if (notes?.trim() && id) await leadsRpc("fox_lead_update", { p_id: id, p_status: null, p_notes: notes.trim(), p_next_action_at: new Date().toISOString() });
    return res.status(200).json({ ok: true, id });
  }

  res.setHeader("Allow", "GET, PATCH, POST");
  return res.status(405).json({ ok: false, code: "method_not_allowed" });
}
