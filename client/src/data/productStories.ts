/**
 * Client results for the CRM products, at /case-studies/<id>.
 *
 * EMPTY ON PURPOSE until a real client story exists. Rules for an entry:
 *  - Every number comes from the client's own system or their written statement.
 *  - Naming the client or quoting a person needs their written approval;
 *    otherwise use a description ("A pharmaceutical distributor in Cairo") and no quote.
 *  - Never add Review/aggregateRating schema for these (Google's self-serving review rule).
 * Adding one: append an entry below — the route, prerendered meta, sitemap and
 * the "Results" card on the product page all follow from this list.
 * The questionnaire to send the client is on the Desktop: "Fox case study questionnaire.md".
 */
import type { SEOConfig } from "@/utils/seo";
import type { SolutionId } from "./solutionIds";

export interface StoryCopy {
  client: string;            // name, or an anonymised description
  title: string;             // the outcome, e.g. "Every visit verified within six weeks"
  summary: string;           // one or two sentences for cards and meta
  challenge: string;
  whatWeDid: string[];
  results: Array<{ metric: string; label: string }>;
  quote?: string;
  quotePerson?: string;      // "Name, role" — only with written approval
}
export interface ProductStory {
  id: string;
  solution: SolutionId;
  location: string;          // "Cairo, Egypt"
  teamSize: string;          // "45 medical reps"
  liveSince: string;         // "2026-11"
  en: StoryCopy;
  ar: StoryCopy;
}

export const PRODUCT_STORIES: ProductStory[] = [
  // {
  //   id: "pharma-distributor-cairo",
  //   solution: "medical-crm", location: "Cairo, Egypt", teamSize: "45 medical reps", liveSince: "2026-11",
  //   en: { client: "A pharmaceutical distributor in Cairo", title: "…", summary: "…", challenge: "…", whatWeDid: ["…"], results: [{ metric: "…", label: "…" }] },
  //   ar: { client: "موزع أدوية في القاهرة", title: "…", summary: "…", challenge: "…", whatWeDid: ["…"], results: [{ metric: "…", label: "…" }] },
  // },
];

const ORIGIN = "https://foxsystemstech.com";
export function storySeo(s: ProductStory, language: "en" | "ar"): SEOConfig {
  const c = s[language];
  const title = language === "ar" ? `${c.title} | قصة عميل - فوكس سيستمز` : `${c.title} | Client story - Fox Systems`;
  return {
    title, description: c.summary, keywords: "",
    ogTitle: c.title, ogDescription: c.summary,
    ogImage: `${ORIGIN}/solutions/${s.solution}-og.jpg`,
    canonicalUrl: `${ORIGIN}${language === "ar" ? "/ar" : ""}/case-studies/${s.id}`,
    language, ogType: "article",
  };
}
