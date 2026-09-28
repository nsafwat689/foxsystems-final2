/**
 * POST /api/book — a walkthrough booking request from /book.
 *
 * No calendar database: the slot is a REQUEST. The team gets an email with the
 * details and a calendar file; the visitor gets a copy with the same file,
 * marked "to be confirmed". The team confirms on WhatsApp or email, which is
 * how these calls are arranged today anyway.
 *
 * Env: BREVO_API_KEY, LEAD_INBOX, LEAD_FROM (as for /api/contact).
 */
import { z } from "zod";
import { isBookableSlot, SESSION_MINUTES, BOOKING_TZ } from "../client/src/lib/bookingSlots";

export const config = { runtime: "nodejs" };

const PRODUCTS = {
  "medical-crm": { en: "Medical CRM", ar: "فوكس للمبيعات الطبية" },
  "real-estate-crm": { en: "Real Estate CRM", ar: "فوكس لإدارة العقارات" },
  "pest-control-crm": { en: "Pest Control CRM", ar: "فوكس لإدارة مكافحة الآفات" },
  "hr-crm": { en: "HR & Payroll", ar: "فوكس للموارد البشرية" },
  "it-services": { en: "IT services / custom system", ar: "خدمات تقنية المعلومات أو نظام مخصص" },
} as const;

export const bookSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).refine(v => v.replace(/\D/g, "").length >= 7, "phone"),
  company: z.string().trim().max(200).optional().default(""),
  product: z.enum(Object.keys(PRODUCTS) as [keyof typeof PRODUCTS, ...Array<keyof typeof PRODUCTS>]).optional().default("it-services"),
  slot: z.string().max(40),
  notes: z.string().trim().max(1000).optional().default(""),
  timezone: z.string().max(60).optional().default(""),
  language: z.enum(["en", "ar"]).optional().default("en"),
  website: z.string().max(500).optional().default(""), // honeypot
});
export type Booking = z.infer<typeof bookSchema>;

const esc = (v: string) => v.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
// RFC 5545 text: escape backslash, semicolon, comma; fold newlines.
const icsText = (v: string) => v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
const icsTime = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** A calendar file for the session. UTC times, so every calendar app agrees. */
export function buildIcs(b: Booking, now = Date.now()): string {
  const start = Date.parse(b.slot);
  const product = PRODUCTS[b.product];
  const title = b.language === "ar" ? `عرض عملي من فوكس سيستمز: ${product.ar} (بانتظار التأكيد)` : `Fox Systems walkthrough: ${product.en} (to be confirmed)`;
  const desc = b.language === "ar"
    ? "طلب حجز عرض عملي عبر الإنترنت. سيؤكد فريق فوكس سيستمز الموعد ويرسل رابط الاجتماع."
    : "Online walkthrough request. The Fox Systems team will confirm the time and send the meeting link.";
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Fox Systems//Booking//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start}-${Math.abs(hash(b.email))}@foxsystemstech.com`,
    `DTSTAMP:${icsTime(now)}`,
    `DTSTART:${icsTime(start)}`,
    `DTEND:${icsTime(start + SESSION_MINUTES * 60_000)}`,
    `SUMMARY:${icsText(title)}`,
    `DESCRIPTION:${icsText(desc)}`,
    "LOCATION:Online",
    "STATUS:TENTATIVE",
    "END:VEVENT", "END:VCALENDAR", "",
  ].join("\r\n");
}
function hash(s: string) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }

/** "Sunday 5 October, 11:00 Cairo time" in the booking's language. */
export function slotLabel(iso: string, language: "en" | "ar", timeZone = BOOKING_TZ): string {
  const s = new Date(iso).toLocaleString(language === "ar" ? "ar-EG-u-nu-latn" : "en-GB", {
    timeZone, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  });
  return timeZone === BOOKING_TZ ? `${s} ${language === "ar" ? "بتوقيت القاهرة" : "Cairo time"}` : s;
}

async function send(apiKey: string, payload: unknown): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST", signal: controller.signal,
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error("[book] Brevo rejected:", r.status, await r.text().catch(() => ""));
    return r.ok;
  } catch (e: any) {
    console.error("[book] mail failed:", e?.name === "AbortError" ? "timeout" : e?.message);
    return false;
  } finally { clearTimeout(timer); }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return res.status(405).json({ ok: false, code: "method_not_allowed" }); }
  let body: unknown;
  try { body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {}); }
  catch { return res.status(400).json({ ok: false, code: "invalid" }); }

  const parsed = bookSchema.safeParse(body);
  if (!parsed.success) return res.status(400).json({ ok: false, code: "invalid", issues: parsed.error.issues.map(i => i.path.join(".")) });
  const b = parsed.data;
  if (b.website) return res.status(200).json({ ok: true });
  if (!isBookableSlot(b.slot)) return res.status(409).json({ ok: false, code: "slot_unavailable" });

  const apiKey = process.env.BREVO_API_KEY, inbox = process.env.LEAD_INBOX, from = process.env.LEAD_FROM;
  if (!apiKey || !inbox || !from) { console.error("[book] mail not configured"); return res.status(503).json({ ok: false, code: "unavailable" }); }

  const ics = Buffer.from(buildIcs(b)).toString("base64");
  const attachment = [{ content: ics, name: "fox-systems-walkthrough.ics" }];
  const product = PRODUCTS[b.product];
  const when = slotLabel(b.slot, "en");
  const rows: Array<[string, string]> = ([
    ["When", when],
    ["Their time zone", b.timezone],
    ["Product", product.en],
    ["Name", b.name], ["Email", b.email], ["Phone / WhatsApp", b.phone], ["Company", b.company],
    ["Notes", b.notes], ["Language", b.language === "ar" ? "Arabic" : "English"],
  ] as Array<[string, string]>).filter(([, v]) => v);
  const table = rows.map(([k, v]) => `<tr><td style="border:1px solid #e2e8f0"><strong>${esc(k)}</strong></td><td style="border:1px solid #e2e8f0">${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("\n");

  const ownerOk = await send(apiKey, {
    sender: { email: from, name: "Fox Systems Website" }, to: [{ email: inbox }], replyTo: { email: b.email, name: b.name },
    subject: `Walkthrough request: ${when} — ${b.name}${b.company ? ` (${b.company})` : ""}`,
    htmlContent: `<h2>New walkthrough request</h2><p style="font:14px system-ui,sans-serif">Confirm with them on WhatsApp or email and send the meeting link. The calendar file is attached.</p><table cellpadding="6" style="border-collapse:collapse;font:14px system-ui,sans-serif">${table}</table>`,
    attachment,
  });
  if (!ownerOk) return res.status(502).json({ ok: false, code: "unavailable" });

  const ar = b.language === "ar";
  const visitorWhen = slotLabel(b.slot, b.language);
  const visitorOk = await send(apiKey, {
    sender: { email: from, name: "Fox Systems" }, to: [{ email: b.email, name: b.name }], replyTo: { email: inbox, name: "Fox Systems" },
    subject: ar ? `طلب العرض العملي: ${visitorWhen}` : `Your walkthrough request: ${visitorWhen}`,
    htmlContent: `<div dir="${ar ? "rtl" : "ltr"}" style="font:15px/1.6 system-ui,sans-serif;color:#0f172a;max-width:560px">
<p>${ar ? `مرحبًا ${esc(b.name)}،` : `Hi ${esc(b.name)},`}</p>
<p>${ar ? `تلقّينا طلبك لعرض عملي على <b>${esc(product.ar)}</b> يوم <b>${esc(visitorWhen)}</b> (${SESSION_MINUTES} دقيقة، عبر الإنترنت).`
          : `We have your request for a walkthrough of <b>${esc(product.en)}</b> on <b>${esc(visitorWhen)}</b> (${SESSION_MINUTES} minutes, online).`}</p>
<p>${ar ? "سيؤكد فريقنا الموعد ويرسل رابط الاجتماع خلال يوم عمل عبر واتساب أو البريد. أضفنا ملف تقويم لتحفظ الموعد مبدئيًا."
        : "Our team will confirm the time and send the meeting link within one working day, on WhatsApp or email. A calendar file is attached so you can hold the time."}</p>
<p>${ar ? "هل تحتاج تغيير الموعد؟ ردّ على هذه الرسالة." : "Need a different time? Just reply to this email."}</p>
<p>— Fox Systems</p></div>`,
    attachment,
  });

  return res.status(200).json({ ok: true, visitorEmailed: visitorOk });
}
