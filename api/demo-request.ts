/**
 * "Try the live demo" endpoint.
 *
 * The visitor leaves a name, phone and email; we ask that product's demo instance for
 * a personal demo account and hand the browser a one-time sign-in URL. The same
 * details are emailed to LEAD_INBOX, so every demo is also a lead to follow up.
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   DEMO_SIGNUP_SECRET               real estate CRM: `select value from demo_config
 *                                    where key = 'signup_secret'` (Supabase epbsqguiexvnbbquihzi)
 *   DEMO_SIGNUP_SECRET_PEST_CONTROL  pest control demo: `select value from demo_ops.config
 *                                    where key = 'signup_secret'` (Supabase kopseksbjsajsixuswqp)
 *   DEMO_SIGNUP_SECRET_HR            HR CRM: `select value from demo_ops.config where key = 'signup_secret'`
 *   DEMO_SIGNUP_SECRET_MEDICAL       medical CRM: `select value from demo_ops.config
 *                                    where key = 'signup_secret'` (Supabase klnxievbzoiqjchjaxry)
 *   DEMO_CRM_URL, DEMO_PEST_URL, DEMO_MEDICAL_URL   optional overrides of the endpoints below
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
    name: { en: "Fox Real Estate CRM", ar: "نظام فوكس لإدارة العقارات" },
    days: 3,
    secretEnv: "DEMO_SIGNUP_SECRET",
    endpoint: () =>
      `${(process.env.DEMO_CRM_URL || "https://fox-realestate-crm-omega.vercel.app").replace(/\/+$/, "")}/api/public/demo-signup`,
  },
  "pest-control-crm": {
    label: "Pest Control CRM",
    name: { en: "Fox Pest Control CRM", ar: "نظام فوكس لمكافحة الآفات" },
    days: 3,
    secretEnv: "DEMO_SIGNUP_SECRET_PEST_CONTROL",
    endpoint: () =>
      process.env.DEMO_PEST_URL || "https://kopseksbjsajsixuswqp.supabase.co/functions/v1/api/demo/signup",
  },
  "hr-crm": {
    label: "HR & Payroll CRM",
    name: { en: "Fox HR", ar: "فوكس للموارد البشرية" },
    days: 3,
    secretEnv: "DEMO_SIGNUP_SECRET_HR",
    endpoint: () =>
      process.env.DEMO_HR_URL || "https://kglepsmhcpqqrldntbol.supabase.co/functions/v1/demo-signup",
  },
  "medical-crm": {
    label: "Medical CRM",
    name: { en: "Fox Medical CRM", ar: "نظام فوكس للمبيعات الطبية" },
    days: 3,
    secretEnv: "DEMO_SIGNUP_SECRET_MEDICAL",
    endpoint: () =>
      process.env.DEMO_MEDICAL_URL || "https://klnxievbzoiqjchjaxry.supabase.co/functions/v1/demo-signup",
  },
} as const;

const demoSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(v => v.replace(/\D/g, "").length >= 7, "phone"),
  // required: the visitor's demo login is emailed here
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).optional().default(""),
  teamSize: z.string().trim().max(40).optional().default(""),
  product: z.enum(["real-estate-crm", "pest-control-crm", "medical-crm", "hr-crm"]).optional().default("real-estate-crm"),
  language: z.enum(["en", "ar"]).optional().default("en"),
  // Honeypot, handled as in /api/contact: accepted, then quietly discarded.
  website: z.string().max(500).optional().default(""),
});

type DemoRequest = z.infer<typeof demoSchema>;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

// Cloudflare's published edge ranges (cloudflare.com/ips). The site sits
// behind Cloudflare, so x-forwarded-for's first address is the Cloudflare
// server, not the visitor: every sign-up recorded one of a handful of edge IPs,
// and the per-IP hourly limit made unrelated visitors block each other. The
// visitor is in cf-connecting-ip, trusted only when the request really came
// from Cloudflare (a direct hit on *.vercel.app could otherwise forge it).
const CF_V4 = ["173.245.48.0/20", "103.21.244.0/22", "103.22.200.0/22", "103.31.4.0/22",
  "141.101.64.0/18", "108.162.192.0/18", "190.93.240.0/20", "188.114.96.0/20",
  "197.234.240.0/22", "198.41.128.0/17", "162.158.0.0/15", "104.16.0.0/13",
  "104.24.0.0/14", "172.64.0.0/13", "131.0.72.0/22"];
const CF_V6 = ["2400:cb00:", "2606:4700:", "2803:f800:", "2405:b500:", "2405:8100:",
  "2a06:98c", "2a06:98d", "2a06:98e", "2a06:98f", "2c0f:f248:"];

const v4 = (ip: string) => {
  const p = ip.split(".").map(Number);
  return p.length === 4 && p.every(n => Number.isInteger(n) && n >= 0 && n <= 255)
    ? ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0 : null;
};
export function isCloudflare(ip: string): boolean {
  const n = v4(ip);
  if (n !== null) {
    return CF_V4.some(c => {
      const [base, bits] = c.split("/");
      const mask = bits === "0" ? 0 : (~0 << (32 - Number(bits))) >>> 0;
      return (n & mask) === ((v4(base) as number) & mask);
    });
  }
  const low = ip.toLowerCase();
  return CF_V6.some(p => low.startsWith(p));
}

export function clientIp(req: any): string {
  const forwarded = String(req.headers?.["x-forwarded-for"] ?? "").split(",")[0].trim();
  const edge = forwarded || String(req.headers?.["x-real-ip"] ?? "");
  const cf = String(req.headers?.["cf-connecting-ip"] ?? "").trim();
  if (cf && edge && isCloudflare(edge)) return cf.slice(0, 64);
  return edge || "unknown";
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
async function emailLead(demo: DemoRequest, accountCreated: boolean, loginSent = false) {
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
    ["Login emailed to them", loginSent ? "Yes" : "No"],
  ].filter(([, value]) => value !== "") as Array<[string, string]>;

  const html = `<h2>${accountCreated ? "Someone is trying the live demo" : "Live demo request (account not created)"}</h2>
<p style="font:14px system-ui,sans-serif">Message them while they are still in it — the demo account lasts ${PRODUCTS[demo.product].days} days.</p>
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

type Login = { email: string; password: string; url: string };

/** The visitor's own copy of their demo login, so they can come back from any device. */
export async function emailVisitorLogin(demo: DemoRequest, login: Login): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.LEAD_FROM;
  const replyTo = process.env.LEAD_INBOX;
  if (!apiKey || !from) return false;
  const product = PRODUCTS[demo.product];
  const ar = demo.language === "ar";
  const app = product.name[ar ? "ar" : "en"];
  const first = escapeHtml(demo.name.split(/\s+/)[0]);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#64748b">${label}</td><td style="padding:8px 12px;font-family:Consolas,monospace;font-size:15px;color:#0f172a" dir="ltr">${escapeHtml(value)}</td></tr>`;
  const t = ar
    ? { subject: `بيانات دخولك إلى النسخة التجريبية من ${app}`, hi: `مرحبًا ${first}،`,
        intro: `هذه بيانات دخولك إلى النسخة التجريبية من ${app}. يمكنك العودة إليها من أي جهاز طوال مدة التجربة.`,
        page: "صفحة الدخول", user: "البريد الإلكتروني", pass: "كلمة المرور", button: "افتح النسخة التجريبية",
        note: `حسابك صالح لمدة ${product.days} أيام، والبيانات النموذجية تعود إلى حالتها كل ليلة.`,
        help: "هل تريد جولة تعريفية؟ رُدّ على هذه الرسالة وسنرتّب موعدًا يناسبك.", team: "فريق فوكس سيستمز" }
    : { subject: `Your ${app} demo login`, hi: `Hi ${first},`,
        intro: `Here is your login for the ${app} live demo. You can come back from any device while your trial lasts.`,
        page: "Sign-in page", user: "Email", pass: "Password", button: "Open the demo",
        note: `Your login lasts ${product.days} days, and the sample data resets every night.`,
        help: "Would you like a walkthrough? Reply to this email and we'll arrange a time.", team: "The Fox Systems team" };
  const html = `<div dir="${ar ? "rtl" : "ltr"}" style="font:15px/1.6 system-ui,-apple-system,'Segoe UI',Tahoma,sans-serif;color:#0f172a;max-width:560px">
<p>${t.hi}</p><p>${t.intro}</p>
<table style="border-collapse:collapse;background:#f1f5f9;border-radius:10px;margin:16px 0">
${row(t.page, login.url)}${row(t.user, login.email)}${row(t.pass, login.password)}
</table>
<p><a href="${escapeHtml(login.url)}" style="display:inline-block;background:#2b87f2;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600">${t.button}</a></p>
<p style="color:#64748b">${t.note}</p><p>${t.help}</p><p>${t.team}</p></div>`;
  try {
    const response = await withTimeout(8000, signal =>
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        signal,
        headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { email: from, name: "Fox Systems" },
          to: [{ email: demo.email, name: demo.name }],
          ...(replyTo ? { replyTo: { email: replyTo, name: "Fox Systems" } } : {}),
          subject: t.subject,
          htmlContent: html,
        }),
      })
    );
    if (!response.ok) console.error("[demo-request] Brevo rejected the visitor login email:", response.status);
    return response.ok;
  } catch (error: any) {
    console.error("[demo-request] Failed to email the visitor their login:", error?.name === "AbortError" ? "timeout" : error?.message);
    return false;
  }
}

// ---- follow-ups ----------------------------------------------------------
// Two emails scheduled with Brevo at sign-up (scheduledAt allows up to 72 h
// ahead, and a demo lasts 72 h): tips on day 2, and a last-day note on what
// happens next. Only for a NEW demo account: a returning visitor already has
// them queued.
const WHATSAPP = "201038450546";
const TIPS: Record<DemoRequest["product"], { en: string[]; ar: string[] }> = {
  "real-estate-crm": {
    en: ["Open <b>AI Matching</b>, pick a lead and press <b>Find Best Matches</b>: the system ranks the properties that fit their budget and area.",
         "Look at <b>Payments</b>: every unit's instalments, what is due and what is overdue.",
         "In the <b>AI assistant</b>, ask it to write a WhatsApp follow-up to one of your leads."],
    ar: ["افتح <b>المطابقة بالذكاء الاصطناعي</b>، واختر عميلًا ثم اضغط <b>ابحث عن أفضل عقار</b>: يرتّب النظام العقارات المناسبة لميزانيته ومنطقته.",
         "اطّلع على <b>المدفوعات</b>: أقساط كل وحدة، وما يستحق وما تأخر.",
         "اطلب من <b>المساعد الذكي</b> كتابة رسالة متابعة عبر واتساب لأحد العملاء."],
  },
  "medical-crm": {
    en: ["Open <b>My Day</b> and try a <b>GPS check-in</b>: a visit only counts inside the institution's geofence.",
         "Look at <b>Samples</b>: stock by batch and expiry, with every unit issued on record.",
         "Open <b>Reports</b> and the <b>Leaderboard</b> to see each rep's visits, GPS verification and quality."],
    ar: ["افتح <b>يومي</b> وجرّب <b>تسجيل الزيارة بالموقع</b>: لا تُحتسب الزيارة إلا داخل نطاق المؤسسة.",
         "اطّلع على <b>العينات</b>: المخزون بالتشغيلة وتاريخ الصلاحية، مع سجل لكل وحدة تُصرف.",
         "افتح <b>التقارير</b> و<b>لوحة الصدارة</b> لترى زيارات كل مندوب ونسبة التوثيق بالموقع والجودة."],
  },
  "pest-control-crm": {
    en: ["Open <b>Dispatch</b> and drag a visit onto another engineer or day, then optimise the route.",
         "Open <b>Reports</b>, pick a service report and download it, or export the audit pack.",
         "Look at <b>Device QR Codes</b>: every bait station and trap with its inspection history."],
    ar: ["افتح <b>التوزيع</b> واسحب زيارة إلى مهندس أو يوم آخر، ثم حسّن المسار.",
         "افتح <b>التقارير</b> واختر تقرير خدمة ونزّله، أو صدّر ملف التدقيق.",
         "اطّلع على <b>أجهزة QR</b>: كل محطة طُعم ومصيدة مع سجل فحصها."],
  },
  "hr-crm": {
    en: ["Open <b>Payroll</b>, open a payroll run and then a payslip: every deduction shows the legal rule behind it.",
         "Approve a request in <b>Leave</b>: weekends and public holidays are never counted.",
         "Try the <b>Salary calculator</b> for Egypt, Saudi Arabia or Kuwait, including end-of-service pay."],
    ar: ["افتح <b>الرواتب</b> ثم دورة رواتب ثم قسيمة: كل استقطاع يوضّح القاعدة القانونية وراءه.",
         "اعتمد طلبًا في <b>الإجازات</b>: لا تُحتسب عطلات نهاية الأسبوع والعطلات الرسمية.",
         "جرّب <b>حاسبة الرواتب</b> لمصر أو السعودية أو الكويت، بما فيها مكافأة نهاية الخدمة."],
  },
};

export function followUpEmails(demo: DemoRequest, login: Login) {
  const ar = demo.language === "ar";
  const app = PRODUCTS[demo.product].name[ar ? "ar" : "en"];
  const first = escapeHtml(demo.name.split(/\s+/)[0]);
  const pricing = `https://foxsystemstech.com${ar ? "/ar" : ""}/services/crm#pricing`;
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(ar ? `مرحبًا، جرّبت ${app} وأرغب في معرفة المزيد.` : `Hi, I've been trying ${app} and would like to know more.`)}`;
  const button = (href: string, label: string, bg = "#2b87f2") =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;margin:4px 0">${label}</a>`;
  const wrap = (body: string) => `<div dir="${ar ? "rtl" : "ltr"}" style="font:15px/1.6 system-ui,-apple-system,'Segoe UI',Tahoma,sans-serif;color:#0f172a;max-width:560px">${body}
<p style="color:#94a3b8;font-size:12px;margin-top:24px">${ar ? "تصلك هذه الرسالة لأنك طلبت نسخة تجريبية على foxsystemstech.com. لإيقافها، رُدّ بكلمة «إيقاف»." : "You are getting this because you requested a demo on foxsystemstech.com. Reply \"stop\" and we won't email you again."}</p></div>`;
  const tips = TIPS[demo.product][ar ? "ar" : "en"].map(t => `<li style="margin:6px 0">${t}</li>`).join("");
  const day2 = {
    subject: ar ? `3 أشياء جرّبها في ${app} قبل انتهاء النسخة التجريبية` : `3 things to try in ${app} before your demo ends`,
    html: wrap(`<p>${ar ? `مرحبًا ${first}،` : `Hi ${first},`}</p>
<p>${ar ? "ما زالت نسختك التجريبية تعمل. هذه أكثر ثلاثة أشياء يلفت انتباه عملائنا:" : "Your demo is still running. These are the three things our customers find most useful:"}</p>
<ol>${tips}</ol>
<p>${button(login.url, ar ? "افتح النسخة التجريبية" : "Open the demo")}</p>
<p>${ar ? "هل تفضّل أن نعرضه لك على بيانات تشبه شركتك؟ رُدّ على هذه الرسالة أو راسلنا على واتساب." : "Would you rather we showed it to you on data like your company's? Reply to this email or message us on WhatsApp."}</p>
<p>${button(wa, ar ? "تحدّث معنا على واتساب" : "Chat on WhatsApp", "#25D366")}</p>
<p>${ar ? "فريق فوكس سيستمز" : "The Fox Systems team"}</p>`),
  };
  const last = {
    subject: ar ? `تنتهي نسختك التجريبية من ${app} اليوم` : `Your ${app} demo ends today`,
    html: wrap(`<p>${ar ? `مرحبًا ${first}،` : `Hi ${first},`}</p>
<p>${ar ? `تنتهي نسختك التجريبية من ${app} اليوم، وتُحذف بياناتها.` : `Your ${app} demo ends today, and its data is removed.`}</p>
<p>${ar ? "إذا أردت النظام لشركتك، نجهّزه ببياناتك: التركيب ونقل البيانات وتدريب الفريق مشمولة، بسعر شهري واحد للفريق كله حسب عدد المستخدمين." : "If you want it for your company, we set it up with your own data: installation, data migration and team training are included, at one monthly price for the whole team, based on the number of users."}</p>
<p>${button(pricing, ar ? "اطّلع على الباقات والأسعار" : "See plans and prices")} &nbsp; ${button(wa, ar ? "تحدّث معنا على واتساب" : "Chat on WhatsApp", "#25D366")}</p>
<p>${ar ? "أو رُدّ على هذه الرسالة لنرتّب مكالمة قصيرة في الوقت الذي يناسبك." : "Or reply to this email and we'll arrange a short call at a time that suits you."}</p>
<p>${ar ? "فريق فوكس سيستمز" : "The Fox Systems team"}</p>`),
  };
  return { day2, last };
}

/** Best effort, like the other mail: a scheduling failure never costs the visitor their demo. */
async function scheduleFollowUps(demo: DemoRequest, login: Login, now = Date.now()) {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.LEAD_FROM;
  const replyTo = process.env.LEAD_INBOX;
  if (!apiKey || !from) return;
  const { day2, last } = followUpEmails(demo, login);
  for (const [mail, hours] of [[day2, 24], [last, 70]] as const) {
    try {
      const response = await withTimeout(8000, signal =>
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          signal,
          headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            sender: { email: from, name: "Fox Systems" },
            to: [{ email: demo.email, name: demo.name }],
            ...(replyTo ? { replyTo: { email: replyTo, name: "Fox Systems" } } : {}),
            subject: mail.subject,
            htmlContent: mail.html,
            scheduledAt: new Date(now + hours * 3600_000).toISOString(),
            tags: ["demo-follow-up", demo.product],
          }),
        })
      );
      if (!response.ok) console.error("[demo-request] Brevo refused a follow-up:", response.status, await response.text().catch(() => ""));
    } catch (error: any) {
      console.error("[demo-request] Failed to schedule a follow-up:", error?.name === "AbortError" ? "timeout" : error?.message);
    }
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
  let login: Login | null = null;
  let code = "unavailable";
  let endsAt: string | null = null;
  let returning = false;
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
      const answer = (await response.json()) as { url?: string; login?: Login; returning?: boolean };
      url = answer.url ?? null;
      returning = answer.returning === true;
      if (answer.login?.email && answer.login?.password && answer.login?.url) login = answer.login;
    } else if (response.status === 409) {
      // One trial at a time per email / company: someone else from this
      // email or company already has one running (the same phone would
      // simply have been given its login back).
      const body = (await response.json().catch(() => ({}))) as { ends_at?: string };
      code = "active_trial";
      endsAt = body.ends_at ?? null;
    } else {
      code = response.status === 429 ? "rate_limited" : "unavailable";
      console.error("[demo-request] CRM refused the signup:", response.status, await response.text().catch(() => ""));
    }
  } catch (error: any) {
    console.error("[demo-request] CRM unreachable:", error?.name === "AbortError" ? "timeout" : error?.message);
  }

  const loginSent = url && login ? await emailVisitorLogin(demo, login) : false;
  await emailLead(demo, Boolean(url), loginSent);
  if (url && login && loginSent && !returning) await scheduleFollowUps(demo, login);

  if (code === "active_trial") return res.status(409).json({ ok: false, code, ends_at: endsAt });
  if (!url) return res.status(code === "rate_limited" ? 429 : 502).json({ ok: false, code });
  return res.status(200).json({ ok: true, url });
}
