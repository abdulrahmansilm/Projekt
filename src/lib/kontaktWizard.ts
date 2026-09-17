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
  const live = q("[data-kw-live]");
  const weiter = q<HTMLButtonElement>("[data-kw-weiter]")!;
  const zurueck = q<HTMLButtonElement>("[data-kw-zurueck]")!;
  const nav = q("[data-kw-nav]")!;
  const panels = qa("[data-panel]");
  const fortschritt = qa("[data-kw-fortschritt] .pschritt");
  let schritt = 1;
  let gewaehlterSlot: string | null = null;
  let altchaGeladen = false;
  const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ansagen = (text: string) => {
    if (!live) return;
    live.textContent = "";
    window.setTimeout(() => (live.textContent = text), 50);
  };

  // ---------------------------------------------------------------- Zustand lesen
  const themen = () => qa<HTMLInputElement>('input[name="thema"]:checked').map((i) => i.value);
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

  // ---------------------------------------------------------------- Prüfungen je Schritt
  function schritt2Fehler(): string | null {
    if (!radio("dringlichkeit")) return "Bitte geben Sie an, wie dringend Ihr Anliegen ist.";
    if (!radio("groesse")) return "Bitte wählen Sie die Anzahl der Mitarbeitenden bzw. IT-Arbeitsplätze.";
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
      const meldung = fehler[name];
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

    zeile("Bereich", themen().map(titel).join(", "));
    zeile("Dringlichkeit", radio("dringlichkeit")?.dataset.label ?? "");
    zeile("Unternehmensgröße", radio("groesse")?.value ?? "");
    zeile("Ihr Anliegen", feld("nachricht"));
    const k = kontaktDaten();
    zeile("Kontakt", [`${k.vorname} ${k.nachname}`.trim(), k.unternehmen, k.email, k.telefon].filter(Boolean).join("\n"));
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
    ansagen(`Schritt ${n} von ${GESAMT}`);

    const titel = panels[n - 1].querySelector<HTMLElement>(".panel__titel");
    titel?.focus({ preventScroll: true });
    const fort = q("[data-kw-fortschritt]")!;
    const rect = fort.getBoundingClientRect();
    if (rect.top < 80 || rect.top > window.innerHeight * 0.5) {
      fort.scrollIntoView({ behavior: reduziert ? "auto" : "smooth", block: "start" });
    }
  }

  // ---------------------------------------------------------------- Ereignisse
  form.addEventListener("change", () => {
    if (schritt === 2) {
      q("[data-kw-dringend]")!.hidden = radio("dringlichkeit")?.value !== "dringend";
    }
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
      ansagen("Bitte wählen Sie mindestens einen Bereich aus.");
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
      await import("altcha/i18n/de");
      const widget = document.createElement("altcha-widget");
      widget.setAttribute("challenge", `${API}/altcha-challenge`);
      widget.setAttribute("name", "altcha");
      widget.setAttribute("language", "de");
      widget.setAttribute("auto", "onload");
      widget.setAttribute("display", "standard");
      container.append(widget);
    } catch {
      /* ohne Widget prüft das Backend und lehnt ggf. ab; Fehlermeldung erscheint beim Senden */
    }
  }

  // ---------------------------------------------------------------- Terminbuchung
  const terminBtn = q<HTMLButtonElement>("[data-kw-termin]")!;
  const kalender = q("[data-kw-kalender]")!;
  const slotStatus = q("[data-kw-slot-status]")!;
  const slotListe = q("[data-kw-slots]")!;
  const buchenBtn = q<HTMLButtonElement>("[data-kw-buchen]")!;
  let slotsGeladen = false;

  terminBtn.addEventListener("click", async () => {
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
      slotStatus.textContent =
        "Die Terminauswahl ist gerade nicht erreichbar. Senden Sie Ihre Anfrage einfach ab, wir schlagen Ihnen passende Termine vor.";
    }
  });

  function zeigeSlots(slots: Slot[]) {
    if (!slots.length) {
      slotStatus.textContent = "Aktuell sind keine freien Termine verfügbar. Senden Sie Ihre Anfrage, wir melden uns mit Vorschlägen.";
      return;
    }
    slotStatus.textContent = `${slots.length} freie Termine`;
    const nachTag = new Map<string, Slot[]>();
    for (const s of slots) {
      const tag = new Date(s.start).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long" });
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
        span.textContent = new Date(s.start).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) + " Uhr";
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

  async function sende(weg: Anfrage["weg"]) {
    const knopf = weg === "termin" ? buchenBtn : sendeBtn;
    if (knopf.getAttribute("aria-disabled") === "true") return;
    sendeFehler.hidden = true;
    knopf.setAttribute("aria-disabled", "true");
    const beschriftung = knopf.querySelector("span");
    const vorher = beschriftung?.textContent ?? "";
    if (beschriftung) beschriftung.textContent = "Wird gesendet …";

    const k = kontaktDaten();
    const daten: Anfrage = {
      themen: themen(),
      dringlichkeit: (radio("dringlichkeit")?.value ?? "allgemein") as Anfrage["dringlichkeit"],
      groesse: radio("groesse")?.value ?? "",
      nachricht: feld("nachricht") || undefined,
      vorname: k.vorname,
      nachname: k.nachname,
      unternehmen: k.unternehmen || undefined,
      email: k.email,
      telefon: k.telefon || undefined,
      weg,
      terminSlot: weg === "termin" ? (gewaehlterSlot ?? undefined) : undefined,
      herkunft: location.pathname,
      website: feld("website"),
      formularGeladenUm: geladenUm,
      altcha: feld("altcha") || undefined,
    };

    try {
      const antwort = await fetch(`${API}/${weg === "termin" ? "contact/booking" : "contact"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(daten),
      });
      const json = (await antwort.json().catch(() => ({}))) as { detail?: unknown; nextcloud_talk_url?: string };
      if (!antwort.ok) {
        const detail = typeof json.detail === "string" ? json.detail : null;
        throw new Error(detail ?? "Die Anfrage konnte nicht gesendet werden.");
      }
      zeigeDanke(weg === "termin" ? gewaehlterSlot : null);
    } catch (fehler) {
      const text =
        fehler instanceof Error && fehler.message && !fehler.message.includes("fetch")
          ? fehler.message
          : "Die Anfrage konnte gerade nicht gesendet werden.";
      sendeFehler.textContent = `${text} Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.`;
      sendeFehler.hidden = false;
      ansagen(sendeFehler.textContent);
    } finally {
      knopf.removeAttribute("aria-disabled");
      if (beschriftung) beschriftung.textContent = vorher;
    }
  }

  function zeigeDanke(slot: string | null) {
    q("[data-kw-final]")!.hidden = true;
    nav.hidden = true;
    const danke = q("[data-kw-danke]")!;
    danke.hidden = false;
    if (slot) {
      const t = q("[data-kw-danke-termin]")!;
      t.textContent = `Ihr Wunschtermin: ${new Date(slot).toLocaleString("de-DE", { dateStyle: "full", timeStyle: "short" })} Uhr. Die Bestätigung mit dem Video-Link erhalten Sie per E-Mail.`;
      t.hidden = false;
    }
    fortschritt.forEach((li) => {
      li.classList.remove("is-aktiv");
      li.classList.add("is-erledigt");
      li.querySelector("button")!.disabled = true;
    });
    danke.querySelector<HTMLElement>("h3")?.focus();
    ansagen("Vielen Dank, Ihre Anfrage wurde gesendet.");
  }

  sendeBtn.addEventListener("click", () => sende("anfrage"));
  buchenBtn.addEventListener("click", () => sende("termin"));

  aktualisiereNav();
}
