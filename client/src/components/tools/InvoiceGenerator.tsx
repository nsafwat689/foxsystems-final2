/**
 * Invoice / quotation generator, bilingual, print-to-PDF via the browser.
 *
 * Deliberately stateless: no upload, no account, nothing persisted. That is
 * the whole promise of the tool, and it is also why there is no logo upload —
 * an image would have to leave the browser to be rendered into the document.
 *
 * Printing is the browser's own dialog rather than a PDF library. jsPDF plus
 * html2canvas would add ~250 kB to a marketing site and rasterises Arabic
 * text badly; a print stylesheet gives selectable text and correct RTL.
 */
import { useMemo, useState } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";
import { CURRENCIES, amountInWords } from "@/lib/numberToWords";

interface Props {
  language: "en" | "ar";
}

type Line = { id: number; desc: string; qty: number; price: number };

const T = {
  en: {
    docType: "Document",
    invoice: "Invoice",
    quotation: "Quotation",
    yourDetails: "Your details",
    company: "Company name",
    address: "Address",
    phone: "Phone",
    email: "Email",
    taxId: "Tax registration number",
    billTo: "Bill to",
    clientName: "Client name",
    clientAddress: "Client address",
    meta: "Details",
    number: "Number",
    date: "Date",
    dueDate: "Due date",
    validUntil: "Valid until",
    currency: "Currency",
    vat: "VAT rate",
    items: "Items",
    desc: "Description",
    qty: "Qty",
    unitPrice: "Unit price",
    lineTotal: "Total",
    addLine: "Add line",
    remove: "Remove line",
    notes: "Notes / terms",
    subtotal: "Subtotal",
    vatLine: "VAT",
    total: "Total",
    inWords: "Amount in words",
    print: "Print or save as PDF",
    preview: "Preview",
    placeholderDesc: "Description of goods or services",
    defaultNotes: "Payment due within 30 days. Bank details on request.",
    defaultNotesQuote: "This quotation is valid for the period shown above. Prices exclude delivery unless stated.",
  },
  ar: {
    docType: "نوع المستند",
    invoice: "فاتورة",
    quotation: "عرض سعر",
    yourDetails: "بياناتك",
    company: "اسم الشركة",
    address: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    taxId: "رقم التسجيل الضريبي",
    billTo: "العميل",
    clientName: "اسم العميل",
    clientAddress: "عنوان العميل",
    meta: "البيانات",
    number: "الرقم",
    date: "التاريخ",
    dueDate: "تاريخ الاستحقاق",
    validUntil: "صالح حتى",
    currency: "العملة",
    vat: "نسبة ضريبة القيمة المضافة",
    items: "البنود",
    desc: "الوصف",
    qty: "الكمية",
    unitPrice: "سعر الوحدة",
    lineTotal: "الإجمالي",
    addLine: "أضف بندًا",
    remove: "احذف البند",
    notes: "ملاحظات / شروط",
    subtotal: "الإجمالي الفرعي",
    vatLine: "ضريبة القيمة المضافة",
    total: "الإجمالي",
    inWords: "المبلغ بالحروف",
    print: "اطبع أو احفظ بصيغة PDF",
    preview: "معاينة",
    placeholderDesc: "وصف السلعة أو الخدمة",
    defaultNotes: "السداد خلال 30 يومًا. بيانات الحساب البنكي عند الطلب.",
    defaultNotesQuote: "هذا العرض صالح للمدة المبيّنة أعلاه. الأسعار لا تشمل التوصيل ما لم يُذكر خلاف ذلك.",
  },
};

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (iso: string, days: number) => {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

export default function InvoiceGenerator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [isQuote, setIsQuote] = useState(false);
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [taxId, setTaxId] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [number, setNumber] = useState("0001");
  const [date, setDate] = useState(today);
  const [due, setDue] = useState(() => plusDays(today(), 30));
  const [currency, setCurrency] = useState("EGP");
  const [vat, setVat] = useState(14);
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<Line[]>([{ id: 1, desc: "", qty: 1, price: 0 }]);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + Math.max(0, l.qty) * Math.max(0, l.price), 0);
    const tax = subtotal * (Math.max(0, vat) / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total, words: amountInWords(total, currency, language) };
  }, [lines, vat, currency, language]);

  const setLine = (id: number, patch: Partial<Line>) =>
    setLines(ls => ls.map(l => (l.id === id ? { ...l, ...patch } : l)));

  const input = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none focus:border-primary";

  const labelled = (label: string, node: React.ReactNode) => (
    <label className="block">
      <span className="block text-xs font-semibold mb-1 text-muted-foreground">{label}</span>
      {node}
    </label>
  );

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      {/* ------------------------------- form ------------------------------- */}
      <div className="no-print space-y-5">
        <div className="p-5 rounded-2xl border border-border bg-card">
          <span className="block text-sm font-semibold mb-2">{t.docType}</span>
          <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border">
            {[{ v: false, l: t.invoice }, { v: true, l: t.quotation }].map(o => (
              <button
                key={String(o.v)}
                type="button"
                onClick={() => setIsQuote(o.v)}
                aria-pressed={isQuote === o.v}
                className={`px-5 py-1.5 rounded-md text-sm font-bold transition-all ${
                  isQuote === o.v ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
            <h3 className="font-extrabold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.yourDetails}</h3>
            {labelled(t.company, <input className={input} value={company} onChange={e => setCompany(e.target.value)} />)}
            {labelled(t.address, <input className={input} value={address} onChange={e => setAddress(e.target.value)} />)}
            {labelled(t.phone, <input className={`${input} ltr-text`} value={phone} onChange={e => setPhone(e.target.value)} />)}
            {labelled(t.email, <input className={`${input} ltr-text`} value={email} onChange={e => setEmail(e.target.value)} />)}
            {labelled(t.taxId, <input className={`${input} ltr-text`} value={taxId} onChange={e => setTaxId(e.target.value)} />)}
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
            <h3 className="font-extrabold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.billTo}</h3>
            {labelled(t.clientName, <input className={input} value={clientName} onChange={e => setClientName(e.target.value)} />)}
            {labelled(t.clientAddress, <input className={input} value={clientAddress} onChange={e => setClientAddress(e.target.value)} />)}
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
            <h3 className="font-extrabold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.meta}</h3>
            {labelled(t.number, <input className={`${input} ltr-text`} value={number} onChange={e => setNumber(e.target.value)} />)}
            {labelled(t.date, <input type="date" className={`${input} ltr-text`} value={date} onChange={e => setDate(e.target.value)} />)}
            {labelled(
              isQuote ? t.validUntil : t.dueDate,
              <input type="date" className={`${input} ltr-text`} value={due} onChange={e => setDue(e.target.value)} />,
            )}
            {labelled(
              t.currency,
              <select className={input} value={currency} onChange={e => setCurrency(e.target.value)}>
                {Object.keys(CURRENCIES).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>,
            )}
            {labelled(
              t.vat,
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background focus-within:border-primary">
                <input
                  type="number"
                  className="w-full bg-transparent outline-none text-sm ltr-text"
                  value={vat}
                  min={0}
                  max={100}
                  step={0.5}
                  onChange={e => setVat(Number(e.target.value))}
                />
                <span className="text-muted-foreground text-sm">%</span>
              </div>,
            )}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card">
          <h3 className="font-extrabold text-sm mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.items}</h3>
          <div className="space-y-2">
            {lines.map(l => (
              <div key={l.id} className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
                <input
                  className={`${input} flex-1 min-w-0`}
                  placeholder={t.placeholderDesc}
                  value={l.desc}
                  onChange={e => setLine(l.id, { desc: e.target.value })}
                />
                <input
                  type="number"
                  className={`${input} w-20 ltr-text`}
                  value={l.qty}
                  min={0}
                  onChange={e => setLine(l.id, { qty: Number(e.target.value) })}
                  aria-label={t.qty}
                />
                <input
                  type="number"
                  className={`${input} w-28 ltr-text`}
                  value={l.price}
                  min={0}
                  step={0.01}
                  onChange={e => setLine(l.id, { price: Number(e.target.value) })}
                  aria-label={t.unitPrice}
                />
                <span className="w-28 text-sm font-semibold text-end ltr-text">{fmt(l.qty * l.price)}</span>
                <button
                  type="button"
                  onClick={() => setLines(ls => (ls.length > 1 ? ls.filter(x => x.id !== l.id) : ls))}
                  className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  aria-label={t.remove}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setLines(ls => [...ls, { id: Math.max(0, ...ls.map(x => x.id)) + 1, desc: "", qty: 1, price: 0 }])}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-primary hover:gap-2.5 transition-all"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            {t.addLine}
          </button>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card">
          {labelled(
            t.notes,
            <textarea
              className={`${input} min-h-[5rem]`}
              value={notes}
              placeholder={isQuote ? t.defaultNotesQuote : t.defaultNotes}
              onChange={e => setNotes(e.target.value)}
            />,
          )}
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:gap-3 transition-all"
        >
          <Printer className="w-4 h-4" aria-hidden="true" />
          {t.print}
        </button>

        <h3 className="text-lg font-extrabold pt-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.preview}</h3>
      </div>

      {/* ----------------------------- document ----------------------------- */}
      <div className="print-area mt-4 p-8 rounded-2xl border border-border bg-white text-black" dir={isArabic ? "rtl" : "ltr"}>
        <div className="flex justify-between gap-6 flex-wrap mb-8">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">{company || t.company}</h2>
            {address && <p className="text-sm">{address}</p>}
            {phone && <p className="text-sm ltr-text">{phone}</p>}
            {email && <p className="text-sm ltr-text">{email}</p>}
            {taxId && <p className="text-sm">{t.taxId}: <span className="ltr-text">{taxId}</span></p>}
          </div>
          <div className={isArabic ? "text-start" : "text-end"}>
            <p className="text-3xl font-extrabold uppercase tracking-wide mb-2">
              {isQuote ? t.quotation : t.invoice}
            </p>
            <p className="text-sm">{t.number}: <span className="ltr-text font-semibold">{number}</span></p>
            <p className="text-sm">{t.date}: <span className="ltr-text font-semibold">{date}</span></p>
            <p className="text-sm">
              {isQuote ? t.validUntil : t.dueDate}: <span className="ltr-text font-semibold">{due}</span>
            </p>
          </div>
        </div>

        <div className="mb-6 pb-4 border-b border-black/20">
          <p className="text-xs font-bold uppercase tracking-wider mb-1">{t.billTo}</p>
          <p className="font-semibold">{clientName || "—"}</p>
          {clientAddress && <p className="text-sm">{clientAddress}</p>}
        </div>

        <table className="w-full text-sm border-collapse mb-6">
          <thead>
            <tr className="border-b-2 border-black/30">
              <th scope="col" className="text-start py-2 font-bold">{t.desc}</th>
              <th scope="col" className="text-end py-2 font-bold w-16">{t.qty}</th>
              <th scope="col" className="text-end py-2 font-bold w-28">{t.unitPrice}</th>
              <th scope="col" className="text-end py-2 font-bold w-28">{t.lineTotal}</th>
            </tr>
          </thead>
          <tbody>
            {lines.map(l => (
              <tr key={l.id} className="border-b border-black/10">
                <td className="py-2">{l.desc || "—"}</td>
                <td className="py-2 text-end ltr-text">{l.qty}</td>
                <td className="py-2 text-end ltr-text">{fmt(l.price)}</td>
                <td className="py-2 text-end ltr-text font-semibold">{fmt(l.qty * l.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-6">
          <dl className="w-full max-w-xs space-y-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt>{t.subtotal}</dt>
              <dd className="ltr-text font-semibold">{fmt(totals.subtotal)} {currency}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>{t.vatLine} ({vat}%)</dt>
              <dd className="ltr-text font-semibold">{fmt(totals.tax)} {currency}</dd>
            </div>
            <div className="flex justify-between gap-4 pt-2 border-t-2 border-black/30 text-base font-extrabold">
              <dt>{t.total}</dt>
              <dd className="ltr-text">{fmt(totals.total)} {currency}</dd>
            </div>
          </dl>
        </div>

        <div className="mb-6 p-3 bg-black/5 rounded">
          <p className="text-xs font-bold uppercase tracking-wider mb-1">{t.inWords}</p>
          <p className="text-sm">{totals.words}</p>
        </div>

        <p className="text-sm whitespace-pre-line">
          {notes || (isQuote ? t.defaultNotesQuote : t.defaultNotes)}
        </p>
      </div>
    </div>
  );
}
