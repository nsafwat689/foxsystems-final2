/**
 * Financing calculator: the installment for flat, reducing-balance or murabaha pricing,
 * the total cost, and the true APR once the admin fee is counted — the number that lets a
 * borrower compare two offers quoted in different ways.
 */
import { useMemo, useState } from "react";
import { Choice, Line, NumberField, Panel, ResultPanel, num } from "./fields";
import { installment, monthlyIrr, schedule, type Method } from "./financeMath";

interface Props { language: "en" | "ar" }

const T = {
  en: {
    loan: "The financing", amount: "Amount financed", rate: "Quoted rate (a year)", months: "Term (months)", method: "How the rate is applied",
    flat: "Flat", reducing: "Reducing balance", murabaha: "Murabaha", fee: "Admin fee", feeHint: "Taken from the amount at disbursement",
    result: "What it really costs", inst: "Monthly installment", profit: "Total profit / interest", total: "Total repaid", feeAmt: "Admin fee",
    received: "Cash actually received", apr: "True APR (fees included)", ear: "Effective annual rate",
    compare: "The same rate as reducing balance would mean an installment of", sched: "First months of the schedule",
    colN: "#", colPay: "Installment", colPrin: "Principal", colProf: "Profit", colBal: "Balance", showAll: "Show all months", showLess: "Show fewer",
    note: "Flat and murabaha pricing charge profit on the original amount for the whole term, even as you repay it — so the true cost is close to double the quoted flat rate.",
  },
  ar: {
    loan: "التمويل", amount: "مبلغ التمويل", rate: "العائد المعلن (سنويًا)", months: "المدة (بالأشهر)", method: "طريقة احتساب العائد",
    flat: "ثابت", reducing: "متناقص", murabaha: "مرابحة", fee: "المصاريف الإدارية", feeHint: "تُخصم من المبلغ عند الصرف",
    result: "التكلفة الحقيقية", inst: "القسط الشهري", profit: "إجمالي العائد / الفائدة", total: "إجمالي المسدَّد", feeAmt: "المصاريف الإدارية",
    received: "المبلغ المستلم فعلًا", apr: "معدل التكلفة السنوي الحقيقي (شامل المصاريف)", ear: "المعدل السنوي الفعلي",
    compare: "العائد نفسه بطريقة الرصيد المتناقص يعني قسطًا قدره", sched: "الأشهر الأولى من الجدول",
    colN: "#", colPay: "القسط", colPrin: "الأصل", colProf: "العائد", colBal: "الرصيد", showAll: "عرض كل الأشهر", showLess: "عرض أقل",
    note: "العائد الثابت والمرابحة يُحسبان على المبلغ الأصلي طوال المدة حتى وأنت تسدد، لذلك تقترب التكلفة الحقيقية من ضعف النسبة الثابتة المعلنة.",
  },
};

export default function FinancingCalculator({ language }: Props) {
  const isArabic = language === "ar"; const t = T[language];
  const [amount, setAmount] = useState(200000);
  const [rate, setRate] = useState(20);
  const [months, setMonths] = useState(36);
  const [method, setMethod] = useState<Method>("flat");
  const [fee, setFee] = useState(1.5);
  const [all, setAll] = useState(false);

  const r = useMemo(() => {
    const n = Math.max(1, Math.min(360, Math.round(months))), P = Math.max(0, amount);
    const pay = installment(P, Math.max(0, rate), n, method);
    const total = pay * n, feeAmt = (P * Math.max(0, fee)) / 100;
    const i = monthlyIrr(P - feeAmt, pay, n);
    return { n, pay, total, profit: total - P, feeAmt, received: P - feeAmt, apr: i * 12 * 100, ear: (Math.pow(1 + i, 12) - 1) * 100,
      reducingPay: installment(P, Math.max(0, rate), n, "reducing"), rows: schedule(P, Math.max(0, rate), n, method) };
  }, [amount, rate, months, method, fee]);

  return (
    <div className="space-y-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t.loan}>
          <NumberField label={t.amount} value={amount} onChange={setAmount} step={1000} />
          <NumberField label={t.rate} value={rate} onChange={setRate} suffix="%" step={0.5} max={100} />
          <NumberField label={t.months} value={months} onChange={setMonths} step={1} min={1} max={360} />
          <Choice label={t.method} value={method} onChange={setMethod} options={[{ v: "flat", l: t.flat }, { v: "reducing", l: t.reducing }, { v: "murabaha", l: t.murabaha }]} />
          <NumberField label={t.fee} value={fee} onChange={setFee} suffix="%" step={0.25} max={20} hint={t.feeHint} />
        </Panel>
        <div className="space-y-5">
          <ResultPanel kicker={t.result}>
            <dl className="space-y-2">
              <Line label={t.inst} value={num(r.pay, 2)} strong />
              <Line label={t.profit} value={num(r.profit, 2)} />
              <Line label={t.total} value={num(r.total, 2)} />
              <Line label={t.feeAmt} value={num(r.feeAmt, 2)} muted />
              <Line label={t.received} value={num(r.received, 2)} muted />
            </dl>
            <dl className="space-y-2 mt-4 pt-4 border-t border-border">
              <Line label={t.apr} value={`${num(r.apr, 2)}%`} strong />
              <Line label={t.ear} value={`${num(r.ear, 2)}%`} muted />
            </dl>
          </ResultPanel>
          {method !== "reducing" && <div className="p-5 rounded-xl border border-border bg-muted/30 space-y-2">
            <p className="text-sm">{t.compare} <b className="ltr-text">{num(r.reducingPay, 2)}</b></p>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.note}</p>
          </div>}
        </div>
      </div>
      <Panel title={t.sched}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-muted-foreground">{[t.colN, t.colPay, t.colPrin, t.colProf, t.colBal].map(h => <th key={h} className="py-2 px-2 text-start font-semibold">{h}</th>)}</tr></thead>
            <tbody>{(all ? r.rows : r.rows.slice(0, 12)).map(x => <tr key={x.n} className="border-t border-border">
              <td className="py-1.5 px-2 ltr-text">{x.n}</td><td className="py-1.5 px-2 ltr-text">{num(x.payment, 2)}</td><td className="py-1.5 px-2 ltr-text">{num(x.principal, 2)}</td>
              <td className="py-1.5 px-2 ltr-text">{num(x.profit, 2)}</td><td className="py-1.5 px-2 ltr-text">{num(x.balance, 2)}</td></tr>)}</tbody>
          </table>
        </div>
        {r.rows.length > 12 && <button type="button" onClick={() => setAll(!all)} className="text-sm font-semibold text-primary">{all ? t.showLess : t.showAll}</button>}
      </Panel>
    </div>
  );
}
