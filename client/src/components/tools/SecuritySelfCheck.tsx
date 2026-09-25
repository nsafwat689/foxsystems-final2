/**
 * IT security self-check — twelve weighted questions.
 *
 * Weights reflect how often the absence of a control is the actual cause of
 * a small-business incident, not how technical it sounds. Tested restores,
 * MFA on email and prompt offboarding carry the most because between them
 * they account for most of the losses we get called in after.
 *
 * Partial credit is deliberate: almost nobody is at zero or one on these, and
 * a pass/fail that everyone fails tells the reader nothing about what to do
 * on Monday.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";

interface Props {
  language: "en" | "ar";
}

type Q = {
  id: string;
  weight: number;
  en: { q: string; fix: string };
  ar: { q: string; fix: string };
};

const QUESTIONS: Q[] = [
  {
    id: "restore",
    weight: 14,
    en: { q: "Have you successfully restored real data from a backup in the last three months?", fix: "Restore something this week. An untested backup is an intention, not a backup." },
    ar: { q: "هل استرجعت بيانات حقيقية من نسخة احتياطية بنجاح خلال الأشهر الثلاثة الماضية؟", fix: "استرجع شيئًا هذا الأسبوع. فالنسخة غير المختبَرة نيّة لا نسخة احتياطية." },
  },
  {
    id: "mfa",
    weight: 13,
    en: { q: "Is multi-factor authentication switched on for every email account, including the owner's?", fix: "Turn on MFA for email today. It costs minutes and breaks the most common attack chain." },
    ar: { q: "هل التحقق بخطوتين مُفعَّل على كل حسابات البريد، بما فيها حساب المالك؟", fix: "فعّل التحقق بخطوتين على البريد اليوم. يكلّف دقائق ويقطع أشهر سلاسل الهجوم." },
  },
  {
    id: "offboard",
    weight: 11,
    en: { q: "Are a leaver's accounts disabled the same day they leave?", fix: "Write a one-page leaver checklist and make one person accountable for it." },
    ar: { q: "هل تُعطَّل حسابات المغادر في اليوم نفسه الذي يغادر فيه؟", fix: "اكتب قائمة مراجعة من صفحة واحدة للمغادرين واجعل شخصًا واحدًا مسؤولًا عنها." },
  },
  {
    id: "offsite",
    weight: 10,
    en: { q: "Is at least one backup copy kept off the premises or in a separate cloud account?", fix: "Ransomware encrypts attached drives too. Keep one copy somewhere it cannot reach." },
    ar: { q: "هل تُحفظ نسخة احتياطية واحدة على الأقل خارج المقر أو في حساب سحابي منفصل؟", fix: "برمجيات الفدية تشفّر الأقراص المتصلة أيضًا. احفظ نسخة في مكان لا تصله." },
  },
  {
    id: "patching",
    weight: 9,
    en: { q: "Do servers and computers receive security updates within a month of release?", fix: "Turn on automatic updates where you can, and diarise the rest monthly." },
    ar: { q: "هل تتلقّى الخوادم والحواسيب تحديثات الأمن خلال شهر من صدورها؟", fix: "فعّل التحديث التلقائي حيثما أمكن، وجدوِل الباقي شهريًا." },
  },
  {
    id: "admin",
    weight: 8,
    en: { q: "Do staff work day to day from accounts without administrator rights?", fix: "Separate admin accounts from daily accounts. It contains most malware to one user." },
    ar: { q: "هل يعمل الموظفون يوميًا من حسابات بلا صلاحيات مدير؟", fix: "افصل حسابات المدير عن حسابات العمل اليومي. فذلك يحصر معظم البرمجيات الخبيثة في مستخدم واحد." },
  },
  {
    id: "firewall",
    weight: 8,
    en: { q: "Is there a managed firewall, with someone responsible for its rules?", fix: "An unmanaged firewall drifts. Someone should own the rule set and review it." },
    ar: { q: "هل لديك جدار حماية مُدار، مع شخص مسؤول عن قواعده؟", fix: "جدار الحماية غير المُدار ينحرف. ينبغي أن يملك شخصٌ مجموعةَ القواعد ويراجعها." },
  },
  {
    id: "phishing",
    weight: 7,
    en: { q: "Would your accounts team verify a change of bank details by phone before paying?", fix: "Make a call-back on any payment-detail change a written rule. This is how money leaves." },
    ar: { q: "هل يتحقّق فريقك المحاسبي هاتفيًا من تغيير بيانات الحساب البنكي قبل السداد؟", fix: "اجعل الاتصال للتحقق من أي تغيير في بيانات السداد قاعدة مكتوبة. فمن هنا تخرج الأموال." },
  },
  {
    id: "encryption",
    weight: 6,
    en: { q: "Are laptops and phones encrypted, so a lost device is not a data breach?", fix: "Switch on device encryption. It is built in and free on current systems." },
    ar: { q: "هل الحواسيب المحمولة والهواتف مشفَّرة، فلا يكون فقدان الجهاز تسريبًا للبيانات؟", fix: "فعّل تشفير الأجهزة. فهو مدمج ومجاني في الأنظمة الحديثة." },
  },
  {
    id: "vendor",
    weight: 5,
    en: { q: "Do you know which outside suppliers can reach your systems, and can you revoke that?", fix: "List every third party with access, and check you can remove each one without asking them." },
    ar: { q: "هل تعرف أي موردين خارجيين يمكنهم الوصول إلى أنظمتك، وهل تستطيع إلغاء ذلك؟", fix: "أحصِ كل جهة خارجية لديها وصول، وتأكّد أنك تستطيع إزالة كلٍّ منها دون الرجوع إليها." },
  },
  {
    id: "passwords",
    weight: 5,
    en: { q: "Does the team use a password manager rather than reusing passwords?", fix: "Reused passwords turn one breach anywhere into a breach at your company." },
    ar: { q: "هل يستخدم الفريق مدير كلمات مرور بدل إعادة استخدام كلمات المرور؟", fix: "إعادة استخدام كلمات المرور تحوّل أي اختراق في أي مكان إلى اختراق في شركتك." },
  },
  {
    id: "plan",
    weight: 4,
    en: { q: "Is there a written plan for who does what in the first hour of an incident?", fix: "One page: who to call, who decides, what to disconnect. Write it before you need it." },
    ar: { q: "هل ثمة خطة مكتوبة لمن يفعل ماذا في الساعة الأولى من الحادثة؟", fix: "صفحة واحدة: بمن تتصل، ومن يقرّر، وما الذي تفصله. اكتبها قبل أن تحتاج إليها." },
  },
];

const T = {
  en: {
    intro: "Answer honestly — nothing is sent anywhere.",
    yes: "Yes",
    partly: "Partly",
    no: "No",
    score: "Your score",
    of: "of 100",
    bandGood: "Solid ground",
    bandGoodBody: "You are ahead of most businesses your size. The remaining gaps below are worth closing, but nothing here is an emergency.",
    bandMid: "Workable, with real gaps",
    bandMidBody: "The basics are partly there. The items below are listed hardest-hitting first — the top two are where your risk actually sits.",
    bandLow: "This needs attention",
    bandLowBody: "Enough of the fundamentals are missing that a routine, untargeted attack would probably succeed. Start at the top of this list; the first item is usually free.",
    fixes: "Fix these first",
    allGood: "Nothing outstanding — everything above is answered yes.",
    reset: "Start again",
    cta: "Talk to an engineer",
    ctaSub: "We can go through this with you and tell you what is worth paying for and what you can do yourself.",
    seeService: "See firewall and security services",
    progress: "answered",
  },
  ar: {
    intro: "أجب بصدق — فلا يُرسل شيء إلى أي جهة.",
    yes: "نعم",
    partly: "جزئيًا",
    no: "لا",
    score: "نتيجتك",
    of: "من 100",
    bandGood: "أرضية متينة",
    bandGoodBody: "أنت متقدّم على معظم الشركات في حجمك. والثغرات المتبقية أدناه تستحق السدّ، لكن لا شيء هنا طارئ.",
    bandMid: "مقبول مع ثغرات حقيقية",
    bandMidBody: "الأساسيات موجودة جزئيًا. والبنود أدناه مرتّبة بالأشدّ أثرًا أولًا — وأول بندين هما موضع خطرك فعلًا.",
    bandLow: "هذا يحتاج إلى انتباه",
    bandLowBody: "من الأساسيات ما يكفي غيابه لأن ينجح هجوم روتيني غير موجَّه على الأرجح. فابدأ من أعلى هذه القائمة؛ وأول بند فيها مجاني عادةً.",
    fixes: "أصلح هذه أولًا",
    allGood: "لا شيء معلّق — فكل ما سبق أُجيب عنه بنعم.",
    reset: "ابدأ من جديد",
    cta: "تحدّث إلى مهندس",
    ctaSub: "يمكننا مراجعة هذا معك وإخبارك بما يستحق الدفع مقابله وما تستطيع فعله بنفسك.",
    seeService: "اطّلع على خدمات جدران الحماية والأمن",
    progress: "أُجيب عنها",
  },
};

export default function SecuritySelfCheck({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const r = useMemo(() => {
    const total = QUESTIONS.reduce((s, q) => s + q.weight, 0);
    const earned = QUESTIONS.reduce((s, q) => s + q.weight * (answers[q.id] ?? 0), 0);
    const answered = QUESTIONS.filter(q => answers[q.id] !== undefined).length;
    const score = Math.round((earned / total) * 100);
    const gaps = QUESTIONS.filter(q => (answers[q.id] ?? 0) < 1)
      .sort((a, b) => b.weight * (1 - (answers[b.id] ?? 0)) - a.weight * (1 - (answers[a.id] ?? 0)));
    return { score, answered, gaps, band: score >= 80 ? "good" : score >= 50 ? "mid" : "low" };
  }, [answers]);

  const started = r.answered > 0;
  const Icon = r.band === "good" ? CheckCircle2 : r.band === "mid" ? AlertTriangle : ShieldAlert;

  return (
    <div className="grid lg:grid-cols-2 gap-6" dir={isArabic ? "rtl" : "ltr"}>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{t.intro}</p>
        {QUESTIONS.map((q, i) => (
          <div key={q.id} className="p-4 rounded-xl border border-border bg-card">
            <p className="text-sm font-semibold mb-3 flex gap-2">
              <span className="text-muted-foreground ltr-text">{i + 1}.</span>
              <span>{q[language].q}</span>
            </p>
            <div className="inline-flex p-1 rounded-lg bg-muted/60 border border-border w-full">
              {[
                { v: 1, l: t.yes },
                { v: 0.5, l: t.partly },
                { v: 0, l: t.no },
              ].map(o => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => setAnswers(a => ({ ...a, [q.id]: o.v }))}
                  aria-pressed={answers[q.id] === o.v}
                  className={`flex-1 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                    answers[q.id] === o.v ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div className="lg:sticky lg:top-24 space-y-5">
          <div
            className={`p-6 rounded-2xl border-2 ${
              !started
                ? "border-border bg-muted/30"
                : r.band === "good"
                  ? "border-primary/40 bg-primary/5"
                  : r.band === "mid"
                    ? "border-amber-500/40 bg-amber-500/5"
                    : "border-red-500/40 bg-red-500/5"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-muted-foreground mb-1">{t.score}</p>
                <p className="text-5xl font-extrabold ltr-text" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {started ? r.score : "—"}
                  <span className="text-base font-bold text-muted-foreground ms-2">{t.of}</span>
                </p>
              </div>
              <Icon
                className={`w-10 h-10 flex-shrink-0 ${
                  !started ? "text-muted-foreground/40" : r.band === "good" ? "text-primary" : r.band === "mid" ? "text-amber-500" : "text-red-500"
                }`}
                aria-hidden="true"
              />
            </div>

            <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  r.band === "good" ? "bg-primary" : r.band === "mid" ? "bg-amber-500" : "bg-red-500"
                }`}
                style={{ width: `${started ? r.score : 0}%` }}
              />
            </div>

            <p className="text-xs text-muted-foreground mb-3 ltr-text">
              {r.answered}/{QUESTIONS.length} {t.progress}
            </p>

            {started && (
              <>
                <h4 className="font-extrabold mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {r.band === "good" ? t.bandGood : r.band === "mid" ? t.bandMid : t.bandLow}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.band === "good" ? t.bandGoodBody : r.band === "mid" ? t.bandMidBody : t.bandLowBody}
                </p>
              </>
            )}
          </div>

          {started && (
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h4 className="font-bold text-sm mb-3">{t.fixes}</h4>
              {r.gaps.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t.allGood}</p>
              ) : (
                <ol className="space-y-3">
                  {r.gaps.slice(0, 5).map((q, i) => (
                    <li key={q.id} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center ltr-text">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{q[language].fix}</p>
                    </li>
                  ))}
                </ol>
              )}
              <button
                type="button"
                onClick={() => setAnswers({})}
                className="mt-4 text-xs font-semibold text-muted-foreground hover:text-primary transition"
              >
                {t.reset}
              </button>
            </div>
          )}

          <div className="p-5 rounded-2xl bg-[var(--navy)] text-white">
            <p className="text-sm text-white/80 leading-relaxed mb-4">{t.ctaSub}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`${isArabic ? "/ar" : ""}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[var(--navy)] text-sm font-bold hover:gap-3 transition-all"
              >
                {t.cta}
                <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
              </Link>
              <Link
                href={`${isArabic ? "/ar" : ""}/services/cybersecurity`}
                className="inline-flex items-center px-5 py-2.5 rounded-full border border-white/30 text-sm font-bold hover:bg-white/10 transition-colors"
              >
                {t.seeService}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
