/**
 * llms.txt (docs/ANFORDERUNGEN.md → SEO): strukturierte Übersicht für KI-Suchsysteme.
 * Kategorien und Reihenfolge folgen der finalen 4-Kategorien-Navigation (src/lib/config.ts).
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL, firma, navigation, leistungHref } from "../lib/config";

export const GET: APIRoute = async () => {
  const leistungen = await getCollection("leistungen");
  const artikel = (await getCollection("wissen")).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
  const z: string[] = [];

  z.push(`# ${firma.name}`, "");
  z.push(
    `> IT-Dienstleister aus ${firma.adresse.stadt} für kleine und mittelständische Unternehmen: IT-Betreuung, Server, VPN, Hardware, Microsoft 365, Datensicherung, E-Mail-Sicherheit, KI-Telefonassistent, WhatsApp-Chatbot, Automatisierung und Webseiten. ${firma.einsatzgebiet}. Planbare Kosten, fester Ansprechpartner, eigene Infrastruktur in Deutschland.`,
    ""
  );

  for (const kat of navigation.filter((k) => k.id !== "unternehmen")) {
    z.push(`## ${kat.label}`);
    for (const e of kat.eintraege) {
      if (e.bald) {
        z.push(`- ${e.label} (bald verfügbar)`);
        continue;
      }
      const l = leistungen.find((x) => x.id === e.slug);
      z.push(`- [${e.label}](${SITE_URL}${leistungHref(e.slug)})${l ? `: ${l.data.kurz}` : ""}`);
    }
    if (kat.href && kat.eintraege.length === 0) {
      const l = leistungen.find((x) => x.id === "webseiten");
      z.push(`- [${kat.label}](${SITE_URL}${kat.href})${l ? `: ${l.data.kurz}` : ""}`);
    }
    z.push("");
  }

  z.push("## Wissen");
  for (const a of artikel) z.push(`- [${a.data.titel}](${SITE_URL}/wissen/${a.id}): ${a.data.teaser}`);
  z.push("");

  z.push("## Unternehmen");
  z.push(`- [Über uns](${SITE_URL}/ueber-uns): Wer wir sind und wie wir arbeiten.`);
  z.push(`- [Kontakt](${SITE_URL}/kontakt): Anfrage senden oder kostenloses Erstgespräch buchen.`);
  z.push(`- [Impressum](${SITE_URL}/impressum)`);
  z.push(`- [Datenschutz](${SITE_URL}/datenschutz)`);
  z.push(`- [Erklärung zur Barrierefreiheit](${SITE_URL}/barrierefreiheit)`);

  return new Response(z.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
