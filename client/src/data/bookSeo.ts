/** SEO for /book, shared by pages/Book.tsx and routeMeta.ts (small on purpose: Book imports it). */
import type { SEOConfig } from "@/utils/seo";

const ORIGIN = "https://foxsystemstech.com";

export const BOOK_SEO: Record<"en" | "ar", SEOConfig> = {
  en: {
    title: "Book a CRM Walkthrough | Fox Systems",
    description: "Pick a time for a 45-minute online walkthrough of our Real Estate, Medical, Pest Control or HR & Payroll system, with the team that builds it. Sunday to Thursday.",
    keywords: "book CRM demo, CRM walkthrough Egypt, HR system demo, pharma CRM demo, real estate CRM demo, pest control software demo",
    ogTitle: "Book a walkthrough - Fox Systems",
    ogDescription: "A 45-minute online walkthrough with the team that builds the system.",
    ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
    canonicalUrl: `${ORIGIN}/book`,
    language: "en",
  },
  ar: {
    title: "احجز عرضًا عمليًا لأنظمة CRM | فوكس سيستمز",
    description: "اختر موعدًا لعرض عملي عبر الإنترنت مدته 45 دقيقة لنظام العقارات أو المبيعات الطبية أو مكافحة الآفات أو الموارد البشرية، مع الفريق الذي يبنيه. من الأحد إلى الخميس.",
    keywords: "حجز عرض CRM, عرض عملي نظام CRM, تجربة برنامج موارد بشرية, عرض نظام المندوبين, عرض نظام عقاري",
    ogTitle: "احجز عرضًا عمليًا - فوكس سيستمز",
    ogDescription: "عرض عملي عبر الإنترنت مدته 45 دقيقة مع الفريق الذي يبني النظام.",
    ogImage: `${ORIGIN}/solutions/solutions-og.jpg`,
    canonicalUrl: `${ORIGIN}/ar/book`,
    language: "ar",
  },
};
