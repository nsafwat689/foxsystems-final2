/**
 * Phones only: shows the first part of a long section with "Show more" to open
 * the rest. From md up it renders the children exactly as before. The content
 * is always in the page (only clipped), so nothing is removed for readers or
 * search engines.
 */
import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function MobileFold({ children, language, peek = 240, className = "" }: {
  children: ReactNode; language: "en" | "ar"; peek?: number; className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <div className={open ? "" : "max-md:overflow-hidden max-md:max-h-[var(--fold-peek)]"} style={{ ["--fold-peek" as string]: `${peek}px` }}>
        {children}
      </div>
      {!open && (
        <div className="md:hidden relative -mt-20 pt-14 flex justify-center bg-gradient-to-t from-background via-background/95 to-transparent">
          <button type="button" onClick={() => setOpen(true)} aria-expanded={false}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2 text-sm font-semibold shadow-sm">
            {language === "ar" ? "عرض المزيد" : "Show more"} <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
