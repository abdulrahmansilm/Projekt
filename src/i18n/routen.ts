/**
 * Pfad-Zuordnung Deutsch ↔ Englisch (Runde 8). Deutsche Pfade sind die Identität einer Seite;
 * englische Seiten tragen englische Slugs unter /en/. Collection-Ids bleiben in beiden Sprachen gleich.
 */
type Sprache = "de" | "en";

const SEITEN_EN: Record<string, string> = {
  "/": "/en/",
  "/ueber-uns": "/en/about",
  "/leitbild": "/en/mission",
  "/wissen": "/en/insights",
  "/impressum": "/en/legal-notice",
  "/datenschutz": "/en/privacy",
  "/404": "/en/404",
};

export const LEISTUNG_SLUG_EN: Record<string, string> = {
  "it-betreuung": "managed-it",
  "server-betreuung": "server-management",
  "hardware-beschaffung": "hardware-procurement",
  "microsoft-365": "microsoft-365",
  datensicherung: "data-backup",
  "email-sicherheit": "email-security",
  "fernzugriff-vpn": "remote-access-vpn",
  "ki-telefonassistent": "ai-phone-assistant",
  "whatsapp-chatbot": "whatsapp-chatbot",
  prozessautomatisierung: "process-automation",
  webseiten: "web-development",
};

export const ARTIKEL_SLUG_EN: Record<string, string> = {
  "bueroablaeufe-automatisieren": "automating-office-workflows",
  "datensicherung-3-2-1-regel": "3-2-1-backup-rule",
  "firmenwebseite-kosten": "business-website-cost",
  "it-betreuung-kosten": "managed-it-cost",
  "ki-auffindbarkeit-geo": "ai-search-visibility-geo",
  "ki-telefonassistent": "ai-phone-assistant",
  "managed-service-provider": "managed-service-provider",
  "microsoft-365-plaene-vergleich": "microsoft-365-plans-compared",
  "nis2-betroffene-unternehmen": "nis2-who-is-affected",
  "phishing-erkennen": "how-to-spot-phishing",
  "seo-fuer-unternehmen-heute": "seo-for-businesses-today",
  "vpn-im-unternehmen": "business-vpn",
};

const ANKER_EN: Record<string, string> = { kontakt: "contact" };

const umkehren = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));
const SEITEN_DE = umkehren(SEITEN_EN);
const LEISTUNG_DE = umkehren(LEISTUNG_SLUG_EN);
const ARTIKEL_DE = umkehren(ARTIKEL_SLUG_EN);
const ANKER_DE = umkehren(ANKER_EN);

export const leistungIdVonEnSlug = (slug: string) => LEISTUNG_DE[slug];
export const artikelIdVonEnSlug = (slug: string) => ARTIKEL_DE[slug];

function teile(p: string) {
  const i = p.indexOf("#");
  return i < 0 ? { basis: p, anker: "" } : { basis: p.slice(0, i), anker: p.slice(i + 1) };
}

/** Deutscher Pfad (auch „#kontakt“ oder „/#kontakt“) → Pfad in der Zielsprache */
export function pfadIn(dePfad: string, lang: Sprache): string {
  if (lang === "de" || /^(https?:|mailto:|tel:)/.test(dePfad)) return dePfad;
  const { basis, anker } = teile(dePfad);
  const ankerEn = anker ? `#${ANKER_EN[anker] ?? anker}` : "";
  if (!basis) return ankerEn;

  const b = basis.length > 1 ? basis.replace(/\/$/, "") : basis;
  let ziel: string;
  if (SEITEN_EN[b]) ziel = SEITEN_EN[b];
  else if (b.startsWith("/leistungen/")) {
    const slug = b.slice("/leistungen/".length);
    ziel = `/en/services/${LEISTUNG_SLUG_EN[slug] ?? slug}`;
  } else if (b.startsWith("/wissen/")) {
    const slug = b.slice("/wissen/".length);
    ziel = `/en/insights/${ARTIKEL_SLUG_EN[slug] ?? slug}`;
  } else ziel = b.startsWith("/en") ? b : `/en${b}`;
  return ziel + ankerEn;
}

/** Englischer Pfad → deutscher Pfad (für den Sprachumschalter und hreflang) */
export function dePfadVon(pfad: string): string {
  const { basis, anker } = teile(pfad);
  const ankerDe = anker ? `#${ANKER_DE[anker] ?? anker}` : "";
  const b = basis.length > 1 ? basis.replace(/\/$/, "") : basis;
  if (!(b === "/en" || b.startsWith("/en/"))) return pfad;
  if (b === "/en") return "/" + ankerDe;
  if (SEITEN_DE[b] ?? SEITEN_DE[`${b}/`]) return (SEITEN_DE[b] ?? SEITEN_DE[`${b}/`]) + ankerDe;
  if (b.startsWith("/en/services/")) {
    const slug = b.slice("/en/services/".length);
    return `/leistungen/${LEISTUNG_DE[slug] ?? slug}${ankerDe}`;
  }
  if (b.startsWith("/en/insights/")) {
    const slug = b.slice("/en/insights/".length);
    return `/wissen/${ARTIKEL_DE[slug] ?? slug}${ankerDe}`;
  }
  return b.slice(3) + ankerDe;
}
