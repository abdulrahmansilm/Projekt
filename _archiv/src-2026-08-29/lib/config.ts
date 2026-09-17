/**
 * Einzige Datenquelle für Firmendaten und Navigation.
 * Änderungen ausschließlich hier oder in docs/BRANCHE.md vornehmen, siehe CLAUDE.md Regel 1.
 * Offene Platzhalter (PLZ, Telefon, E-Mail, USt-IdNr.) vor Go-Live ergänzen, siehe docs/BRANCHE.md.
 */

export const firma = {
  name: "Selim-IT",
  inhaber: "Ahmad Mahio Silm",
  rechtsform: "Einzelunternehmen",
  domain: "selim-it.de",
  gruendungsjahr: 2026,
  adresse: {
    strasse: "Westendstraße 100",
    plz: "[PLZ fehlt]",
    stadt: "Frankfurt am Main",
    land: "Deutschland",
  },
  kontakt: {
    telefon: "[Telefonnummer fehlt]",
    telefonHref: "tel:",
    email: "[E-Mail-Adresse fehlt]",
  },
  ustIdNr: "[USt-IdNr. fehlt / Kleinunternehmerregelung § 19 UStG prüfen]",
} as const;

export type LeistungKategorie =
  | "it-managed-services"
  | "cloud-sicherheit"
  | "digitalisierung"
  | "ki-assistenten";

export const kategorien: Record<
  LeistungKategorie,
  { label: string; icon: string }
> = {
  "it-managed-services": { label: "IT & Managed Services", icon: "server" },
  "cloud-sicherheit": { label: "Cloud & Sicherheit", icon: "cloud" },
  digitalisierung: { label: "Digitalisierung", icon: "workflow" },
  "ki-assistenten": { label: "KI-Assistenten", icon: "bot" },
};

export const kategorienReihenfolge: LeistungKategorie[] = [
  "it-managed-services",
  "cloud-sicherheit",
  "digitalisierung",
  "ki-assistenten",
];

/** "Bald verfügbar"-Einträge unter KI-Assistenten: kein eigener Content, nur Navigation. */
export const kiAssistentenBaldVerfuegbar = [
  { titel: "KI-E-Mail-Assistent" },
  { titel: "Web-Chat" },
  { titel: "PBX" },
];

export const hauptNavigation = [
  { label: "Wissen", href: "/wissen" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const footerRechtsLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Barrierefreiheit", href: "/barrierefreiheit" },
] as const;

export const socialLinks: { label: string; href: string; icon: string }[] = [
  // Noch keine bestätigten Social-Media-Profile hinterlegt.
];

export const aufsichtsbehoerde = {
  name: "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)",
  adresse: "Postfach 3163, 65021 Wiesbaden",
} as const;
