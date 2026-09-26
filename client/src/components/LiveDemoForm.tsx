/**
 * "Try the live demo" — a name and a phone number in exchange for a personal
 * login to the running CRM.
 *
 * /api/demo-request creates the account and emails the lead; on success the
 * browser goes straight into the CRM already signed in. When that isn't
 * possible the visitor is handed to WhatsApp with their details filled in,
 * as LeadForm does, rather than left with a dead button.
 */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Clock, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";
import { whatsAppFallbackUrl } from "@/lib/leads";

const T = {
  en: {
    title: "Try the live demo now",
    sub: "Not screenshots: the real system, filled with a sample brokerage — branches, agents, leads, deals and instalment plans. You get your own login straight away.",
    points: [
      { icon: ShieldCheck, text: "You're signed in as the CEO and see every page" },
      { icon: RotateCcw, text: "Sample data, reset every night, so explore freely" },
      { icon: Clock, text: "Your login lasts 7 days" },
    ],
    nameLbl: "Your name", phoneLbl: "Phone / WhatsApp", companyLbl: "Company", sizeLbl: "Sales team size",
    sizeOpts: ["1–5", "6–15", "16–40", "40+"],
    submit: "Open the demo", opening: "Preparing your demo…",
    footnote: "We'll message you on WhatsApp to offer a 20-minute walkthrough. No spam.",
    expired: "That sign-in link has already been used or has expired. Request a new one below; the same phone number keeps your account.",
    invalid: "Please enter your name and a phone number we can reach.",
    limited: "Too many requests from this connection. Please try again in an hour, or message us on WhatsApp.",
    unavailableTitle: "The demo couldn't open right now",
    unavailable: "Message us on WhatsApp and we'll send you your access straight away. Your details are already filled in:",
    waBtn: "Message us on WhatsApp",
    service: "Real Estate CRM — live demo",
  },
  ar: {
    title: "جرّب النسخة التجريبية الآن",
    sub: "ليست صورًا للشاشات، بل النظام الفعلي ببيانات شركة عقارات نموذجية: فروع ووكلاء وعملاء محتملون وصفقات وخطط أقساط. تحصل على حساب خاص بك فورًا.",
    points: [
      { icon: ShieldCheck, text: "تدخل بصلاحيات المدير التنفيذي وترى جميع الصفحات" },
      { icon: RotateCcw, text: "بيانات نموذجية تعود إلى حالتها كل ليلة، فجرّب بحرية" },
      { icon: Clock, text: "حسابك صالح لمدة 7 أيام" },
    ],
    nameLbl: "اسمك", phoneLbl: "الهاتف / واتساب", companyLbl: "الشركة", sizeLbl: "حجم فريق المبيعات",
    // Worded, not "6–15": a bare numeric range renders reversed ("15–6") in RTL.
    sizeOpts: ["من 1 إلى 5", "من 6 إلى 15", "من 16 إلى 40", "أكثر من 40"],
    submit: "افتح النسخة التجريبية", opening: "جارٍ تجهيز النسخة التجريبية…",
    footnote: "سنتواصل معك عبر واتساب لنعرض عليك جولة تعريفية مدتها 20 دقيقة. لا رسائل مزعجة.",
    expired: "رابط الدخول هذا استُخدم من قبل أو انتهت صلاحيته. اطلب رابطًا جديدًا أدناه، ويحتفظ رقم الهاتف نفسه بحسابك.",
    invalid: "يُرجى إدخال اسمك ورقم هاتف يمكننا التواصل معك عليه.",
    limited: "طلبات كثيرة من هذا الاتصال. يُرجى المحاولة بعد ساعة، أو مراسلتنا عبر واتساب.",
    unavailableTitle: "تعذّر فتح النسخة التجريبية الآن",
    unavailable: "راسلنا عبر واتساب وسنرسل إليك رابط الدخول فورًا. بياناتك مكتوبة في الرسالة مسبقًا:",
    waBtn: "راسلنا عبر واتساب",
    service: "نظام إدارة العقارات — نسخة تجريبية",
  },
};

type Status = "idle" | "sending" | "invalid" | "limited" | "unavailable";

interface LiveDemoFormProps {
  language: "en" | "ar";
}

export default function LiveDemoForm({ language }: LiveDemoFormProps) {
  const t = T[language];
  const isArabic = language === "ar";
  const [status, setStatus] = useState<Status>("idle");
  const [expired, setExpired] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", company: "", teamSize: t.sizeOpts[1], website: "" });

  // The CRM sends a visitor back here with ?demo=expired when a link was reused.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") === "expired") setExpired(true);
  }, []);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const waUrl = whatsAppFallbackUrl({
    name: form.name, email: "", phone: form.phone, company: form.company,
    service: t.service, language,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product: "real-estate-crm", language }),
      });
      const body = await response.json().catch(() => ({}));

      if (response.ok && body.url) {
        // A lead only once an account really exists. Give the beacons a moment
        // to leave before the page is replaced.
        window.trackFormSubmit?.(t.service);
        setTimeout(() => window.location.assign(body.url), 350);
        return;
      }
      setStatus(response.status === 400 ? "invalid" : response.status === 429 ? "limited" : "unavailable");
    } catch {
      setStatus("unavailable");
    }
  };

  const fid = (name: string) => `demo-${name}`;

  return (
    <section id="demo" className="mt-16 pt-14 border-t border-border scroll-mt-24">
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{t.sub}</p>
          <ul className="space-y-3">
            {t.points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm">
                <Icon className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-3 rounded-2xl border border-primary/30 bg-card p-6 space-y-5">
          {expired && status === "idle" && (
            <div role="status" className="rounded-xl border border-border bg-muted/40 p-4 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{t.expired}</p>
            </div>
          )}

          {(status === "invalid" || status === "limited") && (
            <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{status === "invalid" ? t.invalid : t.limited}</p>
            </div>
          )}

          {status === "unavailable" && (
            <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{t.unavailableTitle}</p>
                  <p className="text-sm text-muted-foreground">{t.unavailable}</p>
                </div>
              </div>
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <Button type="button" size="sm" className="rounded-full gap-2">
                  <MessageCircle className="w-4 h-4" /> {t.waBtn}
                </Button>
              </a>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {([
              { lbl: t.nameLbl,    type: "text", field: "name"    as const, autoComplete: "name",         required: true },
              { lbl: t.phoneLbl,   type: "tel",  field: "phone"   as const, autoComplete: "tel",          required: true },
              { lbl: t.companyLbl, type: "text", field: "company" as const, autoComplete: "organization", required: false },
            ]).map(({ lbl, type, field, autoComplete, required }) => (
              <div key={field} className="space-y-1.5">
                <label htmlFor={fid(field)} className="text-sm font-semibold text-foreground">
                  {lbl} {required && <span className="text-primary">*</span>}
                </label>
                <input
                  id={fid(field)} name={field} type={type} autoComplete={autoComplete}
                  required={required} value={form[field]} onChange={set(field)}
                  dir={type === "tel" ? "ltr" : undefined}
                  className="form-input"
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <label htmlFor={fid("teamSize")} className="text-sm font-semibold text-foreground">{t.sizeLbl}</label>
              <select id={fid("teamSize")} name="teamSize" value={form.teamSize} onChange={set("teamSize")} className="form-input">
                {t.sizeOpts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Honeypot — same treatment as LeadForm: sr-only, never offset off-canvas. */}
          <div aria-hidden="true" className="sr-only">
            <label htmlFor={fid("website")}>Website</label>
            <input id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off"
              value={form.website} onChange={set("website")} />
          </div>

          <Button type="submit" disabled={status === "sending"}
            className="w-full h-13 text-base rounded-xl font-bold gap-2 shadow-lg shadow-primary/25 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-wait">
            {status === "sending"
              ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.opening}</span>
              : <>{t.submit} <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} /></>}
          </Button>

          <p className="text-xs text-muted-foreground text-center">{t.footnote}</p>
        </form>
      </div>
    </section>
  );
}
