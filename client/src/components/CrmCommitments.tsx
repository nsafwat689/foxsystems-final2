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
    Icon: Clock,
    en: { t: "First response within 1 hour", d: "You hear back from us within the hour, any day of the week." },
    ar: { t: "أول رد خلال ساعة", d: "هترد عليك خلال ساعة، أي يوم في الأسبوع." },
  },
  {
    Icon: AlertCircle,
    en: { t: "Critical issues handled on the spot", d: "A system that is down is not a ticket in a queue. We act immediately, on site when that is what it takes." },
    ar: { t: "الأعطال الحرجة بتتحل فورًا", d: "النظام الواقف مش تذكرة في طابور. بنتحرك فورًا، وفي الموقع لو ده المطلوب." },
  },
  {
    Icon: UserCheck,
    en: { t: "A named engineer on your account", d: "Someone who knows your setup, not whoever picks up the queue that day." },
    ar: { t: "مهندس محدد بالاسم لحسابك", d: "حد عارف نظامك، مش أي حد بيرد على الطابور في اليوم ده." },
  },
  {
    Icon: Wallet,
    en: { t: "No setup fee", d: "Implementation, migration and training are in the price, not billed on top." },
    ar: { t: "من غير رسوم تركيب", d: "التركيب ونقل البيانات والتدريب داخل السعر، مش فاتورة زيادة." },
  },
  {
    Icon: CalendarX,
    en: { t: "Cancel with two weeks' notice", d: "No lock-in and no exit penalty. Two weeks' notice is all we ask." },
    ar: { t: "إلغاء بإخطار أسبوعين", d: "مفيش ارتباط إجباري ولا غرامة خروج. كل اللي بنطلبه إخطار بأسبوعين." },
  },
  {
    Icon: DownloadCloud,
    en: { t: "Your data leaves with you", d: "Export it yourself any time, or ask us and we will have it to you within one day." },
    ar: { t: "بياناتك بتخرج معاك", d: "صدّرها بنفسك في أي وقت، أو اطلبها مننا وهتوصلك خلال يوم." },
  },
  {
    Icon: Database,
    en: { t: "Backups, kept by us", d: "We take and hold backups of your data, so a mistake or a failure is recoverable." },
    ar: { t: "نسخ احتياطية، إحنا بنحتفظ بيها", d: "بناخد ونحتفظ بنسخ احتياطية لبياناتك، فالخطأ أو العطل يفضل قابل للاسترجاع." },
  },
  {
    Icon: Shield,
    en: { t: "Firewall protection on your data", d: "Your instance sits behind a firewall we configure and maintain." },
    ar: { t: "حماية بجدار ناري لبياناتك", d: "نسختك وراء جدار حماية بنظبطه ونصونه." },
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
    note: "Standard bundles are priced above. Customisation is quoted separately — talk to sales and you will get the scope and cost in writing before anything starts.",
  },
  ar: {
    kicker: "التزاماتنا",
    title: "اللي بنلتزم بيه، مكتوب",
    sub: "دي مش أمنيات. دي اللي تقدر تحاسبنا عليه، واللي هنحطه في العقد.",
    trialTitle: "جرّبه قبل ما تقرر",
    trialBody:
      "ادخل على نسخة تجريبية شغالة واستخدمها بجد — اتنقل بين كل الشاشات، ضيف بيانات، غيّر حاجات. دي بيئة تجريبية مشتركة مش نظامك إنت، فأي حاجة تدخلها بتتمسح لما تخرج. من غير تركيب ولا دفع ولا كارت.",
    trialCta: "اطلب دخول للنسخة التجريبية",
    note: "الباقات القياسية أسعارها فوق. التخصيص بيتسعّر لوحده — كلّم المبيعات وهتاخد نطاق الشغل والتكلفة مكتوبين قبل ما يبدأ أي حاجة.",
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

      <p className="text-xs text-muted-foreground/80 mt-4 leading-relaxed">{t.note}</p>
    </section>
  );
}
