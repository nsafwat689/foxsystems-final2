/** Comparison page ids, apart from the content (see solutionIds.ts for why). */
export const COMPARISON_IDS = ["real-estate-crm", "pharma-crm", "pest-control-software", "hr-payroll-software"] as const;
export type ComparisonId = (typeof COMPARISON_IDS)[number];

/** The comparison page for each product, for the link on its solution page. */
export const COMPARISON_FOR = {
  "real-estate-crm": { id: "real-estate-crm", en: "Compare with Zoho, HubSpot and Odoo", ar: "قارنه بـ Zoho وHubSpot وOdoo" },
  "medical-crm": { id: "pharma-crm", en: "Compare with Veeva and IQVIA OCE", ar: "قارنه بـ Veeva وIQVIA OCE" },
  "pest-control-crm": { id: "pest-control-software", en: "Compare with PestPac and GorillaDesk", ar: "قارنه بـ PestPac وGorillaDesk" },
  "hr-crm": { id: "hr-payroll-software", en: "Compare with ZenHR, Jisr and Bayzat", ar: "قارنه بـ ZenHR وJisr وBayzat" },
} as const satisfies Record<string, { id: ComparisonId; en: string; ar: string }>;
