import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { MotionGlobalConfig } from "framer-motion";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

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

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
