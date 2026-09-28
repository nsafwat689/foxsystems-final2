/**
 * /book — pick a time for an online walkthrough. Sends a request to
 * /api/book; the team confirms it (see api/book.ts for why there is no
 * calendar database).
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AlertCircle, ArrowRight, CalendarDays, CheckCircle2, Clock, MessageCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { BOOK_SEO } from "@/data/bookSeo";
import { BOOKING_TZ, SESSION_MINUTES, bookingDays } from "@/lib/bookingSlots";
import { whatsAppFallbackUrl } from "@/lib/leads";

const H = { fontFamily: "'Plus Jakarta Sans',sans-serif" };
const PRODUCTS = ["real-estate-crm", "medical-crm", "pest-control-crm", "hr-crm", "it-services"] as const;
type Product = (typeof PRODUCTS)[number];

const T = {
  en: {
    badge: "Book a walkthrough", title: "Pick a time that suits you",
    sub: `A ${SESSION_MINUTES}-minute online session with the team that builds the system: we show it working on a company like yours and answer your questions.`,
    points: [[Video, "Online — Google Meet, Zoom or Teams, your choice"], [Clock, `${SESSION_MINUTES} minutes, Sunday to Thursday`], [CheckCircle2, "Confirmed by our team within one working day"]] as const,
    product: "What would you like to see?", products: { "real-estate-crm": "Real Estate CRM", "medical-crm": "Medical CRM", "pest-control-crm": "Pest Control CRM", "hr-crm": "HR & Payroll", "it-services": "IT services / a custom system" },
    day: "Day", time: "Time (Cairo)", yourTime: "your time",
    name: "Your name", email: "Email", phone: "Phone / WhatsApp", company: "Company", notes: "Anything we should prepare? (optional)",
    submit: "Request this time", sending: "Sending…", pick: "Pick a day and a time first.",
    doneTitle: "Request sent", done: (w: string) => `We have your request for ${w}. Our team will confirm it and send the meeting link within one working day. A copy with a calendar file is on its way to your inbox.`,
    doneNoMail: (w: string) => `We have your request for ${w}. Our team will confirm it and send the meeting link within one working day.`,
    taken: "That time is no longer available. Please pick another.", invalid: "Please check your name, email and phone number.",
    unavailable: "We could not send your request just now. Message us on WhatsApp and we will book it for you.", wa: "Book on WhatsApp",
    demoLink: "Prefer to explore on your own? Try a live demo", cairo: "Cairo time",
  },
  ar: {
    badge: "احجز عرضًا عمليًا", title: "اختر الموعد المناسب لك",
    sub: `جلسة عبر الإنترنت مدتها ${SESSION_MINUTES} دقيقة مع الفريق الذي يبني النظام: نعرضه يعمل على شركة مثل شركتك ونجيب عن أسئلتك.`,
    points: [[Video, "عبر الإنترنت: Google Meet أو Zoom أو Teams حسب اختيارك"], [Clock, `${SESSION_MINUTES} دقيقة، من الأحد إلى الخميس`], [CheckCircle2, "يؤكد فريقنا الموعد خلال يوم عمل"]] as const,
    product: "ماذا تريد أن تشاهد؟", products: { "real-estate-crm": "فوكس لإدارة العقارات", "medical-crm": "فوكس للمبيعات الطبية", "pest-control-crm": "فوكس لإدارة مكافحة الآفات", "hr-crm": "فوكس للموارد البشرية", "it-services": "خدمات تقنية المعلومات أو نظام مخصص" },
    day: "اليوم", time: "الوقت (بتوقيت القاهرة)", yourTime: "بتوقيتك",
    name: "الاسم", email: "البريد الإلكتروني", phone: "الهاتف / واتساب", company: "الشركة", notes: "هل هناك ما نجهّزه لك؟ (اختياري)",
    submit: "اطلب هذا الموعد", sending: "جارٍ الإرسال…", pick: "اختر اليوم والوقت أولًا.",
    doneTitle: "تم إرسال الطلب", done: (w: string) => `تلقّينا طلبك لموعد ${w}. سيؤكده فريقنا ويرسل رابط الاجتماع خلال يوم عمل، وأرسلنا نسخة مع ملف تقويم إلى بريدك.`,
    doneNoMail: (w: string) => `تلقّينا طلبك لموعد ${w}. سيؤكده فريقنا ويرسل رابط الاجتماع خلال يوم عمل.`,
    taken: "هذا الموعد لم يعد متاحًا، اختر موعدًا آخر.", invalid: "راجع الاسم والبريد ورقم الهاتف.",
    unavailable: "تعذّر إرسال طلبك الآن. راسلنا على واتساب وسنحجز لك الموعد.", wa: "احجز عبر واتساب",
    demoLink: "تفضّل الاستكشاف بنفسك؟ جرّب النسخة التجريبية", cairo: "بتوقيت القاهرة",
  },
};

export default function Book({ language }: { language: "en" | "ar" }) {
  const t = T[language];
  const isArabic = language === "ar";
  const prefix = isArabic ? "/ar" : "";
  const locale = isArabic ? "ar-EG-u-nu-latn" : "en-GB";
  const days = useMemo(() => bookingDays(), []);
  const visitorTz = useMemo(() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { return ""; } }, []);
  const initialProduct = useMemo<Product>(() => {
    const p = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("product") : null;
    return (PRODUCTS as readonly string[]).includes(p ?? "") ? (p as Product) : "real-estate-crm";
  }, []);

  const [product, setProduct] = useState<Product>(initialProduct);
  const [dayKey, setDayKey] = useState(days[0]?.key ?? "");
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "done-nomail" | "taken" | "invalid" | "unavailable" | "pick">("idle");
  const day = days.find(d => d.key === dayKey) ?? days[0];

  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions, tz = BOOKING_TZ) => new Date(iso).toLocaleString(locale, { timeZone: tz, ...opts });
  const time = (iso: string, tz?: string) => fmt(iso, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }, tz);
  const showLocal = visitorTz && days[0]?.slots[0] && time(days[0].slots[0]) !== time(days[0].slots[0], visitorTz);
  const whenLabel = slot ? `${fmt(slot, { weekday: "long", day: "numeric", month: "long" })}${isArabic ? "،" : ","} ${time(slot)} ${t.cairo}` : "";

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [f]: e.target.value }));
  const waUrl = whatsAppFallbackUrl({ name: form.name, email: form.email, phone: form.phone, company: form.company, language,
    service: `${t.badge}: ${t.products[product]}`, message: whenLabel });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) { setStatus("pick"); return; }
    setStatus("sending");
    try {
      const r = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, product, slot, language, timezone: visitorTz }) });
      const body = await r.json().catch(() => ({}));
      if (r.ok && body.ok) {
        window.trackFormSubmit?.("Walkthrough booking", { product, language });
        setStatus(body.visitorEmailed === false ? "done-nomail" : "done");
        return;
      }
      if (r.status === 409) { setSlot(""); setStatus("taken"); return; }
      setStatus(r.status === 400 ? "invalid" : "unavailable");
    } catch { setStatus("unavailable"); }
  };

  const done = status === "done" || status === "done-nomail";

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={BOOK_SEO[language]} organizationSchema />
      <Header language={language} />

      <section className="relative py-20 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10 max-w-3xl">
          <span className="pill pill-gold mb-5 inline-block">{t.badge}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4" style={H}>{t.title}</h1>
          <p className="text-lg text-white/70 leading-relaxed mb-6">{t.sub}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {t.points.map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-2 text-sm text-white/80"><Icon className="w-4 h-4 text-[var(--gold,#f5b942)]" aria-hidden="true" />{text}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container py-14 max-w-4xl">
        {done ? (
          <div role="status" className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold mb-3" style={H}>{t.doneTitle}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">{status === "done" ? t.done(whenLabel) : t.doneNoMail(whenLabel)}</p>
            <div className="mt-6"><Link href={`${prefix}/solutions`} className="text-primary font-semibold">{t.demoLink}</Link></div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-8">
            <fieldset className="min-w-0">
              <legend className="text-lg font-extrabold mb-3" style={H}>{t.product}</legend>
              <div className="flex flex-wrap gap-2">
                {PRODUCTS.map(p => (
                  <button type="button" key={p} onClick={() => setProduct(p)} aria-pressed={product === p}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${product === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                    {t.products[p]}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className="text-lg font-extrabold mb-3 flex items-center gap-2" style={H}><CalendarDays className="w-5 h-5 text-primary" />{t.day}</legend>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map(d => (
                  <button type="button" key={d.key} onClick={() => { setDayKey(d.key); setSlot(""); }} aria-pressed={d.key === day?.key}
                    className={`flex-shrink-0 w-20 py-3 rounded-xl border text-center transition-colors ${d.key === day?.key ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                    <span className="block text-xs opacity-80">{fmt(d.slots[0], { weekday: "short" })}</span>
                    <span className="block text-xl font-extrabold">{fmt(d.slots[0], { day: "numeric" })}</span>
                    <span className="block text-xs opacity-80">{fmt(d.slots[0], { month: "short" })}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {day && (
              <fieldset className="min-w-0">
                <legend className="text-lg font-extrabold mb-3 flex items-center gap-2" style={H}><Clock className="w-5 h-5 text-primary" />{t.time}</legend>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {day.slots.map(s => (
                    <button type="button" key={s} onClick={() => { setSlot(s); if (status === "pick" || status === "taken") setStatus("idle"); }} aria-pressed={slot === s}
                      className={`py-2.5 rounded-xl border text-center transition-colors ${slot === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}>
                      <span className="block font-bold" dir="ltr">{time(s)}</span>
                      {showLocal && <span className="block text-[11px] opacity-75" dir="ltr">{time(s, visitorTz)} {t.yourTime}</span>}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="rounded-2xl border border-primary/30 bg-card p-6 space-y-5">
              {(["pick", "taken", "invalid", "unavailable"] as const).includes(status as any) && (
                <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                  <p className="text-sm flex gap-2"><AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />{t[status as "pick" | "taken" | "invalid" | "unavailable"]}</p>
                  {status === "unavailable" && (
                    <a href={waUrl} target="_blank" rel="noopener noreferrer"><Button type="button" size="sm" className="rounded-full gap-2"><MessageCircle className="w-4 h-4" />{t.wa}</Button></a>
                  )}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                {([["name", "text", "name", true], ["phone", "tel", "tel", true], ["email", "email", "email", true], ["company", "text", "organization", false]] as const).map(([f, type, ac, req]) => (
                  <div key={f} className="space-y-1.5">
                    <label htmlFor={`book-${f}`} className="text-sm font-semibold">{t[f]} {req && <span className="text-primary">*</span>}</label>
                    <input id={`book-${f}`} name={f} type={type} autoComplete={ac} required={req} value={form[f]} onChange={set(f)}
                      dir={type === "tel" || type === "email" ? "ltr" : undefined} className="form-input" />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="book-notes" className="text-sm font-semibold">{t.notes}</label>
                <textarea id="book-notes" rows={3} maxLength={1000} value={form.notes} onChange={set("notes")} className="form-input" />
              </div>
              <div aria-hidden="true" className="sr-only">
                <label htmlFor="book-website">Website</label>
                <input id="book-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
              </div>
              {slot && <p className="text-sm font-semibold text-primary">{whenLabel}</p>}
              <Button type="submit" disabled={status === "sending"} className="w-full h-12 text-base rounded-xl font-bold gap-2">
                {status === "sending" ? t.sending : <>{t.submit}<ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} /></>}
              </Button>
            </div>
          </form>
        )}
      </div>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait</p>
        </div>
      </footer>
    </div>
  );
}
