/**
 * Zod-Schemas für den Anfrage-Wizard (docs/ANFORDERUNGEN.md → Kontaktformular).
 * Clientseitig (zod/mini, kleines Bundle) und als Vertrag für das FastAPI-Backend (backend/app/schemas.py spiegelt die Struktur).
 * Serverseitig wird immer erneut validiert.
 */
import * as z from "zod/mini";

export const DRINGLICHKEIT = ["dringend", "bald", "allgemein"] as const;

export const kontaktSchema = z.object({
  vorname: z.string().check(z.trim(), z.minLength(1, "Bitte geben Sie Ihren Vornamen an."), z.maxLength(100)),
  nachname: z.string().check(z.trim(), z.minLength(1, "Bitte geben Sie Ihren Nachnamen an."), z.maxLength(100)),
  unternehmen: z.optional(z.string().check(z.maxLength(200))),
  email: z.string().check(z.trim(), z.email("Bitte geben Sie eine gültige E-Mail-Adresse an.")),
  telefon: z.optional(z.string().check(z.maxLength(40))),
});

export const anfrageSchema = z.object({
  themen: z.array(z.string()).check(z.minLength(1, "Bitte wählen Sie mindestens einen Bereich.")),
  leistungen: z.array(z.string()),
  dringlichkeit: z.enum(DRINGLICHKEIT),
  groesse: z.string().check(z.minLength(1)),
  // Runde 4: Pflichtfeld
  nachricht: z.string().check(z.trim(), z.minLength(1, "Bitte beschreiben Sie Ihr Anliegen kurz."), z.maxLength(4000)),
  ...kontaktSchema.shape,
  weg: z.enum(["anfrage", "termin"]),
  terminSlot: z.optional(z.string()),
  herkunft: z.string(),
  website: z.string(),
  formularGeladenUm: z.number(),
  altcha: z.optional(z.string()),
});

export type Anfrage = z.infer<typeof anfrageSchema>;

export type Feldfehler = Partial<Record<keyof z.infer<typeof kontaktSchema>, string>>;

export function pruefeKontakt(daten: Record<string, string>): Feldfehler {
  const ergebnis = z.safeParse(kontaktSchema, daten);
  if (ergebnis.success) return {};
  const fehler: Feldfehler = {};
  for (const issue of ergebnis.error.issues) {
    const feld = issue.path[0] as keyof Feldfehler;
    if (!fehler[feld]) fehler[feld] = issue.message;
  }
  return fehler;
}
