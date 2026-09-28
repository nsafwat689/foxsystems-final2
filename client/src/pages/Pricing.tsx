/**
 * /pricing (and /ar/pricing): every service's price list in one place.
 *
 * The visitor picks a service and a currency, sees the plans, ticks add-ons
 * (with quantities where it makes sense — agents, cameras), and gets a running
 * estimate split into one-time and monthly, which goes to WhatsApp as a
 * ready-written message. Services that cannot honestly be priced before a
 * site survey show what the quote covers instead of a made-up number.
 *
 * All figures come from data/servicePricing.ts (and crmPlans.ts for the CRM).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check, Info, MessageCircle, Minus, Plus, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { generateBreadcrumbSchema } from "@/utils/seo";
import { WHATSAPP_NUMBER } from "@/lib/leads";
import { planForSeats } from "@/data/crmPlans";
import {
  CURRENCIES, CURRENCY_NAME, FX, PRICING_SEO, SERVICES, amount, formatMoney, guessCurrency,
  type AddOn, type CatalogueItem, type Currency, type PlanItem, type Service, type Unit,
} from "@/data/servicePricing";

const ORIGIN = "https://foxsystemstech.com";
const CURRENCY_KEY = "fox_pricing_currency";

const T = {
  en: {
    badge: "Pricing",
    title: "Clear prices for every service",
    sub: "Pick a service and your currency. Tick what you need and you will see the total: what you pay once, and what you pay each month.",
    currency: "Currency",
    monthly: "Monthly",
    annual: "Annual",
    annualNote: "Pay for 10 months instead of 12",
    from: "from",
    once: "one-time",
    month: "/month",
    perAgent: "per agent / month",
    perCamera: "per camera",
    perUser: "per user / month",
    perHour: "per hour",
    surveyBtn: "Book a site visit",
    catSub: "Hardware prices change with the market every day, so we don't print them. Choose the devices and quantities, and we send today's price on WhatsApp.",
    condNew: "New",
    condUsed: "Used (grade A)",
    request: "Your request",
    reqEmpty: "Add devices to build your request.",
    reqSend: "Ask for today's prices on WhatsApp",
    reqIntro: "Hello Fox Systems, please send me your prices for:",
    qty: "Quantity",
    choose: "Choose",
    chosen: "Selected",
    popular: "Most popular",
    always: "Always included",
    addons: "Add-ons",
    estimate: "Your estimate",
    nothing: "Choose a plan to start your estimate.",
    oneTime: "One-time",
    perMonth: "Monthly",
    perYear: "Per year (annual billing)",
    send: "Send this estimate on WhatsApp",
    talk: "Talk to sales",
    details: "Full details",
    users: "How many people will use it?",
    usersHint: "The plan that fits is picked for you.",
    over40: "More than 40 users is quoted individually.",
    compare: "Compare CRM plans",
    quoteTitle: "Priced after a free survey",
    quoteSub: "This depends on your site and equipment, so we look first and then give you a written quote — no charge for the visit.",
    quoteCovers: "The quote covers",
    askQuote: "Request a free survey",
    demo: "Try any of our four CRMs — real estate, medical, pest control and HR — for 3 days before you decide.",
    demoLink: "Open a live demo",
    fine: [
      "Prices exclude VAT. A written quote is valid for the period stated on it.",
      "Saudi riyal and Kuwaiti dinar prices come from the dollar list at fixed rates.",
      "For on-site work (cameras, phone systems, IT support visits) the prices are for Egypt; work in Saudi Arabia and Kuwait is quoted after a survey.",
    ],
    rates: "Rates as of",
    rights: "All rights reserved.",
    waIntro: "Hello Fox Systems, I would like a quote for:",
    waTotal: "Estimate",
    wa: "Chat on WhatsApp",
    home: "Home",
  },
  ar: {
    badge: "الأسعار",
    title: "أسعار واضحة لكل خدمة",
    sub: "اختر الخدمة والعملة، وحدّد ما تحتاج إليه لترى الإجمالي: ما تدفعه مرة واحدة، وما تدفعه شهريًا.",
    currency: "العملة",
    monthly: "شهري",
    annual: "سنوي",
    annualNote: "ادفع عشرة أشهر بدلًا من اثني عشر",
    from: "يبدأ من",
    once: "مرة واحدة",
    month: "/شهريًا",
    perAgent: "لكل موظف شهريًا",
    perCamera: "لكل كاميرا",
    perUser: "لكل مستخدم شهريًا",
    perHour: "للساعة",
    surveyBtn: "احجز زيارة للموقع",
    catSub: "أسعار الأجهزة تتغير يوميًا مع السوق، لذلك لا ننشرها. اختر الأجهزة والكميات، ونرسل لك سعر اليوم عبر واتساب.",
    condNew: "جديد",
    condUsed: "مستعمل (فئة A)",
    request: "طلبك",
    reqEmpty: "أضف الأجهزة لتكوين طلبك.",
    reqSend: "اطلب أسعار اليوم عبر واتساب",
    reqIntro: "مرحبًا فوكس سيستمز، أرجو إرسال أسعاركم لما يلي:",
    qty: "الكمية",
    choose: "اختر",
    chosen: "تم الاختيار",
    popular: "الأكثر طلبًا",
    always: "مشمول دائمًا",
    addons: "إضافات",
    estimate: "تقديرك",
    nothing: "اختر باقة لتبدأ التقدير.",
    oneTime: "مرة واحدة",
    perMonth: "شهريًا",
    perYear: "سنويًا (دفع سنوي)",
    send: "أرسل هذا التقدير عبر واتساب",
    talk: "تحدّث إلى المبيعات",
    details: "التفاصيل الكاملة",
    users: "كم عدد مستخدمي النظام؟",
    usersHint: "نختار لك الباقة المناسبة تلقائيًا.",
    over40: "لأكثر من 40 مستخدمًا يُعدّ عرض سعر خاص.",
    compare: "قارن باقات CRM",
    quoteTitle: "يُسعَّر بعد معاينة مجانية",
    quoteSub: "يعتمد السعر على موقعك ومعداتك، لذا نعاين أولًا ثم نرسل عرض سعر مكتوبًا، والزيارة مجانية.",
    quoteCovers: "يشمل العرض",
    askQuote: "اطلب معاينة مجانية",
    demo: "جرّب أيًّا من أنظمتنا الأربعة، العقارات والمبيعات الطبية ومكافحة الآفات والموارد البشرية، لمدة 3 أيام قبل أن تقرر.",
    demoLink: "افتح نسخة تجريبية",
    fine: [
      "الأسعار لا تشمل ضريبة القيمة المضافة، وعرض السعر المكتوب صالح للمدة المذكورة فيه.",
      "أسعار الريال السعودي والدينار الكويتي محسوبة من قائمة الدولار بأسعار صرف ثابتة.",
      "أسعار الأعمال الميدانية (الكاميرات والسنترالات وزيارات الدعم الفني) خاصة بمصر، ويُعدّ عرض سعر للأعمال في السعودية والكويت بعد المعاينة.",
    ],
    rates: "أسعار الصرف بتاريخ",
    rights: "جميع الحقوق محفوظة.",
    waIntro: "مرحبًا فوكس سيستمز، أرغب في عرض سعر لما يلي:",
    waTotal: "التقدير",
    wa: "تواصل عبر واتساب",
    home: "الرئيسية",
  },
};

interface Props { language: "en" | "ar"; }

/** Units billed every month (the rest are paid once, or as used). */
const MONTHLY: Unit[] = ["month", "per-agent-month", "per-user-month"];

export default function Pricing({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";
  const seo = PRICING_SEO[language];

  const [currency, setCurrency] = useState<Currency>("EGP");
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(CURRENCY_KEY); } catch { /* private mode */ }
    setCurrency(CURRENCIES.includes(saved as Currency) ? (saved as Currency) : guessCurrency());
  }, []);
  const pickCurrency = (c: Currency) => {
    setCurrency(c);
    try { localStorage.setItem(CURRENCY_KEY, c); } catch { /* ignore */ }
  };

  // The service tab follows the URL hash, so /pricing#cctv opens on cameras.
  const [serviceId, setServiceId] = useState(SERVICES[0].id);
  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.slice(1));
    if (SERVICES.some(s => s.id === h)) setServiceId(h);
  }, []);
  const pickService = (id: string) => {
    setServiceId(id);
    try { history.replaceState(null, "", `#${id}`); } catch { /* ignore */ }
  };
  const service = SERVICES.find(s => s.id === serviceId)!;

  // Keep the chosen tab visible in the phone scroller. By hand, not
  // scrollIntoView, which would also move the page itself.
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = strip.current;
    const tab = box?.querySelector<HTMLElement>("[aria-selected=true]");
    if (!box || !tab || box.scrollWidth <= box.clientWidth) return;
    const b = box.getBoundingClientRect(), r = tab.getBoundingClientRect();
    if (r.left < b.left) box.scrollLeft -= b.left - r.left + 16;
    else if (r.right > b.right) box.scrollLeft += r.right - b.right + 16;
  }, [serviceId]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t.home, url: isArabic ? `${ORIGIN}/ar` : `${ORIGIN}/` },
    { name: t.badge, url: seo.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seo} organizationSchema breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      <section className="relative py-20 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }} className="max-w-3xl">
            <span className="pill pill-gold mb-5 inline-block">{t.badge}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}>
              {t.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">{t.sub}</p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3" role="radiogroup" aria-label={t.currency}>
            <span className="text-white/60 text-sm font-semibold">{t.currency}</span>
            {CURRENCIES.map(c => (
              <button key={c} type="button" role="radio" aria-checked={currency === c}
                title={CURRENCY_NAME[c][language]} onClick={() => pickCurrency(c)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  currency === c ? "bg-white text-[var(--navy)]" : "bg-white/10 text-white hover:bg-white/20"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-10">
        {/* Service tabs: a scroller on phones rather than a wrapped wall of buttons. */}
        <div ref={strip} className="-mx-4 px-4 overflow-x-auto pb-2 lg:mx-0 lg:px-0 lg:overflow-visible">
          <div className="flex gap-2 w-max lg:w-auto lg:flex-wrap" role="tablist">
            {SERVICES.map(s => {
              const Icon = s.icon;
              const on = s.id === serviceId;
              return (
                <button key={s.id} type="button" role="tab" aria-selected={on} onClick={() => pickService(s.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-colors ${
                    on ? "bg-primary text-white border-primary" : "bg-card border-border hover:border-primary/40"}`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {s.name[language]}
                </button>
              );
            })}
          </div>
        </div>

        <ServicePanel key={service.id} service={service} currency={currency} language={language} prefix={prefix} />

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />{t.demo}
          </p>
          <Link href={`${prefix}/services/crm#try-demo`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-bold hover:gap-3 transition-all">
            {t.demoLink}<ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 space-y-1.5 text-xs text-muted-foreground">
          {t.fine.map(f => <li key={f} className="flex gap-2"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />{f}</li>)}
          <li className="ps-5">
            {t.rates} {FX.asOf}: 1 USD = {FX.EGP_PER_USD} EGP · {FX.SAR_PER_USD} SAR · {FX.KWD_PER_USD} KWD
          </li>
        </ul>
      </div>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">© 2026 Fox Systems. {t.rights} · Egypt · Saudi Arabia · Kuwait</p>
        </div>
      </footer>

      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label={t.wa}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}

function ServicePanel({ service, currency, language, prefix }: {
  service: Service; currency: Currency; language: "en" | "ar"; prefix: string;
}) {
  const t = T[language];
  const isArabic = language === "ar";
  const recurring = service.plans.some(p => MONTHLY.includes(p.unit)) || service.addons.some(a => MONTHLY.includes(a.unit));
  const [annual, setAnnual] = useState(false);
  const [planId, setPlanId] = useState<string | null>(service.plans.find(p => p.highlight)?.id ?? service.plans[0]?.id ?? null);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [seats, setSeats] = useState(10);

  const isCrm = service.id === "crm";
  useEffect(() => {
    if (!isCrm) return;
    const fit = planForSeats(seats);
    setPlanId(fit ? fit.id : null);
  }, [isCrm, seats]);

  const plan = service.plans.find(p => p.id === planId) ?? null;

  const money = (n: number) => formatMoney(n, currency, language);
  // Annual billing on a monthly figure: ten months for twelve, shown per month.
  const perMonth = (n: number) => {
    if (!annual) return n;
    const v = (n * 10) / 12;
    return currency === "EGP" ? Math.round(v / 10) * 10 : currency === "KWD" ? Math.round(v * 2) / 2 : Math.round(v);
  };
  const unitLabel = (u: Unit) =>
    u === "once" ? t.once : u === "month" ? t.month : u === "per-agent-month" ? t.perAgent
      : u === "per-user-month" ? t.perUser : u === "per-hour" ? t.perHour : t.perCamera;
  const shown = (n: number, u: Unit) => (MONTHLY.includes(u) ? perMonth(n) : n);

  const totals = useMemo(() => {
    let once = 0, month = 0;
    const lines: string[] = [];
    if (plan) {
      const v = amount(plan.price, currency);
      if (MONTHLY.includes(plan.unit)) month += v; else once += v;
      lines.push(`• ${service.name[language]}: ${plan.name[language]}${isCrm ? ` (${seats})` : ""}`);
    }
    for (const a of service.addons) {
      const q = picked[a.id] ?? 0;
      if (!q) continue;
      const v = amount(a.price, currency) * q;
      if (MONTHLY.includes(a.unit)) month += v; else once += v;
      lines.push(`• ${a.name[language]}${a.qty ? ` × ${q}` : ""}`);
    }
    return { once, month, lines };
  }, [plan, picked, currency, service, language, isCrm, seats]);

  const monthShown = perMonth(totals.month);
  // Annual billing is ten months of the monthly total, exactly.
  const yearly = currency === "KWD" ? Math.round(totals.month * 20) / 2 : totals.month * 10;
  const waText = [
    t.waIntro,
    ...totals.lines,
    `${t.waTotal} (${currency}): ${totals.once ? `${t.oneTime} ${money(totals.once)}` : ""}${totals.once && totals.month ? " + " : ""}${
      totals.month ? `${t.perMonth} ${money(monthShown)}${annual ? ` — ${t.annual}` : ""}` : ""}`,
  ].join("\n");
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  if (service.catalogue) return <CataloguePanel service={service} language={language} prefix={prefix} />;

  if (service.quoteOnly) {
    const q = `${t.waIntro}\n• ${service.name[language]}`;
    return (
      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-7">
          <h2 className="text-2xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{service.name[language]}</h2>
          <p className="text-muted-foreground mb-6">{service.tagline[language]}</p>
          <h3 className="font-bold mb-3">{t.quoteCovers}</h3>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {service.quoteOnly.what.map(w => (
              <li key={w.en} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{w[language]}</li>
            ))}
          </ul>
          <Link href={`${prefix}${service.href}`} className="inline-flex items-center gap-2 mt-6 font-semibold text-primary hover:gap-3 transition-all">
            {t.details}<ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-2xl bg-[var(--navy)] text-white p-7 flex flex-col">
          <h3 className="text-xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.quoteTitle}</h3>
          <p className="text-white/70 text-sm leading-relaxed flex-1">{t.quoteSub}</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(q)}`} target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />{t.askQuote}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{service.name[language]}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{service.tagline[language]}</p>
          </div>
          {recurring && (
            <div className="flex flex-col items-start gap-1">
              <div className="inline-flex p-1 rounded-full bg-muted">
                {[false, true].map(isAnnual => (
                  <button key={String(isAnnual)} type="button" aria-pressed={annual === isAnnual} onClick={() => setAnnual(isAnnual)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                      annual === isAnnual ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
                    {isAnnual ? t.annual : t.monthly}
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{t.annualNote}</span>
            </div>
          )}
        </div>

        {service.onSite && currency !== "EGP" && (
          <p className="mb-6 flex gap-2 text-sm rounded-xl bg-primary/10 text-foreground p-3">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{t.fine[2]}
          </p>
        )}

        {isCrm && (
          <div className="mb-6 rounded-2xl border border-border bg-card p-5">
            <label htmlFor="seats" className="font-bold block">{t.users}</label>
            <p className="text-xs text-muted-foreground mb-3">{t.usersHint}</p>
            <div className="flex items-center gap-4">
              <input id="seats" type="range" min={1} max={60} value={seats} onChange={e => setSeats(Number(e.target.value))}
                className="flex-1 accent-[var(--primary)]" />
              <span className="w-12 text-center font-extrabold text-lg">{seats}</span>
            </div>
            {seats > 40 && <p className="text-sm text-primary font-semibold mt-2">{t.over40}</p>}
          </div>
        )}

        <div className={`grid gap-4 ${service.plans.length >= 4 ? "sm:grid-cols-2" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
          {service.plans.map(p => (
            <PlanCard key={p.id} plan={p} on={p.id === planId} language={language}
              price={money(shown(amount(p.price, currency), p.unit))} unit={unitLabel(p.unit)}
              onPick={() => setPlanId(p.id === planId && !isCrm ? null : p.id)} />
          ))}
        </div>

        {service.addons.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold mb-3">{t.addons}</h3>
            <div className="space-y-3">
              {service.addons.map(a => (
                <AddOnRow key={a.id} addon={a} language={language} value={picked[a.id] ?? 0}
                  price={money(shown(amount(a.price, currency), a.unit))} unit={unitLabel(a.unit)}
                  onChange={v => setPicked(s => ({ ...s, [a.id]: v }))} />
              ))}
            </div>
          </div>
        )}

        {service.always.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold mb-3">{t.always}</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {service.always.map(w => (
                <li key={w.en} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{w[language]}</li>
              ))}
            </ul>
          </div>
        )}

        {service.surveyNote && (
          <div className="mt-8 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
            <h3 className="font-bold mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />{service.surveyNote.title[language]}</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {service.surveyNote.what.map(w => (
                <li key={w.en} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{w[language]}</li>
              ))}
            </ul>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${t.waIntro}\n• ${service.surveyNote.title[language]}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-bold">
              <MessageCircle className="w-4 h-4" aria-hidden="true" />{t.surveyBtn}
            </a>
          </div>
        )}
      </div>

      {/* The estimate: sticky beside the plans on a wide screen, after them on a phone. */}
      <aside className="rounded-2xl bg-[var(--navy)] text-white p-6 lg:sticky lg:top-28">
        <h3 className="text-lg font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.estimate}</h3>
        {totals.lines.length === 0 ? (
          <p className="text-white/60 text-sm">{t.nothing}</p>
        ) : (
          <>
            <ul className="space-y-1.5 text-sm text-white/80 mb-5">
              {totals.lines.map(l => <li key={l}>{l.replace(/^• /, "")}</li>)}
            </ul>
            {totals.once > 0 && (
              <div className="flex justify-between items-baseline border-t border-white/15 pt-3">
                <span className="text-white/70 text-sm">{t.oneTime}</span>
                <span className="text-2xl font-extrabold">{money(totals.once)}</span>
              </div>
            )}
            {totals.month > 0 && (
              <div className="flex justify-between items-baseline border-t border-white/15 pt-3 mt-3">
                <span className="text-white/70 text-sm">{t.perMonth}</span>
                <span className="text-2xl font-extrabold">{money(monthShown)}</span>
              </div>
            )}
            {totals.month > 0 && annual && (
              <p className="text-xs text-white/60 mt-1 text-end">{t.perYear}: {money(yearly)}</p>
            )}
          </>
        )}
        <a href={waHref} target="_blank" rel="noopener noreferrer"
          className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold ${
            totals.lines.length ? "" : "opacity-50 pointer-events-none"}`}>
          <MessageCircle className="w-4 h-4" aria-hidden="true" />{t.send}
        </a>
        <Link href={`${prefix}/contact`} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 font-bold hover:bg-white/10 transition-colors">
          {t.talk}
        </Link>
        <Link href={`${prefix}${service.href}`} className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          {isCrm ? t.compare : t.details}<ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}

function PlanCard({ plan, on, language, price, unit, onPick }: {
  plan: PlanItem; on: boolean; language: "en" | "ar"; price: string; unit: string; onPick: () => void;
}) {
  const t = T[language];
  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border bg-card transition-colors ${
      on ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"}`}>
      {plan.highlight && (
        <span className="absolute -top-3 start-5 px-3 py-0.5 rounded-full bg-primary text-white text-xs font-bold">{t.popular}</span>
      )}
      <h4 className="font-extrabold text-lg mb-2">{plan.name[language]}</h4>
      <div className="mb-4">
        {plan.from && <span className="block text-xs text-muted-foreground">{t.from}</span>}
        <span className="block text-3xl font-extrabold whitespace-nowrap">{price}</span>
        <span className="block text-sm text-muted-foreground">{unit}</span>
      </div>
      <ul className="space-y-2 flex-1 mb-5">
        {plan.includes.map(i => (
          <li key={i.en} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{i[language]}</li>
        ))}
      </ul>
      <button type="button" onClick={onPick} aria-pressed={on}
        className={`w-full py-2.5 rounded-full font-bold transition-colors ${
          on ? "bg-primary text-white" : "border border-primary text-primary hover:bg-primary/10"}`}>
        {on ? t.chosen : t.choose}
      </button>
    </div>
  );
}

function AddOnRow({ addon, language, value, price, unit, onChange }: {
  addon: AddOn; language: "en" | "ar"; value: number; price: string; unit: string; onChange: (v: number) => void;
}) {
  const q = addon.qty;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card">
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-sm">{addon.name[language]}</p>
        <p className="text-xs text-muted-foreground">
          {price} {unit}{addon.note ? ` · ${addon.note[language]}` : ""}
        </p>
      </div>
      {q ? (
        <div className="flex items-center gap-2" aria-label={q.label[language]}>
          <button type="button" aria-label="−" onClick={() => onChange(Math.max(q.min, value - (q.step ?? 1)))}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary"><Minus className="w-4 h-4" /></button>
          <input type="number" inputMode="numeric" min={q.min} max={q.max} value={value}
            onChange={e => onChange(Math.min(q.max, Math.max(q.min, Number(e.target.value) || 0)))}
            className="w-14 text-center rounded-lg border border-border bg-background py-1" aria-label={q.label[language]} />
          <button type="button" aria-label="+" onClick={() => onChange(Math.min(q.max, value + (q.step ?? 1)))}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary"><Plus className="w-4 h-4" /></button>
        </div>
      ) : (
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" aria-label={addon.name[language]} checked={value > 0} onChange={e => onChange(e.target.checked ? 1 : 0)} className="w-5 h-5 accent-[var(--primary)]" />
        </label>
      )}
    </div>
  );
}

/** Hardware: no prices — the visitor builds a list and asks for today's quote. */
function CataloguePanel({ service, language, prefix }: { service: Service; language: "en" | "ar"; prefix: string }) {
  const t = T[language];
  const isArabic = language === "ar";
  const [qty, setQty] = useState<Record<string, number>>({});
  const [cond, setCond] = useState<Record<string, "new" | "used">>({});
  const items = service.catalogue!.flatMap(g => g.items);
  const lines = items.filter(i => (qty[i.id] ?? 0) > 0).map(i => {
    const c = (i.conditions?.length ?? 0) > 1 ? ` — ${(cond[i.id] ?? "new") === "new" ? t.condNew : t.condUsed}` : "";
    return `${i.name[language]}${c} × ${qty[i.id]}`;
  });
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent([t.reqIntro, ...lines.map(l => `• ${l}`)].join("\n"))}`;

  return (
    <div className="mt-8 grid lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 min-w-0">
        <h2 className="text-2xl font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{service.name[language]}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.tagline[language]}</p>
        <p className="mb-6 flex gap-2 text-sm rounded-xl bg-primary/10 text-foreground p-3">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{t.catSub}
        </p>
        <div className="space-y-8">
          {service.catalogue!.map(g => (
            <div key={g.id}>
              <h3 className="font-bold mb-3">{g.name[language]}</h3>
              <div className="space-y-3">
                {g.items.map(i => (
                  <CatalogueRow key={i.id} item={i} language={language} value={qty[i.id] ?? 0} cond={cond[i.id] ?? "new"}
                    onQty={v => setQty(s => ({ ...s, [i.id]: v }))} onCond={c => setCond(s => ({ ...s, [i.id]: c }))} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {service.always.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold mb-3">{t.always}</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {service.always.map(w => (
                <li key={w.en} className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />{w[language]}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <aside className="rounded-2xl bg-[var(--navy)] text-white p-6 lg:sticky lg:top-28">
        <h3 className="text-lg font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.request}</h3>
        {lines.length === 0 ? (
          <p className="text-white/60 text-sm">{t.reqEmpty}</p>
        ) : (
          <ul className="space-y-1.5 text-sm text-white/80">{lines.map(l => <li key={l}>{l}</li>)}</ul>
        )}
        <a href={waHref} target="_blank" rel="noopener noreferrer"
          className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-bold text-center ${
            lines.length ? "" : "opacity-50 pointer-events-none"}`}>
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />{t.reqSend}
        </a>
        <Link href={`${prefix}/contact`} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/25 font-bold hover:bg-white/10 transition-colors">
          {t.talk}
        </Link>
        <Link href={`${prefix}${service.href}`} className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          {t.details}<ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}

function CatalogueRow({ item, language, value, cond, onQty, onCond }: {
  item: CatalogueItem; language: "en" | "ar"; value: number; cond: "new" | "used";
  onQty: (v: number) => void; onCond: (c: "new" | "used") => void;
}) {
  const t = T[language];
  const both = (item.conditions?.length ?? 0) > 1;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card">
      <div className="min-w-0 flex-1 basis-56">
        <p className="font-semibold text-sm">{item.name[language]}</p>
        <p className="text-xs text-muted-foreground">{item.detail[language]}</p>
      </div>
      {both && (
        <div className="inline-flex p-1 rounded-full bg-muted" role="radiogroup" aria-label={item.name[language]}>
          {(["new", "used"] as const).map(c => (
            <button key={c} type="button" role="radio" aria-checked={cond === c} onClick={() => onCond(c)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                cond === c ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
              {c === "new" ? t.condNew : t.condUsed}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <button type="button" aria-label="−" onClick={() => onQty(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary"><Minus className="w-4 h-4" /></button>
        <input type="number" inputMode="numeric" min={0} max={999} value={value}
          onChange={e => onQty(Math.min(999, Math.max(0, Number(e.target.value) || 0)))}
          className="w-14 text-center rounded-lg border border-border bg-background py-1" aria-label={`${t.qty}: ${item.name[language]}`} />
        <button type="button" aria-label="+" onClick={() => onQty(Math.min(999, value + 1))}
          className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary"><Plus className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
