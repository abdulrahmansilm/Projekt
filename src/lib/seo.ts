/**
 * JSON-LD-Bausteine (docs/ANFORDERUNGEN.md → SEO & GEO).
 * Platzhalter-Firmendaten (Telefon, PLZ) werden bewusst NICHT ausgegeben, solange sie nicht final sind.
 */
import { firma, SITE_URL } from "./config";

export const ORGANISATION_ID = `${SITE_URL}/#organisation`;

export function organisationJsonLd() {
  const adresse: Record<string, string> = {
    "@type": "PostalAddress",
    streetAddress: firma.adresse.strasse,
    addressLocality: firma.adresse.stadt,
    addressCountry: firma.adresse.land,
  };
  if (!firma.adresse.plz.platzhalter) adresse.postalCode = firma.adresse.plz.wert;

  const daten: Record<string, unknown> = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORGANISATION_ID,
    name: firma.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo-dunkel.png`,
    image: `${SITE_URL}/logo/logo-social.png`,
    foundingDate: String(firma.gruendungsjahr),
    sameAs: [firma.linkedin],
    founder: { "@type": "Person", name: firma.inhaber },
    address: adresse,
    areaServed: [
      { "@type": "Place", name: "Rhein-Main-Gebiet" },
      { "@type": "Country", name: "Deutschland" },
    ],
  };
  if (!firma.telefon.platzhalter) daten.telephone = firma.telefon.href.replace("tel:", "");
  if (!firma.email.platzhalter) daten.email = firma.email.adresse;
  return daten;
}

export function breadcrumbJsonLd(schritte: { name: string; pfad: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: schritte.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      item: `${SITE_URL}${s.pfad}`,
    })),
  };
}

export function faqJsonLd(fragen: { frage: string; antwortText: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: fragen.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwortText },
    })),
  };
}

export function serviceJsonLd(opts: { name: string; beschreibung: string; pfad: string; kategorie: string }) {
  return {
    "@type": "Service",
    name: opts.name,
    description: opts.beschreibung,
    serviceType: opts.kategorie,
    url: `${SITE_URL}${opts.pfad}`,
    provider: { "@id": ORGANISATION_ID },
    areaServed: { "@type": "Country", name: "Deutschland" },
  };
}

/** Entfernt HTML-Tags für strukturierte Daten (FAQ-Antworten enthalten teils Markup) */
export function nurText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
