/**
 * Property payment-schedule generator.
 *
 * Mirrors the plan generator in the Fox real estate CRM, including the rule
 * that matters most: every instalment is rounded to whole currency units and
 * the FINAL one absorbs the difference, so the schedule sums to the contract
 * value exactly. Rounding each line independently leaves a plan that is a few
 * pounds short of the contract — an error that surfaces years later, in front
 * of a buyer holding a receipt.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Info, Printer } from "lucide-react";

interface Props {
  language: "en" | "ar";
}

const FREQS = [
  { id: "monthly", perYear: 12, en: "Monthly", ar: "شهري" },
  { id: "quarterly", perYear: 4, en: "Quarterly", ar: "ربع سنوي" },
  { id: "yearly", perYear: 1, en: "Yearly", ar: "سنوي" },
];

const T = {
  en: {
    plan: "The plan",
    price: "Unit price",
    down: "Down payment",
    handover: "Handover payment",
    handoverHint: "Held back until delivery. Set to 0 if there is none.",
    years: "Plan length",
    yearsSuffix: "years",
    freq: "Instalment frequency",
    start: "Contract date",
    summary: "Summary",
    toSpread: "Spread over instalments",
    count: "Instalments",
    each: "Each instalment",
    lastOne: "Final instalment",
    lastHint: "Absorbs the rounding so the schedule totals the contract value exactly",
    checkTotal: "Schedule total",
    schedule: "Schedule",
    no: "#",
    dueDate: "Due",
    amount: "Amount",
    running: "Paid to date",
    downRow: "Down payment",
    handoverRow: "Handover",
    print: "Print or save as PDF",
    seeCrm: "See how the CRM tracks these",
    note: "Worth knowing",
    noteList: [
      "No interest is applied — Egyptian developer plans are conventionally quoted as a price over a period. If yours charges interest, price it into the unit value.",
      "Dates step by month, quarter or year from the contract date, with no adjustment for weekends or holidays.",
      "This is a working schedule, not a contract. Put your own legal wording around it.",
      "Nothing you enter leaves your browser, and nothing is saved when you close the tab.",
    ],
  },
  ar: {
    plan: "الخطة",
    price: "سعر الوحدة",
    down: "المقدَّم",
    handover: "دفعة التسليم",
    handoverHint: "محتجزة إلى حين الاستلام. اضبطها على صفر إن لم توجد.",
    years: "مدة الخطة",
    yearsSuffix: "سنوات",
    freq: "تواتر الأقساط",
    start: "تاريخ العقد",
    summary: "الملخّص",
    toSpread: "الموزَّع على الأقساط",
    count: "عدد الأقساط",
    each: "قيمة القسط",
    lastOne: "القسط الأخير",
    lastHint: "يستوعب التقريب ليبلغ مجموع الجدول قيمة العقد بالضبط",
    checkTotal: "مجموع الجدول",
    schedule: "الجدول",
    no: "م",
    dueDate: "الاستحقاق",
    amount: "المبلغ",
    running: "المسدَّد حتى تاريخه",
    downRow: "المقدَّم",
    handoverRow: "التسليم",
    print: "اطبع أو احفظ بصيغة PDF",
    seeCrm: "شاهد كيف يتتبّع النظام هذه الخطط",
    note: "ما يجدر معرفته",
    noteList: [
      "لا تُطبَّق فائدة — فخطط المطوّرين في مصر تُعرَض عرفًا كسعر على مدة. وإن كانت خطتك تتضمن فائدة فاحسبها ضمن قيمة الوحدة.",
      "تتدرّج التواريخ بالشهر أو الربع أو السنة من تاريخ العقد، دون مراعاة العطلات ونهايات الأسبوع.",
      "هذا جدول عملي لا عقد. فاحرص على صياغتك القانونية الخاصة حوله.",
      "لا يغادر ما تُدخله متصفحك، ولا يُحفظ شيء حين تغلق التبويب.",
    ],
  },
};

const money = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/** ISO date, stepped by whole months so quarter/year fall on the same day. */
function addMonths(iso: string, months: number): string {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  // Clamp to the last day of the target month (31 Jan + 1 month = 28/29 Feb).
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, last));
  return d.toISOString().slice(0, 10);
}

export default function InstallmentPlanGenerator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [price, setPrice] = useState(3000000);
  const [downPct, setDownPct] = useState(10);
  const [handoverPct, setHandoverPct] = useState(5);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState("quarterly");
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));

  const r = useMemo(() => {
    const p = Math.max(0, price);
    const f = FREQS.find(x => x.id === freq) ?? FREQS[0];
    const down = Math.round(p * (downPct / 100));
    const handover = Math.round(p * (handoverPct / 100));
    const spread = Math.max(0, p - down - handover);
    const count = Math.max(1, Math.round(years * f.perYear));
    const step = 12 / f.perYear;

    const each = Math.round(spread / count);
    // The final line carries the whole rounding difference, so the schedule
    // adds up to the contract value and not to "about" the contract value.
    const last = spread - each * (count - 1);

    const rows: Array<{ n: number | null; label: string | null; date: string; amount: number }> = [];
    rows.push({ n: null, label: t.downRow, date: start, amount: down });
    for (let i = 1; i <= count; i++) {
      rows.push({ n: i, label: null, date: addMonths(start, step * i), amount: i === count ? last : each });
    }
    if (handover > 0) {
      rows.push({ n: null, label: t.handoverRow, date: addMonths(start, step * count), amount: handover });
    }

    let running = 0;
    const withRunning = rows.map(x => {
      running += x.amount;
      return { ...x, running };
    });

    return { down, handover, spread, count, each, last, rows: withRunning, total: running };
  }, [price, downPct, handoverPct, years, freq, start, t]);

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
    <div dir={isArabic ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* inputs */}
        <div className="space-y-5 no-print">
          <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
            <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.plan}</h3>
            {field(t.price, price, setPrice, { step: 50000 })}
            {field(t.down, downPct, setDownPct, { suffix: "%", max: 100, step: 1 })}
            {field(t.handover, handoverPct, setHandoverPct, { suffix: "%", max: 100, hint: t.handoverHint })}
            {field(t.years, years, setYears, { suffix: t.yearsSuffix, max: 30 })}
            <label className="block">
              <span className="block text-sm font-semibold mb-1.5">{t.freq}</span>
              <select
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-semibold outline-none focus:border-primary"
                value={freq}
                onChange={e => setFreq(e.target.value)}
              >
                {FREQS.map(f => (
                  <option key={f.id} value={f.id}>{isArabic ? f.ar : f.en}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-semibold mb-1.5">{t.start}</span>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-semibold outline-none focus:border-primary ltr-text"
                value={start}
                onChange={e => setStart(e.target.value)}
              />
            </label>
          </div>

          <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
            <p className="text-xs font-bold tracking-wider uppercase text-primary mb-3">{t.summary}</p>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{t.down}</dt>
                <dd className="font-semibold ltr-text">{money(r.down)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{t.toSpread}</dt>
                <dd className="font-semibold ltr-text">{money(r.spread)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{t.count}</dt>
                <dd className="font-semibold ltr-text">{r.count}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{t.each}</dt>
                <dd className="font-semibold ltr-text">{money(r.each)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{t.lastOne}</dt>
                <dd className="font-semibold ltr-text">{money(r.last)}</dd>
              </div>
              <div className="flex justify-between gap-3 pt-2 mt-1 border-t border-border">
                <dt className="font-bold">{t.checkTotal}</dt>
                <dd className="font-extrabold text-primary ltr-text">{money(r.total)}</dd>
              </div>
            </dl>
            <p className="text-xs text-muted-foreground mt-2 leading-snug">{t.lastHint}</p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:gap-3 transition-all"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            {t.print}
          </button>
        </div>

        {/* schedule */}
        <div className="lg:col-span-2 min-w-0 print-area">
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <caption className="sr-only">{t.schedule}</caption>
              <thead>
                <tr className="bg-muted/50">
                  <th scope="col" className="text-start font-bold p-3 border-b border-border w-12">{t.no}</th>
                  <th scope="col" className="text-start font-bold p-3 border-b border-border">{t.dueDate}</th>
                  <th scope="col" className="text-end font-bold p-3 border-b border-border">{t.amount}</th>
                  <th scope="col" className="text-end font-bold p-3 border-b border-border hidden sm:table-cell">{t.running}</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row, i) => (
                  <tr key={i} className={i % 2 ? "bg-muted/20" : ""}>
                    <td className="p-3 border-b border-border font-semibold ltr-text">{row.n ?? "—"}</td>
                    <td className="p-3 border-b border-border">
                      <span className="ltr-text">{row.date}</span>
                      {row.label && <span className="ms-2 text-xs text-muted-foreground">{row.label}</span>}
                    </td>
                    <td className="p-3 border-b border-border text-end font-semibold ltr-text">{money(row.amount)}</td>
                    <td className="p-3 border-b border-border text-end text-muted-foreground ltr-text hidden sm:table-cell">
                      {money(row.running)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 rounded-xl border border-border bg-muted/30 no-print">
        <h4 className="flex items-center gap-2 font-bold text-sm mb-2">
          <Info className="w-4 h-4 text-primary" aria-hidden="true" />
          {t.note}
        </h4>
        <ul className="space-y-1.5 mb-4">
          {t.noteList.map(a => (
            <li key={a} className="text-xs text-muted-foreground leading-relaxed">• {a}</li>
          ))}
        </ul>
        <Link
          href={`${isArabic ? "/ar" : ""}/solutions/real-estate-crm`}
          className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all text-sm"
        >
          {t.seeCrm}
          <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
