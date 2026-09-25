/**
 * Length of service in years, as a decimal.
 *
 * Dividing elapsed days by 365.25 looks right and is not: five whole calendar
 * years spanning two leap years is 1,827 days, which that method reports as
 * 5.0021 years. On an end-of-service calculation that fraction spills into the
 * next accrual band and invents money out of nothing — 25 units on a case that
 * should have been exactly five years.
 *
 * So this counts whole anniversaries and then measures the remainder against
 * the length of the year it actually falls in.
 */

/** Same calendar day N years on, clamped when the day does not exist (29 Feb). */
function anniversary(from: Date, years: number): Date {
  const y = from.getUTCFullYear() + years;
  const m = from.getUTCMonth();
  const d = from.getUTCDate();
  const lastOfMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d, lastOfMonth)));
}

/**
 * Returns null when the dates are unusable or the end is not after the start,
 * so callers can show a message rather than a nonsense figure.
 */
export function serviceYears(startIso: string, endIso: string): number | null {
  const start = new Date(`${startIso}T00:00:00Z`);
  const end = new Date(`${endIso}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  if (end.getTime() <= start.getTime()) return null;

  let whole = end.getUTCFullYear() - start.getUTCFullYear();
  let last = anniversary(start, whole);
  if (last.getTime() > end.getTime()) {
    whole -= 1;
    last = anniversary(start, whole);
  }

  const next = anniversary(start, whole + 1);
  const spanOfYear = next.getTime() - last.getTime();
  const remainder = end.getTime() - last.getTime();

  return whole + (spanOfYear > 0 ? remainder / spanOfYear : 0);
}
