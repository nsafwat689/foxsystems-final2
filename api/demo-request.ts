/**
 * "Try the live demo" endpoint.
 *
 * The visitor leaves a name and phone; we ask that product's demo instance for
 * a personal demo account and hand the browser a one-time sign-in URL. The same
 * details are emailed to LEAD_INBOX, so every demo is also a lead to follow up.
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   DEMO_SIGNUP_SECRET               real estate CRM: `select value from demo_config
 *                                    where key = 'signup_secret'` (Supabase epbsqguiexvnbbquihzi)
 *   DEMO_SIGNUP_SECRET_PEST_CONTROL  pest control demo: `select value from demo_ops.config
 *                                    where key = 'signup_secret'` (Supabase kopseksbjsajsixuswqp)
 *   DEMO_CRM_URL, DEMO_PEST_URL      optional overrides of the endpoints below
 *   BREVO_API_KEY, LEAD_INBOX, LEAD_FROM   as for /api/contact
 *
 * Without the product's secret the endpoint answers 503 { code: "not_configured" }
 * and the form hands the visitor to WhatsApp instead.
 */
import { z } from "zod";

export const config = { runtime: "nodejs" };

const PRODUCTS = {
  "real-estate-crm": {
    label: "Real Estate CRM",
    secretEnv: "DEMO_SIGNUP_SECRET",
    endpoint: () =>
      `${(process.env.DEMO_CRM_URL || "https://fox-realestate-crm-omega.vercel.app").replace(/\/+$/, "")}/api/public/demo-signup`,
  },
  "pest-control-crm": {
    label: "Pest Control CRM",
    secretEnv: "DEMO_SIGNUP_SECRET_PEST_CONTROL",
    endpoint: () =>
      process.env.DEMO_PEST_URL || "https://kopseksbjsajsixuswqp.supabase.co/functions/v1/api/demo/signup",
  },
} as const;

const demoSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(v => v.replace(/\D/g, "").length >= 7, "phone"),
  email: z.union([z.string().trim().email().max(200), z.literal("")]).optional().default(""),
  company: z.string().trim().max(200).optional().default(""),
  teamSize: z.string().trim().max(40).optional().default(""),
  product: z.enum(["real-estate-crm", "pest-control-crm"]).optional().default("real-estate-crm"),
  language: z.enum(["en", "ar"]).optional().default("en"),
  // Honeypot, handled as in /api/contact: accepted, then quietly discarded.
  website: z.string().max(500).optional().default(""),
});

type DemoRequest = z.infer<typeof demoSchema>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

function clientIp(req: any): string {
  const forwarded = String(req.headers?.["x-forwarded-for"] ?? "").split(",")[0].trim();
  return forwarded || String(req.headers?.["x-real-ip"] ?? "") || "unknown";
}

async function withTimeout<T>(ms: number, run: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await run(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

/** Best effort: a mail failure must not cost the visitor their demo. */
async function emailLead(demo: DemoRequest, accountCreated: boolean) {
  const apiKey = process.env.BREVO_API_KEY;
  const inbox = process.env.LEAD_INBOX;
  const from = process.env.LEAD_FROM;
  if (!apiKey || !inbox || !from) {
    console.error("[demo-request] mail not configured — demo lead not emailed:", demo.phone);
    return;
  }

  const rows: Array<[string, string]> = [
    ["Name", demo.name],
    ["Phone / WhatsApp", demo.phone],
    ["Email", demo.email],
    ["Company", demo.company],
    ["Team size", demo.teamSize],
    ["Product", PRODUCTS[demo.product].label],
    ["Language", demo.language === "ar" ? "Arabic" : "English"],
    ["Demo account", accountCreated ? "Created — they are in the demo now" : "NOT created — follow up manually"],
  ].filter(([, value]) => value !== "") as Array<[string, string]>;

  const html = `<h2>${accountCreated ? "Someone is trying the live demo" : "Live demo request (account not created)"}</h2>
<p style="font:14px system-ui,sans-serif">Message them while they are still in it — the demo account lasts 7 days.</p>
<table cellpadding="6" style="border-collapse:collapse;font:14px system-ui,sans-serif">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="border:1px solid #e2e8f0"><strong>${escapeHtml(label)}</strong></td><td style="border:1px solid #e2e8f0">${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>`;

  try {
    const response = await withTimeout(8000, signal =>
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        signal,
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { email: from, name: "Fox Systems Website" },
          to: [{ email: inbox }],
          ...(demo.email ? { replyTo: { email: demo.email, name: demo.name } } : {}),
          subject: `Live demo (${PRODUCTS[demo.product].label}) — ${demo.name}${demo.company ? ` (${demo.company})` : ""}`,
          htmlContent: html,
        }),
      })
    );
    if (!response.ok) {
      console.error("[demo-request] Brevo rejected the message:", response.status, await response.text().catch(() => ""));
    }
  } catch (error: any) {
    console.error("[demo-request] Failed to email demo lead:", error?.name === "AbortError" ? "timeout" : error?.message);
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, code: "method_not_allowed" });
  }

  let body: unknown;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  } catch {
    return res.status(400).json({ ok: false, code: "invalid" });
  }

  const parsed = demoSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      code: "invalid",
      issues: parsed.error.issues.map(i => ({ path: i.path.join("."), message: i.message })),
    });
  }

  const demo = parsed.data;
  if (demo.website) return res.status(200).json({ ok: true, url: null });

  const product = PRODUCTS[demo.product];
  const secret = process.env[product.secretEnv];
  if (!secret) {
    console.error(`[demo-request] ${product.secretEnv} is not set — no demo account created for`, demo.phone);
    await emailLead(demo, false);
    return res.status(503).json({ ok: false, code: "not_configured" });
  }

  let url: string | null = null;
  let code = "unavailable";
  try {
    const response = await withTimeout(15000, signal =>
      fetch(product.endpoint(), {
        method: "POST",
        signal,
        headers: { "content-type": "application/json", "x-demo-secret": secret },
        body: JSON.stringify({
          name: demo.name,
          phone: demo.phone,
          email: demo.email,
          company: demo.company,
          teamSize: demo.teamSize,
          language: demo.language,
          source: "foxsystemstech.com",
          ip: clientIp(req),
        }),
      })
    );
    if (response.ok) {
      url = ((await response.json()) as { url?: string }).url ?? null;
    } else {
      code = response.status === 429 ? "rate_limited" : "unavailable";
      console.error("[demo-request] CRM refused the signup:", response.status, await response.text().catch(() => ""));
    }
  } catch (error: any) {
    console.error("[demo-request] CRM unreachable:", error?.name === "AbortError" ? "timeout" : error?.message);
  }

  await emailLead(demo, Boolean(url));

  if (!url) return res.status(code === "rate_limited" ? 429 : 502).json({ ok: false, code });
  return res.status(200).json({ ok: true, url });
}
