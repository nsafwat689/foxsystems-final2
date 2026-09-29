/**
 * React.lazy with one retry that bypasses a poisoned cache entry.
 *
 * On 2026-09-29 Cloudflare cached a 404 for a freshly deployed chunk (asked for
 * a moment before the deploy went live), and because /assets is served as
 * immutable the 404 stuck: every tool page showed "Failed to fetch dynamically
 * imported module". Re-importing the same URL with a query string is a new
 * cache key, so it reaches the real file. The chunk's own imports are relative
 * and carry no query, so shared modules are not loaded twice.
 */
import { lazy, type ComponentType } from "react";

const URL_IN_MESSAGE = /(https?:\/\/[^\s'"]+\.js)/;

export function lazyRetry<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return lazy(() =>
    factory().catch((err: unknown) => {
      const url = String((err as Error)?.message ?? "").match(URL_IN_MESSAGE)?.[1];
      if (!url) throw err;
      return import(/* @vite-ignore */ `${url}?retry=${Date.now()}`) as Promise<{ default: T }>;
    }),
  );
}
