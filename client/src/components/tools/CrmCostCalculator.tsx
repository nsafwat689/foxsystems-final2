/**
 * CRM cost calculator — per-seat vendor versus a flat team bundle.
 *
 * The honesty rule matters more than the marketing here: below about six
 * users a cheap self-serve CRM really is cheaper, and the verdict says so.
 * A calculator on a vendor's own site that always concludes "buy from us" is
 * obvious within two inputs and costs more trust than it wins deals — and the
 * pricing page already promises to say when a self-serve tool is the honest
 * answer, so a rigged result here would contradict it.
 *
 * Everything runs in the browser; nothing is posted anywhere unless the
 * visitor uses the lead form underneath.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Info } from "lucide-react";
import { planForSeats, effectiveMonthly } from "@/data/crmPlans";

interface Props {
  language: "en" | "ar";
}

/** Typical bands for the small-business CRM market, not any named vendor's quote. */
const SEAT_PRESETS = [
  { id: "budget", price: 10, en: "Budget / self-serve", ar: "اقتصادية / جاهزة" },
  { id: "mid", price: 25, en: "Mid-market", ar: "متوسطة" },
  { id: "premium", price: 50, en: "Premium", ar: "متقدّمة" },
];

const T = {
  en: {
    yourTeam: "Your team",
    users: "Users",
    term: "Term you are committing to",
    oneYear: "1 year",
    threeYears: "3 years",
    billing: "Billing",
    monthly: "Monthly",
    annual: "Annual",
    annualHint: "Annual = pay for 10 months instead of 12",
    theirQuote: "The per-seat quote you are comparing",
    perSeat: "Price per user, per month",
    presetHint: "Typical market bands — replace with the figure on your quote",
    setup: "Implementation & migration (one-off)",
    training: "Training (one-off)",
    support: "Support uplift",
    supportHint: "Premium support is usually a percentage of licence spend, so it grows with the team",
    results: "Over {n} months",
    perSeatTotal: "Per-seat vendor",
    foxTotal: "Fox Systems",
    licences: "Licences",
    oneOff: "Implementation & training",
    supportLine: "Support",
    included: "Included",
    noSetupFee: "No setup fee",
    total: "Total",
    effective: "Effective cost per user per month",
    plan: "Plan that fits: ",
    perMonth: "per month",
    verdictFoxTitle: "A flat bundle is cheaper for you",
    verdictFoxBody:
      "At {users} users over {n} months you would pay {diff} less with a flat team bundle, and implementation, training and 24/7 support are already inside that figure.",
    verdictOtherTitle: "Honestly? A per-seat tool is cheaper for you",
    verdictOtherBody:
      "At {users} users the per-seat option works out {diff} cheaper over {n} months. For a team this small that is usually the right call — the trade is that the setup, the data migration and the support are yours to handle. We would rather tell you that than sell you something you do not need.",
    verdictCloseTitle: "It is close either way",
    verdictCloseBody:
      "There is only {diff} between the two over {n} months, which is inside the margin of the assumptions you have entered. At that point the decision is about who does the implementation and who answers the phone when it breaks, not about price.",
    overTitle: "Over 40 users — this needs a quote",
    overBody:
      "Past 40 users the work stops being about seats and starts being about integration and rollout, so the honest answer is a conversation rather than a number from a calculator.",
    talk: "Talk to sales",
    seePlans: "See the plans in full",
    assumptions: "What this assumes",
    assumptionList: [
      "Figures are in US dollars and exclude tax.",
      "The Fox Systems column uses the published plan price for your user count, with implementation, migration, training and 24/7 support included and no setup fee.",
      "The per-seat column applies your support uplift to the licence line only, which is how it is normally quoted.",
      "Nothing you enter leaves your browser.",
    ],
  },
  ar: {
    yourTeam: "فريقك",
    users: "عدد المستخدمين",
    term: "المدة التي تلتزم بها",
    oneYear: "سنة واحدة",
    threeYears: "3 سنوات",
    billing: "المحاسبة",
    monthly: "شهرية",
    annual: "سنوية",
    annualHint: "السنوية = تدفع عشرة أشهر بدلًا من اثني عشر",
    theirQuote: "عرض السعر لكل مستخدم الذي تقارن به",
    perSeat: "السعر لكل مستخدم شهريًا",
    presetHint: "نطاقات السوق المعتادة — استبدلها بالرقم الوارد في عرضك",
    setup: "التركيب ونقل البيانات (مرة واحدة)",
    training: "التدريب (مرة واحدة)",
    support: "نسبة الدعم",
    supportHint: "يُسعَّر الدعم المتميّز عادةً كنسبة من قيمة التراخيص، فينمو مع حجم الفريق",
    results: "على مدى {n} شهرًا",
    perSeatTotal: "مورّد يحاسب لكل مستخدم",
    foxTotal: "فوكس سيستمز",
    licences: "التراخيص",
    oneOff: "التركيب والتدريب",
    supportLine: "الدعم",
    included: "مشمول",
    noSetupFee: "بلا رسوم تركيب",
    total: "الإجمالي",
    effective: "التكلفة الفعلية لكل مستخدم شهريًا",
    plan: "الباقة المناسبة: ",
    perMonth: "شهريًا",
    verdictFoxTitle: "الباقة الثابتة أقل تكلفة لك",
    verdictFoxBody:
      "عند {users} مستخدمًا وعلى مدى {n} شهرًا ستدفع أقل بمقدار {diff} مع باقة ثابتة للفريق، والتركيب والتدريب والدعم على مدار الساعة داخلة في هذا الرقم بالفعل.",
    verdictOtherTitle: "بصراحة؟ التسعير لكل مستخدم أقل تكلفة لك",
    verdictOtherBody:
      "عند {users} مستخدمًا يكون خيار التسعير لكل مستخدم أقل بمقدار {diff} على مدى {n} شهرًا. ولفريق بهذا الحجم يكون ذلك القرار الصحيح عادةً، والمقابل أن يقع التركيب ونقل البيانات والدعم على عاتقك. ونحن نفضّل إخبارك بهذا على أن نبيعك ما لا تحتاج إليه.",
    verdictCloseTitle: "الفارق ضئيل في الحالتين",
    verdictCloseBody:
      "لا يفصل بين الخيارين سوى {diff} على مدى {n} شهرًا، وهو داخل هامش الافتراضات التي أدخلتها. وعند هذا الحد يصبح القرار متعلقًا بمن يتولى التركيب ومن يردّ على الهاتف عند العطل، لا بالسعر.",
    overTitle: "أكثر من 40 مستخدمًا — يحتاج إلى عرض سعر",
    overBody:
      "بعد أربعين مستخدمًا يتوقف العمل عن كونه مسألة عدد مستخدمين ويصبح مسألة ربط وتشغيل، فالجواب الصادق حوارٌ لا رقمٌ من حاسبة.",
    talk: "تواصل مع المبيعات",
    seePlans: "اطّلع على الباقات كاملةً",
    assumptions: "ما تفترضه هذه الحاسبة",
    assumptionList: [
      "الأرقام بالدولار الأمريكي وغير شاملة الضرائب.",
      "يستخدم عمود فوكس سيستمز سعر الباقة المنشور لعدد مستخدميك، والتركيب ونقل البيانات والتدريب والدعم على مدار الساعة مشمولة فيه دون رسوم تركيب.",
      "يطبّق عمود التسعير لكل مستخدم نسبة الدعم على بند التراخيص وحده، وهي الطريقة المعتادة في التسعير.",
      "لا يغادر ما تُدخله متصفحك.",
    ],
  },
};

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export default function CrmCostCalculator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [users, setUsers] = useState(10);
  const [months, setMonths] = useState(36);
  const [annual, setAnnual] = useState(true);
  const [seatPrice, setSeatPrice] = useState(25);
  const [setupCost, setSetupCost] = useState(1500);
  const [trainingCost, setTrainingCost] = useState(500);
  const [supportPct, setSupportPct] = useState(20);

  const r = useMemo(() => {
    const safeUsers = Math.max(1, Math.min(200, users || 1));
    const licences = safeUsers * seatPrice * months;
    const support = licences * (supportPct / 100);
    const oneOff = setupCost + trainingCost;
    const seatTotal = licences + support + oneOff;

    const plan = planForSeats(safeUsers);
    const foxMonthly = plan ? effectiveMonthly(plan, annual) : null;
    const foxTotal = foxMonthly === null ? null : foxMonthly * months;

    const diff = foxTotal === null ? null : seatTotal - foxTotal;
    // "Close" = within 10% of the larger side; below that the inputs are
    // doing the deciding, not the pricing models.
    const close = diff !== null && Math.abs(diff) < Math.max(seatTotal, foxTotal ?? 0) * 0.1;

    return {
      safeUsers, licences, support, oneOff, seatTotal, plan, foxMonthly, foxTotal, diff, close,
      seatPerUser: seatTotal / safeUsers / months,
      foxPerUser: foxTotal === null ? null : foxTotal / safeUsers / months,
    };
  }, [users, months, annual, seatPrice, setupCost, trainingCost, supportPct]);

  const fill = (s: string) =>
    s
      .replace("{n}", String(months))
      .replace("{users}", String(r.safeUsers))
      .replace("{diff}", money(Math.abs(r.diff ?? 0)));

  const numberField = (
    label: string,
    value: number,
    onChange: (n: number) => void,
    opts: { min?: number; max?: number; step?: number; prefix?: string; suffix?: string } = {},
  ) => (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">{label}</span>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background focus-within:border-primary transition-colors">
        {opts.prefix && <span className="text-muted-foreground text-sm">{opts.prefix}</span>}
        <input
          type="number"
          inputMode="numeric"
          className="w-full bg-transparent outline-none text-sm font-semibold ltr-text"
          value={value}
          min={opts.min ?? 0}
          max={opts.max}
          step={opts.step ?? 1}
          onChange={e => onChange(Number(e.target.value))}
        />
        {opts.suffix && <span className="text-muted-foreground text-sm">{opts.suffix}</span>}
      </div>
    </label>
  );

  const toggle = (
    label: string,
    options: Array<{ v: boolean | number; label: string }>,
    current: boolean | number,
    onPick: (v: never) => void,
  ) => (
    <div>
      <span className="block text-sm font-semibold mb-1.5">{label}</span>
      <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border w-full">
        {options.map(o => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => onPick(o.v as never)}
            aria-pressed={current === o.v}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
              current === o.v ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      {/* ---------------- inputs ---------------- */}
      <div className="space-y-5">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.yourTeam}
          </h3>
          {numberField(t.users, users, setUsers, { min: 1, max: 200 })}
          {toggle(
            t.term,
            [
              { v: 12, label: t.oneYear },
              { v: 36, label: t.threeYears },
            ],
            months,
            setMonths as (v: never) => void,
          )}
          <div>
            {toggle(
              t.billing,
              [
                { v: false, label: t.monthly },
                { v: true, label: t.annual },
              ],
              annual,
              setAnnual as (v: never) => void,
            )}
            <p className="text-xs text-muted-foreground mt-1.5">{t.annualHint}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.theirQuote}
          </h3>
          <div>
            {numberField(t.perSeat, seatPrice, setSeatPrice, { min: 1, max: 500, prefix: "$" })}
            <div className="flex flex-wrap gap-2 mt-2">
              {SEAT_PRESETS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSeatPrice(p.price)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    seatPrice === p.price
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {isArabic ? p.ar : p.en} · ${p.price}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{t.presetHint}</p>
          </div>
          {numberField(t.setup, setupCost, setSetupCost, { min: 0, step: 100, prefix: "$" })}
          {numberField(t.training, trainingCost, setTrainingCost, { min: 0, step: 100, prefix: "$" })}
          <div>
            {numberField(t.support, supportPct, setSupportPct, { min: 0, max: 100, suffix: "%" })}
            <p className="text-xs text-muted-foreground mt-1.5">{t.supportHint}</p>
          </div>
        </div>
      </div>

      {/* ---------------- results ---------------- */}
      <div className="space-y-5">
        <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
          <p className="text-xs font-bold tracking-wider uppercase text-primary mb-4">{fill(t.results)}</p>

          <div className="grid grid-cols-2 gap-4">
            {/* per-seat column */}
            <div>
              <h4 className="font-bold text-sm mb-2">{t.perSeatTotal}</h4>
              <dl className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between gap-2">
                  <dt>{t.licences}</dt>
                  <dd className="ltr-text">{money(r.licences)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>{t.supportLine}</dt>
                  <dd className="ltr-text">{money(r.support)}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>{t.oneOff}</dt>
                  <dd className="ltr-text">{money(r.oneOff)}</dd>
                </div>
              </dl>
              <p className="mt-2 pt-2 border-t border-border text-xl font-extrabold ltr-text">
                {money(r.seatTotal)}
              </p>
            </div>

            {/* fox column */}
            <div>
              <h4 className="font-bold text-sm mb-2">{t.foxTotal}</h4>
              {r.foxTotal === null ? (
                <p className="text-xs text-muted-foreground">{t.overBody}</p>
              ) : (
                <>
                  <dl className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between gap-2">
                      <dt>{t.licences}</dt>
                      <dd className="ltr-text">{money(r.foxTotal)}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{t.supportLine}</dt>
                      <dd className="text-primary font-semibold">{t.included}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{t.oneOff}</dt>
                      <dd className="text-primary font-semibold">{t.noSetupFee}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 pt-2 border-t border-border text-xl font-extrabold text-primary ltr-text">
                    {money(r.foxTotal)}
                  </p>
                </>
              )}
            </div>
          </div>

          {r.plan && (
            <p className="text-xs text-muted-foreground mt-4">
              {t.plan}
              <strong className="text-foreground">{r.plan.name[language]}</strong> · {r.plan.users[language]} ·{" "}
              <span className="ltr-text">${r.foxMonthly}</span> {t.perMonth}
            </p>
          )}

          {r.foxPerUser !== null && (
            <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {t.effective}
                <br />
                <span className="text-sm font-bold text-foreground ltr-text">${r.seatPerUser.toFixed(2)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                &nbsp;
                <br />
                <span className="text-sm font-bold text-primary ltr-text">${r.foxPerUser.toFixed(2)}</span>
              </p>
            </div>
          )}
        </div>

        {/* verdict — honest, including when we lose */}
        <div
          className={`p-5 rounded-2xl border ${
            r.foxTotal === null
              ? "border-border bg-muted/30"
              : r.close
                ? "border-border bg-muted/30"
                : (r.diff ?? 0) > 0
                  ? "border-primary/40 bg-primary/5"
                  : "border-amber-500/40 bg-amber-500/5"
          }`}
        >
          <h4 className="font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {r.foxTotal === null
              ? t.overTitle
              : r.close
                ? t.verdictCloseTitle
                : (r.diff ?? 0) > 0
                  ? t.verdictFoxTitle
                  : t.verdictOtherTitle}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {r.foxTotal === null
              ? t.overBody
              : r.close
                ? fill(t.verdictCloseBody)
                : (r.diff ?? 0) > 0
                  ? fill(t.verdictFoxBody)
                  : fill(t.verdictOtherBody)}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href={`${isArabic ? "/ar" : ""}/contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:gap-3 transition-all"
            >
              {t.talk}
              <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
            </Link>
            <Link
              href={`${isArabic ? "/ar" : ""}/services/crm`}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-border text-sm font-bold hover:border-primary/50 transition-colors"
            >
              {t.seePlans}
            </Link>
          </div>
        </div>

        <div className="p-5 rounded-xl border border-border bg-muted/30">
          <h4 className="flex items-center gap-2 font-bold text-sm mb-2">
            <Info className="w-4 h-4 text-primary" aria-hidden="true" />
            {t.assumptions}
          </h4>
          <ul className="space-y-1.5">
            {t.assumptionList.map(a => (
              <li key={a} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
