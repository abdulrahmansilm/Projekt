/**
 * Verhalten der Navigation:
 * - Dropdowns (Klick/Tastatur überall, zusätzlich Hover bei echter Maus)
 * - Sticky-Header, sobald der Hero den Viewport verlässt
 * - Mobiles Menü mit Fokusfalle, Escape und Scroll-Sperre
 */

const HOVER_FAEHIG = window.matchMedia("(hover: hover) and (pointer: fine)");

function initDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll<HTMLElement>("[data-dropdown]"));

  const schliesseAlle = (ausser?: HTMLElement) => {
    for (const dd of dropdowns) {
      if (dd === ausser) continue;
      setzeOffen(dd, false);
    }
  };

  function setzeOffen(dd: HTMLElement, offen: boolean) {
    dd.classList.toggle("is-open", offen);
    dd.querySelector("[data-dropdown-trigger]")?.setAttribute("aria-expanded", String(offen));
  }

  for (const dd of dropdowns) {
    const trigger = dd.querySelector<HTMLButtonElement>("[data-dropdown-trigger]");
    const panel = dd.querySelector<HTMLElement>("[data-dropdown-panel]");
    if (!trigger || !panel) continue;
    let schliessTimer: number | undefined;

    trigger.addEventListener("click", () => {
      const offen = !dd.classList.contains("is-open");
      schliesseAlle(dd);
      setzeOffen(dd, offen);
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        schliesseAlle(dd);
        setzeOffen(dd, true);
        panel.querySelector<HTMLAnchorElement>("a")?.focus();
      }
    });

    dd.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dd.classList.contains("is-open")) {
        setzeOffen(dd, false);
        trigger.focus();
      }
    });

    dd.addEventListener("focusout", (e) => {
      const ziel = e.relatedTarget as Node | null;
      if (ziel && !dd.contains(ziel)) setzeOffen(dd, false);
    });

    // Hover nur bei echter Maus; kurze Nachlaufzeit, damit diagonale Mausbewegungen nicht schließen
    dd.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || !HOVER_FAEHIG.matches) return;
      window.clearTimeout(schliessTimer);
      schliesseAlle(dd);
      setzeOffen(dd, true);
    });
    dd.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "mouse" || !HOVER_FAEHIG.matches) return;
      schliessTimer = window.setTimeout(() => setzeOffen(dd, false), 140);
    });
  }

  document.addEventListener("click", (e) => {
    const ziel = e.target as Node;
    for (const dd of dropdowns) {
      if (!dd.contains(ziel)) setzeOffen(dd, false);
    }
  });
}

function initStickyHeader() {
  const sticky = document.querySelector<HTMLElement>("[data-sticky-header]");
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!sticky) return;

  const zeige = (sichtbar: boolean) => {
    sticky.classList.toggle("is-visible", sichtbar);
    if (sichtbar) {
      sticky.removeAttribute("inert");
      sticky.removeAttribute("aria-hidden");
    } else {
      sticky.setAttribute("inert", "");
      sticky.setAttribute("aria-hidden", "true");
      sticky.querySelectorAll("[data-dropdown].is-open").forEach((dd) => {
        dd.classList.remove("is-open");
        dd.querySelector("[data-dropdown-trigger]")?.setAttribute("aria-expanded", "false");
      });
    }
    document.documentElement.classList.toggle("hat-sticky-header", sichtbar);
  };

  if (!hero) {
    zeige(true);
    return;
  }

  const beobachter = new IntersectionObserver(
    ([eintrag]) => zeige(!eintrag.isIntersecting),
    { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
  );
  // Beobachtet wird das Ende der Kopfzeile im Hero: sobald sie weg ist, übernimmt der Sticky-Header
  const marker = hero.querySelector<HTMLElement>("[data-hero-ende]") ?? hero;
  beobachter.observe(marker);

  // Scrollrichtung: beim Runterscrollen vollständig ausblenden, bei leichtem Hochscrollen sofort wieder einblenden
  let letzteY = window.scrollY;
  let tick = false;
  const RUNTER_SCHWELLE = 10;
  const HOCH_SCHWELLE = 4;

  const aufScroll = () => {
    tick = false;
    const y = window.scrollY;
    const delta = y - letzteY;
    if (delta > RUNTER_SCHWELLE) {
      sticky.classList.add("is-hidden-scroll");
      letzteY = y;
    } else if (delta < -HOCH_SCHWELLE) {
      sticky.classList.remove("is-hidden-scroll");
      letzteY = y;
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(aufScroll);
    },
    { passive: true }
  );
}

function initMobileMenu() {
  const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
  if (!menu) return;
  const sheet = menu.querySelector<HTMLElement>("[role='dialog']");
  let ausloeser: HTMLElement | null = null;
  let schliessTimer: number | undefined;

  const fokussierbar = () =>
    Array.from(
      menu.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);

  const oeffnen = (trigger: HTMLElement) => {
    window.clearTimeout(schliessTimer);
    ausloeser = trigger;
    menu.hidden = false;
    document.documentElement.style.overflow = "hidden";
    document.querySelectorAll("[data-menu-open]").forEach((b) => b.setAttribute("aria-expanded", "true"));
    // Zwei Frames, damit die Start-Position gerendert ist und die Transition greift
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        menu.querySelector<HTMLElement>("[data-menu-close].mm__schliessen, .mm__schliessen")?.focus();
      })
    );
  };

  const schliessen = (fokusZurueck = true) => {
    menu.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    document.querySelectorAll("[data-menu-open]").forEach((b) => b.setAttribute("aria-expanded", "false"));
    const dauer = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240;
    schliessTimer = window.setTimeout(() => {
      menu.hidden = true;
    }, dauer);
    if (fokusZurueck) ausloeser?.focus();
  };

  document.querySelectorAll<HTMLElement>("[data-menu-open]").forEach((btn) =>
    btn.addEventListener("click", () => oeffnen(btn))
  );
  menu.querySelectorAll<HTMLElement>("[data-menu-close]").forEach((el) =>
    el.addEventListener("click", () => schliessen())
  );
  menu.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) =>
    a.addEventListener("click", () => schliessen(false))
  );

  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      schliessen();
      return;
    }
    if (e.key !== "Tab" || !sheet) return;
    const elemente = fokussierbar();
    if (!elemente.length) return;
    const erstes = elemente[0];
    const letztes = elemente[elemente.length - 1];
    if (e.shiftKey && document.activeElement === erstes) {
      e.preventDefault();
      letztes.focus();
    } else if (!e.shiftKey && document.activeElement === letztes) {
      e.preventDefault();
      erstes.focus();
    }
  });

  menu.querySelectorAll<HTMLElement>("[data-mm-gruppe]").forEach((gruppe) => {
    const trigger = gruppe.querySelector<HTMLButtonElement>("[data-mm-trigger]");
    trigger?.addEventListener("click", () => {
      const offen = !gruppe.classList.contains("is-open");
      gruppe.classList.toggle("is-open", offen);
      trigger.setAttribute("aria-expanded", String(offen));
    });
  });

  window.matchMedia("(min-width: 1041px)").addEventListener("change", (e) => {
    if (e.matches && menu.classList.contains("is-open")) schliessen(false);
  });
}

export function initNavigation() {
  initDropdowns();
  initStickyHeader();
  initMobileMenu();
}

/**
 * Logo-Wechsel: „IT“ → „KI“ → „IT“ in ruhigem Takt. Alle Navbar-Logos wechseln synchron.
 * Bei reduzierter Bewegung bleibt es bei „IT“; im Hintergrund-Tab pausiert der Takt.
 */
export function initLogoWechsel() {
  const logos = Array.from(document.querySelectorAll<SVGElement>("[data-logo-wechsel]"));
  if (!logos.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ki = false;
  window.setInterval(() => {
    if (document.hidden) return;
    ki = !ki;
    logos.forEach((l) => l.classList.toggle("ist-ki", ki));
  }, 4200);
}
