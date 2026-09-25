/**
 * Business bandwidth sizing — download and upload sized separately.
 *
 * Upload is the point of the tool. An office can hold a headline 200 Mbps
 * connection and still drop calls because asymmetric broadband gives it a
 * fraction of that upstream, and voice, video and offsite cameras all live on
 * the upstream side. Sizing the two together, as most calculators do, hides
 * the failure people actually experience.
 *
 * Rates used (per concurrent unit, each direction unless noted):
 *   VoIP G.711   0.1 Mbps  — 64 kbps codec plus IP/UDP/RTP overhead. The bare
 *                            64 kbps figure understates a real call by ~a third.
 *   Video HD     2.0 Mbps  — 720p class meeting
 *   Video FHD    3.5 Mbps  — 1080p class meeting
 *   Camera       3.0 Mbps  — 1080p H.264, UPLOAD ONLY, and only when the
 *                            stream leaves the building. Local NVR recording
 *                            never touches the internet link.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, Check, Info } from "lucide-react";

interface Props {
  language: "en" | "ar";
}

const PROFILES = [
  { id: "light", down: 0.5, up: 0.15, en: "Light — mail, web, a web CRM", ar: "خفيف — بريد وتصفّح ونظام CRM على الويب" },
  { id: "standard", down: 2, up: 0.5, en: "Standard — the above plus cloud files", ar: "قياسي — ما سبق مع ملفات سحابية" },
  { id: "heavy", down: 5, up: 2, en: "Heavy — large files, design, constant video", ar: "كثيف — ملفات كبيرة وتصميم وفيديو متواصل" },
];

const VOIP_PER_CALL = 0.1;
const VIDEO_HD = 2;
const VIDEO_FHD = 3.5;
const CAMERA_UP = 3;

const T = {
  en: {
    people: "Your people",
    staff: "Staff on the network",
    profile: "How they work",
    concurrency: "Concurrency",
    concurrencyHint: "Share of staff generating traffic at the same moment. 60% suits a mixed office; raise it for a call centre.",
    voice: "Voice & video",
    calls: "Simultaneous VoIP calls",
    callsHint: "Simultaneous calls, not handsets — a 30-seat room rarely needs 30 at once",
    meetings: "Simultaneous video meetings",
    quality: "Meeting quality",
    hd: "HD",
    fhd: "Full HD",
    cameras: "Cameras streaming offsite",
    camerasHint: "Only cameras whose footage leaves the building. Local NVR recording uses no internet at all.",
    headroom: "Headroom",
    headroomHint: "A link at its rated capacity has no room for a burst, and voice suffers first",
    result: "What to buy",
    download: "Download",
    upload: "Upload",
    breakdown: "Where it goes",
    staffLine: "Staff",
    voiceLine: "Voice",
    videoLine: "Video meetings",
    cameraLine: "Cameras",
    headroomLine: "Headroom",
    verdictLeasedTitle: "A symmetric leased line is justified",
    verdictLeasedBody:
      "You need about {up} Mbps upstream. Business broadband in Egypt rarely delivers that upstream at any price, so a leased line — same speed both ways, not shared, with a contracted repair time — is the product that actually matches this, not a bigger broadband package.",
    verdictBroadbandTitle: "Business broadband should carry this",
    verdictBroadbandBody:
      "At about {down} Mbps down and {up} Mbps up, a business broadband line with a decent router will handle your load. You do not need a leased line for capacity. You might still want one for the guaranteed repair time if an outage stops the business rather than inconveniencing it.",
    verdictBorderTitle: "This is the borderline case",
    verdictBorderBody:
      "You need around {up} Mbps upstream, which is at the top of what broadband delivers here and the bottom of what a leased line is usually sold for. If your voice traffic matters commercially, buy the leased line. If it does not, broadband with a router that prioritises voice will do.",
    voiceWarnTitle: "Your voice traffic is the constraint",
    voiceWarnBody:
      "Voice and video are {pct}% of your upstream need. That is the traffic least tolerant of a full link, so whatever you buy, make sure the router can prioritise it.",
    talk: "Check what is available at your address",
    seeService: "See leased lines and business internet",
    assumptions: "Rates used",
    assumptionList: [
      "VoIP at 0.1 Mbps per simultaneous call — the 64 kbps codec figure plus IP, UDP and RTP overhead.",
      "Video meetings at 2 Mbps for HD and 3.5 Mbps for full HD, in both directions.",
      "Cameras at 3 Mbps each, upload only, and only when the stream leaves the building.",
      "Staff rates are per person before the concurrency factor is applied.",
    ],
  },
  ar: {
    people: "موظفوك",
    staff: "عدد الموظفين على الشبكة",
    profile: "طبيعة عملهم",
    concurrency: "معامل التزامن",
    concurrencyHint: "نسبة الموظفين الذين يولّدون حركة بيانات في اللحظة نفسها. 60% تناسب مكتبًا مختلطًا، وارفعها لمركز اتصال.",
    voice: "الصوت والفيديو",
    calls: "المكالمات المتزامنة عبر VoIP",
    callsHint: "المكالمات المتزامنة لا عدد السمّاعات — قاعة بثلاثين مقعدًا نادرًا ما تحتاج إلى ثلاثين مكالمة معًا",
    meetings: "اجتماعات الفيديو المتزامنة",
    quality: "جودة الاجتماع",
    hd: "عالية",
    fhd: "كاملة",
    cameras: "الكاميرات التي تبثّ خارج الموقع",
    camerasHint: "الكاميرات التي تغادر تسجيلاتها المبنى فقط. أما التسجيل على مسجّل محلي فلا يستهلك إنترنتًا إطلاقًا.",
    headroom: "هامش الأمان",
    headroomHint: "الخط العامل عند سعته المقرّرة لا متّسع فيه لأي اندفاع، وأول ما يتأثر هو الصوت",
    result: "ما ينبغي شراؤه",
    download: "التنزيل",
    upload: "الرفع",
    breakdown: "أين تذهب السعة",
    staffLine: "الموظفون",
    voiceLine: "الصوت",
    videoLine: "اجتماعات الفيديو",
    cameraLine: "الكاميرات",
    headroomLine: "هامش الأمان",
    verdictLeasedTitle: "الخط المؤجر المتماثل مبرَّر",
    verdictLeasedBody:
      "تحتاج إلى نحو {up} ميجابت في الرفع. ونادرًا ما يوفّر إنترنت الشركات في مصر هذا القدر من الرفع بأي سعر، فالخط المؤجر — السرعة نفسها في الاتجاهين، غير مشترك، بزمن إصلاح متعاقد عليه — هو المنتج الذي يطابق هذا فعلًا، لا باقة إنترنت أكبر.",
    verdictBroadbandTitle: "إنترنت الشركات يكفي لهذا",
    verdictBroadbandBody:
      "عند نحو {down} ميجابت تنزيلًا و{up} ميجابت رفعًا، سيتحمّل خط إنترنت شركات مع موجّه جيد حِملك. فلستَ بحاجة إلى خط مؤجر من أجل السعة. وقد ترغب فيه مع ذلك من أجل زمن الإصلاح المضمون إن كان الانقطاع يوقف العمل لا يزعجه فحسب.",
    verdictBorderTitle: "هذه هي الحالة الحدّية",
    verdictBorderBody:
      "تحتاج إلى نحو {up} ميجابت في الرفع، وهو أعلى ما يوفّره الإنترنت الاعتيادي هنا وأدنى ما يُباع به الخط المؤجر عادةً. فإن كانت حركة الصوت لديك مهمة تجاريًا فاشترِ الخط المؤجر، وإن لم تكن فسيفي إنترنت الشركات مع موجّه يمنح الصوت أولوية.",
    voiceWarnTitle: "حركة الصوت لديك هي القيد",
    voiceWarnBody:
      "يشكّل الصوت والفيديو {pct}% من حاجتك في الرفع، وهي أقل أنواع الحركة احتمالًا لخط ممتلئ، فمهما اشتريت تأكّد من أن الموجّه قادر على منحها الأولوية.",
    talk: "تحقّق مما هو متاح في عنوانك",
    seeService: "اطّلع على الخطوط المؤجرة وإنترنت الشركات",
    assumptions: "المعدّلات المستخدمة",
    assumptionList: [
      "VoIP بمعدّل 0.1 ميجابت لكل مكالمة متزامنة — رقم الترميز 64 كيلوبت مضافًا إليه أعباء IP وUDP وRTP.",
      "اجتماعات الفيديو بمعدّل 2 ميجابت للجودة العالية و3.5 ميجابت للكاملة، في الاتجاهين.",
      "الكاميرات بمعدّل 3 ميجابت لكل كاميرا، رفعًا فقط، وفقط حين يغادر البثّ المبنى.",
      "معدّلات الموظفين لكل شخص قبل تطبيق معامل التزامن.",
    ],
  },
};

const mbps = (n: number) => (n < 10 ? n.toFixed(1) : String(Math.ceil(n)));

export default function BandwidthCalculator({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];

  const [staff, setStaff] = useState(20);
  const [profile, setProfile] = useState("standard");
  const [concurrency, setConcurrency] = useState(60);
  const [calls, setCalls] = useState(6);
  const [meetings, setMeetings] = useState(3);
  const [fhd, setFhd] = useState(false);
  const [cameras, setCameras] = useState(0);
  const [headroom, setHeadroom] = useState(30);

  const r = useMemo(() => {
    const p = PROFILES.find(x => x.id === profile) ?? PROFILES[1];
    const active = Math.max(1, staff) * (concurrency / 100);
    const staffDown = active * p.down;
    const staffUp = active * p.up;

    const voice = Math.max(0, calls) * VOIP_PER_CALL;
    const video = Math.max(0, meetings) * (fhd ? VIDEO_FHD : VIDEO_HD);
    const camUp = Math.max(0, cameras) * CAMERA_UP;

    const baseDown = staffDown + voice + video;
    const baseUp = staffUp + voice + video + camUp;

    const h = 1 + headroom / 100;
    const down = baseDown * h;
    const up = baseUp * h;

    // Broadband here is asymmetric; ~10 Mbps upstream is the practical ceiling
    // on ordinary business packages, so that is where a leased line starts to
    // be the product that actually matches the requirement.
    const verdict = up > 12 ? "leased" : up > 8 ? "border" : "broadband";
    const voiceShare = baseUp > 0 ? Math.round(((voice + video) / baseUp) * 100) : 0;

    return {
      down, up, staffDown, staffUp, voice, video, camUp, verdict, voiceShare,
      headDown: down - baseDown, headUp: up - baseUp,
    };
  }, [staff, profile, concurrency, calls, meetings, fhd, cameras, headroom]);

  const fill = (s: string) =>
    s.replace("{down}", mbps(r.down)).replace("{up}", mbps(r.up)).replace("{pct}", String(r.voiceShare));

  const field = (
    label: string,
    value: number,
    onChange: (n: number) => void,
    opts: { min?: number; max?: number; suffix?: string; hint?: string } = {},
  ) => (
    <div>
      <label className="block">
        <span className="block text-sm font-semibold mb-1.5">{label}</span>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background focus-within:border-primary transition-colors">
          <input
            type="number"
            inputMode="numeric"
            className="w-full bg-transparent outline-none text-sm font-semibold ltr-text"
            value={value}
            min={opts.min ?? 0}
            max={opts.max}
            onChange={e => onChange(Number(e.target.value))}
          />
          {opts.suffix && <span className="text-muted-foreground text-sm">{opts.suffix}</span>}
        </div>
      </label>
      {opts.hint && <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{opts.hint}</p>}
    </div>
  );

  const row = (label: string, down: number | null, up: number) => (
    <div className="flex justify-between gap-3 text-xs">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="flex gap-4 ltr-text font-semibold">
        <span className="w-12 text-end">{down === null ? "—" : mbps(down)}</span>
        <span className="w-12 text-end">{mbps(up)}</span>
      </dd>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-5">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.people}</h3>
          {field(t.staff, staff, setStaff, { min: 1, max: 5000 })}
          <label className="block">
            <span className="block text-sm font-semibold mb-1.5">{t.profile}</span>
            <select
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-semibold outline-none focus:border-primary"
              value={profile}
              onChange={e => setProfile(e.target.value)}
            >
              {PROFILES.map(p => (
                <option key={p.id} value={p.id}>{isArabic ? p.ar : p.en}</option>
              ))}
            </select>
          </label>
          {field(t.concurrency, concurrency, setConcurrency, { min: 10, max: 100, suffix: "%", hint: t.concurrencyHint })}
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
          <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{t.voice}</h3>
          {field(t.calls, calls, setCalls, { min: 0, max: 500, hint: t.callsHint })}
          {field(t.meetings, meetings, setMeetings, { min: 0, max: 200 })}
          <div>
            <span className="block text-sm font-semibold mb-1.5">{t.quality}</span>
            <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border w-full">
              {[{ v: false, l: t.hd }, { v: true, l: t.fhd }].map(o => (
                <button
                  key={String(o.v)}
                  type="button"
                  onClick={() => setFhd(o.v)}
                  aria-pressed={fhd === o.v}
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                    fhd === o.v ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          {field(t.cameras, cameras, setCameras, { min: 0, max: 500, hint: t.camerasHint })}
          {field(t.headroom, headroom, setHeadroom, { min: 0, max: 100, suffix: "%", hint: t.headroomHint })}
        </div>
      </div>

      <div className="space-y-5">
        <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
          <p className="text-xs font-bold tracking-wider uppercase text-primary mb-4">{t.result}</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t.download}</p>
              <p className="text-3xl font-extrabold ltr-text" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {mbps(r.down)} <span className="text-base font-bold text-muted-foreground">Mbps</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t.upload}</p>
              <p className="text-3xl font-extrabold text-primary ltr-text" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {mbps(r.up)} <span className="text-base font-bold text-muted-foreground">Mbps</span>
              </p>
            </div>
          </div>

          <p className="text-xs font-bold mb-2">{t.breakdown}</p>
          <div className="flex justify-between gap-3 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
            <span />
            <span className="flex gap-4">
              <span className="w-12 text-end">{t.download}</span>
              <span className="w-12 text-end">{t.upload}</span>
            </span>
          </div>
          <dl className="space-y-1">
            {row(t.staffLine, r.staffDown, r.staffUp)}
            {row(t.voiceLine, r.voice, r.voice)}
            {row(t.videoLine, r.video, r.video)}
            {row(t.cameraLine, null, r.camUp)}
            {row(t.headroomLine, r.headDown, r.headUp)}
          </dl>
        </div>

        <div
          className={`p-5 rounded-2xl border ${
            r.verdict === "leased"
              ? "border-primary/40 bg-primary/5"
              : r.verdict === "border"
                ? "border-border bg-muted/30"
                : "border-amber-500/40 bg-amber-500/5"
          }`}
        >
          <h4 className="font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {r.verdict === "leased" ? t.verdictLeasedTitle : r.verdict === "border" ? t.verdictBorderTitle : t.verdictBroadbandTitle}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {fill(
              r.verdict === "leased" ? t.verdictLeasedBody : r.verdict === "border" ? t.verdictBorderBody : t.verdictBroadbandBody,
            )}
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
              href={`${isArabic ? "/ar" : ""}/services/internet`}
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-border text-sm font-bold hover:border-primary/50 transition-colors"
            >
              {t.seeService}
            </Link>
          </div>
        </div>

        {r.voiceShare >= 50 && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/5 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="font-bold text-sm mb-1">{t.voiceWarnTitle}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{fill(t.voiceWarnBody)}</p>
            </div>
          </div>
        )}

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
