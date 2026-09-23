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

/**
 * Wechselwort im Hero (siehe Hero.astro, Runde 4). Alle Wörter liegen übereinander, das aktive ist sichtbar.
 * Beim Wechsel gleitet das alte Wort nach oben weg, das neue von unten herein (reine CSS-Transition auf
 * Klassen, jederzeit unterbrechbar). Keine Messung, keine Breitenänderung → keine Layout-Verschiebung.
 * Bei reduzierter Bewegung wird nur überblendet. Pausiert, solange der Tab nicht sichtbar ist.
 */
// Runde 5: Wechsel läuft etwas langsamer ab (vorher 3200ms Standzeit)
const WW_STANDZEIT_MS = 4400;
const WW_AUFRAEUMEN_MS = 750;

export function initWortwechsel() {
  document.querySelectorAll<HTMLElement>("[data-wortwechsel]").forEach((el) => {
    const woerter = Array.from(el.querySelectorAll<HTMLElement>(".ww__wort"));
    if (woerter.length < 2) return;
    let index = 0;

    const wechsel = () => {
      if (document.hidden) return;
      const alt = woerter[index];
      index = (index + 1) % woerter.length;
      const neu = woerter[index];
      alt.classList.remove("ist-aktiv");
      alt.classList.add("ist-weg");
      neu.classList.remove("ist-weg");
      neu.classList.add("ist-aktiv");
      window.setTimeout(() => alt.classList.remove("ist-weg"), WW_AUFRAEUMEN_MS);
    };
    window.setInterval(wechsel, WW_STANDZEIT_MS);
  });
}
