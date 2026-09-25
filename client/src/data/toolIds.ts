/**
 * The tool ids, kept apart from the content in tools.ts for the same reason
 * solutionIds.ts exists: App.tsx builds its routes from this list and is NOT
 * lazy-loaded, so importing tools.ts here would pull every intro, method
 * paragraph and FAQ in two languages into the entry bundle.
 */
export const TOOL_IDS = [
  "crm-cost-calculator",
  "bandwidth-calculator",
  "commission-calculator",
  "installment-plan-generator",
  "invoice-generator",
  "vat-calculator",
  "end-of-service-calculator",
  "security-self-check",
  "pest-control-job-costing",
  "field-force-roi",
] as const;
export type ToolId = (typeof TOOL_IDS)[number];
