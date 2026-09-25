/**
 * VAT and withholding, both directions.
 *
 * The two things this exists to get right:
 *   - Going backwards from a VAT-inclusive figure divides by (1 + rate). It
 *     does NOT subtract the percentage: on 114 at 14%, subtracting gives
 *     98.04 instead of 100. That error is on a lot of real invoices.
 *   - Withholding is deducted from the NET value of the supply, not from the
 *     VAT-inclusive total, so it never touches the VAT figure.
 *
 * No rate is hard-coded as fact. Rates change and depend on the supply, so
 * every one is an input with a labelled default.
 */
import { useMemo, useState } from "react";
import { Choice, Line, NumberField, Panel, ResultPanel, num } from "./fields";

interface Props {
  language: "en" | "ar";
}

const T = {
  en: {
    amountPanel: "The amount",
    amount: "Amount",
    basis: "This amount is",
    exclusive: "Before VAT",
    inclusive: "VAT included",
    vatRate: "VAT rate",
    whtPanel: "Withholding",
    apply: "Client withholds tax",
    yes: "Yes",
    no: "No",
    whtRate: "Withholding rate",
    whtHint: "Deducted from the net value of the supply, never from the VAT-inclusive total",
    result: "On this invoice",
    net: "Net (before VAT)",
    vat: "VAT",
    gross: "Invoice total",
    wht: "Withheld by the client",
    receive: "You receive",
    remit: "You remit as VAT",
    youKeep: "Of which the VAT is not yours",
    note: "The withheld amount is not a cost — it is your own income tax, paid early on your behalf. Keep the certificate and set it against what you owe at the year end.",
  },
  ar: {
    amountPanel: "المبلغ",
    amount: "المبلغ",
    basis: "هذا المبلغ",
    exclusive: "قبل الضريبة",
    inclusive: "شامل الضريبة",
    vatRate: "نسبة ضريبة القيمة المضافة",
    whtPanel: "الخصم تحت حساب الضريبة",
    apply: "العميل يخصم تحت حساب الضريبة",
    yes: "نعم",
    no: "لا",
    whtRate: "نسبة الخصم",
    whtHint: "يُخصم من القيمة الصافية للتوريد، لا من الإجمالي الشامل للضريبة",
    result: "في هذه الفاتورة",
    net: "الصافي (قبل الضريبة)",
    vat: "ضريبة القيمة المضافة",
    gross: "إجمالي الفاتورة",
    wht: "المخصوم من العميل",
    receive: "ما تستلمه",
    remit: "ما تورّده ضريبةً مضافة",
    youKeep: "ومنه أن الضريبة ليست لك",
    note: "المبلغ المخصوم ليس تكلفة، بل هو ضريبة دخلك أنت مدفوعةً مبكرًا نيابةً عنك. فاحتفظ بالشهادة واخصمها مما تدين به في نهاية السنة.",
  },
};

export default function VatCalculator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [amount, setAmount] = useState(10000);
  const [inclusive, setInclusive] = useState(false);
  const [vatRate, setVatRate] = useState(14);
  const [applyWht, setApplyWht] = useState(true);
  const [whtRate, setWhtRate] = useState(3);

  const r = useMemo(() => {
    const a = Math.max(0, amount);
    const rate = Math.max(0, vatRate) / 100;
    // Backwards from a VAT-inclusive figure: divide, never subtract.
    const net = inclusive ? a / (1 + rate) : a;
    const vat = net * rate;
    const gross = net + vat;
    const wht = applyWht ? net * (Math.max(0, whtRate) / 100) : 0;
    return { net, vat, gross, wht, receive: gross - wht };
  }, [amount, inclusive, vatRate, applyWht, whtRate]);

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <Panel title={t.amountPanel}>
          <NumberField label={t.amount} value={amount} onChange={setAmount} step={100} />
          <Choice
            label={t.basis}
            value={inclusive}
            onChange={setInclusive}
            options={[
              { v: false, l: t.exclusive },
              { v: true, l: t.inclusive },
            ]}
          />
          <NumberField label={t.vatRate} value={vatRate} onChange={setVatRate} suffix="%" step={0.5} max={100} />
        </Panel>

        <Panel title={t.whtPanel}>
          <Choice
            label={t.apply}
            value={applyWht}
            onChange={setApplyWht}
            options={[
              { v: true, l: t.yes },
              { v: false, l: t.no },
            ]}
          />
          {applyWht && (
            <NumberField
              label={t.whtRate}
              value={whtRate}
              onChange={setWhtRate}
              suffix="%"
              step={0.5}
              max={100}
              hint={t.whtHint}
            />
          )}
        </Panel>
      </div>

      <div className="space-y-5">
        <ResultPanel kicker={t.result}>
          <dl className="space-y-2">
            <Line label={t.net} value={num(r.net, 2)} />
            <Line label={t.vat} value={num(r.vat, 2)} />
            <Line label={t.gross} value={num(r.gross, 2)} strong />
          </dl>

          {applyWht && (
            <dl className="space-y-2 mt-4 pt-4 border-t border-border">
              <Line label={t.wht} value={`− ${num(r.wht, 2)}`} muted />
              <Line label={t.receive} value={num(r.receive, 2)} strong />
            </dl>
          )}

          <dl className="space-y-2 mt-4 pt-4 border-t border-border">
            <Line label={t.remit} value={num(r.vat, 2)} muted />
          </dl>
        </ResultPanel>

        {applyWht && (
          <div className="p-5 rounded-xl border border-border bg-muted/30">
            <p className="text-xs text-muted-foreground leading-relaxed">{t.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
