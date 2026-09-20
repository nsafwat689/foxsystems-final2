import { MotionGlobalConfig } from "framer-motion";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalytics } from "@/lib/analytics";
import "./index.css";

// The tRPC + react-query providers that used to wrap <App /> are gone: no page
// on this marketing site calls an API through them, and the only consumers
// (the dashboard layout and useAuth) were unused template scaffolding. They
// cost ~96 kB on every first visit. The enquiry form posts to /api/contact
// with plain fetch. Re-add them if you build the authenticated dashboard —
// server/routers.ts still has the router.

// Every section starts at opacity 0 and is revealed by an enter animation.
// When those animations can't run — page opened in a hidden tab or an in-app
// webview, reduced motion, no Web Animations API — the visitor is left staring
// at a blank page, so go straight to the end state instead.
const canAnimate =
  document.visibilityState === "visible" &&
  typeof Element.prototype.animate === "function" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!canAnimate) {
  MotionGlobalConfig.skipAnimations = true;
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  for (const animation of document.getAnimations()) {
    try {
      animation.finish();
    } catch {
      // infinite animations can't be finished; they were never the problem
    }
  }
});

initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
