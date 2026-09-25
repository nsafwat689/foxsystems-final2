/**
 * Shared input chrome for the calculators.
 *
 * Every tool needs the same three controls, and by the fifth one the markup
 * had been copied enough times that a fix in one place stopped reaching the
 * others. Numbers are forced LTR: an Arabic page renders "1,500" reversed
 * without it.
 */
import type { ReactNode } from "react";

const BOX =
  "flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background focus-within:border-primary transition-colors";

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
      {title && (
        <h3 className="font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block">
        <span className="block text-sm font-semibold mb-1.5">{label}</span>
        <div className={BOX}>
          {prefix && <span className="text-muted-foreground text-sm">{prefix}</span>}
          <input
            type="number"
            inputMode="decimal"
            className="w-full bg-transparent outline-none text-sm font-semibold ltr-text"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={e => onChange(Number(e.target.value))}
          />
          {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
        </div>
      </label>
      {hint && <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{hint}</p>}
    </div>
  );
}

export function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold mb-1.5">{label}</span>
      <input
        type="date"
        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm font-semibold outline-none focus:border-primary ltr-text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}

export function Choice<T extends string | number | boolean>({
  label,
  options,
  value,
  onChange,
  hint,
}: {
  label?: string;
  options: Array<{ v: T; l: string }>;
  value: T;
  onChange: (v: T) => void;
  hint?: string;
}) {
  return (
    <div>
      {label && <span className="block text-sm font-semibold mb-1.5">{label}</span>}
      {/* Three or more options with wordy labels blow past 390px as a single
          flex row, so they stack two-up on phones and only become a row once
          there is width for one. */}
      <div
        className={`p-1 rounded-lg bg-muted/60 border border-border w-full ${
          options.length > 2 ? "grid grid-cols-2 gap-1 sm:flex" : "inline-flex"
        }`}
      >
        {options.map(o => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => onChange(o.v)}
            aria-pressed={value === o.v}
            className={`flex-1 min-w-0 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
              value === o.v ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>
      {hint && <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{hint}</p>}
    </div>
  );
}

export function ResultPanel({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5">
      <p className="text-xs font-bold tracking-wider uppercase text-primary mb-4">{kicker}</p>
      {children}
    </div>
  );
}

export function Line({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: ReactNode;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className={`flex justify-between gap-3 ${strong ? "pt-2 mt-1 border-t border-border" : ""}`}>
      <dt className={strong ? "font-bold text-sm" : `text-sm ${muted ? "text-muted-foreground" : ""}`}>{label}</dt>
      <dd className={`ltr-text ${strong ? "font-extrabold text-primary" : "font-semibold text-sm"}`}>{value}</dd>
    </div>
  );
}

/** Thousands-separated, always Latin digits so RTL pages render them correctly. */
export const num = (n: number, dp = 0) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
