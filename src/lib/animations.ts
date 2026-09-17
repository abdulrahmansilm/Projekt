/**
 * Zentrales Reveal-on-Scroll-Utility (CLAUDE.md → Goldene Regel 3).
 * Elemente mit [data-reveal] blenden einmalig ein (opacity + translateY, siehe global.css).
 * Gruppen mit [data-reveal-group] staffeln ihre Kinder um 60ms (max. 5 Stufen, emil-design-eng: 30–80ms).
 * Bei prefers-reduced-motion wird sofort der Endzustand gesetzt.
 */

export function initReveal(root: ParentNode = document) {
  const elemente = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
  if (!elemente.length) return;

  const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduziert || !("IntersectionObserver" in window)) {
    elemente.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  // Stagger-Index innerhalb einer Gruppe, gedeckelt auf 4 (→ max. 240ms Verzögerung)
  root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((gruppe) => {
    gruppe.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--reveal-index", String(Math.min(i, 4)));
    });
  });

  const beobachter = new IntersectionObserver(
    (eintraege) => {
      for (const eintrag of eintraege) {
        if (!eintrag.isIntersecting) continue;
        eintrag.target.classList.add("is-revealed");
        beobachter.unobserve(eintrag.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elemente.forEach((el) => beobachter.observe(el));
}

/** true, wenn Bewegungs-Animationen ausgeführt werden dürfen */
export function bewegungErlaubt(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
