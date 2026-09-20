/**
 * Index for the three CRM products, at /solutions (and /ar/solutions).
 *
 * Its job is mostly internal linking: it gives the three product pages a
 * parent to sit under in the breadcrumb trail and a hub that links to all of
 * them, rather than leaving each one reachable only from the nav.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bug, Building2, MessageCircle, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { SOLUTIONS } from "@/data/solutions";
import { generateBreadcrumbSchema, type SEOConfig } from "@/utils/seo";

const ICONS = { Stethoscope, Building2, Bug };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const T = {
  en: {
    badge: "Our Products",
    title: "CRM Systems We Build and Run",
    sub: "Three industry CRMs, each built for one sector rather than configured into it: pharmaceutical field teams, real estate sales, and pest control operations. All of them run in production today, in Arabic and English.",
    open: "See the system",
    ctaTitle: "Not sure which fits?",
    ctaSub: "Tell us how your team works today and we will tell you honestly whether one of these fits, needs adapting, or is the wrong shape for you.",
    cta: "Talk to an engineer",
    wa: "Chat on WhatsApp",
  },
  ar: {
    badge: "منتجاتنا",
    title: "أنظمة CRM من تنفيذنا وتشغيلنا",
    sub: "تلات أنظمة CRM، كل واحد متبني لقطاع واحد مش متظبّط عليه: الفرق الميدانية في شركات الأدوية، ومبيعات العقارات، وعمليات مكافحة الآفات. كلهم شغالين في الإنتاج النهارده، بالعربي والإنجليزي.",
    open: "شوف النظام",
    ctaTitle: "مش متأكد أنهي واحد يناسبك؟",
    ctaSub: "قول لنا فريقك شغال إزاي دلوقتي وهنقولك بصراحة لو واحد منهم يناسبك، ولا محتاج تعديل، ولا مش الشكل الصح ليك.",
    cta: "كلّم مهندس",
    wa: "تواصل على واتساب",
  },
};

const ORIGIN = "https://foxsystemstech.com";

const SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "CRM Systems by Industry | Medical, Real Estate & Pest Control | Fox Systems",
    description:
      "Industry CRM systems built and run by Fox Systems: medical and pharmaceutical field force CRM, real estate sales CRM, and pest control job management. Egypt, Saudi Arabia and Kuwait. Arabic & English.",
    keywords:
      "industry CRM Egypt, medical CRM Egypt, real estate CRM Egypt, pest control software Egypt, vertical CRM Middle East, custom CRM Egypt, CRM by industry, نظام CRM طبي, نظام CRM عقاري, برنامج شركات مكافحة الحشرات, CRM solutions Egypt, CRM Saudi Arabia, CRM Kuwait",
    ogTitle: "CRM Systems by Industry - Fox Systems",
    ogDescription:
      "Medical field force CRM, real estate sales CRM and pest control job management. Built, run and supported by Fox Systems.",
    ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
    canonicalUrl: `${ORIGIN}/solutions`,
    language: "en",
  },
  ar: {
    title: "أنظمة CRM حسب القطاع | طبي، عقاري، مكافحة آفات | فوكس سيستمز",
    description:
      "أنظمة CRM متخصصة من تنفيذ وتشغيل فوكس سيستمز: CRM طبي للفرق الميدانية، CRM عقاري للمبيعات، وبرنامج إدارة مهام مكافحة الآفات. مصر والسعودية والكويت. عربي وإنجليزي.",
    keywords:
      "نظام CRM طبي, نظام CRM عقاري, برنامج شركات مكافحة الحشرات, أنظمة CRM متخصصة, CRM حسب القطاع, نظام CRM مصر, CRM السعودية, CRM الكويت, industry CRM Egypt, vertical CRM Middle East",
    ogTitle: "أنظمة CRM حسب القطاع - فوكس سيستمز",
    ogDescription: "CRM طبي للفرق الميدانية، وCRM عقاري للمبيعات، وبرنامج إدارة مهام مكافحة الآفات.",
    ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/solutions`,
    language: "ar",
  },
};

interface Props {
  language: "en" | "ar";
}

export default function Solutions({ language }: Props) {
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? `${ORIGIN}/ar` : `${ORIGIN}/` },
    { name: isArabic ? "المنتجات" : "Solutions", url: SEO[language].canonicalUrl },
  ]);

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <SEOHead config={SEO[language]} organizationSchema breadcrumbSchema={breadcrumbSchema} />
      <Header language={language} />

      <section className="relative py-24 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className={`max-w-3xl ${isArabic ? "text-right mr-auto ml-0" : ""}`}
          >
            <span className="pill pill-gold mb-5 inline-block">{t.badge}</span>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}
            >
              {t.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{t.sub}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {Object.values(SOLUTIONS).map((solution, i) => {
            const Icon = ICONS[solution.icon];
            const copy = isArabic ? solution.ar : solution.en;
            return (
              <motion.div
                key={solution.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-col p-7 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <Icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                <h2 className="text-xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {copy.name}
                </h2>
                <p className="text-sm font-semibold text-foreground/80 mb-3">{copy.heroTitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{copy.heroSub}</p>
                <Link
                  href={`${prefix}/solutions/${solution.id}`}
                  className="inline-flex items-center gap-2 mt-6 font-semibold text-primary hover:gap-3 transition-all"
                >
                  {t.open}
                  <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <section className="mt-16 rounded-2xl bg-[var(--navy)] text-white p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.ctaTitle}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-7 leading-relaxed">{t.ctaSub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link href={`${prefix}/contact`}>
                {t.cta}
                <ArrowRight className={`w-4 h-4 ${isArabic ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                <MessageCircle className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`} />
                {t.wa}
              </a>
            </Button>
          </div>
        </section>
      </div>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <p className="text-white/40 text-sm">
            © 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."} · Egypt · Saudi
            Arabia · Kuwait
          </p>
        </div>
      </footer>
      <a
        href="https://wa.me/201038450546"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
