/**
 * Debt-burden ratio: how much of a borrower's monthly income already goes to debt, the
 * largest new installment the lender's ceiling allows, and the amount that installment buys.
 */
import { useMemo, useState } from "react";
import { Choice, Line, NumberField, Panel, ResultPanel, num } from "./fields";
import { installment, maxPrincipal, type Method } from "./financeMath";

interface Props { language: "en" | "ar" }

const T = {
  en: {
    borrower: "The borrower", income: "Net monthly income", obligations: "Current monthly installments", ceiling: "Lender's DBR ceiling",
    ceilingHint: "Commonly 35–50% of net income; each lender and regulator sets its own", financing: "The financing", rate: "Rate (a year)", months: "Term (months)",
    method: "Pricing", flat: "Flat", reducing: "Reducing", request: "Amount requested (optional)",
    result: "Affordability", now: "Debt burden today", room: "Largest new installment", max: "Largest amount you can finance",
    withReq: "Debt burden with the requested amount", reqInst: "Its installment", ok: "Within the ceiling", over: "Above the ceiling",
  },
  ar: {
    borrower: "العميل", income: "صافي الدخل الشهري", obligations: "الأقساط الشهرية الحالية", ceiling: "حد عبء الدين لدى الجهة المموّلة",
    ceilingHint: "عادةً بين 35% و50% من صافي الدخل، وتحدده كل جهة وجهة رقابية", financing: "التمويل", rate: "العائد (سنويًا)", months: "المدة (بالأشهر)",
    method: "طريقة العائد", flat: "ثابت", reducing: "متناقص", request: "المبلغ المطلوب (اختياري)",
    result: "القدرة على السداد", now: "عبء الدين الحالي", room: "أكبر قسط جديد ممكن", max: "أكبر مبلغ يمكن تمويله",
    withReq: "عبء الدين مع المبلغ المطلوب", reqInst: "قسطه الشهري", ok: "في حدود النسبة", over: "أعلى من النسبة",
  },
};

export default function DbrCalculator({ language }: Props) {
  const isArabic = language === "ar"; const t = T[language];
  const [income, setIncome] = useState(25000);
  const [obl, setObl] = useState(3000);
  const [ceiling, setCeiling] = useState(50);
  const [rate, setRate] = useState(21);
  const [months, setMonths] = useState(36);
  const [method, setMethod] = useState<Method>("flat");
  const [req, setReq] = useState(0);

  const r = useMemo(() => {
    const inc = Math.max(0, income), room = Math.max(0, (inc * Math.max(0, ceiling)) / 100 - Math.max(0, obl));
    const reqInst = req > 0 ? installment(req, Math.max(0, rate), months, method) : 0;
    return { now: inc ? (Math.max(0, obl) / inc) * 100 : 0, room, max: maxPrincipal(room, Math.max(0, rate), months, method), reqInst,
      withReq: inc ? ((Math.max(0, obl) + reqInst) / inc) * 100 : 0 };
  }, [income, obl, ceiling, rate, months, method, req]);

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <Panel title={t.borrower}>
          <NumberField label={t.income} value={income} onChange={setIncome} step={500} />
          <NumberField label={t.obligations} value={obl} onChange={setObl} step={250} />
          <NumberField label={t.ceiling} value={ceiling} onChange={setCeiling} suffix="%" step={1} max={100} hint={t.ceilingHint} />
        </Panel>
        <Panel title={t.financing}>
          <NumberField label={t.rate} value={rate} onChange={setRate} suffix="%" step={0.5} max={100} />
          <NumberField label={t.months} value={months} onChange={setMonths} min={1} max={360} />
          <Choice label={t.method} value={method} onChange={setMethod} options={[{ v: "flat", l: t.flat }, { v: "reducing", l: t.reducing }]} />
          <NumberField label={t.request} value={req} onChange={setReq} step={5000} />
        </Panel>
      </div>
      <ResultPanel kicker={t.result}>
        <dl className="space-y-2">
          <Line label={t.now} value={`${num(r.now, 1)}%`} />
          <Line label={t.room} value={num(r.room, 2)} />
          <Line label={t.max} value={num(r.max, 0)} strong />
        </dl>
        {req > 0 && <dl className="space-y-2 mt-4 pt-4 border-t border-border">
          <Line label={t.reqInst} value={num(r.reqInst, 2)} />
          <Line label={t.withReq} value={`${num(r.withReq, 1)}%`} strong />
          <p className={`text-sm font-bold ${r.withReq <= ceiling ? "text-emerald-600" : "text-red-600"}`}>{r.withReq <= ceiling ? t.ok : t.over}</p>
        </dl>}
      </ResultPanel>
    </div>
  );
}
