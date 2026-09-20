/**
 * Lead capture endpoint.
 *
 * Both the contact form and the IT-guide form post here. Every field the
 * visitor filled in is emailed to LEAD_INBOX so nothing is lost.
 *
 * Required environment variables (set in Vercel → Settings → Environment Variables):
 *   BREVO_API_KEY   API key from brevo.com (SMTP & API → API keys)
 *   LEAD_INBOX      where leads are delivered, e.g. support@foxsystemstech.com
 *   LEAD_FROM       sender on the authenticated domain, e.g. website@foxsystemstech.com
 *
 * Brevo is the provider because foxsystemstech.com is already authenticated for
 * it — SPF (include:spf.brevo.com), both DKIM keys (brevo1/brevo2._domainkey)
 * and a Brevo-managed DMARC at p=quarantine. LEAD_FROM must stay on that domain
 * or DMARC will quarantine the lead mail.
 *
 * Until those are set the endpoint answers 503 with { code: "not_configured" },
 * which the forms treat as "hand the visitor to WhatsApp" rather than pretending
 * the message was sent.
 */
import { z } from "zod";

export const config = { runtime: "nodejs" };

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(60).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  companySize: z.string().trim().max(60).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  timeline: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
  language: z.enum(["en", "ar"]).optional().default("en"),
  source: z.enum(["contact", "it-guide"]).optional().default("contact"),
  // Honeypot: real people never see this field, bots fill everything in.
  // Accepted by the schema on purpose — rejecting it here would answer 400 and
  // tell the bot it was spotted. The handler discards it with a quiet 200.
  website: z.string().max(500).optional().default(""),
});

type Lead = z.infer<typeof leadSchema>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

function renderLead(lead: Lead): string {
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone / WhatsApp", lead.phone],
    ["Service", lead.service],
    ["Company size", lead.companySize],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Language", lead.language === "ar" ? "Arabic" : "English"],
    ["Source", lead.source === "it-guide" ? "IT Readiness Guide" : "Contact form"],
  ].filter(([, value]) => value !== "");

  return `<h2>New website enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse;font:14px system-ui,sans-serif">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="border:1px solid #e2e8f0"><strong>${escapeHtml(label)}</strong></td><td style="border:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>
${lead.message ? `<h3>Message</h3><p style="white-space:pre-wrap;font:14px system-ui,sans-serif">${escapeHtml(lead.message)}</p>` : ""}`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, code: "method_not_allowed" });
  }

  const parsed = leadSchema.safeParse(
    typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {})
  );

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      code: "invalid",
      issues: parsed.error.issues.map(i => ({ path: i.path.join("."), message: i.message })),
    });
  }

  const lead = parsed.data;

  // Honeypot tripped — accept silently so the bot doesn't learn anything.
  if (lead.website) return res.status(200).json({ ok: true });

  const apiKey = process.env.BREVO_API_KEY;
  const inbox = process.env.LEAD_INBOX;
  const from = process.env.LEAD_FROM;

  if (!apiKey || !inbox || !from) {
    console.error("[contact] BREVO_API_KEY, LEAD_INBOX or LEAD_FROM is not set — lead not delivered:", lead.email);
    return res.status(503).json({ ok: false, code: "not_configured" });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: from, name: "Fox Systems Website" },
        to: [{ email: inbox }],
        // The visitor's own address, so hitting Reply in the inbox answers them.
        replyTo: { email: lead.email, name: lead.name },
        subject: `Website enquiry — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
        htmlContent: renderLead(lead),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => response.statusText);
      console.error("[contact] Brevo rejected the message:", response.status, detail);
      return res.status(502).json({ ok: false, code: "delivery_failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to deliver lead:", error);
    return res.status(502).json({ ok: false, code: "delivery_failed" });
  }
}
