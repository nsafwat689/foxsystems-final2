import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  language?: "en" | "ar";
}

export default function ScrollToTop({ language = "en" }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isArabic = language === "ar";
  const label = isArabic ? "العودة إلى الأعلى" : "Back to top";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleClick}
      className={`fixed z-40 bottom-6 ${isArabic ? "left-6" : "right-6"}
        h-12 w-12 rounded-full bg-primary text-white shadow-lg shadow-primary/30
        ring-1 ring-primary/30 hover:scale-110 hover:shadow-primary/50
        transition-all duration-300 flex items-center justify-center
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
