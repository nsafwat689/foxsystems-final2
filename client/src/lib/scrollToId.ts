/**
 * Scroll the WINDOW so the element with `id` sits just below the sticky header.
 *
 * Not element.scrollIntoView(), and not a plain `href="#id"` jump: both also
 * scroll every scrollable ancestor, and the page wrappers clip overflow (which
 * makes them scroll containers). On /services/crm that scrolled an inner box as
 * well as the window and left #try-demo ~650px above the viewport.
 */
export const HEADER_OFFSET = 96;

export function scrollToId(id: string, behavior: ScrollBehavior = "smooth"): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}
