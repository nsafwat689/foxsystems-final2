/**
 * The tools hub at /tools (and /ar/tools).
 *
 * It exists so the individual calculators have a parent in the breadcrumb
 * trail and a page that links to all of them, the same job /solutions does
 * for the three products.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calculator, CalendarClock, FileText, Gauge, Percent } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { TOOLS, TOOL_IDS, TOOLS_INDEX_SEO } from "@/data/tools";
import { generateBreadcrumbSchema } from "@/utils/seo";

const ICONS = { Calculator, Gauge, Percent, CalendarClock, FileText };
const ORIGIN = "https://foxsystemstech.com";

const T = {
  en: {
    badge: "Free tools",
    title: "Calculators we built for the questions we get asked",
    sub: "No sign-up, no email wall, nothing stored — every one of these runs entirely in your browser. They are the same calculations we do on a whiteboard when a client asks what something will actually cost.",
    open: "Open the tool",
    ctaTitle: "Need the answer for your own numbers?",
    ctaSub: "Send us what you are working with and an engineer will go through it with you — including telling you when the cheaper option is the right one.",
    cta: "Talk to an engineer",
  },
  ar: {
    badge: "أدوات مجانية",
    title: "حاسبات بنيناها للأسئلة التي تُطرح علينا",
    sub: "بلا تسجيل، وبلا حاجز بريد إلكتروني، وبلا تخزين لأي شيء — فكل واحدة منها تعمل داخل متصفحك بالكامل. وهي العمليات الحسابية نفسها التي نجريها على السبورة حين يسألنا عميل عن التكلفة الفعلية لشيء ما.",
    open: "افتح الأداة",
    ctaTitle: "تحتاج إلى الإجابة بأرقامك أنت؟",
    ctaSub: "أرسل لنا ما بين يديك وسيراجعه معك أحد المهندسين، بما في ذلك إخبارك متى يكون الخيار الأقل تكلفة هو الصحيح.",
    cta: "تحدّث إلى مهندس",
  },
};

interface Props {
  language: "en" | "ar";
}

export default function Tools({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";
  const seo = TOOLS_INDEX_SEO[language];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? `${ORIGIN}/ar` : `${ORIGIN}/` },
    { name: isArabic ? "الأدوات" : "Tools", url: seo.canonicalUrl },
  ]);

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <SEOHead config={seo} organizationSchema breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      <section className="relative py-24 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-3xl"
          >
            <span className="pill pill-gold mb-5 inline-block">{t.badge}</span>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}
            >
              {t.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">{t.sub}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOL_IDS.map((id, i) => {
            const tool = TOOLS[id];
            const Icon = ICONS[tool.icon];
            const copy = tool[language];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex flex-col p-7 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <Icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                <h2 className="text-xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {copy.name}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{copy.tagline}</p>
                <Link
                  href={`${prefix}/tools/${id}`}
                  className="inline-flex items-center gap-2 mt-6 font-semibold text-primary hover:gap-3 transition-all"
                >
                  {t.open}
                  <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-[var(--navy)] text-white p-8 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-extrabold mb-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {t.ctaTitle}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">{t.ctaSub}</p>
          </div>
          <Link
            href={`${prefix}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[var(--navy)] font-bold hover:gap-3 transition-all"
          >
            {t.cta}
            <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
