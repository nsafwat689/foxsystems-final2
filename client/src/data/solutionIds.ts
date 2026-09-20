/**
 * The solution ids, kept apart from the content in solutions.ts on purpose.
 *
 * App.tsx needs the id list to build its routes, and it is not lazy-loaded.
 * Importing them from solutions.ts pulled that whole module — every feature
 * list, caption and FAQ in two languages — into the entry bundle, which is
 * ~26 kB in front of the first paint for data no visitor needs until they
 * open a product page.
 */
export const SOLUTION_IDS = ["medical-crm", "real-estate-crm", "pest-control-crm"] as const;
export type SolutionId = (typeof SOLUTION_IDS)[number];
