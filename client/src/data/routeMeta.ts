/**
 * Route -> SEO config, for pages whose metadata can be resolved without React.
 *
 * This exists because the site is a client-rendered SPA: index.html ships one
 * generic title and description for every URL, and SEOHead only replaces them
 * after React runs. Google renders JavaScript eventually, but Facebook,
 * WhatsApp and LinkedIn scrapers do not — so every shared link previewed with
 * the same homepage title regardless of the page.
 *
 * scripts/prerender-meta.mjs reads this map and writes a real HTML file per
 * route with the right tags baked in. Vercel serves static files before it
 * applies the SPA rewrite, so those files win and the app still hydrates
 * normally on top of them.
 *
 * Only routes resolvable from pure TypeScript are here. Article detail pages
 * keep their metadata inside ArticleDetail.tsx, so they still fall back to the
 * generic tags until that content moves to a data module.
 */
import {
  defaultSEOConfig,
  serviceSEOConfigs,
  arabicSEOConfigs,
  type SEOConfig,
} from "@/utils/seo";
import { SOLUTIONS, SOLUTION_IDS } from "./solutions";
import { TOOLS, TOOL_IDS, TOOLS_INDEX_SEO } from "./tools";

const ORIGIN = "https://foxsystemstech.com";

/** The /solutions index, shared with pages/Solutions.tsx so the two agree. */
export const SOLUTIONS_INDEX_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "CRM Systems by Industry Egypt | Fox Systems",
    description:
      "Industry CRM systems built and run by Fox Systems: pharma field force, real estate sales and pest control job management. Egypt, KSA and Kuwait.",
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
      "أنظمة CRM متخصصة من فوكس سيستمز: طبي للفرق الميدانية، عقاري للمبيعات، ومكافحة آفات. مصر والسعودية والكويت.",
    keywords:
      "نظام CRM طبي, نظام CRM عقاري, برنامج شركات مكافحة الحشرات, أنظمة CRM متخصصة, CRM حسب القطاع, نظام CRM مصر, CRM السعودية, CRM الكويت, industry CRM Egypt, vertical CRM Middle East",
    ogTitle: "أنظمة CRM حسب القطاع - فوكس سيستمز",
    ogDescription: "CRM طبي للفرق الميدانية، وCRM عقاري للمبيعات، وبرنامج إدارة مهام مكافحة الآفات.",
    ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/solutions`,
    language: "ar",
  },
};

/**
 * Three pages whose SEO config used to live inside their React component,
 * which meant the prerenderer could not see them: they fell through to the
 * SPA catch-all and served index.html, whose canonical is the HOMEPAGE.
 * Googlebot's first pass therefore read /industries, /case-studies and
 * /resources/it-guide — in both languages — as duplicates of the home page.
 * The pages import these, so the served HTML and the rendered page agree.
 */
export const INDUSTRIES_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "Industries We Serve | IT & CRM Solutions | Fox Systems",
    description:
      "Specialised CRM and IT solutions for banking, healthcare, education, manufacturing, retail and logistics across Egypt, Saudi Arabia and Kuwait.",
    keywords:
      "IT solutions Egypt industries, CRM banking Egypt, healthcare IT Egypt, education CRM Egypt, manufacturing ERP Egypt, retail IT solutions, government IT Egypt",
    ogTitle: "Industries We Serve | Fox Systems",
    ogDescription: "Specialized IT & CRM solutions for 8+ industries across Egypt & the Middle East",
    ogImage: `${ORIGIN}/industries-og.jpg`,
    canonicalUrl: `${ORIGIN}/industries`,
    language: "en",
  },
  ar: {
    title: "القطاعات التي نخدمها | فوكس سيستمز | حلول IT متخصصة",
    description:
      "فوكس سيستمز تقدم حلول CRM وIT متخصصة للبنوك والرعاية الصحية والتعليم والتصنيع والتجزئة والحكومة واللوجستيات في مصر والسعودية والكويت.",
    keywords:
      "القطاعات التي نخدمها, حلول IT للبنوك, تقنية المعلومات للرعاية الصحية, CRM للتعليم, حلول التصنيع, حلول التجزئة, IT solutions Egypt industries",
    ogTitle: "القطاعات التي نخدمها | فوكس سيستمز",
    ogDescription: "حلول IT و CRM متخصصة لأكثر من 8 قطاعات في مصر والشرق الأوسط",
    ogImage: `${ORIGIN}/industries-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/industries`,
    language: "ar",
  },
};

export const CASE_STUDIES_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "Client Case Studies | Real Results | Fox Systems",
    description:
      "See how Fox Systems transformed operations for 300+ businesses across Egypt, Saudi Arabia & Kuwait with CRM, Call Centers, cybersecurity, and IT infrastructure.",
    keywords:
      "Fox Systems case studies, CRM implementation Egypt, IT solutions Egypt results, cybersecurity Egypt, call center Egypt success story",
    ogTitle: "Client Case Studies | Fox Systems",
    ogDescription: "Real results from real businesses across Egypt & the Middle East",
    ogImage: `${ORIGIN}/case-studies-og.jpg`,
    canonicalUrl: `${ORIGIN}/case-studies`,
    language: "en",
  },
  ar: {
    title: "قصص نجاح عملائنا | حالات دراسية | فوكس سيستمز",
    description:
      "اكتشف كيف حوّلت فوكس سيستمز عمليات أكثر من 300 شركة في مصر والسعودية والكويت عبر CRM ومراكز الاتصال والأمن السيبراني والبنية التحتية.",
    keywords:
      "قصص نجاح فوكس سيستمز, حالات دراسية, تطبيق CRM في مصر, نتائج حلول تقنية المعلومات, نجاح مراكز الاتصال, Fox Systems case studies",
    ogTitle: "قصص نجاح عملائنا | فوكس سيستمز",
    ogDescription: "نتائج حقيقية من شركات حقيقية في مصر والشرق الأوسط",
    ogImage: `${ORIGIN}/case-studies-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/case-studies`,
    language: "ar",
  },
};

export const IT_GUIDE_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "Free IT Readiness Guide | Fox Systems Egypt",
    description:
      "Download the Ultimate IT Readiness Guide for Egyptian businesses — covering CRM, cybersecurity, networking & call centers. Completely free.",
    keywords:
      "free IT guide Egypt, CRM guide Egypt, cybersecurity checklist Egypt, IT readiness guide MENA, Fox Systems free download",
    ogTitle: "Free IT Readiness Guide | Fox Systems",
    ogDescription: "A practical guide for Egyptian businesses — completely free",
    ogImage: `${ORIGIN}/guide-og.jpg`,
    canonicalUrl: `${ORIGIN}/resources/it-guide`,
    language: "en",
  },
  ar: {
    title: "دليل الجاهزية التقنية المجاني | فوكس سيستمز",
    description:
      "حمّل الدليل الشامل للجاهزية التقنية للشركات المصرية — يغطي CRM والأمن السيبراني والشبكات ومراكز الاتصال. مجانًا.",
    keywords:
      "دليل تقني مجاني, دليل CRM مصر, قائمة فحص الأمن السيبراني, الجاهزية التقنية, تحميل مجاني, free IT guide Egypt",
    ogTitle: "دليل الجاهزية التقنية المجاني | فوكس سيستمز",
    ogDescription: "دليل عملي للشركات المصرية — مجانًا",
    ogImage: `${ORIGIN}/guide-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/resources/it-guide`,
    language: "ar",
  },
};

const SERVICE_IDS = [
  "internet",
  "crm",
  "hardware",
  "cybersecurity",
  "infrastructure",
  "web-development",
] as const;

/** Keyed by path, English unprefixed and Arabic under /ar, as the app routes. */
export function buildRouteMeta(): Record<string, SEOConfig> {
  const map: Record<string, SEOConfig> = {
    "/": defaultSEOConfig,
    "/ar": arabicSEOConfigs.home,
    "/articles": serviceSEOConfigs.articles,
    "/ar/articles": arabicSEOConfigs.articles,
    "/contact": {
      ...serviceSEOConfigs.crm,
      title: "Contact Fox Systems | CRM & IT Support Egypt",
      description:
        "Talk to a CRM and IT engineer in Egypt, Saudi Arabia or Kuwait. Free consultation, fast response, and 24/7 support. Call, WhatsApp or send a message.",
      ogTitle: "Contact Fox Systems - CRM & IT Egypt",
      ogDescription: "Talk to a CRM and IT engineer. Free consultation and 24/7 support.",
      ogImage: `${ORIGIN}/contact-og.jpg`,
      canonicalUrl: `${ORIGIN}/contact`,
    },
    "/ar/contact": arabicSEOConfigs.contact,
    "/services": {
      ...serviceSEOConfigs.crm,
      title: "IT Services Egypt | CRM, Call Center, Security | Fox Systems",
      description:
        "CRM systems, call centres, firewalls, VoIP, servers and network infrastructure for businesses in Egypt, Saudi Arabia and Kuwait. 24/7 support.",
      ogTitle: "IT Services Egypt - Fox Systems",
      ogDescription: "CRM, call centre, firewall, VoIP, servers and networks across Egypt, KSA and Kuwait.",
      ogImage: `${ORIGIN}/services-og.jpg`,
      canonicalUrl: `${ORIGIN}/services`,
    },
    "/ar/services": arabicSEOConfigs.services,
    "/solutions": SOLUTIONS_INDEX_SEO.en,
    "/ar/solutions": SOLUTIONS_INDEX_SEO.ar,
    "/tools": TOOLS_INDEX_SEO.en,
    "/ar/tools": TOOLS_INDEX_SEO.ar,
    "/industries": INDUSTRIES_SEO.en,
    "/ar/industries": INDUSTRIES_SEO.ar,
    "/case-studies": CASE_STUDIES_SEO.en,
    "/ar/case-studies": CASE_STUDIES_SEO.ar,
    "/resources/it-guide": IT_GUIDE_SEO.en,
    "/ar/resources/it-guide": IT_GUIDE_SEO.ar,
  };

  for (const id of SERVICE_IDS) {
    if (serviceSEOConfigs[id]) map[`/services/${id}`] = serviceSEOConfigs[id];
    if (arabicSEOConfigs[id]) map[`/ar/services/${id}`] = arabicSEOConfigs[id];
  }

  for (const id of SOLUTION_IDS) {
    map[`/solutions/${id}`] = SOLUTIONS[id].seo.en;
    map[`/ar/solutions/${id}`] = SOLUTIONS[id].seo.ar;
  }

  for (const id of TOOL_IDS) {
    map[`/tools/${id}`] = TOOLS[id].seo.en;
    map[`/ar/tools/${id}`] = TOOLS[id].seo.ar;
  }

  return map;
}
