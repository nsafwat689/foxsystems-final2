/**
 * Phones only (hidden from md up, so tablets and desktop are untouched): a bar
 * fixed to the bottom of the CRM pages with the three things visitors scroll
 * for — the live demo, the prices and WhatsApp. On a page that has the
 * section it scrolls there; otherwise it opens the page that does.
 */
import { Link } from "wouter";
import { MessageCircle, PlayCircle, Tag } from "lucide-react";
import { scrollToId } from "@/lib/scrollToId";

type Target = { id: string; href: string };

export default function MobileActionBar({ language, demo, prices, source }: {
  language: "en" | "ar"; demo: Target; prices: Target; source: string;
}) {
  const ar = language === "ar";
  const go = (t: Target, what: string) => (e: React.MouseEvent) => {
    window.trackCTA?.(`mobile-bar-${what}-${source}`);
    if (document.getElementById(t.id) && scrollToId(t.id)) e.preventDefault();
  };
  const item = "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[12px] font-semibold";
  return (
    <>
      {/* keeps the last content clear of the bar */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <nav aria-label={ar ? "إجراءات سريعة" : "Quick actions"} dir={ar ? "rtl" : "ltr"}
        className="fixed bottom-0 inset-x-0 z-50 md:hidden flex gap-2 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] bg-[#0f172a]/95 backdrop-blur border-t border-white/10">
        <Link href={demo.href} onClick={go(demo, "demo")} className={`${item} bg-primary text-white`}>
          <PlayCircle className="w-5 h-5" />{ar ? "النسخة التجريبية" : "Live demo"}
        </Link>
        <Link href={prices.href} onClick={go(prices, "prices")} className={`${item} bg-white/10 text-white`}>
          <Tag className="w-5 h-5" />{ar ? "الأسعار" : "Prices"}
        </Link>
        <a href="https://wa.me/201038450546" target="_blank" rel="noopener noreferrer" onClick={() => window.trackCTA?.(`mobile-bar-whatsapp-${source}`)}
          className={`${item} bg-[#25D366] text-white`}>
          <MessageCircle className="w-5 h-5" />WhatsApp
        </a>
      </nav>
    </>
  );
}
