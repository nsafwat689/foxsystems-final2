/**
 * Walkthrough booking slots, shared by pages/Book.tsx (to draw the calendar)
 * and api/book.ts (to refuse anything the calendar would not have offered).
 *
 * Office hours are Cairo time, Sunday to Thursday. Egypt observes summer time
 * again, so the UTC offset is looked up per date with Intl — never hardcoded.
 * Pure functions, no DOM: the API imports this file too.
 */
export const BOOKING_TZ = "Africa/Cairo";
export const BOOKING_HOURS = [10, 11, 12, 13, 14, 15, 16] as const; // start times, 45-minute sessions
export const BOOKING_DAYS = [0, 1, 2, 3, 4] as const;                // Sun..Thu
export const SESSION_MINUTES = 45;
export const LEAD_HOURS = 18;   // earliest slot: 18 hours from now
export const HORIZON_DAYS = 21; // latest slot: 3 weeks ahead

/** Wall-clock parts of an instant in Cairo. */
export function cairoParts(ms: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", weekday: "short",
  }).formatToParts(new Date(ms));
  const get = (type: string) => parts.find(p => p.type === type)!.value;
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { year: +get("year"), month: +get("month"), day: +get("day"), hour: +get("hour") % 24, minute: +get("minute"), weekday };
}

/** The instant when Cairo's clock reads the given local time. */
export function cairoInstant(year: number, month: number, day: number, hour: number): number {
  const guess = Date.UTC(year, month - 1, day, hour);
  const p = cairoParts(guess);
  const shownAsUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return guess - (shownAsUtc - guess);
}

export interface BookingDay { key: string; weekday: number; slots: string[] } // slots: ISO instants

/** Every bookable slot, grouped by Cairo date. */
export function bookingDays(now = Date.now()): BookingDay[] {
  const earliest = now + LEAD_HOURS * 3600_000;
  const days: BookingDay[] = [];
  const today = cairoParts(now);
  for (let i = 0; i <= HORIZON_DAYS; i++) {
    const noon = Date.UTC(today.year, today.month - 1, today.day + i, 12);
    const d = new Date(noon);
    const [y, m, dd] = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()];
    const weekday = d.getUTCDay();
    if (!(BOOKING_DAYS as readonly number[]).includes(weekday)) continue;
    const slots = BOOKING_HOURS.map(h => cairoInstant(y, m, dd, h)).filter(t => t >= earliest).map(t => new Date(t).toISOString());
    if (slots.length) days.push({ key: `${y}-${String(m).padStart(2, "0")}-${String(dd).padStart(2, "0")}`, weekday, slots });
  }
  return days;
}

/** True when the ISO instant is one the calendar offers right now. */
export function isBookableSlot(iso: string, now = Date.now()): boolean {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return false;
  return bookingDays(now).some(d => d.slots.some(s => Date.parse(s) === t));
}
