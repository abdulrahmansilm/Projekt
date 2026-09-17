/**
 * Zentrales Reveal-on-Scroll-Utility (Design-Gebot 9: weniger animieren, prefers-reduced-motion Pflicht).
 * Wird von RevealOnScroll.astro als Astro-Island eingebunden, nicht pro Komponente neu erfunden.
 */
export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
  if (elements.length === 0) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el, index) => {
    // Max. 4-5 gestaggerte Elemente pro Sektion (Design-Gebot 9), leichte Verzögerung pro Element.
    const delay = Math.min(index % 5, 4) * 80;
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
  });
}
