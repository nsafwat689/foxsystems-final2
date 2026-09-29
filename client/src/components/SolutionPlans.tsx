/**
 * The plans on a product page. Every Fox system sells on the same plans, so
 * this reads the CRM entry of the price list (servicePricing.ts, itself built
 * from crmPlans.ts) rather than keeping a copy that could drift.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { CURRENCIES, SERVICES, amount, formatMoney, guessCurrency, type Currency } from "@/data/servicePricing";

// Shared with the pricing page, so a visitor's currency choice follows them.
const CURRENCY_KEY = "fox_pricing_currency";

const T = {
  en: {
    kicker: "Plans and prices",
    title: "The same plans as every Fox system",
    sub: "One monthly price for the whole team, not per user. Implementation, data migration and training are included.",
    month: "/ month",
    popular: "Most complete",
    annual: "Annual: pay for 10 months instead of 12. Prices exclude tax.",
    more: "Compare what each plan includes",
  },
  ar: {
    kicker: "الباقات والأسعار",
    title: "الباقات نفسها لكل أنظمة فوكس",
    sub: "سعر شهري واحد للفريق كله لا لكل مستخدم، ويشمل التركيب ونقل البيانات والتدريب.",
    month: "/ شهريًا",
    popular: "الأشمل",
    annual: "الاشتراك السنوي: تدفع 10 أشهر بدلًا من 12. الأسعار لا تشمل الضريبة.",
    more: "قارن ما تشمله كل باقة",
  },
};

export default function SolutionPlans({ language, className = "" }: { language: "en" | "ar"; className?: string }) {
  const t = T[language];
  const prefix = language === "ar" ? "/ar" : "";
  const plans = SERVICES.find(s => s.id === "crm")?.plans ?? [];
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(CURRENCY_KEY); } catch { /* private mode */ }
    setCurrency(CURRENCIES.includes(saved as Currency) ? (saved as Currency) : guessCurrency());
  }, []);

  const pick = (c: Currency) => {
    setCurrency(c);
    try { localStorage.setItem(CURRENCY_KEY, c); } catch { /* ignore */ }
  };

  return (
    <section id="pricing" className={`mt-16 pt-14 border-t border-border scroll-mt-32 ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">{t.kicker}</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.title}</h2>
      <p className="text-muted-foreground mb-5 max-w-2xl">{t.sub}</p>

      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label={t.kicker}>
        {CURRENCIES.map(c => (
          <button key={c} type="button" onClick={() => pick(c)} aria-pressed={currency === c}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${currency === c ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary hover:text-primary"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto snap-x pb-2 [scrollbar-width:none]">
        {plans.map(p => (
          <div key={p.id} className={`snap-start shrink-0 w-[70%] sm:w-[40%] md:w-auto rounded-xl border p-5 ${p.highlight ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="font-semibold">{p.name[language]}</h3>
              {p.highlight && <span className="text-[11px] font-semibold rounded-full bg-primary text-primary-foreground px-2 py-0.5">{t.popular}</span>}
            </div>
            <p className="text-2xl font-bold ltr-text">{formatMoney(amount(p.price, currency), currency, language)}</p>
            <p className="text-xs text-muted-foreground mb-3">{t.month}</p>
            <p className="flex items-start gap-1.5 text-sm"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{p.includes[0]?.[language]}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-4">{t.annual}</p>
      <Link href={`${prefix}/services/crm#pricing`} onClick={() => window.trackCTA?.("solution-plans-compare")}
        className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-primary hover:underline">
        {t.more} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
      </Link>
    </section>
  );
}
