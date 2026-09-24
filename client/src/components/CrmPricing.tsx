/**
 * CRM pricing and commitments.
 *
 * Deliberately NOT claiming "lowest price in the market". Checked against 2026
 * published pricing: Freshsales from ~$9/user, Zoho from ~$14/user, and most
 * SMB CRMs between $25 and $60/user. Fox Systems is below that band from ten
 * users up ($20/user at 10, $16 at 25, $17.50 at 40) but ABOVE the cheapest
 * self-serve tiers at two users — so a blanket "cheapest" claim would be
 * false, and a false price claim is both a legal and a trust problem.
 *
 * The honest and stronger position is flat team pricing: the per-seat vendors
 * bill implementation and support separately and scale linearly with
 * headcount, while these bundles include both.
 *
 * Every figure here came from the business owner. Nothing is invented — if a
 * term is not listed, it was not given.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Headphones, MapPin, Sparkles } from "lucide-react";

interface Props {
  language: "en" | "ar";
}

type Plan = {
  id: string;
  users: { en: string; ar: string };
  monthly: number;
  name: { en: string; ar: string };
  highlight?: boolean;
  extras?: { en: string; ar: string }[];
};

const PLANS: Plan[] = [
  // Lowered from $100 to $50 on the owner's instruction (2026-09-24) so the
  // entry tier sits at the low end of the market band rather than above it.
  // At $25/user this now matches the cheapest of the $25-60 range most SMB
  // CRMs charge, which makes every tier at or below that band.
  { id: "starter", name: { en: "Starter", ar: "البداية" }, users: { en: "Up to 2 users", ar: "حتى مستخدمين" }, monthly: 50 },
  { id: "team", name: { en: "Team", ar: "الفريق" }, users: { en: "Up to 10 users", ar: "حتى ١٠ مستخدمين" }, monthly: 200 },
  { id: "growth", name: { en: "Growth", ar: "النمو" }, users: { en: "Up to 15 users", ar: "حتى ١٥ مستخدم" }, monthly: 300 },
  { id: "business", name: { en: "Business", ar: "الأعمال" }, users: { en: "Up to 25 users", ar: "حتى ٢٥ مستخدم" }, monthly: 400 },
  {
    id: "complete",
    name: { en: "Complete", ar: "الشامل" },
    users: { en: "Up to 40 users", ar: "حتى ٤٠ مستخدم" },
    monthly: 700,
    highlight: true,
    extras: [
      { en: "Business website included, free", ar: "موقع إلكتروني للشركة مجانًا" },
      { en: "Mobile application included, free", ar: "تطبيق موبايل مجانًا" },
      { en: "Priority support response", ar: "أولوية في زمن الاستجابة" },
    ],
  },
];

const T = {
  en: {
    kicker: "Pricing",
    title: "CRM pricing, in plain numbers",
    sub: "Flat pricing per team, not per seat. Implementation, training and support are included — not billed separately once you have signed.",
    monthly: "Monthly",
    annual: "Annual",
    annualNote: "Pay for 10 months instead of 12",
    perMonth: "/month",
    billedAnnually: "billed annually",
    saves: "2 months free",
    popular: "Most complete",
    included: "Included in every plan",
    includedItems: [
      "Standard or customised CRM, built for your sector",
      "Full Arabic and English interface, right-to-left throughout",
      "Implementation, data migration and team training",
      "24/7 support, plus on-site visits when needed",
      "Your data stays yours — full export on request",
    ],
    terms: "Contract options",
    termItems: [
      "Monthly, with no long commitment",
      "6-month contract — one month free",
      "Annual — pay for 10 months instead of 12",
    ],
    bigger: "More than 40 users?",
    biggerSub: "Larger teams are quoted individually, because the work stops being about seats and starts being about integration and rollout.",
    talk: "Talk to sales",
    compare: "How this compares",
    compareBody:
      "Published 2026 pricing puts most small-business CRMs between $25 and $60 per user per month, with implementation and support charged on top. From ten users up, these bundles work out between $16 and $20 per user with both included. Below that, a self-serve tool may cost you less per seat — we will tell you if that is the honest answer for your situation.",
    cta: "Get a quote for your team",
    fineprint: "Prices in USD per month, excluding tax. A written quote is valid for a stated period.",
  },
  ar: {
    kicker: "الأسعار",
    title: "أسعار الـ CRM بأرقام واضحة",
    sub: "سعر ثابت للفريق، مش لكل مستخدم. التركيب والتدريب والدعم مشمولين — مش فاتورة منفصلة بعد التوقيع.",
    monthly: "شهري",
    annual: "سنوي",
    annualNote: "ادفع ١٠ شهور بدل ١٢",
    perMonth: "/شهريًا",
    billedAnnually: "محاسبة سنوية",
    saves: "شهرين مجانًا",
    popular: "الأشمل",
    included: "مشمول في كل الباقات",
    includedItems: [
      "CRM قياسي أو مخصص، متبني لمجال شغلك",
      "واجهة كاملة بالعربي والإنجليزي، باتجاه من اليمين لليسار",
      "التركيب ونقل البيانات وتدريب الفريق",
      "دعم ٢٤/٧، وزيارات في الموقع عند الحاجة",
      "بياناتك ملكك — تصدير كامل عند الطلب",
    ],
    terms: "خيارات التعاقد",
    termItems: [
      "شهري، من غير التزام طويل",
      "عقد ٦ شهور — شهر مجانًا",
      "سنوي — ادفع ١٠ شهور بدل ١٢",
    ],
    bigger: "أكتر من ٤٠ مستخدم؟",
    biggerSub: "الفرق الأكبر بيتسعّرلها عرض خاص، لأن الشغل بيبقى عن الربط والتشغيل مش عن عدد المستخدمين.",
    talk: "كلّم المبيعات",
    compare: "مقارنة بالسوق",
    compareBody:
      "الأسعار المنشورة لسنة ٢٠٢٦ بتحط معظم أنظمة CRM للشركات الصغيرة بين ٢٥ و٦٠ دولار لكل مستخدم شهريًا، والتركيب والدعم فوقهم. من ١٠ مستخدمين وفوق، الباقات دي بتطلع بين ١٦ و٢٠ دولار للمستخدم والاتنين مشمولين. تحت كده، ممكن أداة جاهزة تكلّفك أقل لكل مستخدم — وهنقولك لو ده هو الرد الصادق لحالتك.",
    cta: "اطلب عرض سعر لفريقك",
    fineprint: "الأسعار بالدولار شهريًا، بدون ضرائب. عرض السعر المكتوب صالح لمدة محددة.",
  },
};

export default function CrmPricing({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";
  const [annual, setAnnual] = useState(false);

  // Annual = pay for 10 months instead of 12, shown as an effective monthly rate.
  const shown = (p: Plan) => (annual ? Math.round((p.monthly * 10) / 12) : p.monthly);

  return (
    <section className="mt-16 pt-14 border-t border-border" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 mb-7">
        <span className="pill pill-gold self-start">{t.kicker}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {t.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.sub}</p>
      </div>

      {/* billing toggle */}
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted/60 border border-border mb-7">
        {[false, true].map(isAnnual => (
          <button
            key={String(isAnnual)}
            type="button"
            onClick={() => setAnnual(isAnnual)}
            aria-pressed={annual === isAnnual}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              annual === isAnnual ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isAnnual ? t.annual : t.monthly}
            {isAnnual && <span className="ms-2 text-[11px] font-semibold opacity-90">· {t.saves}</span>}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`flex flex-col p-5 rounded-2xl border ${
              p.highlight ? "border-2 border-primary bg-primary/5 shadow-lg shadow-primary/10" : "border-border bg-card"
            }`}
          >
            {p.highlight && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-primary mb-2">
                <Sparkles className="w-3 h-3" aria-hidden="true" /> {t.popular}
              </span>
            )}
            <h3 className="font-extrabold text-lg" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {p.name[language]}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{p.users[language]}</p>

            <div className="mb-1">
              <span className="text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                ${shown(p)}
              </span>
              <span className="text-sm text-muted-foreground">{t.perMonth}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 min-h-[1.2rem]">
              {annual ? t.billedAnnually : " "}
            </p>

            {p.extras && (
              <ul className="space-y-1.5 mb-4">
                {p.extras.map(e => (
                  <li key={e.en} className="flex gap-2 text-xs leading-snug">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{e[language]}</span>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href={`${prefix}/contact`}
              className={`mt-auto text-center px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                p.highlight
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border border-border hover:border-primary/50"
              }`}
            >
              {t.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* what every plan includes + contract terms */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <div className="p-6 rounded-xl border border-border bg-muted/30">
          <h3 className="font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.included}
          </h3>
          <ul className="space-y-2">
            {t.includedItems.map(item => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-xl border border-border bg-muted/30">
          <h3 className="font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.terms}
          </h3>
          <ul className="space-y-2 mb-5">
            {t.termItems.map(item => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-border">
            <span className="inline-flex items-center gap-2 font-semibold">
              <Headphones className="w-4 h-4 text-primary" aria-hidden="true" /> 24/7
            </span>
            <span className="inline-flex items-center gap-2 font-semibold">
              <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
              {isArabic ? "دعم في الموقع" : "On-site support"}
            </span>
          </div>
        </div>
      </div>

      {/* honest market comparison */}
      <div className="mt-6 p-6 rounded-xl border border-border bg-card">
        <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {t.compare}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{t.compareBody}</p>
      </div>

      {/* larger teams */}
      <div className="mt-6 rounded-2xl bg-[var(--navy)] text-white p-7 flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-xl">
          <h3 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.bigger}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">{t.biggerSub}</p>
        </div>
        <Link
          href={`${prefix}/contact`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--navy)] font-bold hover:gap-3 transition-all"
        >
          {t.talk}
          <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
        </Link>
      </div>

      <p className="text-xs text-muted-foreground/70 mt-4">{t.fineprint}</p>
    </section>
  );
}
