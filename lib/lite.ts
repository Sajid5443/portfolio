// "Lite" mode = phones and touch tablets. Heavy scroll effects are simplified there
// so scrolling stays smooth; desktop keeps every effect.
export const isLite = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 760px), (pointer: coarse)").matches;

/** Tracks whether an element is on (or near) the screen, without re-rendering. */
export function watchVisible(el: Element | null, margin = "200px") {
  const state = { on: true, stop: () => {} };
  if (!el || typeof IntersectionObserver === "undefined") return state;
  const io = new IntersectionObserver(([e]) => { state.on = e.isIntersecting; }, { rootMargin: margin });
  io.observe(el);
  state.stop = () => io.disconnect();
  return state;
}
