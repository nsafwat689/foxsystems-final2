/**
 * What Fox Systems commits to, in writing.
 *
 * Every item came from the business owner on 2026-09-24. Nothing is invented:
 * each line here is a promise a client can hold them to, so anything that was
 * not stated is not on the page.
 *
 * The trial wording matters most. It is a DEMO environment — a prospect can
 * log in, explore and edit, but the data is wiped on logout and it is not
 * their live CRM. Describing it as a "free trial" without that detail would
 * generate complaints from people expecting their work to persist, so the
 * reset is stated plainly rather than buried.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  AlertCircle,
  Languages,
  Lock,
  Minus,
  Rocket,
  ArrowRight,
  CalendarX,
  Clock,
  Database,
  DownloadCloud,
  PlayCircle,
  Shield,
  UserCheck,
  Wallet,
} from "lucide-react";

interface Props {
  language: "en" | "ar";
}

const ITEMS = [
  {
    Icon: Rocket,
    en: { t: "Live in two weeks", d: "A standard setup is running and your team trained within two weeks. Customisation is scoped separately and quoted with its own timeline." },
    ar: { t: "جاهز للعمل خلال أسبوعين", d: "يصبح التركيب القياسي جاهزًا وفريقك مدرَّبًا خلال أسبوعين. أما التخصيص فيُحدَّد نطاقه ويُسعَّر بجدول زمني خاص به." },
  },
  {
    Icon: Clock,
    en: { t: "First response within 1 hour", d: "You hear back from us within the hour, any day of the week." },
    ar: { t: "أول ردّ خلال ساعة", d: "نردّ عليك خلال ساعة، في أي يوم من أيام الأسبوع." },
  },
  {
    Icon: AlertCircle,
    en: { t: "Critical issues handled on the spot", d: "A system that is down is not a ticket in a queue. We act immediately, on site when that is what it takes." },
    ar: { t: "الأعطال الحرجة تُعالَج فورًا", d: "النظام المتوقف ليس تذكرة في طابور انتظار. نتحرّك فورًا، وميدانيًا إن لزم الأمر." },
  },
  {
    Icon: Languages,
    en: { t: "Support in Arabic or English", d: "Whichever your team prefers, from people in the same time zone." },
    ar: { t: "دعم بالعربية أو الإنجليزية", d: "بحسب ما يفضّله فريقك، ومن فريق يعمل في التوقيت نفسه." },
  },
  {
    Icon: UserCheck,
    en: { t: "A named engineer, on Business and Complete", d: "Someone who knows your setup, not whoever picks up the queue that day. Included on the Business and Complete plans." },
    ar: { t: "مهندس مخصّص، في باقتَي الأعمال والشامل", d: "شخص يعرف نظامك، لا من يتصادف وجوده على الدعم ذلك اليوم. وهو مشمول في باقتَي الأعمال والشامل." },
  },
  {
    Icon: Wallet,
    en: { t: "No setup fee", d: "Implementation, migration and training are in the price, not billed on top." },
    ar: { t: "بلا رسوم تركيب", d: "التركيب ونقل البيانات والتدريب مشمولة في السعر، لا تُحتسب إضافةً إليه." },
  },
  {
    Icon: Lock,
    en: { t: "Your price is locked", d: "The price agreed at signing holds for the whole contract term. It does not move under you." },
    ar: { t: "سعرك ثابت", d: "السعر المتفق عليه عند التوقيع يظل ثابتًا طوال مدة العقد، ولا يتغيّر عليك." },
  },
  {
    Icon: CalendarX,
    en: { t: "Cancel with two weeks' notice", d: "No lock-in and no exit penalty. Two weeks' notice is all we ask." },
    ar: { t: "إلغاء بإشعار أسبوعين", d: "لا ارتباط إلزامي ولا غرامة إنهاء. كل ما نطلبه إشعار قبل أسبوعين." },
  },
  {
    Icon: DownloadCloud,
    en: { t: "Your data leaves with you", d: "Export it yourself any time, or ask us and we will have it to you within one day." },
    ar: { t: "بياناتك تخرج معك", d: "صدّرها بنفسك في أي وقت، أو اطلبها منا فتصلك خلال يوم واحد." },
  },
  {
    Icon: Database,
    en: { t: "Backups, kept by us", d: "We take and hold backups of your data, so a mistake or a failure is recoverable." },
    ar: { t: "نسخ احتياطية نحتفظ بها", d: "نأخذ نسخًا احتياطية لبياناتك ونحتفظ بها، ليظل الخطأ أو العطل قابلًا للاسترجاع." },
  },
  {
    Icon: Shield,
    en: { t: "Firewall protection on your data", d: "Your instance sits behind a firewall we configure and maintain." },
    ar: { t: "جدار حماية يحمي بياناتك", d: "تعمل نسختك خلف جدار حماية نتولّى إعداده وصيانته." },
  },
];

const T = {
  en: {
    kicker: "Our commitments",
    title: "What we commit to, in writing",
    sub: "These are not aspirations. They are what you can hold us to, and what we will put in a contract.",
    trialTitle: "Try it before you decide",
    trialBody:
      "Log into a live demo and use it properly — click through every screen, add records, change things. It is a shared demo environment, not your own system, so whatever you enter is cleared when you log out. Nothing to install, nothing to pay, no card.",
    trialCta: "Ask for demo access",
    note: "Standard bundles are priced above. Business includes 3 customisations and Complete includes 10; beyond that, customisation is quoted separately — talk to sales and you will get the scope and cost in writing before anything starts.",
    notIncludedTitle: "What is not included",
    notIncluded: [
      "Tax. Prices are shown before tax.",
      "Hardware, where the solution needs it — servers, phones or networking are quoted separately.",
      "Customisation beyond what your plan includes, which is scoped and quoted on its own.",
    ],
  },
  ar: {
    kicker: "التزاماتنا",
    title: "ما نلتزم به، مكتوبًا",
    sub: "ليست هذه أمنيات، بل ما يمكنك محاسبتنا عليه، وما سنضعه في العقد.",
    trialTitle: "جرّبه قبل أن تقرّر",
    trialBody:
      "ادخل إلى نسخة تجريبية فعلية واستخدمها كما لو كانت نظامك: تنقّل بين الشاشات، وأضف بيانات، وعدّل ما تشاء. وهي بيئة تجريبية مشتركة وليست نظامك الخاص، لذا يُمسح كل ما تُدخله بمجرد تسجيل الخروج. دون تركيب، ودون دفع، ودون بطاقة.",
    trialCta: "اطلب الدخول إلى النسخة التجريبية",
    note: "أسعار الباقات القياسية مبيّنة أعلاه. وتشمل باقة الأعمال 3 تخصيصات، وتشمل باقة الشامل 10 تخصيصات، وما زاد عليها يُسعَّر على حدة: تواصل مع المبيعات لتحصل على نطاق العمل والتكلفة مكتوبَين قبل بدء أي شيء.",
    notIncludedTitle: "ما هو غير مشمول",
    notIncluded: [
      "الضرائب. الأسعار معروضة قبل الضريبة.",
      "الأجهزة، إن احتاجها الحل: الخوادم أو الهواتف أو معدات الشبكات تُسعَّر على حدة.",
      "التخصيص الزائد عن النظام القياسي، ويُحدَّد نطاقه ويُسعَّر على حدة.",
    ],
  },
};

export default function CrmCommitments({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";

  return (
    <section className="mt-16 pt-14 border-t border-border" dir={isArabic ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-3 mb-7">
        <span className="pill pill-gold self-start">{t.kicker}</span>
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {t.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.sub}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ITEMS.map(({ Icon, en, ar }, i) => {
          const c = isArabic ? ar : en;
          return (
            <motion.div
              key={en.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <Icon className="w-5 h-5 text-primary mb-3" aria-hidden="true" />
              <h3 className="font-bold text-sm mb-1.5 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {c.t}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Demo — described accurately, including the reset */}
      <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-7 flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h3 className="text-xl font-extrabold mb-2 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <PlayCircle className="w-5 h-5 text-primary" aria-hidden="true" />
            {t.trialTitle}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.trialBody}</p>
        </div>
        <Link
          href={`${prefix}/contact`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:gap-3 transition-all shadow-lg shadow-primary/25"
        >
          {t.trialCta}
          <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
        </Link>
      </div>

      {/* Stating the limits plainly makes the promises above more believable,
          and stops a sales call starting with an expectation nobody set. */}
      <div className="mt-6 p-6 rounded-xl border border-border bg-muted/30">
        <h3 className="font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {t.notIncludedTitle}
        </h3>
        <ul className="space-y-2">
          {t.notIncluded.map(item => (
            <li key={item} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <Minus className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground/60" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-muted-foreground/80 mt-4 leading-relaxed">{t.note}</p>
    </section>
  );
}
