/**
 * Analytics loaders.
 *
 * These used to sit inline in index.html with placeholder IDs
 * (G-XXXXXXXXXX and friends), so three third-party scripts loaded on every
 * page view and recorded nothing. Each one now loads only when its real ID is
 * configured, and the trackers degrade to no-ops when it isn't.
 *
 * Set in Vercel → Settings → Environment Variables (all optional):
 *   VITE_GA4_ID         e.g. G-ABCD123456
 *   VITE_CLARITY_ID     e.g. abcdefghij
 *   VITE_META_PIXEL_ID  e.g. 1234567890123456
 */

const PLACEHOLDER = /^(|X+|G-X+)$/i;

const configured = (value: string | undefined): value is string =>
  typeof value === "string" && value.trim() !== "" && !PLACEHOLDER.test(value.trim());

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    trackCTA?: (label: string) => void;
    trackWhatsApp?: () => void;
    trackFormSubmit?: (service?: string) => void;
  }
}

function loadGA4(id: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag relies on `arguments`, so this can't be an arrow function.
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });
}

function loadClarity(id: string) {
  window.clarity =
    window.clarity ||
    function clarity() {
      (window.clarity!.q = window.clarity!.q || []).push(arguments);
    };
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function loadMetaPixel(id: string) {
  // Mirrors Meta's own snippet: queue calls until fbevents.js attaches callMethod.
  const fbq: any = function () {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [] as any[];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", id);
  fbq("track", "PageView");
}

/** Installs whichever trackers are configured, plus the event helpers pages call. */
export function initAnalytics() {
  const ga4 = import.meta.env.VITE_GA4_ID as string | undefined;
  const clarity = import.meta.env.VITE_CLARITY_ID as string | undefined;
  const pixel = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

  if (configured(ga4)) loadGA4(ga4.trim());
  if (configured(clarity)) loadClarity(clarity.trim());
  if (configured(pixel)) loadMetaPixel(pixel.trim());

  const event = (name: string, params: Record<string, unknown>) => {
    window.gtag?.("event", name, params);
  };

  window.trackCTA = label => event("cta_click", { event_category: "engagement", event_label: label });
  window.trackWhatsApp = () => event("whatsapp_click", { event_category: "lead", event_label: "WhatsApp" });
  window.trackFormSubmit = service => event("form_submit", { event_category: "lead", event_label: service || "General" });
}
