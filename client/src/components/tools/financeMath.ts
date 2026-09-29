/**
 * The maths behind the financing tools. Flat and murabaha pricing charge profit on the
 * ORIGINAL amount for the whole term; reducing balance charges it on what is still owed.
 * That is why a "20% flat" loan costs far more than "20% reducing" — the APR shows it.
 */
export type Method = "flat" | "reducing" | "murabaha";

export function installment(principal: number, annualRate: number, months: number, method: Method) {
  const n = Math.max(1, Math.round(months)), r = annualRate / 100;
  if (method === "reducing") {
    const i = r / 12;
    return i === 0 ? principal / n : (principal * i) / (1 - Math.pow(1 + i, -n));
  }
  return (principal + principal * r * (n / 12)) / n;
}

/** Monthly rate i that makes `received` equal the present value of n payments of `pay` (bisection). */
export function monthlyIrr(received: number, pay: number, n: number) {
  if (received <= 0 || pay <= 0 || pay * n <= received) return 0;
  let lo = 0, hi = 1;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    const pv = (pay * (1 - Math.pow(1 + mid, -n))) / mid;
    if (pv > received) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

export type Row = { n: number; payment: number; principal: number; profit: number; balance: number };

export function schedule(principal: number, annualRate: number, months: number, method: Method): Row[] {
  const n = Math.max(1, Math.round(months)), pay = installment(principal, annualRate, n, method), rows: Row[] = [];
  let bal = principal;
  const flatProfit = (principal * (annualRate / 100) * (n / 12)) / n;
  for (let k = 1; k <= n; k++) {
    const profit = method === "reducing" ? bal * (annualRate / 100 / 12) : flatProfit;
    const prin = k === n ? bal : pay - profit;
    bal = Math.max(0, bal - prin);
    rows.push({ n: k, payment: k === n ? prin + profit : pay, principal: prin, profit, balance: bal });
  }
  return rows;
}

/** The largest amount a borrower can take for a monthly installment they can afford. */
export function maxPrincipal(maxInstallment: number, annualRate: number, months: number, method: Method) {
  const n = Math.max(1, Math.round(months)), r = annualRate / 100;
  if (maxInstallment <= 0) return 0;
  if (method === "reducing") {
    const i = r / 12;
    return i === 0 ? maxInstallment * n : (maxInstallment * (1 - Math.pow(1 + i, -n))) / i;
  }
  return (maxInstallment * n) / (1 + r * (n / 12));
}
