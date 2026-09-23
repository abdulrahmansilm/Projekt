/**
 * Verhalten des Anfrage-Wizards (src/components/kontakt/KontaktWizard.astro).
 * Logik 1:1 nach referenz/global/cta-kontaktformular.html, ergänzt um Barrierefreiheit (Fokus, Live-Region,
 * aria-invalid), Spam-Schutz (Honeypot, Zeitstempel, Altcha) und den Versand an das FastAPI-Backend.
 */
import { pruefeKontakt, type Anfrage } from "./validation";

const API = "/api";
const GESAMT = 4;

type Slot = { start: string; label: string };

export function initKontaktWizard(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("[data-kw-form]");
  if (!form) return;

  const q = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const qa = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  const geladenUm = Date.now();
  /** Texte in der Seitensprache (Runde 8), gerendert von KontaktWizard.astro */
  const T = JSON.parse(root.dataset.texte ?? "{}") as Record<string, string>;
  const en = root.dataset.lang === "en";
  const locale = en ? "en-US" : "de-DE";
  const fuelle = (vorlage: string, werte: Record<string, string | number>) =>
    Object.entries(werte).reduce((s, [k, w]) => s.replaceAll(`{${k}}`, String(w)), vorlage);
  const live = q("[data-kw-live]");
  const weiter = q<HTMLButtonElement>("[data-kw-weiter]")!;
  const zurueck = q<HTMLButtonElement>("[data-kw-zurueck]")!;
  const nav = q("[data-kw-nav]")!;
  const panels = qa("[data-panel]");
  const fortschritt = qa("[data-kw-fortschritt] .pschritt");
  let schritt = 1;
  let gewaehlterSlot: string | null = null;
  let altchaGeladen = false;
  /** Id der bereits gesendeten Anfrage: daran wird ein später gewählter Termin gehängt */
  let anfrageId: string | null = null;
  const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ansagen = (text: string) => {
    if (!live) return;
    live.textContent = "";
    window.setTimeout(() => (live.textContent = text), 50);
  };

  // ---------------------------------------------------------------- Zustand lesen
  const themen = () => qa<HTMLInputElement>('input[name="thema"]:checked').map((i) => i.value);
  const leistungen = () => qa<HTMLInputElement>('input[name="leistung"]:checked').map((i) => i.value);
  const radio = (name: string) => q<HTMLInputElement>(`input[name="${name}"]:checked`);
  const feld = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? "";

  // ---------------------------------------------------------------- Vorauswahl von Leistungsseiten
  try {
    const vorauswahl = root.dataset.vorauswahl ? (JSON.parse(root.dataset.vorauswahl) as { thema: string }) : null;
    if (vorauswahl) {
      const input = q<HTMLInputElement>(`input[name="thema"][value="${vorauswahl.thema}"]`);
      if (input) input.checked = true;
    }
  } catch {
    /* ungültige Vorauswahl ignorieren */
  }

  // ---------------------------------------------------------------- Interessen an Schritt 1 koppeln
  /**
   * Im Schritt „Details“ stehen nur die Leistungen der Bereiche zur Wahl, die unter „Anliegen“ gewählt wurden.
   * Runde 4: Bei „Webentwicklung“ erscheinen stattdessen die Zusatzoptionen Branding und Hosting;
   * ist nur „Allgemeine Beratung“ gewählt, entfällt die Frage nach Leistungen ganz.
   */
  const interessenGruppen = qa("[data-kw-interesse]");
  const interessenBlock = q("[data-kw-interessen-block]");
  const webBlock = q("[data-kw-web-block]");
  const abwaehlen = (bereich: Element) => bereich.querySelectorAll<HTMLInputElement>('input[name="leistung"]').forEach((i) => (i.checked = false));
  function aktualisiereInteressen() {
    const gewaehlt = themen();
    let sichtbar = 0;
    for (const gruppe of interessenGruppen) {
      const an = gewaehlt.includes(gruppe.dataset.kwInteresse ?? "");
      gruppe.hidden = !an;
      if (an) sichtbar++;
      else abwaehlen(gruppe);
    }
    if (interessenBlock) interessenBlock.hidden = sichtbar === 0;
    if (webBlock) {
      webBlock.hidden = !gewaehlt.includes("webseiten");
      if (webBlock.hidden) abwaehlen(webBlock);
    }
  }
  aktualisiereInteressen();

  // ---------------------------------------------------------------- Prüfungen je Schritt
  function schritt2Fehler(): string | null {
    if (!radio("dringlichkeit")) return T.fehlerDringlichkeit;
    if (!radio("groesse")) return T.fehlerGroesse;
    return null;
  }

  function kontaktDaten() {
    return {
      vorname: feld("vorname"),
      nachname: feld("nachname"),
      unternehmen: feld("unternehmen"),
      email: feld("email"),
      telefon: feld("telefon"),
    };
  }

  function kannWeiter(): boolean {
    if (schritt === 1) return themen().length > 0;
    if (schritt === 2) return schritt2Fehler() === null;
    if (schritt === 3) return Object.keys(pruefeKontakt(kontaktDaten())).length === 0;
    return false;
  }

  function zeigeFeldfehler(anzeigen: boolean): HTMLInputElement | null {
    const fehler = pruefeKontakt(kontaktDaten());
    let erstes: HTMLInputElement | null = null;
    for (const name of ["vorname", "nachname", "email"] as const) {
      const input = q<HTMLInputElement>(`#kw-${name}`)!;
      const text = q(`#kw-${name}-fehler`)!;
      const meldung = fehler[name] ? T[`fehler${name.charAt(0).toUpperCase()}${name.slice(1)}`] : undefined;
      if (meldung && anzeigen) {
        input.setAttribute("aria-invalid", "true");
        text.textContent = meldung;
        text.hidden = false;
        erstes ??= input;
      } else if (!meldung) {
        input.removeAttribute("aria-invalid");
        text.hidden = true;
      }
    }
    return erstes;
  }

  // ---------------------------------------------------------------- Anzeige
  function aktualisiereNav() {
    weiter.setAttribute("aria-disabled", String(!kannWeiter()));
    zurueck.hidden = schritt === 1;
    weiter.hidden = schritt === GESAMT;
    fortschritt.forEach((li, i) => {
      const n = i + 1;
      const btn = li.querySelector<HTMLButtonElement>("button")!;
      li.classList.toggle("is-aktiv", n === schritt);
      li.classList.toggle("is-erledigt", n < schritt);
      btn.disabled = n >= schritt;
      if (n === schritt) btn.setAttribute("aria-current", "step");
      else btn.removeAttribute("aria-current");
    });
  }

  function baueZusammenfassung() {
    const dl = q("[data-kw-zusammenfassung]")!;
    dl.replaceChildren();
    const zeile = (k: string, v: string) => {
      if (!v) return;
      const div = document.createElement("div");
      div.className = "zeile";
      const dt = document.createElement("dt");
      dt.textContent = k;
      const dd = document.createElement("dd");
      dd.textContent = v;
      div.append(dt, dd);
      dl.append(div);
    };
    const titel = (id: string) =>
      q(`input[name="thema"][value="${id}"]`)?.closest("label")?.querySelector(".karte__titel")?.textContent?.trim() ?? id;

    zeile(T.zBereich, themen().map(titel).join(", "));
    zeile(T.zDringlichkeit, radio("dringlichkeit")?.dataset.label ?? "");
    zeile(T.zGroesse, radio("groesse")?.dataset.label ?? radio("groesse")?.value ?? "");
    zeile(T.zInteresse, qa<HTMLInputElement>('input[name="leistung"]:checked').map((i) => i.dataset.label ?? i.value).join(", "));
    zeile(T.zAnliegen, feld("nachricht"));
    const k = kontaktDaten();
    zeile(T.zKontakt, [`${k.vorname} ${k.nachname}`.trim(), k.unternehmen, k.email, k.telefon].filter(Boolean).join("\n"));
  }

  function gehe(n: number) {
    schritt = n;
    panels.forEach((p) => {
      const aktiv = Number(p.dataset.panel) === n;
      p.hidden = !aktiv;
      p.classList.toggle("is-aktiv", aktiv);
    });
    if (n === 4) {
      baueZusammenfassung();
      ladeAltcha();
    }
    aktualisiereNav();
    ansagen(fuelle(T.schrittVon, { n, gesamt: GESAMT }));

    const titel = panels[n - 1].querySelector<HTMLElement>(".panel__titel");
    titel?.focus({ preventScroll: true });
    const fort = q("[data-kw-fortschritt]")!;
    const rect = fort.getBoundingClientRect();
    if (rect.top < 80 || rect.top > window.innerHeight * 0.5) {
      fort.scrollIntoView({ behavior: reduziert ? "auto" : "smooth", block: "start" });
    }
  }

  // ---------------------------------------------------------------- Ereignisse
  form.addEventListener("change", (e) => {
    if ((e.target as HTMLInputElement)?.name === "thema") aktualisiereInteressen();
    if (schritt === 1) q('[data-kw-fehler="1"]')!.hidden = true;
    if (schritt === 2 && !q('[data-kw-fehler="2"]')!.hidden) {
      const f = schritt2Fehler();
      const el = q('[data-kw-fehler="2"]')!;
      el.hidden = f === null;
      if (f) el.textContent = f;
    }
    aktualisiereNav();
  });

  form.addEventListener("input", (e) => {
    if (schritt === 3) {
      const ziel = e.target as HTMLInputElement;
      if (ziel.getAttribute("aria-invalid") === "true") zeigeFeldfehler(false);
    }
    aktualisiereNav();
  });

  // Enter in Textfeldern soll nicht das Formular abschicken
  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT" && schritt === 3) {
      e.preventDefault();
      weiter.click();
    }
  });

  weiter.addEventListener("click", () => {
    if (schritt === 1 && !themen().length) {
      q('[data-kw-fehler="1"]')!.hidden = false;
      ansagen(T.fehlerBereich);
      return;
    }
    if (schritt === 2) {
      const f = schritt2Fehler();
      const el = q('[data-kw-fehler="2"]')!;
      if (f) {
        el.textContent = f;
        el.hidden = false;
        ansagen(f);
        return;
      }
      el.hidden = true;
    }
    if (schritt === 3) {
      const erstes = zeigeFeldfehler(true);
      if (erstes) {
        erstes.focus();
        return;
      }
    }
    if (schritt < GESAMT) gehe(schritt + 1);
  });

  zurueck.addEventListener("click", () => schritt > 1 && gehe(schritt - 1));
  qa<HTMLButtonElement>("[data-kw-sprung]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const n = Number(btn.dataset.kwSprung);
      if (n < schritt) gehe(n);
    })
  );

  // ---------------------------------------------------------------- Spam-Schutz (Altcha, self-hosted)
  async function ladeAltcha() {
    if (altchaGeladen) return;
    altchaGeladen = true;
    const container = q("[data-kw-altcha]");
    if (!container) return;
    try {
      await import("altcha");
      if (!en) await import("altcha/i18n/de");
      const widget = document.createElement("altcha-widget");
      widget.setAttribute("challenge", `${API}/altcha-challenge`);
      widget.setAttribute("name", "altcha");
      widget.setAttribute("language", en ? "en" : "de");
      widget.setAttribute("auto", "onload");
      widget.setAttribute("display", "standard");
      container.append(widget);
    } catch {
      /* ohne Widget prüft das Backend und lehnt ggf. ab; Fehlermeldung erscheint beim Senden */
    }
  }

  // ---------------------------------------------------------------- Terminbuchung (optional, nach dem Absenden)
  const terminAngebot = q("[data-kw-termin-angebot]")!;
  const terminBtn = q<HTMLButtonElement>("[data-kw-termin]")!;
  const kalender = q("[data-kw-kalender]")!;
  const slotStatus = q("[data-kw-slot-status]")!;
  const slotListe = q("[data-kw-slots]")!;
  const buchenBtn = q<HTMLButtonElement>("[data-kw-buchen]")!;
  const terminFehler = q("[data-kw-terminfehler]")!;
  let slotsGeladen = false;

  terminBtn.addEventListener("click", async () => {
    // Runde 5: von Anfang an nutzbar, auch vor dem Absenden der Anfrage (Runde-4-Sperre zurückgenommen)
    const offen = kalender.hidden;
    kalender.hidden = !offen;
    terminBtn.setAttribute("aria-expanded", String(offen));
    if (!offen) return;
    kalender.scrollIntoView({ behavior: reduziert ? "auto" : "smooth", block: "nearest" });
    if (slotsGeladen) return;
    slotsGeladen = true;
    try {
      const antwort = await fetch(`${API}/availability`, { headers: { Accept: "application/json" } });
      if (!antwort.ok) throw new Error(String(antwort.status));
      const { slots } = (await antwort.json()) as { slots: Slot[] };
      zeigeSlots(slots);
    } catch {
      slotStatus.textContent = T.terminNichtErreichbar;
    }
  });

  function zeigeSlots(slots: Slot[]) {
    if (!slots.length) {
      slotStatus.textContent = T.keineTermine;
      return;
    }
    slotStatus.textContent = fuelle(T.freieTermine, { n: slots.length });
    const nachTag = new Map<string, Slot[]>();
    for (const s of slots) {
      const tag = new Date(s.start).toLocaleDateString(locale, { weekday: "long", day: "2-digit", month: "long" });
      nachTag.set(tag, [...(nachTag.get(tag) ?? []), s]);
    }
    for (const [tag, liste] of nachTag) {
      const block = document.createElement("div");
      block.className = "tag";
      const titel = document.createElement("p");
      titel.className = "tag__titel";
      titel.textContent = tag;
      const optionen = document.createElement("div");
      optionen.className = "optionen";
      for (const s of liste) {
        const label = document.createElement("label");
        label.className = "option option--weiss";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "terminSlot";
        input.value = s.start;
        input.addEventListener("change", () => {
          gewaehlterSlot = s.start;
          buchenBtn.hidden = false;
        });
        const span = document.createElement("span");
        span.textContent = fuelle(T.uhrzeit, { zeit: new Date(s.start).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) });
        label.append(input, span);
        optionen.append(label);
      }
      block.append(titel, optionen);
      slotListe.append(block);
    }
    // Scoped-Klassen der Astro-Komponente auf dynamische Elemente übertragen
    const scope = Array.from(root.attributes).find((a) => a.name.startsWith("data-astro-cid-"));
    if (scope) slotListe.querySelectorAll("*").forEach((el) => el.setAttribute(scope.name, ""));
  }

  // ---------------------------------------------------------------- Versand
  const sendeBtn = q<HTMLButtonElement>("[data-kw-senden]")!;
  const sendeFehler = q("[data-kw-sendefehler]")!;

  async function sende() {
    if (sendeBtn.getAttribute("aria-disabled") === "true") return;
    sendeFehler.hidden = true;
    sendeBtn.setAttribute("aria-disabled", "true");
    const beschriftung = sendeBtn.querySelector("span");
    const vorher = beschriftung?.textContent ?? "";
    if (beschriftung) beschriftung.textContent = T.wirdGesendet;

    const k = kontaktDaten();
    const daten: Anfrage = {
      themen: themen(),
      dringlichkeit: (radio("dringlichkeit")?.value ?? "allgemein") as Anfrage["dringlichkeit"],
      leistungen: leistungen(),
      groesse: radio("groesse")?.value ?? "",
      nachricht: feld("nachricht") || undefined,
      vorname: k.vorname,
      nachname: k.nachname,
      unternehmen: k.unternehmen || undefined,
      email: k.email,
      telefon: k.telefon || undefined,
      weg: "anfrage",
      herkunft: location.pathname,
      website: feld("website"),
      formularGeladenUm: geladenUm,
      altcha: feld("altcha") || undefined,
    };

    try {
      const antwort = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(daten),
      });
      const json = (await antwort.json().catch(() => ({}))) as { detail?: unknown; id?: string };
      if (!antwort.ok) {
        // Fehlertexte des Backends sind deutsch; auf englischen Seiten die allgemeine Meldung zeigen
        const detail = typeof json.detail === "string" && !en ? json.detail : null;
        throw new Error(detail ?? T.nichtGesendet);
      }
      anfrageId = json.id ?? null;
      zeigeDanke();
    } catch (fehler) {
      const text =
        fehler instanceof Error && fehler.message && !fehler.message.includes("fetch")
          ? fehler.message
          : T.geradeNichtGesendet;
      sendeFehler.textContent = `${text} ${T.erneutVersuchen}`;
      sendeFehler.hidden = false;
      ansagen(sendeFehler.textContent);
    } finally {
      sendeBtn.removeAttribute("aria-disabled");
      if (beschriftung) beschriftung.textContent = vorher;
    }
  }

  /**
   * Hängt einen gewählten Termin an die Anfrage (keine zweite Anfrage). Runde 5: Der Terminkasten ist auch
   * vor dem Absenden nutzbar; wurde die Anfrage noch nicht gesendet, wird sie hier zuerst automatisch gesendet.
   */
  async function buche() {
    if (!gewaehlterSlot) return;
    if (buchenBtn.getAttribute("aria-disabled") === "true") return;
    terminFehler.hidden = true;
    buchenBtn.setAttribute("aria-disabled", "true");
    const beschriftung = buchenBtn.querySelector("span");
    const vorher = beschriftung?.textContent ?? "";
    if (beschriftung) beschriftung.textContent = T.wirdGebucht;
    try {
      if (!anfrageId) await sende();
      if (!anfrageId) throw new Error(T.nichtGesendet);
      const antwort = await fetch(`${API}/contact/${encodeURIComponent(anfrageId)}/termin`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ terminSlot: gewaehlterSlot }),
      });
      const json = (await antwort.json().catch(() => ({}))) as { detail?: unknown };
      if (!antwort.ok) {
        const detail = typeof json.detail === "string" && !en ? json.detail : null;
        throw new Error(detail ?? T.nichtGebucht);
      }
      zeigeTermin(gewaehlterSlot);
    } catch (fehler) {
      const text = fehler instanceof Error && fehler.message && !fehler.message.includes("fetch") ? fehler.message : T.geradeNichtGebucht;
      terminFehler.textContent = `${text} ${T.erneutVersuchen}`;
      terminFehler.hidden = false;
      ansagen(terminFehler.textContent);
    } finally {
      buchenBtn.removeAttribute("aria-disabled");
      if (beschriftung) beschriftung.textContent = vorher;
    }
  }

  function zeigeTermin(slot: string) {
    terminAngebot.hidden = true;
    const t = q("[data-kw-danke-termin]")!;
    t.textContent = fuelle(T.wunschtermin, { termin: new Date(slot).toLocaleString(locale, { dateStyle: "full", timeStyle: "short" }) });
    t.hidden = false;
    ansagen(t.textContent);
  }

  function zeigeDanke() {
    q("[data-kw-final]")!.hidden = true;
    nav.hidden = true;
    const danke = q("[data-kw-danke]")!;
    danke.hidden = false;
    fortschritt.forEach((li) => {
      li.classList.remove("is-aktiv");
      li.classList.add("is-erledigt");
      li.querySelector("button")!.disabled = true;
    });
    danke.querySelector<HTMLElement>("h3")?.focus();
    ansagen(T.danke);
  }

  sendeBtn.addEventListener("click", () => sende());
  buchenBtn.addEventListener("click", () => buche());

  aktualisiereNav();
}
