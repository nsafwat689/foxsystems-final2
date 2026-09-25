/**
 * Amount in words, English and Arabic, for invoice totals.
 *
 * Writing the total in words is conventional on invoices in Egypt and is one
 * of the things people most often get wrong when typing these by hand. It is
 * generated from the figure here so the two cannot disagree.
 *
 * Arabic is the hard half, because the counted noun inflects with the number
 * (tamyiz). The rule this implements, keyed on the last two digits:
 *
 *   1            singular, numeral omitted      جنيه
 *   2            dual, numeral omitted          جنيهان
 *   3-10         plural, genitive               ثلاثة جنيهات
 *   11-99        singular, accusative           أربعون جنيهًا
 *   0, or 1-2    singular, genitive             مائة جنيه / ألف جنيه
 *   above 100
 *
 * Getting this wrong produces phrases like "اثنان جنيهان" — literally "two
 * two-pounds" — which is why the numeral is dropped for one and two: the
 * singular and dual noun forms already carry the count.
 *
 * The same rule governs the scale words themselves, so 407 thousand is
 * "أربعمائة وسبعة آلاف" (407 ends in 7, so the plural) and not "سبعة ألفًا".
 *
 * See numberToWords.test.ts — these cases are locked down there.
 */

// --- English ----------------------------------------------------------------

const EN_ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];
const EN_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const EN_SCALES: Array<[number, string]> = [
  [1_000_000_000, "billion"],
  [1_000_000, "million"],
  [1_000, "thousand"],
];

function enUnder1000(n: number): string {
  if (n === 0) return "";
  if (n < 20) return EN_ONES[n];
  if (n < 100) {
    const t = EN_TENS[Math.floor(n / 10)];
    const o = n % 10;
    return o ? `${t}-${EN_ONES[o]}` : t;
  }
  const h = `${EN_ONES[Math.floor(n / 100)]} hundred`;
  const rest = n % 100;
  return rest ? `${h} and ${enUnder1000(rest)}` : h;
}

function enWhole(n: number): string {
  if (n === 0) return "zero";
  const parts: string[] = [];
  let left = n;
  for (const [value, name] of EN_SCALES) {
    if (left >= value) {
      parts.push(`${enUnder1000(Math.floor(left / value))} ${name}`);
      left %= value;
    }
  }
  if (left > 0) parts.push(enUnder1000(left));
  return parts.join(" ");
}

// --- Arabic -----------------------------------------------------------------

const AR_ONES = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"];
const AR_TEENS = [
  "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر",
  "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر",
];
const AR_TENS = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
const AR_HUNDREDS = [
  "", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة",
  "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة",
];

/** The four inflections a counted noun takes, in this order. */
export type CountedForms = [singular: string, dual: string, plural: string, accusative: string];

type Form = 0 | 1 | 2 | 3;

/** Which inflection the noun after `n` takes. See the header for the rule. */
export function countedForm(n: number): Form {
  if (n === 1) return 0;
  if (n === 2) return 1;
  const rem = n % 100;
  if (rem >= 3 && rem <= 10) return 2;
  if (rem >= 11 && rem <= 99) return 3;
  return 0;
}

function arUnder1000(n: number): string {
  if (n === 0) return "";
  const parts: string[] = [];
  const h = Math.floor(n / 100);
  const rest = n % 100;
  if (h) parts.push(AR_HUNDREDS[h]);
  if (rest) {
    if (rest < 10) parts.push(AR_ONES[rest]);
    else if (rest < 20) parts.push(AR_TEENS[rest - 10]);
    else {
      const o = rest % 10;
      const t = AR_TENS[Math.floor(rest / 10)];
      parts.push(o ? `${AR_ONES[o]} و${t}` : t);
    }
  }
  return parts.join(" و");
}

/**
 * A scale group such as "407 thousand". The scale word inflects by the same
 * rule as any counted noun, and the numeral is dropped for one and two
 * because "ألف" and "ألفان" already mean one and two thousand.
 */
function arScale(count: number, forms: CountedForms): string {
  const form = countedForm(count);
  if (count === 1) return forms[0];
  if (count === 2) return forms[1];
  return `${arUnder1000(count)} ${forms[form]}`;
}

const AR_THOUSAND: CountedForms = ["ألف", "ألفان", "آلاف", "ألفًا"];
const AR_MILLION: CountedForms = ["مليون", "مليونان", "ملايين", "مليونًا"];
const AR_BILLION: CountedForms = ["مليار", "ملياران", "مليارات", "مليارًا"];

function arWhole(n: number): string {
  if (n === 0) return "صفر";
  const parts: string[] = [];
  let left = n;

  const billions = Math.floor(left / 1_000_000_000);
  if (billions) {
    parts.push(arScale(billions, AR_BILLION));
    left %= 1_000_000_000;
  }
  const millions = Math.floor(left / 1_000_000);
  if (millions) {
    parts.push(arScale(millions, AR_MILLION));
    left %= 1_000_000;
  }
  const thousands = Math.floor(left / 1_000);
  if (thousands) {
    parts.push(arScale(thousands, AR_THOUSAND));
    left %= 1_000;
  }
  if (left > 0) parts.push(arUnder1000(left));

  return parts.join(" و");
}

/**
 * The number followed by its counted noun. For one and two the numeral is
 * omitted, because the singular and dual forms of the noun already say it.
 */
function arCounted(n: number, forms: CountedForms): string {
  const form = countedForm(n);
  if (n === 1 || n === 2) return forms[form];
  return `${arWhole(n)} ${forms[form]}`;
}

// --- currencies -------------------------------------------------------------

export type Currency = {
  code: string;
  /** English singular and plural for the main unit, and the subunit name. */
  en: [string, string];
  enSub: string;
  /** Arabic inflections for the main unit and the subunit. */
  ar: CountedForms;
  arSub: CountedForms;
};

export const CURRENCIES: Record<string, Currency> = {
  EGP: {
    code: "EGP",
    en: ["Egyptian Pound", "Egyptian Pounds"],
    enSub: "piastres",
    ar: ["جنيه مصري", "جنيهان مصريان", "جنيهات مصرية", "جنيهًا مصريًا"],
    arSub: ["قرش", "قرشان", "قروش", "قرشًا"],
  },
  USD: {
    code: "USD",
    en: ["US Dollar", "US Dollars"],
    enSub: "cents",
    ar: ["دولار أمريكي", "دولاران أمريكيان", "دولارات أمريكية", "دولارًا أمريكيًا"],
    arSub: ["سنت", "سنتان", "سنتات", "سنتًا"],
  },
  SAR: {
    code: "SAR",
    en: ["Saudi Riyal", "Saudi Riyals"],
    enSub: "halalas",
    ar: ["ريال سعودي", "ريالان سعوديان", "ريالات سعودية", "ريالًا سعوديًا"],
    arSub: ["هللة", "هللتان", "هللات", "هللةً"],
  },
  AED: {
    code: "AED",
    en: ["UAE Dirham", "UAE Dirhams"],
    enSub: "fils",
    ar: ["درهم إماراتي", "درهمان إماراتيان", "دراهم إماراتية", "درهمًا إماراتيًا"],
    arSub: ["فلس", "فلسان", "فلوس", "فلسًا"],
  },
  KWD: {
    code: "KWD",
    en: ["Kuwaiti Dinar", "Kuwaiti Dinars"],
    enSub: "fils",
    ar: ["دينار كويتي", "ديناران كويتيان", "دنانير كويتية", "دينارًا كويتيًا"],
    arSub: ["فلس", "فلسان", "فلوس", "فلسًا"],
  },
};

/**
 * "one thousand one hundred and forty Egyptian Pounds only"
 * "ألف ومائة وأربعون جنيهًا مصريًا فقط لا غير"
 */
export function amountInWords(amount: number, currencyCode: string, language: "en" | "ar"): string {
  const c = CURRENCIES[currencyCode] ?? CURRENCIES.EGP;
  const safe = Math.max(0, Math.round(amount * 100) / 100);
  const whole = Math.floor(safe);
  const sub = Math.round((safe - whole) * 100);

  if (language === "ar") {
    const head = whole === 0 ? `صفر ${c.ar[0]}` : arCounted(whole, c.ar);
    if (sub === 0) return `${head} فقط لا غير`;
    return `${head} و${arCounted(sub, c.arSub)} فقط لا غير`;
  }

  const unit = whole === 1 ? c.en[0] : c.en[1];
  const head = `${enWhole(whole)} ${unit}`;
  if (sub === 0) return `${head} only`;
  return `${head} and ${enWhole(sub)} ${c.enSub} only`;
}
