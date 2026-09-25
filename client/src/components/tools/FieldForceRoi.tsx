/**
 * Field force capacity versus target coverage.
 *
 * The point is the gap between PLANNED and ACHIEVED visits per day. A plan
 * that assumes ten and delivers six is out by forty percent, and every
 * coverage number built on it is wrong in the same direction — usually
 * discovered at the end of a quarter, when nothing can be done.
 *
 * Cost per visit is deliberately divided by ACHIEVED visits, not planned
 * ones, because that is the number worth holding against what a visit is
 * worth to you.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { Line, NumberField, Panel, ResultPanel, num } from "./fields";

interface Props {
  language: "en" | "ar";
}

const T = {
  en: {
    team: "Your team",
    reps: "Representatives",
    planned: "Visits per day, planned",
    achieved: "Visits per day, actually achieved",
    achievedHint: "After travel, waiting, cancellations and admin. If you do not know, that is the first thing to measure.",
    days: "Working days per month",
    cost: "Fully-loaded cost per rep, per month",
    costHint: "Salary, incentives, car, phone, samples — everything the rep costs you",
    target: "Your target",
    listSize: "Doctors and institutions on the list",
    frequency: "Visits per name, per month",
    result: "Capacity versus target",
    capacityPlanned: "Capacity if the plan held",
    capacityReal: "Real capacity",
    required: "Visits required",
    gap: "Gap",
    surplus: "Spare capacity",
    coverage: "Coverage you can actually achieve",
    costPerVisit: "Cost per achieved visit",
    closing: "Three ways to close the gap",
    addReps: "Add representatives",
    addVisits: "Raise achieved visits per day to",
    dropFreq: "Or drop frequency to",
    perMonth: "per name per month",
    repsUnit: "more reps",
    cost1: "at about {c} a month",
    okTitle: "Your team can cover this list",
    okBody: "Real capacity is {cap} visits against {req} required, leaving {spare} spare — room for {extra} more names at the same frequency.",
    gapTitle: "The plan does not fit the team",
    gapBody: "You need {req} visits a month and the team achieves {cap}. That is {pct}% of the list covered at your target frequency, and no amount of planning changes the arithmetic.",
    planGapTitle: "Your plan and your reality disagree",
    planGapBody: "The plan assumes {planned} visits a day but the team achieves {achieved}. Every coverage figure built on the planned number is overstated by {pct}%.",
    seeCrm: "See the medical field force CRM",
    talk: "Talk to us",
  },
  ar: {
    team: "فريقك",
    reps: "عدد المندوبين",
    planned: "الزيارات يوميًا، المخطَّطة",
    achieved: "الزيارات يوميًا، المحقَّقة فعلًا",
    achievedHint: "بعد الانتقال والانتظار والإلغاءات والأعمال الإدارية. وإن كنت لا تعرفها فهي أول ما ينبغي قياسه.",
    days: "أيام العمل في الشهر",
    cost: "التكلفة المحمَّلة لكل مندوب شهريًا",
    costHint: "الراتب والحوافز والسيارة والهاتف والعيّنات — كل ما يكلّفك إياه المندوب",
    target: "هدفك",
    listSize: "عدد الأطباء والمؤسسات في القائمة",
    frequency: "عدد الزيارات لكل اسم شهريًا",
    result: "الطاقة مقابل الهدف",
    capacityPlanned: "الطاقة لو تحقّقت الخطة",
    capacityReal: "الطاقة الحقيقية",
    required: "الزيارات المطلوبة",
    gap: "الفجوة",
    surplus: "طاقة فائضة",
    coverage: "التغطية التي تستطيع تحقيقها فعلًا",
    costPerVisit: "تكلفة الزيارة المحقَّقة",
    closing: "ثلاث طرق لسدّ الفجوة",
    addReps: "أضف مندوبين",
    addVisits: "ارفع الزيارات المحقَّقة يوميًا إلى",
    dropFreq: "أو اخفض التواتر إلى",
    perMonth: "لكل اسم شهريًا",
    repsUnit: "مندوبًا إضافيًا",
    cost1: "بنحو {c} شهريًا",
    okTitle: "فريقك قادر على تغطية هذه القائمة",
    okBody: "الطاقة الحقيقية {cap} زيارة مقابل {req} مطلوبة، بفائض {spare} — أي متّسع لـ{extra} اسمًا إضافيًا بالتواتر نفسه.",
    gapTitle: "الخطة لا تتسع لها طاقة الفريق",
    gapBody: "تحتاج إلى {req} زيارة شهريًا ويحقّق الفريق {cap}. أي تغطية {pct}% من القائمة بتواترك المستهدف، ولا يغيّر أي قدر من التخطيط هذه العملية الحسابية.",
    planGapTitle: "خطتك وواقعك لا يتفقان",
    planGapBody: "تفترض الخطة {planned} زيارة يوميًا بينما يحقّق الفريق {achieved}. فكل رقم تغطية مبنيّ على الرقم المخطَّط مبالَغ فيه بنسبة {pct}%.",
    seeCrm: "استعرض نظام CRM الطبي للفرق الميدانية",
    talk: "تحدّث إلينا",
  },
};

export default function FieldForceRoi({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [reps, setReps] = useState(8);
  const [planned, setPlanned] = useState(10);
  const [achieved, setAchieved] = useState(7);
  const [days, setDays] = useState(22);
  const [costPerRep, setCostPerRep] = useState(18000);
  const [listSize, setListSize] = useState(400);
  const [frequency, setFrequency] = useState(2);

  const r = useMemo(() => {
    const R = Math.max(0, reps);
    const D = Math.max(1, days);
    const capPlanned = R * Math.max(0, planned) * D;
    const capReal = R * Math.max(0, achieved) * D;
    const required = Math.max(0, listSize) * Math.max(0, frequency);

    const gap = required - capReal;
    const coverage = required > 0 ? Math.min(100, (capReal / required) * 100) : 100;
    const costPerVisit = capReal > 0 ? (R * Math.max(0, costPerRep)) / capReal : 0;

    const visitsPerRepMonth = Math.max(0, achieved) * D;
    const repsNeeded = gap > 0 && visitsPerRepMonth > 0 ? Math.ceil(gap / visitsPerRepMonth) : 0;
    const visitsPerDayNeeded = gap > 0 && R > 0 && D > 0 ? required / (R * D) : 0;
    const freqPossible = listSize > 0 ? capReal / listSize : 0;
    const spare = -gap;
    const extraNames = frequency > 0 ? Math.floor(spare / frequency) : 0;
    const planOverstatement = achieved > 0 ? ((planned - achieved) / achieved) * 100 : 0;

    return {
      capPlanned, capReal, required, gap, coverage, costPerVisit,
      repsNeeded, visitsPerDayNeeded, freqPossible, spare, extraNames,
      planOverstatement, addedCost: repsNeeded * costPerRep,
    };
  }, [reps, planned, achieved, days, costPerRep, listSize, frequency]);

  const fill = (s: string) =>
    s
      .replace("{cap}", num(r.capReal))
      .replace("{req}", num(r.required))
      .replace("{spare}", num(r.spare))
      .replace("{extra}", num(r.extraNames))
      .replace("{planned}", num(planned, 1))
      .replace("{achieved}", num(achieved, 1))
      .replace("{c}", num(r.addedCost))
      .replace("{pct}", num(r.gap > 0 ? r.coverage : r.planOverstatement, 0));

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <Panel title={t.team}>
          <NumberField label={t.reps} value={reps} onChange={setReps} max={2000} />
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={t.planned} value={planned} onChange={setPlanned} step={0.5} max={50} />
            <NumberField label={t.achieved} value={achieved} onChange={setAchieved} step={0.5} max={50} />
          </div>
          <p className="text-xs text-muted-foreground -mt-2 leading-snug">{t.achievedHint}</p>
          <NumberField label={t.days} value={days} onChange={setDays} max={31} />
          <NumberField label={t.cost} value={costPerRep} onChange={setCostPerRep} step={1000} hint={t.costHint} />
        </Panel>

        <Panel title={t.target}>
          <NumberField label={t.listSize} value={listSize} onChange={setListSize} step={10} max={100000} />
          <NumberField label={t.frequency} value={frequency} onChange={setFrequency} step={0.5} max={30} />
        </Panel>
      </div>

      <div className="space-y-5">
        <ResultPanel kicker={t.result}>
          <dl className="space-y-2">
            <Line label={t.capacityPlanned} value={num(r.capPlanned)} muted />
            <Line label={t.capacityReal} value={num(r.capReal)} />
            <Line label={t.required} value={num(r.required)} />
            <Line
              label={r.gap > 0 ? t.gap : t.surplus}
              value={num(Math.abs(r.gap))}
              strong
            />
          </dl>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-1">{t.coverage}</p>
            <p className="text-3xl font-extrabold text-primary ltr-text" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {num(r.coverage, 0)}%
            </p>
            <div className="h-2 rounded-full bg-muted overflow-hidden mt-2">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${r.coverage}%` }} />
            </div>
          </div>

          <dl className="space-y-2 mt-4 pt-4 border-t border-border">
            <Line label={t.costPerVisit} value={num(r.costPerVisit, 2)} />
          </dl>
        </ResultPanel>

        <div
          className={`p-5 rounded-2xl border ${
            r.gap > 0 ? "border-amber-500/40 bg-amber-500/5" : "border-primary/40 bg-primary/5"
          }`}
        >
          <h4 className="flex items-center gap-2 font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {r.gap > 0 ? (
              <TrendingDown className="w-4 h-4 text-amber-500" aria-hidden="true" />
            ) : (
              <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
            )}
            {r.gap > 0 ? t.gapTitle : t.okTitle}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{fill(r.gap > 0 ? t.gapBody : t.okBody)}</p>

          {r.gap > 0 && (
            <>
              <p className="text-xs font-bold mt-4 mb-2">{t.closing}</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>
                  • {t.addReps}: <strong className="text-foreground ltr-text">{num(r.repsNeeded)}</strong> {t.repsUnit},{" "}
                  {fill(t.cost1)}
                </li>
                <li>
                  • {t.addVisits} <strong className="text-foreground ltr-text">{num(r.visitsPerDayNeeded, 1)}</strong>
                </li>
                <li>
                  • {t.dropFreq} <strong className="text-foreground ltr-text">{num(r.freqPossible, 2)}</strong> {t.perMonth}
                </li>
              </ul>
            </>
          )}
        </div>

        {planned > achieved && (
          <div className="p-5 rounded-2xl border border-border bg-muted/30">
            <h4 className="font-bold text-sm mb-1">{t.planGapTitle}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{fill(t.planGapBody)}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href={`${isArabic ? "/ar" : ""}/solutions/medical-crm`}
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
  );
}
