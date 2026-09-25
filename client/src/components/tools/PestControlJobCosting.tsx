/**
 * Field-service job costing — cost per visit, cost per contract, and the
 * price that hits a target margin.
 *
 * Driving is costed TWICE on purpose: the kilometres at a running cost, and
 * the driving hours inside the labour figure. Both are real, both are
 * routinely forgotten, and on a spread-out route the driving can exceed the
 * on-site time — which is why route density moves margin more than chemical
 * prices do.
 *
 * Margin here is margin on price (profit ÷ price), not mark-up on cost. The
 * two get conflated constantly and a 30% target means very different things
 * under each.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Line, NumberField, Panel, ResultPanel, num } from "./fields";

interface Props {
  language: "en" | "ar";
}

const T = {
  en: {
    visit: "One visit",
    onSite: "Hours on site",
    driveHours: "Driving hours, round trip",
    hourly: "Fully-loaded hourly cost",
    hourlyHint: "Not the wage — add insurance, leave, training, then divide by billable hours",
    km: "Kilometres, round trip",
    perKm: "Running cost per kilometre",
    materials: "Chemicals and materials per visit",
    contract: "The contract",
    visitsPerYear: "Visits per year",
    visitsHint: "Include warranty call-backs if your contracts cover them",
    overhead: "Overhead",
    overheadHint: "Office, scheduler, insurance, licensing — applied on top of direct cost",
    targetMargin: "Target margin",
    currentPrice: "What you charge now, per year",
    currentHint: "Set to 0 if you are pricing something new",
    result: "Per visit",
    labour: "Labour",
    travel: "Travel",
    materialsLine: "Materials",
    directCost: "Direct cost",
    overheadLine: "Overhead",
    fullCost: "Full cost per visit",
    perYear: "Per contract year",
    costYear: "Cost per year",
    suggested: "Price at your target margin",
    yourMargin: "Your actual margin now",
    breakEven: "Break-even price",
    lossTitle: "This contract is losing money",
    lossBody: "At {price} a year against a cost of {cost}, every visit costs you more than it earns. The break-even price is {be}.",
    thinTitle: "The margin is thin",
    thinBody: "You are making {margin}% against a target of {target}%. One warranty call-back or a route change would take this to zero.",
    okTitle: "This contract works",
    okBody: "You are making {margin}% against a target of {target}%, which is {diff} a year above your break-even.",
    driveWarn: "Driving is {pct}% of the labour on this job. Route density will move your margin more than anything you can negotiate on chemicals.",
    seeCrm: "See the pest control system",
    talk: "Talk to us about routing",
  },
  ar: {
    visit: "الزيارة الواحدة",
    onSite: "ساعات العمل في الموقع",
    driveHours: "ساعات القيادة ذهابًا وإيابًا",
    hourly: "التكلفة الساعية المحمَّلة بالكامل",
    hourlyHint: "ليست الأجر — أضف التأمين والإجازات والتدريب ثم اقسم على الساعات القابلة للتحصيل",
    km: "الكيلومترات ذهابًا وإيابًا",
    perKm: "تكلفة التشغيل لكل كيلومتر",
    materials: "المبيدات والمواد لكل زيارة",
    contract: "العقد",
    visitsPerYear: "عدد الزيارات في السنة",
    visitsHint: "أضف زيارات الاستدعاء ضمن الضمان إن كانت عقودك تغطيها",
    overhead: "المصروفات غير المباشرة",
    overheadHint: "المكتب والموزِّع والتأمين والتراخيص — تُطبَّق فوق التكلفة المباشرة",
    targetMargin: "الهامش المستهدف",
    currentPrice: "ما تتقاضاه حاليًا في السنة",
    currentHint: "اضبطه على صفر إن كنت تسعّر عملًا جديدًا",
    result: "لكل زيارة",
    labour: "العمالة",
    travel: "الانتقال",
    materialsLine: "المواد",
    directCost: "التكلفة المباشرة",
    overheadLine: "المصروفات غير المباشرة",
    fullCost: "التكلفة الكاملة للزيارة",
    perYear: "لكل سنة تعاقدية",
    costYear: "التكلفة في السنة",
    suggested: "السعر عند هامشك المستهدف",
    yourMargin: "هامشك الفعلي الآن",
    breakEven: "سعر التعادل",
    lossTitle: "هذا العقد خاسر",
    lossBody: "عند {price} في السنة مقابل تكلفة {cost}، تكلّفك كل زيارة أكثر مما تكسبه. وسعر التعادل هو {be}.",
    thinTitle: "الهامش ضئيل",
    thinBody: "تحقّق {margin}% مقابل هدف {target}%. وزيارة استدعاء واحدة ضمن الضمان أو تغيير في خط السير يُنزل هذا إلى الصفر.",
    okTitle: "هذا العقد ناجح",
    okBody: "تحقّق {margin}% مقابل هدف {target}%، أي بزيادة {diff} في السنة فوق نقطة تعادلك.",
    driveWarn: "تمثّل القيادة {pct}% من عمالة هذه المهمة. وكثافة خط السير ستحرّك هامشك أكثر من أي شيء تتفاوض عليه في المبيدات.",
    seeCrm: "استعرض نظام مكافحة الآفات",
    talk: "تحدّث إلينا عن خطوط السير",
  },
};

export default function PestControlJobCosting({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [onSite, setOnSite] = useState(1.5);
  const [driveHours, setDriveHours] = useState(1);
  const [hourly, setHourly] = useState(120);
  const [km, setKm] = useState(30);
  const [perKm, setPerKm] = useState(4);
  const [materials, setMaterials] = useState(150);
  const [visitsPerYear, setVisitsPerYear] = useState(12);
  const [overhead, setOverhead] = useState(25);
  const [targetMargin, setTargetMargin] = useState(30);
  const [currentPrice, setCurrentPrice] = useState(0);

  const r = useMemo(() => {
    const labour = (Math.max(0, onSite) + Math.max(0, driveHours)) * Math.max(0, hourly);
    const travel = Math.max(0, km) * Math.max(0, perKm);
    const direct = labour + travel + Math.max(0, materials);
    const oh = direct * (Math.max(0, overhead) / 100);
    const fullVisit = direct + oh;

    const visits = Math.max(1, visitsPerYear);
    const costYear = fullVisit * visits;

    // Margin on PRICE, so price = cost / (1 - margin).
    const m = Math.min(0.95, Math.max(0, targetMargin) / 100);
    const suggested = costYear / (1 - m);

    const actualMargin = currentPrice > 0 ? ((currentPrice - costYear) / currentPrice) * 100 : null;
    const driveShare = labour > 0 ? (driveHours * hourly) / labour : 0;

    return {
      labour, travel, direct, oh, fullVisit, costYear, suggested, actualMargin,
      breakEven: costYear,
      surplus: currentPrice > 0 ? currentPrice - costYear : 0,
      driveShare: Math.round(driveShare * 100),
    };
  }, [onSite, driveHours, hourly, km, perKm, materials, visitsPerYear, overhead, targetMargin, currentPrice]);

  const verdict =
    r.actualMargin === null ? null : r.actualMargin < 0 ? "loss" : r.actualMargin < targetMargin * 0.6 ? "thin" : "ok";

  const fill = (s: string) =>
    s
      .replace("{price}", num(currentPrice))
      .replace("{cost}", num(r.costYear))
      .replace("{be}", num(r.breakEven))
      .replace("{margin}", num(r.actualMargin ?? 0, 1))
      .replace("{target}", num(targetMargin))
      .replace("{diff}", num(r.surplus))
      .replace("{pct}", String(r.driveShare));

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <Panel title={t.visit}>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={t.onSite} value={onSite} onChange={setOnSite} step={0.25} max={24} />
            <NumberField label={t.driveHours} value={driveHours} onChange={setDriveHours} step={0.25} max={24} />
          </div>
          <NumberField label={t.hourly} value={hourly} onChange={setHourly} step={10} hint={t.hourlyHint} />
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={t.km} value={km} onChange={setKm} step={5} />
            <NumberField label={t.perKm} value={perKm} onChange={setPerKm} step={0.5} />
          </div>
          <NumberField label={t.materials} value={materials} onChange={setMaterials} step={25} />
        </Panel>

        <Panel title={t.contract}>
          <NumberField label={t.visitsPerYear} value={visitsPerYear} onChange={setVisitsPerYear} max={365} hint={t.visitsHint} />
          <NumberField label={t.overhead} value={overhead} onChange={setOverhead} suffix="%" max={200} hint={t.overheadHint} />
          <NumberField label={t.targetMargin} value={targetMargin} onChange={setTargetMargin} suffix="%" max={95} />
          <NumberField label={t.currentPrice} value={currentPrice} onChange={setCurrentPrice} step={500} hint={t.currentHint} />
        </Panel>
      </div>

      <div className="space-y-5">
        <ResultPanel kicker={t.result}>
          <dl className="space-y-2">
            <Line label={t.labour} value={num(r.labour, 2)} muted />
            <Line label={t.travel} value={num(r.travel, 2)} muted />
            <Line label={t.materialsLine} value={num(materials, 2)} muted />
            <Line label={t.directCost} value={num(r.direct, 2)} />
            <Line label={t.overheadLine} value={num(r.oh, 2)} muted />
            <Line label={t.fullCost} value={num(r.fullVisit, 2)} strong />
          </dl>

          <p className="text-xs font-bold tracking-wider uppercase text-primary mt-5 mb-3">{t.perYear}</p>
          <dl className="space-y-2">
            <Line label={t.costYear} value={num(r.costYear)} />
            <Line label={t.breakEven} value={num(r.breakEven)} muted />
            <Line label={t.suggested} value={num(r.suggested)} strong />
            {r.actualMargin !== null && <Line label={t.yourMargin} value={`${num(r.actualMargin, 1)}%`} />}
          </dl>
        </ResultPanel>

        {verdict && (
          <div
            className={`p-5 rounded-2xl border ${
              verdict === "loss"
                ? "border-red-500/40 bg-red-500/5"
                : verdict === "thin"
                  ? "border-amber-500/40 bg-amber-500/5"
                  : "border-primary/40 bg-primary/5"
            }`}
          >
            <h4 className="font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {verdict === "loss" ? t.lossTitle : verdict === "thin" ? t.thinTitle : t.okTitle}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {fill(verdict === "loss" ? t.lossBody : verdict === "thin" ? t.thinBody : t.okBody)}
            </p>
          </div>
        )}

        {r.driveShare >= 40 && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-muted-foreground leading-relaxed">{fill(t.driveWarn)}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href={`${isArabic ? "/ar" : ""}/solutions/pest-control-crm`}
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
