/**
 * The leap-year case is the reason this file exists: elapsed days ÷ 365.25
 * reported five whole calendar years as 5.0021, which pushed a fraction of a
 * year into the next accrual band of the end-of-service calculator and
 * produced money that should not have been there.
 */
import { describe, expect, it } from "vitest";
import { serviceYears } from "./serviceYears";

describe("serviceYears", () => {
  it("returns exactly whole years across leap years", () => {
    // 2020 and 2024 are leap years: 1,827 days, which ÷365.25 gives 5.0021.
    expect(serviceYears("2020-01-01", "2025-01-01")).toBe(5);
    expect(serviceYears("2020-01-01", "2030-01-01")).toBe(10);
  });

  it("returns exactly one year on a simple anniversary", () => {
    expect(serviceYears("2023-03-15", "2024-03-15")).toBe(1);
  });

  it("measures a part year against the year it falls in", () => {
    const half = serviceYears("2023-01-01", "2023-07-02");
    expect(half).toBeGreaterThan(0.49);
    expect(half).toBeLessThan(0.51);
  });

  it("counts a day before the anniversary as just under the year", () => {
    const y = serviceYears("2023-03-15", "2024-03-14");
    expect(y).toBeGreaterThan(0.99);
    expect(y).toBeLessThan(1);
  });

  it("handles a 29 February start without drifting", () => {
    // 2025 has no 29 February, so the anniversary clamps to the 28th.
    expect(serviceYears("2024-02-29", "2025-02-28")).toBe(1);
    expect(serviceYears("2024-02-29", "2028-02-29")).toBe(4);
  });

  it("rejects an end date that is not after the start", () => {
    expect(serviceYears("2024-01-01", "2024-01-01")).toBeNull();
    expect(serviceYears("2024-06-01", "2024-01-01")).toBeNull();
  });

  it("rejects unparseable dates", () => {
    expect(serviceYears("", "2024-01-01")).toBeNull();
    expect(serviceYears("2024-01-01", "not-a-date")).toBeNull();
  });

  it("is monotonic day by day", () => {
    let prev = 0;
    for (let d = 1; d <= 28; d++) {
      const v = serviceYears("2022-01-01", `2024-02-${String(d).padStart(2, "0")}`);
      expect(v).not.toBeNull();
      expect(v!).toBeGreaterThan(prev);
      prev = v!;
    }
  });
});
