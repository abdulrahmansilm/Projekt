import { z } from "zod";

/**
 * Zod-Schemas für den 5-Schritte-Kontaktformular-Flow.
 * Werden client- UND serverseitig genutzt (Frontend-Island hier, Backend spiegelt dieselbe Struktur).
 */

export const dringlichkeitOptionen = [
  { value: "dringend", label: "Dringend", icon: "🔴" },
  { value: "in_den_naechsten_tagen", label: "In den nächsten Tagen", icon: "🟡" },
  { value: "allgemeine_anfrage", label: "Allgemeine Anfrage", icon: "🟢" },
] as const;

export const mitarbeiterOptionen = [
  { value: "1-10", label: "1–10" },
  { value: "11-25", label: "11–25" },
  { value: "26-50", label: "26–50" },
  { value: "51-100", label: "51–100" },
  { value: "ueber-100", label: "über 100" },
] as const;

const dringlichkeit = z.enum(["dringend", "in_den_naechsten_tagen", "allgemeine_anfrage"]);
const mitarbeiterGroesse = z.enum(["1-10", "11-25", "26-50", "51-100", "ueber-100"]);

export const schrittAnliegen = z.object({
  leistungSlug: z.string().min(1, "Bitte wählen Sie eine Leistung aus."),
});

export const schrittDetails = z.object({
  dringlichkeit,
  kurzthema: z
    .string()
    .min(3, "Bitte beschreiben Sie kurz, worum es geht.")
    .max(120, "Bitte kürzer fassen (max. 120 Zeichen)."),
  mitarbeiterAnzahl: mitarbeiterGroesse,
});

export const schrittBeschreibung = z.object({
  beschreibung: z
    .string()
    .min(10, "Bitte beschreiben Sie Ihr Anliegen etwas ausführlicher.")
    .max(4000, "Bitte kürzer fassen (max. 4000 Zeichen)."),
});

export const erlaubteDateiTypen = ["image/jpeg", "image/png", "application/pdf"] as const;
export const maxDateiGroesseBytes = 5 * 1024 * 1024;
export const maxDateiAnzahl = 3;

export function validiereDatei(file: { type: string; size: number }): string | null {
  if (!erlaubteDateiTypen.includes(file.type as (typeof erlaubteDateiTypen)[number])) {
    return "Nur JPG, PNG oder PDF sind erlaubt.";
  }
  if (file.size > maxDateiGroesseBytes) {
    return "Die Datei darf maximal 5 MB groß sein.";
  }
  return null;
}

export const schrittKontakt = z.object({
  vorname: z.string().min(1, "Bitte geben Sie Ihren Vornamen an."),
  nachname: z.string().min(1, "Bitte geben Sie Ihren Nachnamen an."),
  unternehmen: z.string().min(1, "Bitte geben Sie Ihr Unternehmen an."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  telefon: z.string().optional(),
});

export const schrittAbschluss = z.object({
  weg: z.enum(["anfrage_senden", "termin_buchen"]),
  terminSlot: z.string().optional(),
});

/** Vollständiges Schema, wie es beim finalen Absenden geprüft wird (client- und serverseitig). */
export const kontaktFormularSchema = schrittAnliegen
  .extend(schrittDetails.shape)
  .extend(schrittBeschreibung.shape)
  .extend(schrittKontakt.shape)
  .extend(schrittAbschluss.shape)
  .extend({
    // Honeypot: muss leer bleiben. aria-hidden + tabindex="-1" im Markup, siehe ContactForm-Island.
    website: z.string().max(0).optional(),
    formularGeladenUm: z.number(),
  });

export type KontaktFormular = z.infer<typeof kontaktFormularSchema>;
export type Dringlichkeit = z.infer<typeof dringlichkeit>;
export type MitarbeiterGroesse = z.infer<typeof mitarbeiterGroesse>;
