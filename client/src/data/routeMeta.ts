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
  };

  for (const id of SERVICE_IDS) {
    if (serviceSEOConfigs[id]) map[`/services/${id}`] = serviceSEOConfigs[id];
    if (arabicSEOConfigs[id]) map[`/ar/services/${id}`] = arabicSEOConfigs[id];
  }

  for (const id of SOLUTION_IDS) {
    map[`/solutions/${id}`] = SOLUTIONS[id].seo.en;
    map[`/ar/solutions/${id}`] = SOLUTIONS[id].seo.ar;
  }

  return map;
}
