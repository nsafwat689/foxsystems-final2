/**
 * Product screenshot gallery, driven by the data in data/solutions.ts.
 *
 * Generalised from MedicalCrmShowcase so all three CRM pages share one
 * implementation. The medical screens exist; the other two sets are captured
 * separately, so a missing file must not read as a broken product.
 *
 * The SPA rewrite in vercel.json answers any unmatched path with index.html,
 * so a missing .webp arrives as 200 text/html rather than a 404. The browser
 * still fails to decode it and fires onError, which is what we key the
 * placeholder off — a plain 404 check would not have worked here.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff, MapPin } from "lucide-react";
import type { SolutionCopy } from "@/data/solutions";

interface Props {
  base: string;
  copy: SolutionCopy;
  language: "en" | "ar";
}

const PLACEHOLDER_TEXT = {
  en: "Screenshot coming soon",
  ar: "لقطة الشاشة قريبًا",
};

function Placeholder({ language, className }: { language: "en" | "ar"; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-white/5 text-white/40 ${className ?? ""}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <ImageOff className="w-7 h-7" aria-hidden="true" />
      <span className="text-xs font-medium">{PLACEHOLDER_TEXT[language]}</span>
    </div>
  );
}

export default function SolutionShowcase({ base, copy, language }: Props) {
  const isArabic = language === "ar";
  const [active, setActive] = useState(0);
  // One entry per screen id that failed to load, so switching tabs back and
  // forth does not retry a file we already know is not there.
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [mobileFailed, setMobileFailed] = useState(false);

  const screen = copy.screens[active];
  const panelId = `${base}-showcase-panel`;

  return (
    <section className="mt-16 pt-14 border-t border-border">
      <div className="flex flex-col gap-3 mb-7">
        <h2
          className="text-2xl md:text-3xl font-extrabold"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          {copy.screensTitle}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{copy.screensSub}</p>
      </div>

      <div
        className={`grid gap-8 items-start ${copy.mobile ? "lg:grid-cols-[minmax(0,1fr)_260px]" : ""}`}
      >
        <div className="min-w-0">
          <div role="tablist" aria-label={copy.name} className="flex flex-wrap gap-2 mb-4">
            {copy.screens.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  i === active
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                    : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div
            id={panelId}
            role="tabpanel"
            className="rounded-2xl overflow-hidden border border-border bg-[#0f172a] shadow-xl"
          >
            {/* window chrome */}
            <div
              className={`flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border-b border-white/10 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>

            {failed[screen.id] ? (
              <Placeholder language={language} />
            ) : (
              <motion.img
                key={screen.id}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                src={`/showcase/${base}/${screen.id}.webp`}
                alt={screen.alt}
                width={1800}
                height={1013}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(prev => ({ ...prev, [screen.id]: true }))}
                className="w-full h-auto block"
              />
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
            {screen.caption}
          </p>
        </div>

        {copy.mobile && (
          <div className="flex flex-col gap-4">
            <div className="rounded-[22px] overflow-hidden border-4 border-[#0f172a] bg-[#0f172a] shadow-xl mx-auto max-w-[240px]">
              {mobileFailed ? (
                <Placeholder language={language} className="!aspect-[9/19]" />
              ) : (
                <img
                  src={`/showcase/${base}/${copy.mobile.id}.webp`}
                  alt={copy.mobile.alt}
                  width={560}
                  height={1212}
                  loading="lazy"
                  decoding="async"
                  onError={() => setMobileFailed(true)}
                  className="w-full h-auto block"
                />
              )}
            </div>
            <div className="space-y-2">
              <h3
                className="font-bold text-base flex items-center gap-2"
                style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                {copy.mobile.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{copy.mobile.body}</p>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground/70 mt-6">{copy.note}</p>
    </section>
  );
}
