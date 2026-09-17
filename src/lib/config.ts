/**
 * Firmendaten und Navigation – abgeleitet aus docs/BRANCHE.md (einzige inhaltliche Datenquelle).
 * Änderungen an Firmendaten/Navigation zuerst in docs/BRANCHE.md, dann hier übernehmen.
 * Offene Platzhalter (PLZ, Telefon, E-Mail, USt-IdNr.) sind als `platzhalter: true` markiert
 * und werden im Frontend sichtbar als Platzhalter gekennzeichnet. Vor Go-Live ergänzen.
 */

export const SITE_URL = "https://selim-it.de";

export const firma = {
  name: "Selim-IT",
  inhaber: "Ahmad Mahio Silm",
  rechtsform: "Einzelunternehmen",
  domain: "selim-it.de",
  gruendungsjahr: 2026,
  claim: "Betrieb, Sicherheit und Digitalisierung, alles aus einer Hand betreut.",
  adresse: {
    strasse: "Westendstraße 100",
    plz: { wert: "00000", platzhalter: true },
    stadt: "Frankfurt am Main",
    land: "DE",
  },
  telefon: {
    anzeige: "0000 000000",
    href: "tel:+490000000000",
    platzhalter: true,
  },
  email: {
    adresse: "info@selim-it.de",
    platzhalter: true,
  },
  ustIdNr: {
    wert: "USt-IdNr. folgt",
    platzhalter: true,
  },
  einsatzgebiet: "Rhein-Main-Gebiet vor Ort, bundesweit remote",
  supportZeiten: "Mo–Fr 8–18 Uhr",
} as const;

export const aufsichtsbehoerde = {
  name: "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit (HBDI)",
  adresse: "Postfach 3163, 65021 Wiesbaden",
} as const;

export type NavLeistung = {
  slug: string;
  label: string;
  kurz?: string;
  bald?: boolean;
};

export type NavKategorie = {
  id: "it-infrastruktur" | "ki-kommunikation" | "webseiten" | "unternehmen";
  label: string;
  /** Kategorie ohne Unterpunkte → direkter Link */
  href?: string;
  eintraege: NavLeistung[];
};

/** Finale 4-Kategorien-Navbar (docs/ANFORDERUNGEN.md → Sitemap / Navigation, bestätigt 10.09.2026) */
export const navigation: NavKategorie[] = [
  {
    id: "it-infrastruktur",
    label: "IT & Infrastruktur",
    eintraege: [
      { slug: "it-betreuung", label: "IT-Betreuung", kurz: "Laufende Betreuung Ihrer Unternehmens-IT" },
      { slug: "server-betreuung", label: "Server-Betreuung", kurz: "Überwachung und Wartung Ihrer Server" },
      { slug: "fernzugriff-vpn", label: "Fernzugriff / VPN", kurz: "Verschlüsselter Zugriff von überall" },
      { slug: "hardware-beschaffung", label: "Hardware-Beschaffung", kurz: "Arbeitsplätze, fertig eingerichtet" },
      { slug: "microsoft-365", label: "Microsoft 365", kurz: "Einrichtung, Absicherung, Betreuung" },
      { slug: "datensicherung", label: "Datensicherung", kurz: "Backups mit geprüfter Wiederherstellung" },
      { slug: "email-sicherheit", label: "E-Mail-Sicherheit", kurz: "Schutz vor Phishing und Schadsoftware" },
    ],
  },
  {
    id: "ki-kommunikation",
    label: "KI & Kommunikation",
    eintraege: [
      { slug: "ki-telefonassistent", label: "KI-Telefonassistent", kurz: "Jeder Anruf wird angenommen" },
      { slug: "whatsapp-chatbot", label: "WhatsApp-Chatbot", kurz: "Anfragen sofort beantwortet" },
      { slug: "prozessautomatisierung", label: "Prozessautomatisierung", kurz: "Abläufe ohne Abtippen" },
      { slug: "ki-email-assistent", label: "KI-E-Mail-Assistent", bald: true },
      { slug: "webchat", label: "Webchat", bald: true },
      { slug: "telefonanlage-pbx", label: "Telefonanlage/PBX", bald: true },
    ],
  },
  {
    id: "webseiten",
    label: "Webseiten",
    href: "/leistungen/webseiten",
    eintraege: [],
  },
  {
    id: "unternehmen",
    label: "Unternehmen",
    eintraege: [
      { slug: "/ueber-uns", label: "Über uns", kurz: "Wer hinter Selim-IT steht" },
      { slug: "/wissen", label: "Wissen", kurz: "Fachartikel ohne Fachjargon" },
    ],
  },
];

export function leistungHref(slug: string): string {
  return slug.startsWith("/") ? slug : `/leistungen/${slug}`;
}

export const rechtsLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Barrierefreiheit", href: "/barrierefreiheit" },
] as const;

/** Anker der CTA-/Kontaktformular-Sektion (Startseite, Leistungsseiten, Über uns, Kontakt); sonst verlinkt der Header auf /kontakt */
export const KONTAKT_ANKER = "#kontakt";
