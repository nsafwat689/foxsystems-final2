/**
 * The CRM plans and the comparison matrix, in one place.
 *
 * These live in a data module rather than inside the pricing component
 * because the cost calculator at /tools/crm-cost-calculator reads the same
 * figures. Two copies of a price list drift, and a calculator that quotes a
 * number the pricing table does not show is worse than no calculator.
 *
 * Every figure came from the business owner. Nothing is invented.
 */

export type Plan = {
  id: string;
  /** Seat ceiling, as a number, so the cost calculator can pick a plan. */
  seats: number;
  users: { en: string; ar: string };
  monthly: number;
  name: { en: string; ar: string };
  highlight?: boolean;
  extras?: { en: string; ar: string }[];
};

export const PLANS: Plan[] = [
  // Lowered from $100 to $50 on the owner's instruction (2026-09-24) so the
  // entry tier sits at the low end of the market band rather than above it.
  {
    id: "starter",
    seats: 2,
    name: { en: "Starter", ar: "البداية" },
    users: { en: "Up to 2 users", ar: "حتى مستخدمَين" },
    monthly: 50,
    extras: [{ en: "3 months of audit history", ar: "سجل تدقيق لمدة 3 أشهر" }],
  },
  {
    id: "team",
    seats: 10,
    name: { en: "Team", ar: "الفريق" },
    users: { en: "Up to 10 users", ar: "حتى 10 مستخدمين" },
    monthly: 200,
    extras: [{ en: "12 months of audit history", ar: "سجل تدقيق لمدة 12 شهرًا" }],
  },
  {
    id: "growth",
    seats: 15,
    name: { en: "Growth", ar: "النمو" },
    users: { en: "Up to 15 users", ar: "حتى 15 مستخدمًا" },
    monthly: 300,
    extras: [{ en: "24 months of audit history", ar: "سجل تدقيق لمدة 24 شهرًا" }],
  },
  {
    id: "business",
    seats: 25,
    name: { en: "Business", ar: "الأعمال" },
    users: { en: "Up to 25 users", ar: "حتى 25 مستخدمًا" },
    monthly: 400,
    extras: [
      { en: "3 customisations included", ar: "3 تخصيصات مشمولة" },
      { en: "API access and webhooks", ar: "الوصول إلى واجهة البرمجة (API) والـ Webhooks" },
      { en: "Full audit history", ar: "سجل تدقيق كامل" },
      { en: "A named engineer on your account", ar: "مهندس مخصّص لحسابك" },
      { en: "Priority queue, same-day on-site", ar: "أولوية في الطابور، وزيارة ميدانية في اليوم نفسه" },
    ],
  },
  {
    id: "complete",
    seats: 40,
    name: { en: "Complete", ar: "الشامل" },
    users: { en: "Up to 40 users", ar: "حتى 40 مستخدمًا" },
    monthly: 700,
    highlight: true,
    extras: [
      { en: "10 customisations included", ar: "10 تخصيصات مشمولة" },
      { en: "API access and webhooks", ar: "الوصول إلى واجهة البرمجة (API) والـ Webhooks" },
      { en: "Full audit history", ar: "سجل تدقيق كامل" },
      { en: "A named engineer on your account", ar: "مهندس مخصّص لحسابك" },
      { en: "Priority queue, same-day on-site", ar: "أولوية في الطابور، وزيارة ميدانية في اليوم نفسه" },
      { en: "Business website included, free", ar: "موقع إلكتروني للشركة، مجانًا" },
      { en: "Mobile application included, free", ar: "تطبيق موبايل مجانًا" },
    ],
  },
];

/**
 * The comparison matrix. Only six things actually differ between plans, and
 * every one of them is something Fox Systems can hold to: seats, how many
 * customisations are bundled, API access, how far the audit history reaches,
 * the support tier and whether the free website and app are included.
 *
 * The sector features (GPS visits, installments, QR devices and so on) are
 * deliberately NOT gated — they are the product, and the solution pages say
 * so. Gating them here would contradict those pages.
 *
 * The 1-hour first response and 24/7 cover stay on EVERY plan, because that
 * is already published in the commitments section. Business and Complete add
 * a priority queue and a same-day on-site visit on top, so the row still
 * differentiates without walking back a promise already made in public.
 */
export type Cell = boolean | { en: string; ar: string };

export const FEATURE_ROWS: Array<{ label: { en: string; ar: string }; cells: Cell[] }> = [
  {
    label: { en: "Users", ar: "المستخدمون" },
    cells: [
      { en: "2", ar: "2" },
      { en: "10", ar: "10" },
      { en: "15", ar: "15" },
      { en: "25", ar: "25" },
      { en: "40", ar: "40" },
    ],
  },
  {
    label: { en: "Customisations included", ar: "التخصيصات المشمولة" },
    cells: [
      false,
      false,
      false,
      { en: "3", ar: "3" },
      { en: "10", ar: "10" },
    ],
  },
  {
    label: { en: "API access and webhooks", ar: "واجهة البرمجة (API) والـ Webhooks" },
    cells: [false, false, false, true, true],
  },
  {
    label: { en: "Audit history", ar: "سجل التدقيق" },
    cells: [
      { en: "3 months", ar: "3 أشهر" },
      { en: "12 months", ar: "12 شهرًا" },
      { en: "24 months", ar: "24 شهرًا" },
      { en: "Full history", ar: "كامل السجل" },
      { en: "Full history", ar: "كامل السجل" },
    ],
  },
  {
    label: { en: "Support response", ar: "الاستجابة والدعم" },
    cells: [
      { en: "1 hour, 24/7", ar: "ساعة واحدة، على مدار الساعة" },
      { en: "1 hour, 24/7", ar: "ساعة واحدة، على مدار الساعة" },
      { en: "1 hour, 24/7", ar: "ساعة واحدة، على مدار الساعة" },
      { en: "1 hour, priority queue, same-day on-site", ar: "ساعة واحدة، بأولوية في الطابور وزيارة ميدانية في اليوم نفسه" },
      { en: "1 hour, priority queue, same-day on-site", ar: "ساعة واحدة، بأولوية في الطابور وزيارة ميدانية في اليوم نفسه" },
    ],
  },
  {
    label: { en: "Named engineer on your account", ar: "مهندس مخصّص لحسابك" },
    cells: [false, false, false, true, true],
  },
  {
    label: { en: "Business website and mobile app", ar: "موقع إلكتروني وتطبيق موبايل" },
    cells: [false, false, false, false, true],
  },
];

/** The cheapest plan that fits this many users, or null when it is over 40. */
export function planForSeats(seats: number): Plan | null {
  return PLANS.find(p => seats <= p.seats) ?? null;
}

/** Annual billing = pay for 10 months instead of 12, as an effective monthly rate. */
export function effectiveMonthly(plan: Plan, annual: boolean): number {
  return annual ? Math.round((plan.monthly * 10) / 12) : plan.monthly;
}
