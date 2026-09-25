/**
 * Real estate commission — agency rate, agent pool, splits by role.
 *
 * The roles mirror the ones the Fox real estate CRM stores on a commission
 * split (lead / support / referral / manager) so a figure worked out here
 * transfers into the system without being reinterpreted.
 *
 * The four role shares are normalised to 100% on display rather than being
 * clamped as they are typed: clamping fights the user halfway through editing,
 * and silently paying out more than the pool is the worse failure.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, Info } from "lucide-react";

interface Props {
  language: "en" | "ar";
}

const T = {
  en: {
    deal: "The deal",
    price: "Unit price",
    agencyRate: "Agency commission from the developer",
    agentPool: "Paid out to the agents",
    agentPoolHint: "The rest stays with the agency for office, marketing and salaries",
    splits: "Split by role",
    splitsHint: "These four should add to 100% of the agent pool",
    lead: "Closing agent",
    support: "Support",
    referral: "Referral",
    manager: "Manager override",
    deductions: "Deductions from the agent",
    tax: "Tax withheld",
    advance: "Advance already paid",
    marketing: "Marketing charged back",
    result: "Result",
    agencyGross: "Agency commission",
    agencyKeeps: "Agency keeps",
    poolLine: "Agent pool",
    whoGetsWhat: "Who gets what",
    net: "Net to the closing agent",
    netHint: "After their share is reduced by tax, advance and marketing",
    normalised: "Role shares add to {sum}%, so they have been normalised to 100% for this calculation.",
    perDeal: "per deal",
    monthly: "If you close this many a month",
    monthlyResult: "Monthly to the closing agent",
    talk: "Put this in a system",
    seeCrm: "See the real estate CRM",
    note: "Worth knowing",
    noteList: [
      "Agency rates in Egypt are negotiated, not fixed — use the rate on your own agreement.",
      "Agree the split in writing before the deal. Deriving it afterwards from what is left is where disputes start.",
      "Roles survive staff changes; personal arrangements do not.",
      "Nothing you enter leaves your browser.",
    ],
  },
  ar: {
    deal: "الصفقة",
    price: "سعر الوحدة",
    agencyRate: "عمولة الشركة من المطوّر",
    agentPool: "المدفوع للمندوبين",
    agentPoolHint: "ويبقى الباقي لدى الشركة للمكتب والتسويق والرواتب",
    splits: "التقسيم بحسب الدور",
    splitsHint: "ينبغي أن يبلغ مجموع هذه الأربعة 100% من مجمّع المندوبين",
    lead: "المندوب المنفِّذ",
    support: "الدعم",
    referral: "الإحالة",
    manager: "حصة المدير",
    deductions: "الاستقطاعات من المندوب",
    tax: "الضريبة المحتجزة",
    advance: "سلفة مدفوعة سلفًا",
    marketing: "تسويق محمَّل عليه",
    result: "النتيجة",
    agencyGross: "عمولة الشركة",
    agencyKeeps: "ما تحتفظ به الشركة",
    poolLine: "مجمّع المندوبين",
    whoGetsWhat: "من يأخذ ماذا",
    net: "الصافي للمندوب المنفِّذ",
    netHint: "بعد خصم الضريبة والسلفة والتسويق من حصته",
    normalised: "مجموع حصص الأدوار {sum}%، لذا جرت معايرتها إلى 100% في هذا الحساب.",
    perDeal: "لكل صفقة",
    monthly: "إن أتممت هذا العدد شهريًا",
    monthlyResult: "الشهري للمندوب المنفِّذ",
    talk: "ضع هذا في نظام",
    seeCrm: "استعرض نظام CRM العقاري",
    note: "ما يجدر معرفته",
    noteList: [
      "نسب عمولة الشركات في مصر تُتفاوض ولا تكون ثابتة — استخدم النسبة الواردة في اتفاقك أنت.",
      "اتفقوا على التقسيم كتابةً قبل الصفقة. فاستنتاجه بعدها مما تبقّى هو مبدأ الخلافات.",
      "الأدوار تبقى رغم تغيّر الموظفين، والترتيبات الشخصية لا تبقى.",
      "لا يغادر ما تُدخله متصفحك.",
    ],
  },
};

const money = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function CommissionCalculator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [price, setPrice] = useState(3000000);
  const [agencyRate, setAgencyRate] = useState(3);
  const [pool, setPool] = useState(50);
  const [lead, setLead] = useState(70);
  const [support, setSupport] = useState(15);
  const [referral, setReferral] = useState(5);
  const [manager, setManager] = useState(10);
  const [tax, setTax] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [marketing, setMarketing] = useState(0);
  const [perMonth, setPerMonth] = useState(2);

  const r = useMemo(() => {
    const gross = Math.max(0, price) * (agencyRate / 100);
    const agentPool = gross * (pool / 100);
    const agencyKeeps = gross - agentPool;

    const sum = lead + support + referral + manager;
    const norm = sum > 0 ? sum : 1;
    const share = (pct: number) => agentPool * (pct / norm);

    const leadShare = share(lead);
    const leadNet = Math.max(0, leadShare - leadShare * (tax / 100) - advance - marketing);

    return {
      gross, agentPool, agencyKeeps, sum,
      parts: [
        { key: "lead", label: t.lead, pct: lead, amount: leadShare },
        { key: "support", label: t.support, pct: support, amount: share(support) },
        { key: "referral", label: t.referral, pct: referral, amount: share(referral) },
        { key: "manager", label: t.manager, pct: manager, amount: share(manager) },
      ],
      leadNet,
      monthly: leadNet * Math.max(0, perMonth),
    };
  }, [price, agencyRate, pool, lead, support, referral, manager, tax, advance, marketing, perMonth, t]);

  const field = (
    label: string,
    value: number,
    onChange: (n: number) => void,
    opts: { suffix?: string; step?: number; hint?: string; max?: number } = {},
  ) => (
    <div>
      <label className="block">
        <span className="block text-sm font-semibold mb-1.5">{label}</span>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background focus-within:border-primary transition-colors">
          <input
            type="number"
            inputMode="numeric"
            className="w-full bg-transparent outline-none text-sm font-semibold ltr-text"
            value={value}
            min={0}
            max={opts.max}
            step={opts.step ?? 1}
            onChange={e => onChange(Number(e.target.value))}
          />
          {opts.suffix && <span className="text-muted-foreground text-sm">{opts.suffix}</span>}
        </div>
      </label>
      {opts.hint && <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{opts.hint}</p>}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.deal}</h3>
          {field(t.price, price, setPrice, { step: 50000 })}
          {field(t.agencyRate, agencyRate, setAgencyRate, { suffix: "%", step: 0.25, max: 100 })}
          {field(t.agentPool, pool, setPool, { suffix: "%", max: 100, hint: t.agentPoolHint })}
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.splits}</h3>
          <p className="text-xs text-muted-foreground -mt-2">{t.splitsHint}</p>
          <div className="grid grid-cols-2 gap-3">
            {field(t.lead, lead, setLead, { suffix: "%", max: 100 })}
            {field(t.support, support, setSupport, { suffix: "%", max: 100 })}
            {field(t.referral, referral, setReferral, { suffix: "%", max: 100 })}
            {field(t.manager, manager, setManager, { suffix: "%", max: 100 })}
          </div>
          {r.sum !== 100 && (
            <p className="flex gap-2 text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {t.normalised.replace("{sum}", String(r.sum))}
            </p>
          )}
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.deductions}</h3>
          {field(t.tax, tax, setTax, { suffix: "%", max: 100 })}
          {field(t.advance, advance, setAdvance, { step: 1000 })}
          {field(t.marketing, marketing, setMarketing, { step: 1000 })}
        </div>
      </div>

      <div className="space-y-5">
        <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
          <p className="text-xs font-bold tracking-wider uppercase text-primary mb-4">{t.result}</p>
          <dl className="space-y-2 mb-4">
            <div className="flex justify-between gap-3">
              <dt className="text-sm font-semibold">{t.agencyGross}</dt>
              <dd className="text-lg font-extrabold ltr-text">{money(r.gross)}</dd>
            </div>
            <div className="flex justify-between gap-3 text-sm text-muted-foreground">
              <dt>{t.agencyKeeps}</dt>
              <dd className="ltr-text font-semibold">{money(r.agencyKeeps)}</dd>
            </div>
            <div className="flex justify-between gap-3 text-sm text-muted-foreground">
              <dt>{t.poolLine}</dt>
              <dd className="ltr-text font-semibold">{money(r.agentPool)}</dd>
            </div>
          </dl>

          <p className="text-xs font-bold mb-2 pt-3 border-t border-border">{t.whoGetsWhat}</p>
          <dl className="space-y-1.5">
            {r.parts.map(p => (
              <div key={p.key} className="flex justify-between gap-3 text-sm">
                <dt className="text-muted-foreground">{p.label}</dt>
                <dd className="font-semibold ltr-text">{money(p.amount)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">{t.net}</p>
            <p className="text-3xl font-extrabold text-primary ltr-text" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {money(r.leadNet)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{t.netHint}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card">
          {field(t.monthly, perMonth, setPerMonth, { max: 100 })}
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">{t.monthlyResult}</p>
            <p className="text-2xl font-extrabold ltr-text" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {money(r.monthly)}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-border bg-muted/30">
          <h4 className="flex items-center gap-2 font-bold text-sm mb-2">
            <Info className="w-4 h-4 text-primary" aria-hidden="true" />
            {t.note}
          </h4>
          <ul className="space-y-1.5 mb-4">
            {t.noteList.map(a => (
              <li key={a} className="text-xs text-muted-foreground leading-relaxed">• {a}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${isArabic ? "/ar" : ""}/solutions/real-estate-crm`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:gap-3 transition-all"
            >
              {t.seeCrm}
              <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
            </Link>
            <Link
              href={`${isArabic ? "/ar" : ""}/contact`}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-border text-sm font-bold hover:border-primary/50 transition-colors"
            >
              {t.talk}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
