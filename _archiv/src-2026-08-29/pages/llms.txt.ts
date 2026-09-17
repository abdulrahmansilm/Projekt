import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { firma, kategorien, kategorienReihenfolge } from "../lib/config";

export const GET: APIRoute = async () => {
  const alleLeistungen = await getCollection("leistungen");
  const siteUrl = "https://selim-it.de";

  const zeilen: string[] = [];
  zeilen.push(`# ${firma.name}`);
  zeilen.push("");
  zeilen.push(
    `> IT-Dienstleister in ${firma.adresse.stadt}: IT-Betreuung, Managed Services, Cloud & Sicherheit, Digitalisierung und KI-Assistenten (KI-Telefonassistent, WhatsApp-Chatbot) für Unternehmen. Planbare Kosten, fester Ansprechpartner, self-hosted in Deutschland.`
  );
  zeilen.push("");

  for (const kat of kategorienReihenfolge) {
    zeilen.push(`## ${kategorien[kat].label}`);
    const leistungen = alleLeistungen
      .filter((l) => l.data.kategorie === kat)
      .sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
    for (const l of leistungen) {
      zeilen.push(`- [${l.data.titel}](${siteUrl}/leistungen/${l.id}): ${l.data.kurz}`);
    }
    zeilen.push("");
  }

  zeilen.push("## Weitere Seiten");
  zeilen.push(`- [Wissen](${siteUrl}/wissen): Fachartikel zu IT-Sicherheit, Backup und Microsoft 365.`);
  zeilen.push(`- [Kontakt](${siteUrl}/kontakt): Anfrage senden oder kostenloses Erstgespräch buchen.`);

  return new Response(zeilen.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
