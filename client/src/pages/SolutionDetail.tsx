/**
 * One page per CRM product, at /solutions/<id> (and /ar/solutions/<id>).
 *
 * All content and SEO comes from data/solutions.ts — this file is layout only,
 * so adding a fourth vertical means adding data, not another page.
 *
 * The FAQ block is emitted as FAQPage structured data as well as visible copy,
 * which is what wins the expandable results these product searches show.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bug, Building2, Check, CheckCircle2, MessageCircle, Stethoscope, X } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import SolutionShowcase from "@/components/SolutionShowcase";
import { SOLUTIONS, type SolutionId } from "@/data/solutions";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/utils/seo";

const ICONS = { Stethoscope, Building2, Bug };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface Props {
  solutionId: SolutionId;
  language: "en" | "ar";
}

export default function SolutionDetail({ solutionId, language }: Props) {
  const solution = SOLUTIONS[solutionId];
  const isArabic = language === "ar";
  const t = isArabic ? solution.ar : solution.en;
  const seoConfig = solution.seo[language];
  const Icon = ICONS[solution.icon];

  const origin = "https://foxsystemstech.com";
  const prefix = isArabic ? "/ar" : "";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? `${origin}/ar` : `${origin}/` },
    { name: isArabic ? "المنتجات" : "Solutions", url: `${origin}${prefix}/solutions` },
    { name: t.name, url: seoConfig.canonicalUrl },
  ]);
  const productSchema = generateServiceSchema(t.name, seoConfig.description, seoConfig.canonicalUrl);
  const faqSchema = generateFAQSchema(t.faqs);

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <SEOHead
        config={seoConfig}
        organizationSchema
        additionalSchema={productSchema}
        breadcrumbSchema={breadcrumbSchema}
        faqSchema={faqSchema}
      />
      <Header language={language} />

      {/* Hero */}
      <section className="relative py-28 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className={`max-w-3xl ${isArabic ? "text-right mr-auto ml-0" : ""}`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-7 ring-1 ring-white/20">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <span className="pill pill-gold mb-5 inline-block">{t.badge}</span>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}
            >
              {t.heroTitle}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-8">{t.heroSub}</p>
            <div className={`flex flex-wrap gap-3 ${isArabic ? "justify-end" : ""}`}>
              <Button asChild size="lg">
                <Link href={`${prefix}/contact`}>
                  {isArabic ? "احجز عرض عملي" : "Book a walkthrough"}
                  <ArrowRight className={`w-4 h-4 ${isArabic ? "mr-2 rotate-180" : "ml-2"}`} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
                <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`} />
                  {isArabic ? "تواصل على واتساب" : "Chat on WhatsApp"}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights — the first thing after the hero, so the claim that this is
          a real running system lands before the reader has to scroll. */}
      <section className="border-b border-border bg-muted/30">
        <div className="container py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.highlights.map((h, i) => (
              <motion.div
                key={h.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
              >
                <p
                  className="font-extrabold mb-1.5 flex items-center gap-2"
                  style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                  {h.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Generic CRM vs this one */}
        <section className="mb-16 pb-14 border-b border-border">
          <div className="flex flex-col gap-3 mb-7">
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              {t.why.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{t.why.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-6 rounded-xl border border-border bg-muted/30">
              <h3
                className="font-bold mb-4 text-muted-foreground"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              >
                {t.why.genericTitle}
              </h3>
              <ul className="space-y-3">
                {t.why.generic.map(point => (
                  <li key={point} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/60" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
              <h3 className="font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                {t.why.ourTitle}
              </h3>
              <ul className="space-y-3">
                {t.why.ours.map(point => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pains */}
        <section>
          <div className="flex flex-col gap-3 mb-7">
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              {t.painTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.painSub}</p>
          </div>
          <ul className="grid md:grid-cols-2 gap-4">
            {t.pains.map((pain, i) => (
              <motion.li
                key={pain}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex gap-3 p-5 rounded-xl border border-border bg-muted/30"
              >
                <span className="text-primary font-bold flex-shrink-0" aria-hidden="true">
                  —
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{pain}</span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Features */}
        <section className="mt-16 pt-14 border-t border-border">
          <div className="flex flex-col gap-3 mb-7">
            <h2
              className="text-2xl md:text-3xl font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
            >
              {t.featureTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{t.featureSub}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Screens */}
        <SolutionShowcase base={solution.showcaseBase} copy={t} language={language} />

        {/* FAQ */}
        <section className="mt-16 pt-14 border-t border-border">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-7"
            style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
          >
            {t.faqTitle}
          </h2>
          <div className="space-y-4 max-w-3xl">
            {t.faqs.map(faq => (
              <details key={faq.q} className="group rounded-xl border border-border bg-card p-5">
                <summary className="font-semibold cursor-pointer list-none flex items-start justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other solutions — internal linking between the three verticals */}
        <section className="mt-16 pt-14 border-t border-border">
          <h2 className="text-xl font-extrabold mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {isArabic ? "أنظمة تانية بنبنيها" : "The other systems we build"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.values(SOLUTIONS)
              .filter(s => s.id !== solution.id)
              .map(other => {
                const OtherIcon = ICONS[other.icon];
                const otherCopy = isArabic ? other.ar : other.en;
                return (
                  <Link
                    key={other.id}
                    href={`${prefix}/solutions/${other.id}`}
                    className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                  >
                    <OtherIcon className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>
                      <span className="font-bold block">{otherCopy.name}</span>
                      <span className="text-sm text-muted-foreground">{otherCopy.heroTitle}</span>
                    </span>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--navy)] text-white p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {t.ctaTitle}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-7 leading-relaxed">{t.ctaSub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link href={`${prefix}/contact`}>
                {isArabic ? "احجز عرض عملي" : "Book a walkthrough"}
                <ArrowRight className={`w-4 h-4 ${isArabic ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
              <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer">
                <MessageCircle className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`} />
                {isArabic ? "تواصل على واتساب" : "Chat on WhatsApp"}
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
