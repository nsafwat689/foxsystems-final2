/**
 * "What do you need?" — the first thing after the hero.
 *
 * Before this, a visitor who landed on the home page met About / Vision /
 * Mission before anything that helped them act, and the only route to CRM was
 * hovering the Services dropdown and picking one of six equally weighted
 * items. CRM is the large majority of the business, so it gets a card of its
 * own with the three industry systems inside it, and the other five services
 * sit underneath as a secondary row.
 *
 * Deliberately not a full service description: the job of this block is to get
 * someone to the right page in one click, not to sell on the home page.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Bug,
  Building2,
  Cpu,
  Globe,
  Headphones,
  Network,
  Shield,
  Stethoscope,
} from "lucide-react";

interface Props {
  language: "en" | "ar";
}

const T = {
  en: {
    kicker: "Where do you want to start?",
    title: "What do you need?",
    sub: "Pick the closest match and we will take you straight to it. Not sure? Tell us how you work today and we will say honestly what fits.",
    crmBadge: "Our core business",
    crmTitle: "CRM Systems",
    crmDesc:
      "Sales pipeline, customer management and automated follow-up, in Arabic and English. We implement CRM for teams of five to several hundred — and we build and run three industry systems of our own.",
    crmCta: "See CRM systems",
    industryLabel: "Industry systems we build and run",
    othersLabel: "Everything else we do",
    unsure: "Not sure which you need?",
    unsureCta: "Talk to an engineer",
  },
  ar: {
    kicker: "تحب تبدأ منين؟",
    title: "محتاج إيه؟",
    sub: "اختار الأقرب لحالتك وهنوديك عليه على طول. مش متأكد؟ قول لنا بتشتغل إزاي دلوقتي وهنقولك بصراحة إيه اللي يناسبك.",
    crmBadge: "نشاطنا الأساسي",
    crmTitle: "أنظمة CRM",
    crmDesc:
      "مسار مبيعات وإدارة عملاء ومتابعة تلقائية، بالعربي والإنجليزي. بنطبّق CRM لفرق من ٥ أفراد لعدة مئات — وبنبني ونشغّل تلات أنظمة متخصصة بتاعتنا.",
    crmCta: "شوف أنظمة CRM",
    industryLabel: "أنظمة متخصصة من تنفيذنا وتشغيلنا",
    othersLabel: "باقي اللي بنعمله",
    unsure: "مش متأكد محتاج إيه؟",
    unsureCta: "كلّم مهندس",
  },
};

const INDUSTRY = [
  { id: "medical-crm", Icon: Stethoscope, en: "Medical & pharma", ar: "طبي ودوائي" },
  { id: "real-estate-crm", Icon: Building2, en: "Real estate", ar: "عقاري" },
  { id: "pest-control-crm", Icon: Bug, en: "Pest control", ar: "مكافحة آفات" },
];

const OTHERS = [
  { id: "internet", Icon: Headphones, en: "Call Center & VoIP", ar: "مراكز الاتصال وVoIP", enD: "Grandstream and Cisco, IVR, call recording", arD: "Grandstream وCisco، IVR، تسجيل مكالمات" },
  { id: "cybersecurity", Icon: Shield, en: "Firewall & Security", ar: "جدران الحماية والأمن", enD: "Sophos and Fortinet, endpoint, monitoring", arD: "سوفوس وفورتينت، حماية الأجهزة، مراقبة" },
  { id: "infrastructure", Icon: Network, en: "Network & Infrastructure", ar: "الشبكات والبنية التحتية", enD: "Structured cabling, server rooms, wireless", arD: "كابلات منظمة، غرف خوادم، شبكات لاسلكية" },
  { id: "hardware", Icon: Cpu, en: "Hardware & Servers", ar: "الأجهزة والخوادم", enD: "Servers, workstations, supply and setup", arD: "خوادم ومحطات عمل، توريد وتركيب" },
  { id: "web-development", Icon: Globe, en: "Website Development", ar: "تطوير المواقع", enD: "Fast, bilingual, search-optimised sites", arD: "مواقع سريعة وثنائية اللغة ومهيأة للبحث" },
];

export default function ServiceChooser({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";
  const Arrow = () => <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />;

  return (
    <section className="py-20 bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <span className="pill pill-gold mb-4 inline-block">{t.kicker}</span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}
          >
            {t.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{t.sub}</p>
        </motion.div>

        {/* CRM — deliberately dominant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-7 md:p-9 mb-6"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-8 items-start">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.14em] uppercase text-primary mb-3">
                {t.crmBadge}
              </span>
              <h3
                className="text-2xl md:text-3xl font-extrabold mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              >
                {t.crmTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">{t.crmDesc}</p>
              <Link
                href={`${prefix}/services/software`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:gap-3 transition-all shadow-lg shadow-primary/25"
              >
                {t.crmCta}
                <Arrow />
              </Link>
            </div>

            <div>
              <p className="text-xs font-bold tracking-wide uppercase text-muted-foreground mb-3">
                {t.industryLabel}
              </p>
              <div className="flex flex-col gap-2.5">
                {INDUSTRY.map(({ id, Icon, en, ar }) => (
                  <Link
                    key={id}
                    href={`${prefix}/solutions/${id}`}
                    className="group flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-sm flex-1">{isArabic ? ar : en}</span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Arrow />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Everything else */}
        <p className="text-xs font-bold tracking-wide uppercase text-muted-foreground mb-3">
          {t.othersLabel}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OTHERS.map(({ id, Icon, en, ar, enD, arD }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`${prefix}/services/${id}`}
                className="group flex flex-col h-full p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
              >
                <Icon className="w-5 h-5 text-primary mb-3" aria-hidden="true" />
                <span className="font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {isArabic ? ar : en}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {isArabic ? arD : enD}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted-foreground">{t.unsure}</span>
          <Link
            href={`${prefix}/contact`}
            className="inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all"
          >
            {t.unsureCta}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
