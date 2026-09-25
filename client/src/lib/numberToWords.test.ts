/**
 * The Arabic cases here are the ones an earlier version got wrong, and they
 * are the kind of error nobody notices until a client forwards an invoice:
 * "اثنان جنيهان" (two two-pounds), and singular nouns where the accusative
 * tamyiz form is required.
 */
import { describe, expect, it } from "vitest";
import { amountInWords, countedForm } from "./numberToWords";

describe("countedForm", () => {
  it("picks singular for one and dual for two", () => {
    expect(countedForm(1)).toBe(0);
    expect(countedForm(2)).toBe(1);
  });

  it("picks the plural for three to ten", () => {
    for (const n of [3, 6, 10, 106, 1006]) expect(countedForm(n)).toBe(2);
  });

  it("picks the accusative for eleven to ninety-nine", () => {
    for (const n of [11, 40, 71, 99, 140, 1099]) expect(countedForm(n)).toBe(3);
  });

  it("falls back to the singular on round hundreds and thousands", () => {
    for (const n of [100, 200, 1000, 1_000_000]) expect(countedForm(n)).toBe(0);
  });
});

describe("amountInWords — English", () => {
  it("writes a whole amount", () => {
    expect(amountInWords(1140, "EGP", "en")).toBe("one thousand one hundred and forty Egyptian Pounds only");
  });

  it("uses the singular for exactly one", () => {
    expect(amountInWords(1, "EGP", "en")).toBe("one Egyptian Pound only");
  });

  it("names the subunit per currency", () => {
    expect(amountInWords(2.28, "EGP", "en")).toContain("piastres");
    expect(amountInWords(2.28, "USD", "en")).toContain("cents");
  });

  it("handles millions", () => {
    expect(amountInWords(1_407_406, "EGP", "en")).toBe(
      "one million four hundred and seven thousand four hundred and six Egyptian Pounds only",
    );
  });

  it("writes zero", () => {
    expect(amountInWords(0, "EGP", "en")).toBe("zero Egyptian Pounds only");
  });
});

describe("amountInWords — Arabic", () => {
  it("drops the numeral for one and two, since the noun carries the count", () => {
    expect(amountInWords(1, "EGP", "ar")).toBe("جنيه مصري فقط لا غير");
    expect(amountInWords(2, "EGP", "ar")).toBe("جنيهان مصريان فقط لا غير");
    // The bug this replaces produced "اثنان جنيهان مصريان".
    expect(amountInWords(2, "EGP", "ar")).not.toContain("اثنان");
  });

  it("uses the accusative when the last two digits are 11-99", () => {
    expect(amountInWords(1140, "EGP", "ar")).toBe("ألف ومائة وأربعون جنيهًا مصريًا فقط لا غير");
  });

  it("uses the plural when the last two digits are 3-10", () => {
    expect(amountInWords(1_407_406, "EGP", "ar")).toContain("جنيهات مصرية");
  });

  it("inflects the scale word by the same rule", () => {
    // 407 ends in 7, so the thousands word takes the plural, not the accusative.
    expect(amountInWords(1_407_406, "EGP", "ar")).toContain("أربعمائة وسبعة آلاف");
    expect(amountInWords(1_407_406, "EGP", "ar")).not.toContain("سبعة ألفًا");
  });

  it("drops the numeral on a single thousand and a single million", () => {
    expect(amountInWords(1000, "EGP", "ar")).toBe("ألف جنيه مصري فقط لا غير");
    expect(amountInWords(2000, "EGP", "ar")).toContain("ألفان");
  });

  it("inflects the subunit too", () => {
    expect(amountInWords(5.71, "EGP", "ar")).toContain("قرشًا");
    expect(amountInWords(5.05, "EGP", "ar")).toContain("قروش");
    expect(amountInWords(5.02, "EGP", "ar")).toContain("قرشان");
  });

  it("writes zero", () => {
    expect(amountInWords(0, "EGP", "ar")).toBe("صفر جنيه مصري فقط لا غير");
  });

  it("covers every currency without falling back", () => {
    for (const code of ["EGP", "USD", "SAR", "AED", "KWD"]) {
      const out = amountInWords(1140.5, code, "ar");
      expect(out).toMatch(/فقط لا غير$/);
      expect(out).not.toContain("undefined");
    }
  });
});
