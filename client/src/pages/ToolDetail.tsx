/**
 * A single tool page: /tools/<id> and /ar/tools/<id>.
 *
 * The widget is the smallest part of this page on purpose. A calculator with
 * no prose around it is a thin page — what earns the ranking is the method
 * section explaining how the maths works and the FAQ answering the questions
 * people actually type. Both come from data/tools.ts, so a new tool brings
 * its own content rather than inheriting an empty shell.
 */
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calculator, CalendarClock, Gauge, Percent } from "lucide-react";
import Header from "@/components/Header";
import SEOHead from "@/components/SEOHead";
import { TOOLS, TOOL_IDS, TOOLS_INDEX_SEO, type ToolId } from "@/data/tools";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/utils/seo";

const CrmCostCalculator = lazy(() => import("@/components/tools/CrmCostCalculator"));

const ICONS = { Calculator, Gauge, Percent, CalendarClock };

const ORIGIN = "https://foxsystemstech.com";

const T = {
  en: { badge: "Free tool", more: "Other free tools", related: "Related", back: "All tools", loading: "Loading…" },
  ar: { badge: "أداة مجانية", more: "أدوات مجانية أخرى", related: "ذات صلة", back: "كل الأدوات", loading: "جارٍ التحميل…" },
};

/**
 * WebApplication rather than SoftwareApplication: this runs in the browser and
 * is not installed. price 0 is stated explicitly because "free" in the copy is
 * not machine-readable.
 */
function toolSchema(name: string, description: string, url: string, language: "en" | "ar") {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: language === "ar" ? "ar-EG" : "en",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Fox Systems", url: ORIGIN },
  });
}

interface Props {
  toolId: ToolId;
  language: "en" | "ar";
}

export default function ToolDetail({ toolId, language }: Props) {
  const tool = TOOLS[toolId];
  const isArabic = language === "ar";
  const t = T[language];
  const prefix = isArabic ? "/ar" : "";
  const copy = tool[language];
  const seo = tool.seo[language];
  const Icon = ICONS[tool.icon];

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? `${ORIGIN}/ar` : `${ORIGIN}/` },
    { name: isArabic ? "الأدوات" : "Tools", url: TOOLS_INDEX_SEO[language].canonicalUrl },
    { name: copy.name, url: seo.canonicalUrl },
  ]);

  // Annotated deliberately. TypeScript 5.5 infers a type predicate from the
  // filter callback, and while TOOL_IDS holds a single literal it concludes
  // `id is never`, so every property access below fails to compile. The
  // annotation keeps it as ToolId[]; it becomes redundant once a second tool
  // is added, and harmless either way.
  const others: ToolId[] = (TOOL_IDS as readonly ToolId[]).filter(id => id !== toolId);

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <SEOHead
        config={seo}
        organizationSchema
        breadcrumbSchema={breadcrumbSchema}
        faqSchema={generateFAQSchema(copy.faqs)}
        additionalSchema={toolSchema(copy.name, seo.description, seo.canonicalUrl, language)}
      />
      <Header language={language} />

      <section className="relative py-20 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
            className="max-w-3xl"
          >
            {/* The back link needs its own line — as a bare inline-flex it sat
                beside the badge and the two overlapped. */}
            <div className="mb-4">
              <Link
                href={`${prefix}/tools`}
                className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition"
              >
                <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? "" : "rotate-180"}`} aria-hidden="true" />
                {t.back}
              </Link>
            </div>
            <span className="pill pill-gold mb-4 inline-flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {t.badge}
            </span>
            <h1
              className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.025em" }}
            >
              {copy.name}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">{copy.tagline}</p>
          </motion.div>
        </div>
      </section>

      <div className="container py-14 min-w-0">
        <p className="max-w-3xl text-muted-foreground leading-relaxed mb-8">{copy.intro}</p>

        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-muted-foreground">{t.loading}</div>
          }
        >
          {toolId === "crm-cost-calculator" && <CrmCostCalculator language={language} />}
        </Suspense>

        {/* method — the part that actually ranks */}
        <section className="mt-14 pt-12 border-t border-border max-w-3xl">
          <h2 className="text-2xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {copy.method.title}
          </h2>
          <div className="space-y-4">
            {copy.method.body.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <Link
            href={`${prefix}${tool.related.href}`}
            className="inline-flex items-center gap-2 mt-6 font-semibold text-primary hover:gap-3 transition-all"
          >
            {isArabic ? tool.related.ar : tool.related.en}
            <ArrowRight className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} aria-hidden="true" />
          </Link>
        </section>

        {/* FAQ — matches the FAQPage schema above */}
        <section className="mt-12 pt-10 border-t border-border max-w-3xl">
          <h2 className="text-2xl font-extrabold mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            {isArabic ? "أسئلة شائعة" : "Common questions"}
          </h2>
          <div className="space-y-4">
            {copy.faqs.map(f => (
              <details key={f.q} className="group p-5 rounded-xl border border-border bg-card">
                <summary className="font-bold cursor-pointer list-none flex justify-between gap-3">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {others.length > 0 && (
          <section className="mt-12 pt-10 border-t border-border">
            <h2 className="text-xl font-extrabold mb-5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {t.more}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map(id => {
                const o = TOOLS[id];
                const OIcon = ICONS[o.icon];
                return (
                  <Link
                    key={id}
                    href={`${prefix}/tools/${id}`}
                    className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors"
                  >
                    <OIcon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                    <h3 className="font-bold mb-1">{o[language].name}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{o[language].tagline}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
