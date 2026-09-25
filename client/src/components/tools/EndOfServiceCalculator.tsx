/**
 * End-of-service benefit — models the policy the user enters.
 *
 * Deliberately NOT a statement of statutory entitlement. Egypt's framework is
 * built around social insurance rather than a universal employer-paid
 * gratuity, employment law gets revised, and the answer turns on the wage
 * base and the reason for leaving. So every parameter is an input, the page
 * carries a standing advisory, and nothing here claims to be the law.
 *
 * Service accrues PRO RATA including the partial year: a policy that credits
 * only completed years creates a cliff at eleven months, which is exactly the
 * kind of term that ends up disputed.
 */
import { useMemo, useState } from "react";
import { Choice, DateField, Line, NumberField, Panel, ResultPanel, num } from "./fields";
import { serviceYears } from "@/lib/serviceYears";

interface Props {
  language: "en" | "ar";
}

const T = {
  en: {
    employee: "The employee",
    wage: "Monthly wage",
    wageHint: "Whichever wage your contract specifies — basic alone gives a much smaller answer than total wage",
    start: "Start date",
    end: "Last working day",
    service: "Service",
    years: "years",
    policy: "Your policy",
    band1: "Days of wage per year, first years",
    band1Years: "…for how many years",
    band2: "Days of wage per year, thereafter",
    capMonths: "Cap, in months of wage",
    capHint: "Set to 0 for no cap",
    leaving: "Reason for leaving",
    full: "Termination — full",
    twoThirds: "Resignation — two thirds",
    oneThird: "Resignation — one third",
    none: "No entitlement",
    result: "Entitlement",
    dailyWage: "Daily wage",
    dailyHint: "Monthly wage ÷ 30",
    band1Line: "First years",
    band2Line: "Later years",
    subtotal: "Accrued",
    multiplier: "Leaving multiplier",
    capped: "Cap applied",
    total: "Payable",
    months: "Equivalent to",
    monthsUnit: "months of wage",
    invalid: "The last working day must be after the start date.",
  },
  ar: {
    employee: "الموظف",
    wage: "الأجر الشهري",
    wageHint: "الأجر الذي ينصّ عليه عقدك — فالأساسي وحده يعطي رقمًا أصغر بكثير من الأجر الشامل",
    start: "تاريخ بدء العمل",
    end: "آخر يوم عمل",
    service: "مدة الخدمة",
    years: "سنة",
    policy: "سياستك",
    band1: "أيام الأجر عن كل سنة، السنوات الأولى",
    band1Years: "…لكم سنة",
    band2: "أيام الأجر عن كل سنة، بعد ذلك",
    capMonths: "الحدّ الأقصى بأشهر الأجر",
    capHint: "اضبطه على صفر إن لم يوجد حدّ أقصى",
    leaving: "سبب انتهاء العلاقة",
    full: "إنهاء الخدمة — كامل",
    twoThirds: "استقالة — الثلثان",
    oneThird: "استقالة — الثلث",
    none: "دون استحقاق",
    result: "الاستحقاق",
    dailyWage: "الأجر اليومي",
    dailyHint: "الأجر الشهري ÷ 30",
    band1Line: "السنوات الأولى",
    band2Line: "السنوات التالية",
    subtotal: "المستحق",
    multiplier: "معامل سبب الانتهاء",
    capped: "طُبّق الحدّ الأقصى",
    total: "المبلغ المستحق",
    months: "ما يعادل",
    monthsUnit: "شهرًا من الأجر",
    invalid: "ينبغي أن يكون آخر يوم عمل بعد تاريخ بدء العمل.",
  },
};

export default function EndOfServiceCalculator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [wage, setWage] = useState(12000);
  const [start, setStart] = useState("2019-01-01");
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));
  const [band1Days, setBand1Days] = useState(15);
  const [band1Years, setBand1Years] = useState(5);
  const [band2Days, setBand2Days] = useState(30);
  const [capMonths, setCapMonths] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const r = useMemo(() => {
    // Calendar-accurate, not days ÷ 365.25 — see lib/serviceYears.ts for why
    // that difference put 25 units into the second accrual band on a case
    // that was exactly five years.
    const years = serviceYears(start, end);
    if (years === null) return null;
    const daily = Math.max(0, wage) / 30;

    const inBand1 = Math.min(years, Math.max(0, band1Years));
    const inBand2 = Math.max(0, years - Math.max(0, band1Years));

    const amount1 = inBand1 * Math.max(0, band1Days) * daily;
    const amount2 = inBand2 * Math.max(0, band2Days) * daily;
    const accrued = amount1 + amount2;

    const afterMultiplier = accrued * multiplier;
    const cap = capMonths > 0 ? capMonths * Math.max(0, wage) : Infinity;
    const total = Math.min(afterMultiplier, cap);

    return {
      serviceYears: years, daily, inBand1, inBand2, amount1, amount2, accrued,
      afterMultiplier, total, wasCapped: afterMultiplier > cap,
      monthsEquivalent: wage > 0 ? total / wage : 0,
    };
  }, [wage, start, end, band1Days, band1Years, band2Days, capMonths, multiplier]);

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <Panel title={t.employee}>
          <NumberField label={t.wage} value={wage} onChange={setWage} step={500} hint={t.wageHint} />
          <DateField label={t.start} value={start} onChange={setStart} />
          <DateField label={t.end} value={end} onChange={setEnd} />
        </Panel>

        <Panel title={t.policy}>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={t.band1} value={band1Days} onChange={setBand1Days} max={365} />
            <NumberField label={t.band1Years} value={band1Years} onChange={setBand1Years} max={50} />
          </div>
          <NumberField label={t.band2} value={band2Days} onChange={setBand2Days} max={365} />
          <NumberField label={t.capMonths} value={capMonths} onChange={setCapMonths} max={120} hint={t.capHint} />
          <Choice
            label={t.leaving}
            value={multiplier}
            onChange={setMultiplier}
            options={[
              { v: 1, l: t.full },
              { v: 2 / 3, l: t.twoThirds },
              { v: 1 / 3, l: t.oneThird },
              { v: 0, l: t.none },
            ]}
          />
        </Panel>
      </div>

      <div className="space-y-5">
        {r === null ? (
          <div className="p-5 rounded-2xl border border-amber-500/40 bg-amber-500/5 text-sm">{t.invalid}</div>
        ) : (
          <ResultPanel kicker={t.result}>
            <dl className="space-y-2">
              <Line label={t.service} value={`${num(r.serviceYears, 2)} ${t.years}`} muted />
              <Line label={t.dailyWage} value={num(r.daily, 2)} muted />
            </dl>

            <dl className="space-y-2 mt-4 pt-4 border-t border-border">
              <Line label={`${t.band1Line} (${num(r.inBand1, 2)} × ${band1Days})`} value={num(r.amount1)} />
              <Line label={`${t.band2Line} (${num(r.inBand2, 2)} × ${band2Days})`} value={num(r.amount2)} />
              <Line label={t.subtotal} value={num(r.accrued)} muted />
              {multiplier !== 1 && (
                <Line label={t.multiplier} value={`× ${num(multiplier * 100)}%`} muted />
              )}
              {r.wasCapped && <Line label={t.capped} value={`${capMonths} × ${num(wage)}`} muted />}
              <Line label={t.total} value={num(r.total)} strong />
            </dl>

            <p className="text-xs text-muted-foreground mt-3">
              {t.months} <span className="ltr-text font-bold">{num(r.monthsEquivalent, 1)}</span> {t.monthsUnit}
            </p>
          </ResultPanel>
        )}

        <div className="p-5 rounded-xl border border-border bg-muted/30">
          <p className="text-xs text-muted-foreground leading-relaxed">{t.dailyHint}</p>
        </div>
      </div>
    </div>
  );
}
