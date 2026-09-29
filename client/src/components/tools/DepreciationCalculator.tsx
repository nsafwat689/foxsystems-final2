/**
 * Depreciation schedule, year by year: straight line, or declining balance (with the
 * usual switch to straight line once that gives more, so the asset reaches its residual).
 */
import { useMemo, useState } from "react";
import { Choice, Line, NumberField, Panel, ResultPanel, num } from "./fields";

interface Props { language: "en" | "ar" }
type M = "straight" | "declining";

const T = {
  en: {
    asset: "The asset", cost: "Cost", residual: "Residual value", life: "Useful life (years)", method: "Method", straight: "Straight line", declining: "Declining balance",
    factor: "Declining factor", factorHint: "2 = double declining balance", result: "Per year", first: "First year", monthly: "Straight-line per month", total: "Depreciable amount",
    sched: "Schedule", year: "Year", dep: "Depreciation", acc: "Accumulated", nbv: "Book value",
  },
  ar: {
    asset: "الأصل", cost: "التكلفة", residual: "القيمة المتبقية", life: "العمر الإنتاجي (سنوات)", method: "الطريقة", straight: "القسط الثابت", declining: "القسط المتناقص",
    factor: "معامل التناقص", factorHint: "2 = القسط المتناقص المضاعف", result: "لكل سنة", first: "السنة الأولى", monthly: "القسط الثابت شهريًا", total: "المبلغ القابل للإهلاك",
    sched: "الجدول", year: "السنة", dep: "الإهلاك", acc: "المجمع", nbv: "القيمة الدفترية",
  },
};

export default function DepreciationCalculator({ language }: Props) {
  const isArabic = language === "ar"; const t = T[language];
  const [cost, setCost] = useState(500000);
  const [residual, setResidual] = useState(50000);
  const [life, setLife] = useState(5);
  const [method, setMethod] = useState<M>("straight");
  const [factor, setFactor] = useState(2);

  const r = useMemo(() => {
    const C = Math.max(0, cost), R = Math.min(Math.max(0, residual), C), n = Math.max(1, Math.min(50, Math.round(life)));
    const rows: { y: number; dep: number; acc: number; nbv: number }[] = [];
    let nbv = C, acc = 0;
    for (let y = 1; y <= n; y++) {
      const left = n - y + 1, sl = (nbv - R) / left;
      let dep = method === "straight" ? (C - R) / n : Math.max((nbv * Math.max(1, factor)) / n, sl);
      if (y === n || nbv - dep < R) dep = nbv - R;
      acc += dep; nbv -= dep;
      rows.push({ y, dep, acc, nbv });
    }
    return { rows, total: C - R, monthly: (C - R) / n / 12 };
  }, [cost, residual, life, method, factor]);

  return (
    <div className="space-y-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title={t.asset}>
          <NumberField label={t.cost} value={cost} onChange={setCost} step={5000} />
          <NumberField label={t.residual} value={residual} onChange={setResidual} step={1000} />
          <NumberField label={t.life} value={life} onChange={setLife} min={1} max={50} />
          <Choice label={t.method} value={method} onChange={setMethod} options={[{ v: "straight", l: t.straight }, { v: "declining", l: t.declining }]} />
          {method === "declining" && <NumberField label={t.factor} value={factor} onChange={setFactor} step={0.5} min={1} max={4} hint={t.factorHint} />}
        </Panel>
        <ResultPanel kicker={t.result}>
          <dl className="space-y-2">
            <Line label={t.first} value={num(r.rows[0]?.dep ?? 0, 2)} strong />
            <Line label={t.monthly} value={num(r.monthly, 2)} />
            <Line label={t.total} value={num(r.total, 2)} muted />
          </dl>
        </ResultPanel>
      </div>
      <Panel title={t.sched}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-muted-foreground">{[t.year, t.dep, t.acc, t.nbv].map(h => <th key={h} className="py-2 px-2 text-start font-semibold">{h}</th>)}</tr></thead>
            <tbody>{r.rows.map(x => <tr key={x.y} className="border-t border-border"><td className="py-1.5 px-2 ltr-text">{x.y}</td>
              <td className="py-1.5 px-2 ltr-text">{num(x.dep, 2)}</td><td className="py-1.5 px-2 ltr-text">{num(x.acc, 2)}</td><td className="py-1.5 px-2 ltr-text">{num(x.nbv, 2)}</td></tr>)}</tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
