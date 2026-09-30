/**
 * The lead store: every demo request, booking and contact enquiry, kept in one
 * place so the team can follow up from /admin/leads instead of an inbox.
 *
 * It lives in a private schema of a Supabase project and is reachable only
 * through three functions that check LEADS_DB_SECRET (by its SHA-256), so this
 * site never holds a database key with wider rights. Files starting with "_"
 * in api/ are not routes on Vercel.
 *
 * Env: LEADS_DB_URL (https://<ref>.supabase.co), LEADS_DB_ANON (public anon key),
 *      LEADS_DB_SECRET, LEADS_ADMIN_KEY (the /admin/leads password).
 */
export interface LeadRecord {
  source: "demo" | "booking" | "contact" | "outreach";
  product?: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  team_size?: string;
  language?: string;
  details?: Record<string, unknown>;
  demo_ends_at?: string | null;
  booking_at?: string | null;
}

const configured = () => Boolean(process.env.LEADS_DB_URL && process.env.LEADS_DB_ANON && process.env.LEADS_DB_SECRET);

export async function leadsRpc(fn: string, args: Record<string, unknown>, ms = 5000): Promise<{ ok: boolean; status: number; data: unknown }> {
  if (!configured()) return { ok: false, status: 503, data: null };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const anon = process.env.LEADS_DB_ANON!;
    const r = await fetch(`${process.env.LEADS_DB_URL!.replace(/\/+$/, "")}/rest/v1/rpc/${fn}`, {
      method: "POST",
      signal: controller.signal,
      headers: { apikey: anon, authorization: `Bearer ${anon}`, "content-type": "application/json" },
      body: JSON.stringify({ p_secret: process.env.LEADS_DB_SECRET, ...args }),
    });
    const text = await r.text();
    let data: unknown = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    return { ok: r.ok, status: r.status, data };
  } catch (e: any) {
    return { ok: false, status: 504, data: e?.name === "AbortError" ? "timeout" : e?.message };
  } finally {
    clearTimeout(timer);
  }
}

/** Best effort: a lead-store problem must never cost the visitor their form. */
export async function recordLead(lead: LeadRecord): Promise<boolean> {
  if (!configured()) return false;
  const r = await leadsRpc("fox_lead_add", { p_lead: lead }, 4000);
  if (!r.ok) console.error("[leads] not recorded:", r.status, typeof r.data === "string" ? r.data.slice(0, 200) : r.data);
  return r.ok;
}
