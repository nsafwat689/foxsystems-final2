/**
 * Comparison pages, at /compare/<id> (and /ar/compare/<id>).
 *
 * Content and SEO live in data/comparisons.ts — layout only here, as with
 * SolutionDetail. The FAQ doubles as FAQPage structured data.
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, CheckCircle2, Info, MessageCircle, Scale } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { COMPARISONS } from "@/data/comparisons";
import type { ComparisonId } from "@/data/comparisonIds";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/utils/seo";
import SocialLinks from "@/components/SocialLinks";

const H = { fontFamily: "'Plus Jakarta Sans',sans-serif" };

export default function Compare({ comparisonId, language }: { comparisonId: ComparisonId; language: "en" | "ar" }) {
  const c = COMPARISONS[comparisonId];
  const isArabic = language === "ar";
  const t = isArabic ? c.ar : c.en;
  const seoConfig = c.seo[language];
  const prefix = isArabic ? "/ar" : "";
  const origin = "https://foxsystemstech.com";
  const arrow = `w-4 h-4 ${isArabic ? "mr-2 rotate-180" : "ml-2"}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? `${origin}/ar` : `${origin}/` },
    { name: isArabic ? "المنتجات" : "Solutions", url: `${origin}${prefix}/solutions` },
    { name: t.title, url: seoConfig.canonicalUrl },
  ]);

  return (
    <div className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <SEOHead config={seoConfig} organizationSchema breadcrumbSchema={breadcrumbSchema} faqSchema={generateFAQSchema(t.faqs)} />
      <Header language={language} />

      <section className="relative py-24 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl mb-6 ring-1 ring-white/20">
              <Scale className="w-7 h-7 text-white" />
            </div>
            <span className="pill pill-gold mb-5 inline-block">{t.badge}</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5" style={{ ...H, letterSpacing: "-0.02em" }}>{t.title}</h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-8">{t.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`${prefix}/solutions/${c.solution}#demo`} onClick={() => window.trackCTA?.(`compare-demo-${c.id}`)}>
                  {isArabic ? "جرّب النسخة التجريبية" : "Try the live demo"}<ArrowRight className={arrow} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
                <Link href={`${prefix}/book?product=${c.solution}`} onClick={() => window.trackCTA?.(`compare-book-${c.id}`)}>
                  <CalendarDays className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`} />{isArabic ? "احجز عرضًا عمليًا" : "Book a walkthrough"}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-16 max-w-5xl">
        {/* Side by side */}
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-start font-bold w-[22%]">{isArabic ? "المحور" : "Topic"}</th>
                <th className="p-4 text-start font-bold text-primary w-[39%]">{t.foxName}</th>
                <th className="p-4 text-start font-bold w-[39%]" dir="ltr" style={{ textAlign: isArabic ? "right" : "left" }}>{t.them}</th>
              </tr>
            </thead>
            <tbody>
              {t.rows.map(r => (
                <tr key={r.topic} className="border-t border-border align-top">
                  <td className="p-4 font-semibold">{r.topic}</td>
                  <td className="p-4 bg-primary/5 leading-relaxed">{r.fox}</td>
                  <td className="p-4 text-muted-foreground leading-relaxed">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground flex gap-2 items-start">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />{t.note}
        </p>

        {/* When each fits */}
        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {[{ title: t.foxFitsTitle, items: t.foxFits, strong: true }, { title: t.themFitsTitle, items: t.themFits, strong: false }].map(col => (
            <div key={col.title} className={`rounded-2xl p-7 border ${col.strong ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
              <h2 className="text-xl font-extrabold mb-4" style={H}>{col.title}</h2>
              <ul className="space-y-3">
                {col.items.map(item => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${col.strong ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold mb-6" style={H}>{isArabic ? "أسئلة شائعة" : "Questions buyers ask"}</h2>
          <div className="space-y-4">
            {t.faqs.map(f => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
                <summary className="font-bold cursor-pointer list-none flex justify-between gap-4">{f.q}<span className="text-primary group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-2xl bg-[var(--navy)] text-white p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6" style={H}>{t.ctaTitle}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link href={`${prefix}/solutions/${c.solution}`}>{isArabic ? `اكتشف ${t.foxName}` : `Explore ${t.foxName}`}<ArrowRight className={arrow} /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
              <Link href={`${prefix}/book?product=${c.solution}`}>{isArabic ? "احجز عرضًا عمليًا" : "Book a walkthrough"}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 hover:text-white">
              <Link href={`${prefix}/pricing`}>{isArabic ? "الباقات والأسعار" : "See plans and prices"}</Link>
            </Button>
          </div>
        </section>

        {/* Other comparisons */}
        <section className="mt-14 pt-10 border-t border-border">
          <h2 className="text-lg font-extrabold mb-4" style={H}>{isArabic ? "مقارنات أخرى" : "Other comparisons"}</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {Object.values(COMPARISONS).filter(o => o.id !== c.id).map(o => (
              <Link key={o.id} href={`${prefix}/compare/${o.id}`} className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-sm font-semibold">
                {(isArabic ? o.ar : o.en).title}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-[var(--navy)] text-white py-10">
        <div className="container text-center">
          <SocialLinks isArabic={isArabic} className="justify-center mb-4" />
          <p className="text-white/40 text-sm">© 2026 Fox Systems. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."} · Egypt · Saudi Arabia · Kuwait</p>
        </div>
      </footer>
      <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}
