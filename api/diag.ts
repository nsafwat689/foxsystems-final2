/**
 * TEMPORARY diagnostic for the lead-capture failure. Delete once resolved.
 *
 * A valid lead returns a plain-text 502 from the edge while every path that
 * does not call Brevo answers correctly, and Brevo's own event log shows the
 * function never reached it. That means the process is dying rather than
 * throwing, so nothing reaches the handler's catch and nothing is logged.
 *
 * This reports what the function can actually see and do, without sending
 * mail. Gated on a token so it is not a public information leak.
 */
export const config = { runtime: "nodejs" };

const TOKEN = "fox-diag-2026";

export default async function handler(req: any, res: any) {
  if ((req.query?.token ?? "") !== TOKEN) {
    return res.status(404).json({ ok: false });
  }

  const key = process.env.BREVO_API_KEY ?? "";
  const out: Record<string, unknown> = {
    node: process.version,
    hasFetch: typeof fetch === "function",
    hasAbortController: typeof AbortController === "function",
    env: {
      BREVO_API_KEY_present: Boolean(key),
      BREVO_API_KEY_length: key.length,
      // Whitespace in a header value makes fetch throw before any request.
      BREVO_API_KEY_hasWhitespace: /\s/.test(key),
      BREVO_API_KEY_prefix: key.slice(0, 8),
      LEAD_INBOX: process.env.LEAD_INBOX ?? null,
      LEAD_FROM: process.env.LEAD_FROM ?? null,
    },
  };

  // Can this function reach the public internet at all?
  for (const [label, url] of [
    ["example", "https://example.com"],
    ["brevoAccount", "https://api.brevo.com/v3/account"],
  ] as const) {
    const started = Date.now();
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 6000);
    try {
      const r = await fetch(url, {
        signal: controller.signal,
        headers: label === "brevoAccount" ? { "api-key": key, accept: "application/json" } : {},
      });
      const body = await r.text().catch(() => "");
      out[label] = { status: r.status, ms: Date.now() - started, body: body.slice(0, 180) };
    } catch (err: any) {
      out[label] = { error: err?.name ?? "Error", message: String(err?.message).slice(0, 200), ms: Date.now() - started };
    } finally {
      clearTimeout(t);
    }
  }

  return res.status(200).json(out);
}
