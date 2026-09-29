/**
 * Deposit and certificate interest: the interest a term deposit, certificate or savings
 * balance earns, after the tax withheld on interest, paid monthly, at maturity or compounded.
 */
import { useMemo, useState } from "react";
import { Choice, Line, NumberField, Panel, ResultPanel, num } from "./fields";

interface Props { language: "en" | "ar" }
type Payout = "maturity" | "monthly" | "compound";

const T = {
  en: {
    deposit: "The deposit", amount: "Amount deposited", rate: "Interest rate (a year)", months: "Term (months)", tax: "Tax withheld on interest",
    taxHint: "Check the rate that applies to your deposit and your status", payout: "Interest paid", maturity: "At maturity", monthly: "Every month", compound: "Added to the balance",
    result: "What you earn", gross: "Interest before tax", taxAmt: "Tax withheld", net: "Net interest", perMonth: "Net interest each month", end: "Balance at the end", yield: "Net yield a year",
  },
  ar: {
    deposit: "الوديعة", amount: "المبلغ المودَع", rate: "العائد (سنويًا)", months: "المدة (بالأشهر)", tax: "الضريبة المخصومة من العائد",
    taxHint: "تحقق من النسبة المطبقة على وديعتك ووضعك الضريبي", payout: "صرف العائد", maturity: "عند الاستحقاق", monthly: "شهريًا", compound: "يُضاف إلى الرصيد",
    result: "ما تحصل عليه", gross: "العائد قبل الضريبة", taxAmt: "الضريبة المخصومة", net: "صافي العائد", perMonth: "صافي العائد الشهري", end: "الرصيد في النهاية", yield: "صافي العائد السنوي",
  },
};

export default function DepositCalculator({ language }: Props) {
  const isArabic = language === "ar"; const t = T[language];
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(20);
  const [months, setMonths] = useState(12);
  const [tax, setTax] = useState(20);
  const [payout, setPayout] = useState<Payout>("monthly");

  const r = useMemo(() => {
    const P = Math.max(0, amount), rr = Math.max(0, rate) / 100, n = Math.max(1, Math.round(months)), tx = Math.max(0, tax) / 100;
    let gross: number;
    if (payout === "compound") {
      // interest added monthly, net of tax, so later months earn on it too
      let bal = P, g = 0;
      for (let k = 0; k < n; k++) { const i = bal * rr / 12; g += i; bal += i * (1 - tx); }
      gross = g;
    } else gross = P * rr * (n / 12);
    const taxAmt = gross * tx, net = gross - taxAmt;
    const end = payout === "monthly" ? P : P + net;
    return { gross, taxAmt, net, perMonth: net / n, end, yield: P ? (net / P) * (12 / n) * 100 : 0 };
  }, [amount, rate, months, tax, payout]);

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <Panel title={t.deposit}>
        <NumberField label={t.amount} value={amount} onChange={setAmount} step={5000} />
        <NumberField label={t.rate} value={rate} onChange={setRate} suffix="%" step={0.25} max={100} />
        <NumberField label={t.months} value={months} onChange={setMonths} min={1} max={120} />
        <NumberField label={t.tax} value={tax} onChange={setTax} suffix="%" step={1} max={100} hint={t.taxHint} />
        <Choice label={t.payout} value={payout} onChange={setPayout} options={[{ v: "monthly", l: t.monthly }, { v: "maturity", l: t.maturity }, { v: "compound", l: t.compound }]} />
      </Panel>
      <ResultPanel kicker={t.result}>
        <dl className="space-y-2">
          <Line label={t.gross} value={num(r.gross, 2)} />
          <Line label={t.taxAmt} value={`− ${num(r.taxAmt, 2)}`} muted />
          <Line label={t.net} value={num(r.net, 2)} strong />
        </dl>
        <dl className="space-y-2 mt-4 pt-4 border-t border-border">
          {payout === "monthly" && <Line label={t.perMonth} value={num(r.perMonth, 2)} />}
          <Line label={t.end} value={num(r.end, 2)} />
          <Line label={t.yield} value={`${num(r.yield, 2)}%`} muted />
        </dl>
      </ResultPanel>
    </div>
  );
}
