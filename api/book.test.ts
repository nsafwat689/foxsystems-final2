import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler, { buildIcs, slotLabel } from "./book";
import { bookingDays, cairoInstant, cairoParts, isBookableSlot } from "../client/src/lib/bookingSlots";

// Wednesday 2026-10-07 09:00 UTC (12:00 Cairo, summer time UTC+3).
const NOW = Date.UTC(2026, 9, 7, 9);

function mockRes() {
  const res: any = { statusCode: 200, body: undefined, headers: {} };
  res.status = (c: number) => { res.statusCode = c; return res; };
  res.json = (b: unknown) => { res.body = b; return res; };
  res.setHeader = (k: string, v: string) => { res.headers[k] = v; };
  return res;
}

describe("booking slots", () => {
  it("uses Cairo wall-clock time, summer and winter", () => {
    expect(new Date(cairoInstant(2026, 10, 11, 10)).toISOString()).toBe("2026-10-11T07:00:00.000Z"); // UTC+3
    expect(new Date(cairoInstant(2026, 12, 13, 10)).toISOString()).toBe("2026-12-13T08:00:00.000Z"); // UTC+2
  });

  it("offers Sunday to Thursday only, from 18 hours ahead, 10:00 to 16:00", () => {
    const days = bookingDays(NOW);
    expect(days.every(d => d.weekday <= 4)).toBe(true);
    // Wednesday itself is too soon; Thursday from 10:00 (22 h ahead) is fine.
    expect(days[0].key).toBe("2026-10-08");
    expect(days[0].slots).toHaveLength(7);
    expect(days.map(d => d.key)).not.toContain("2026-10-09"); // Friday
    for (const s of days.flatMap(d => d.slots)) {
      const p = cairoParts(Date.parse(s));
      expect(p.hour).toBeGreaterThanOrEqual(10);
      expect(p.hour).toBeLessThanOrEqual(16);
      expect(p.minute).toBe(0);
    }
  });

  it("refuses slots the calendar would not offer", () => {
    expect(isBookableSlot("2026-10-08T07:00:00.000Z", NOW)).toBe(true);   // Thu 10:00 Cairo
    expect(isBookableSlot("2026-10-07T13:00:00.000Z", NOW)).toBe(false);  // today, too soon
    expect(isBookableSlot("2026-10-09T07:00:00.000Z", NOW)).toBe(false);  // Friday
    expect(isBookableSlot("2026-10-08T07:30:00.000Z", NOW)).toBe(false);  // off the hour
    expect(isBookableSlot("2026-12-31T08:00:00.000Z", NOW)).toBe(false);  // beyond 3 weeks
    expect(isBookableSlot("nonsense", NOW)).toBe(false);
  });
});

describe("calendar file and labels", () => {
  const b = { name: "Mona", email: "mona@example.com", phone: "+20 100 000 0000", company: "", product: "hr-crm" as const,
    slot: "2026-10-08T07:00:00.000Z", notes: "", timezone: "", language: "en" as const, website: "" };

  it("builds a UTC, tentative, 45-minute event", () => {
    const ics = buildIcs(b, NOW);
    expect(ics).toContain("DTSTART:20261008T070000Z");
    expect(ics).toContain("DTEND:20261008T074500Z");
    expect(ics).toContain("STATUS:TENTATIVE");
    expect(ics).toContain("SUMMARY:Fox Systems walkthrough: HR & Payroll (to be confirmed)");
    expect(ics.split("\r\n").length).toBeGreaterThan(10);
  });

  it("labels the slot in Cairo time with Western digits in Arabic", () => {
    expect(slotLabel(b.slot, "en")).toMatch(/Thursday.*8 October.*10:00 Cairo time/);
    const ar = slotLabel(b.slot, "ar");
    expect(ar).toContain("10:00");
    expect(ar).toContain("بتوقيت القاهرة");
    expect(ar).not.toMatch(/[٠-٩]/);
  });
});

describe("POST /api/book", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    process.env.BREVO_API_KEY = "k"; process.env.LEAD_INBOX = "team@example.com"; process.env.LEAD_FROM = "web@example.com";
    fetchMock.mockReset().mockResolvedValue(new Response("{}", { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  const body = { name: "Mona", email: "mona@example.com", phone: "+20 100 000 0000", product: "medical-crm", slot: "2026-10-08T07:00:00.000Z", language: "ar" };

  it("emails the team and the visitor, both with the calendar file", async () => {
    const res = mockRes();
    await handler({ method: "POST", body }, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true, visitorEmailed: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [owner, visitor] = fetchMock.mock.calls.map(c => JSON.parse(c[1].body));
    expect(owner.to[0].email).toBe("team@example.com");
    expect(owner.replyTo.email).toBe("mona@example.com");
    expect(visitor.to[0].email).toBe("mona@example.com");
    expect(visitor.htmlContent).toContain('dir="rtl"');
    expect(owner.attachment[0].name).toMatch(/\.ics$/);
    expect(Buffer.from(visitor.attachment[0].content, "base64").toString()).toContain("DTSTART:20261008T070000Z");
  });

  it("refuses a slot that is not offered", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { ...body, slot: "2026-10-09T07:00:00.000Z" } }, res);
    expect(res.statusCode).toBe(409);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid input and quietly drops the honeypot", async () => {
    const bad = mockRes();
    await handler({ method: "POST", body: { ...body, email: "nope" } }, bad);
    expect(bad.statusCode).toBe(400);
    const bot = mockRes();
    await handler({ method: "POST", body: { ...body, website: "spam" } }, bot);
    expect(bot.statusCode).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports failure when the team email fails, so the page offers WhatsApp", async () => {
    fetchMock.mockResolvedValueOnce(new Response("no", { status: 500 }));
    const res = mockRes();
    await handler({ method: "POST", body }, res);
    expect(res.statusCode).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
