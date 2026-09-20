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
  linkedin: "https://www.linkedin.com/company/selim-it",
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
      { slug: "prozessautomatisierung", label: "Automatisierung", kurz: "Abläufe ohne Abtippen" },
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

/**
 * Einfache Piktogramme für das Navbar-Dropdown und das mobile Menü (24×24, Strich = currentColor).
 * Schlüssel = Slug der Leistung bzw. Pfad der Unternehmensseiten.
 */
export const NAV_ICONS: Record<string, string> = {
  "it-betreuung": '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  "server-betreuung": '<rect x="3" y="4" width="18" height="7" rx="1.6"/><rect x="3" y="13" width="18" height="7" rx="1.6"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  "fernzugriff-vpn": '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  "hardware-beschaffung": '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 2.5v3.5M14.5 2.5v3.5M9.5 18v3.5M14.5 18v3.5M2.5 9.5H6M2.5 14.5H6M18 9.5h3.5M18 14.5h3.5"/>',
  "microsoft-365": '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5"/><rect x="13" y="13" width="7.5" height="7.5" rx="1.5"/>',
  datensicherung: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  "email-sicherheit": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>',
  "ki-telefonassistent": '<path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.8.9.6 0 1 .5 1 1.1v3.6c0 .6-.5 1.1-1.1 1.1C10.9 21.7 2.3 13.1 2.3 3.9c0-.6.5-1.1 1.1-1.1H7c.6 0 1.1.4 1.1 1 .1 1.3.4 2.6.9 3.8.1.4.1.8-.2 1.1L6.6 10.8Z"/>',
  "whatsapp-chatbot": '<path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v8.5a1.5 1.5 0 0 1-1.5 1.5H10l-5 4v-4H4a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 4 5.5Z"/>',
  prozessautomatisierung: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>',
  "/ueber-uns": '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5c0-3.3 2.5-5.6 5.5-5.6s5.5 2.3 5.5 5.6"/><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.2c1.9.7 3 2.5 3 5.3"/>',
  "/wissen": '<path d="M4 5.5c2.8-1 5.4-.6 8 1.2 2.6-1.8 5.2-2.2 8-1.2v13c-2.8-1-5.4-.6-8 1.2-2.6-1.8-5.2-2.2-8-1.2v-13Z"/><path d="M12 6.7v13"/>',
};
