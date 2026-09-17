import {
  schrittAnliegen,
  schrittDetails,
  schrittBeschreibung,
  schrittKontakt,
  kontaktFormularSchema,
  validiereDatei,
  maxDateiAnzahl,
  type KontaktFormular,
} from "./validation";

const SCHRITT_NAMEN = ["Anliegen", "Details", "Beschreibung", "Kontakt", "Termin"];
const GESAMT_SCHRITTE = 5;

export function initKontaktFormular(): void {
  const form = document.getElementById("kontakt-formular") as HTMLFormElement | null;
  if (!form) return;

  let aktuellerSchritt = 1;
  let ausgewaehlterWeg: "anfrage_senden" | "termin_buchen" | null = null;
  let ausgewaehlterSlot: string | null = null;
  const akzeptierteDateien: File[] = [];

  const formularGeladenUm = form.querySelector<HTMLInputElement>("#formularGeladenUm");
  if (formularGeladenUm) formularGeladenUm.value = String(Date.now());

  // Leistung aus Query-Param vorausfüllen (Aufruf von einer Leistungsseite aus).
  const params = new URLSearchParams(window.location.search);
  const vorausgefuellt = params.get("leistung");
  if (vorausgefuellt) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="leistungSlugRadio"][value="${CSS.escape(vorausgefuellt)}"]`);
    if (radio) radio.checked = true;
  }

  function feldWert(name: string): string {
    const el = form!.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);
    return el?.value.trim() ?? "";
  }

  function radioWert(name: string): string {
    const el = form!.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    return el?.value ?? "";
  }

  function zeigeFehler(feldId: string, nachricht: string) {
    const el = document.getElementById(feldId);
    if (el) {
      el.textContent = nachricht;
      el.classList.remove("hidden");
    }
  }

  function versteckeAlleFehler(scope: HTMLElement) {
    scope.querySelectorAll<HTMLElement>('[id^="fehler-"]').forEach((el) => {
      el.classList.add("hidden");
      el.textContent = "";
    });
  }

  function aktuellerSchrittEl(): HTMLElement {
    return form!.querySelector<HTMLElement>(`.formular-schritt[data-schritt="${aktuellerSchritt}"]`)!;
  }

  function aktualisiereFortschritt() {
    document.querySelectorAll<HTMLElement>("[data-fortschritt-schritt]").forEach((li) => {
      const n = Number(li.dataset.fortschrittSchritt);
      const kreis = li.querySelector<HTMLElement>(".fortschritt-kreis");
      if (!kreis) return;
      if (n < aktuellerSchritt) kreis.dataset.status = "erledigt";
      else if (n === aktuellerSchritt) kreis.dataset.status = "aktiv";
      else kreis.dataset.status = "offen";
    });
    const status = document.getElementById("fortschritt-status");
    if (status) status.textContent = `Schritt ${aktuellerSchritt} von ${GESAMT_SCHRITTE}: ${SCHRITT_NAMEN[aktuellerSchritt - 1]}`;
  }

  function zeigeSchritt(neu: number) {
    aktuellerSchrittEl().classList.add("hidden");
    aktuellerSchritt = neu;
    const el = aktuellerSchrittEl();
    el.classList.remove("hidden");
    aktualisiereFortschritt();

    const btnZurueck = document.getElementById("btn-zurueck");
    const btnWeiter = document.getElementById("btn-weiter");
    const btnAbsenden = document.getElementById("btn-absenden");
    btnZurueck?.classList.toggle("hidden", aktuellerSchritt === 1);
    btnWeiter?.classList.toggle("hidden", aktuellerSchritt === GESAMT_SCHRITTE);
    btnAbsenden?.classList.toggle("hidden", aktuellerSchritt !== GESAMT_SCHRITTE);

    const heading = el.querySelector<HTMLElement>("h2");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus();

    if (aktuellerSchritt === GESAMT_SCHRITTE) aktualisiereZusammenfassung();
  }

  function validiereSchritt(): boolean {
    const el = aktuellerSchrittEl();
    versteckeAlleFehler(el);

    if (aktuellerSchritt === 1) {
      const ergebnis = schrittAnliegen.safeParse({ leistungSlug: radioWert("leistungSlugRadio") });
      if (!ergebnis.success) {
        zeigeFehler("fehler-schritt-1", ergebnis.error.issues[0]?.message ?? "Bitte wählen Sie eine Leistung aus.");
        return false;
      }
      return true;
    }

    if (aktuellerSchritt === 2) {
      const ergebnis = schrittDetails.safeParse({
        dringlichkeit: radioWert("dringlichkeit"),
        kurzthema: feldWert("kurzthema"),
        mitarbeiterAnzahl: radioWert("mitarbeiterAnzahl"),
      });
      if (!ergebnis.success) {
        for (const issue of ergebnis.error.issues) {
          if (issue.path[0] === "kurzthema") zeigeFehler("fehler-kurzthema", issue.message);
          else zeigeFehler("fehler-schritt-2", issue.message);
        }
        return false;
      }
      return true;
    }

    if (aktuellerSchritt === 3) {
      const ergebnis = schrittBeschreibung.safeParse({ beschreibung: feldWert("beschreibung") });
      if (!ergebnis.success) {
        zeigeFehler("fehler-beschreibung", ergebnis.error.issues[0]?.message ?? "Bitte beschreiben Sie Ihr Anliegen.");
        return false;
      }
      return true;
    }

    if (aktuellerSchritt === 4) {
      const ergebnis = schrittKontakt.safeParse({
        vorname: feldWert("vorname"),
        nachname: feldWert("nachname"),
        unternehmen: feldWert("unternehmen"),
        email: feldWert("email"),
        telefon: feldWert("telefon") || undefined,
      });
      if (!ergebnis.success) {
        for (const issue of ergebnis.error.issues) {
          const feld = String(issue.path[0]);
          zeigeFehler(`fehler-${feld}`, issue.message);
        }
        return false;
      }
      return true;
    }

    return true;
  }

  document.getElementById("btn-weiter")?.addEventListener("click", () => {
    if (!validiereSchritt()) return;
    if (aktuellerSchritt < GESAMT_SCHRITTE) zeigeSchritt(aktuellerSchritt + 1);
  });

  document.getElementById("btn-zurueck")?.addEventListener("click", () => {
    if (aktuellerSchritt > 1) zeigeSchritt(aktuellerSchritt - 1);
  });

  // Leistungskarten: Klick auf Karte wählt automatisch das Radio (Label deckt das ab), zusätzlich weiter bei Doppelklick nicht nötig.

  // Datei-Upload
  const dateiInput = document.getElementById("dateien") as HTMLInputElement | null;
  const dateiListe = document.getElementById("datei-liste");

  function renderDateiListe() {
    if (!dateiListe) return;
    dateiListe.innerHTML = "";
    akzeptierteDateien.forEach((datei, index) => {
      const li = document.createElement("li");
      li.className = "border-bg-dark/15 flex items-center justify-between gap-3 border p-2 text-sm";
      const groesseKb = Math.round(datei.size / 1024);
      li.innerHTML = `<span>${datei.name} (${groesseKb} KB)</span>`;
      const entfernenBtn = document.createElement("button");
      entfernenBtn.type = "button";
      entfernenBtn.className = "text-accent-start text-xs font-semibold";
      entfernenBtn.textContent = "Entfernen";
      entfernenBtn.setAttribute("aria-label", `${datei.name} entfernen`);
      entfernenBtn.addEventListener("click", () => {
        akzeptierteDateien.splice(index, 1);
        renderDateiListe();
      });
      li.appendChild(entfernenBtn);
      dateiListe.appendChild(li);
    });
  }

  dateiInput?.addEventListener("change", () => {
    const fehlerEl = document.getElementById("fehler-dateien");
    if (fehlerEl) {
      fehlerEl.classList.add("hidden");
      fehlerEl.textContent = "";
    }
    const neueDateien = Array.from(dateiInput.files ?? []);
    for (const datei of neueDateien) {
      if (akzeptierteDateien.length >= maxDateiAnzahl) {
        zeigeFehler("fehler-dateien", `Maximal ${maxDateiAnzahl} Dateien möglich.`);
        break;
      }
      const fehler = validiereDatei(datei);
      if (fehler) {
        zeigeFehler("fehler-dateien", `${datei.name}: ${fehler}`);
        continue;
      }
      akzeptierteDateien.push(datei);
    }
    dateiInput.value = "";
    renderDateiListe();
  });

  // Schritt 5: Weg wählen
  const wegButtons = document.querySelectorAll<HTMLButtonElement>(".weg-option");
  const terminAuswahl = document.getElementById("termin-auswahl");
  const btnAbsenden = document.getElementById("btn-absenden");
  let slotsGeladen = false;

  wegButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      ausgewaehlterWeg = btn.dataset.weg as "anfrage_senden" | "termin_buchen";
      wegButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      terminAuswahl?.classList.toggle("hidden", ausgewaehlterWeg !== "termin_buchen");
      if (btnAbsenden) btnAbsenden.textContent = ausgewaehlterWeg === "termin_buchen" ? "Termin buchen" : "Anfrage senden";
      if (ausgewaehlterWeg === "termin_buchen" && !slotsGeladen) {
        slotsGeladen = true;
        ladeVerfuegbareTermine();
      }
    });
  });

  async function ladeVerfuegbareTermine() {
    const container = document.getElementById("termin-slots");
    if (!container) return;
    try {
      const res = await fetch("/api/availability");
      if (!res.ok) throw new Error("Antwort nicht ok");
      const daten: { slots: { start: string; label: string }[] } = await res.json();
      if (!daten.slots || daten.slots.length === 0) {
        container.innerHTML = `<p class="text-bg-dark/68 col-span-full text-sm">Aktuell keine freien Termine. Bitte nutzen Sie „Anfrage senden“ oder rufen Sie uns an.</p>`;
        return;
      }
      container.innerHTML = "";
      daten.slots.forEach((slot) => {
        const label = document.createElement("label");
        label.className =
          "termin-karte border-bg-dark/15 has-checked:border-accent-start has-checked:bg-accent-start/5 flex cursor-pointer items-center justify-center border p-2 text-center text-xs";
        label.innerHTML = `<input type="radio" name="terminSlot" value="${slot.start}" class="sr-only" />${slot.label}`;
        label.querySelector("input")?.addEventListener("change", () => {
          ausgewaehlterSlot = slot.start;
        });
        container.appendChild(label);
      });
    } catch {
      container.innerHTML = `<p class="text-bg-dark/68 col-span-full text-sm">Terminbuchung ist aktuell nicht erreichbar. Bitte nutzen Sie „Anfrage senden“ oder rufen Sie uns direkt an.</p>`;
    }
  }

  function aktualisiereZusammenfassung() {
    const zsf = document.getElementById("zusammenfassung");
    zsf?.classList.remove("hidden");
    const leistung = form!.querySelector<HTMLInputElement>('input[name="leistungSlugRadio"]:checked');
    const leistungLabel = leistung?.closest("label")?.textContent?.trim() ?? "–";
    const groesse = radioWert("mitarbeiterAnzahl") || "–";
    const anliegen = feldWert("kurzthema") || "–";
    const bereichEl = document.getElementById("zsf-bereich");
    const groesseEl = document.getElementById("zsf-groesse");
    const anliegenEl = document.getElementById("zsf-anliegen");
    if (bereichEl) bereichEl.textContent = leistungLabel;
    if (groesseEl) groesseEl.textContent = groesse;
    if (anliegenEl) anliegenEl.textContent = anliegen;
  }

  // Absenden
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fehlerBox = document.getElementById("formular-fehler");
    fehlerBox?.classList.add("hidden");

    if (!ausgewaehlterWeg) {
      zeigeFehler("formular-fehler", "Bitte wählen Sie, wie Sie fortfahren möchten.");
      fehlerBox?.classList.remove("hidden");
      return;
    }
    if (ausgewaehlterWeg === "termin_buchen" && !ausgewaehlterSlot) {
      zeigeFehler("fehler-termin", "Bitte wählen Sie einen Termin aus.");
      document.getElementById("fehler-termin")?.classList.remove("hidden");
      return;
    }

    const daten: KontaktFormular = {
      leistungSlug: radioWert("leistungSlugRadio"),
      dringlichkeit: radioWert("dringlichkeit") as KontaktFormular["dringlichkeit"],
      kurzthema: feldWert("kurzthema"),
      mitarbeiterAnzahl: radioWert("mitarbeiterAnzahl") as KontaktFormular["mitarbeiterAnzahl"],
      beschreibung: feldWert("beschreibung"),
      vorname: feldWert("vorname"),
      nachname: feldWert("nachname"),
      unternehmen: feldWert("unternehmen"),
      email: feldWert("email"),
      telefon: feldWert("telefon") || undefined,
      weg: ausgewaehlterWeg,
      terminSlot: ausgewaehlterSlot ?? undefined,
      website: feldWert("website"),
      formularGeladenUm: Number(feldWert("formularGeladenUm")),
    };

    const validierung = kontaktFormularSchema.safeParse(daten);
    if (!validierung.success) {
      zeigeFehler("formular-fehler", "Bitte prüfen Sie Ihre Angaben. " + (validierung.error.issues[0]?.message ?? ""));
      fehlerBox?.classList.remove("hidden");
      return;
    }

    // Altcha-Prüfsumme mitsenden, falls Widget gelöst wurde.
    const altchaInput = document.querySelector<HTMLInputElement>('input[name="altcha"]');

    const formData = new FormData();
    Object.entries(daten).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value));
    });
    if (altchaInput?.value) formData.append("altcha", altchaInput.value);
    akzeptierteDateien.forEach((datei) => formData.append("dateien", datei));

    const endpunkt = ausgewaehlterWeg === "termin_buchen" ? "/api/contact/booking" : "/api/contact";

    const absendenBtn = document.getElementById("btn-absenden") as HTMLButtonElement | null;
    if (absendenBtn) absendenBtn.disabled = true;

    try {
      const res = await fetch(endpunkt, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Server hat die Anfrage abgelehnt.");
      form.classList.add("hidden");
      document.querySelector('nav[aria-label="Fortschritt im Kontaktformular"]')?.parentElement?.classList.add("hidden");
      document.getElementById("formular-erfolg")?.classList.remove("hidden");
      const status = document.getElementById("formular-status");
      if (status) status.textContent = "Ihre Anfrage wurde erfolgreich gesendet.";
    } catch {
      zeigeFehler(
        "formular-fehler",
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an."
      );
      fehlerBox?.classList.remove("hidden");
      if (absendenBtn) absendenBtn.disabled = false;
    }
  });

  aktualisiereFortschritt();
}
