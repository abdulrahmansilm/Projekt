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
 * Typewriter-Wechselwort im Hero (siehe Hero.astro): löscht das Wort Buchstabe für Buchstabe und schreibt das nächste.
 * Die Höhe der Headline wird auf das höchste Wort festgelegt, damit der Text darunter nicht springt.
 * Bei prefers-reduced-motion bleibt das erste Wort stehen.
 */
export function initTypewriter() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll<HTMLElement>("[data-typewriter]").forEach((el) => {
    const woerter = (el.dataset.typewriter ?? "").split("|").filter(Boolean);
    const text = el.querySelector<HTMLElement>(".tw__text");
    if (woerter.length < 2 || !text) return;
    const h1 = el.closest<HTMLElement>("h1");
    let aktuell = woerter[0];
    const warte = (ms: number) => new Promise((r) => window.setTimeout(r, ms));

    const hoeheFestlegen = () => {
      if (!h1) return;
      h1.style.minHeight = "";
      let max = h1.offsetHeight;
      for (const w of woerter) {
        text.textContent = w;
        max = Math.max(max, h1.offsetHeight);
      }
      text.textContent = aktuell;
      h1.style.minHeight = `${max}px`;
    };
    hoeheFestlegen();
    document.fonts?.ready.then(hoeheFestlegen);
    let resizeTimer: number | undefined;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(hoeheFestlegen, 200);
    });

    (async () => {
      let i = 0;
      await warte(2600);
      for (;;) {
        if (document.hidden) {
          await warte(500);
          continue;
        }
        for (let n = aktuell.length; n >= 0; n--) {
          text.textContent = aktuell.slice(0, n);
          await warte(55);
        }
        await warte(280);
        i = (i + 1) % woerter.length;
        aktuell = woerter[i];
        for (let n = 1; n <= aktuell.length; n++) {
          text.textContent = aktuell.slice(0, n);
          await warte(85);
        }
        await warte(2400);
      }
    })();
  });
}
