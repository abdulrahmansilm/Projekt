/**
 * Prüft nach dem Build, ob auf den englischen Seiten (dist/en/) noch deutscher Text steht
 * (Anforderung Runde 8: komplette Website zusätzlich auf Englisch).
 *
 * Hintergrund: Fehlt ein Eintrag in src/i18n/en.json, zeigt t() bzw. lokalisiere() den deutschen
 * Ausgangstext an. Der Build läuft dann trotzdem durch – dieser Check meldet es sofort.
 * Geprüft werden sichtbarer Text und alle Attribute, die Text für Menschen enthalten
 * (alt, title, aria-label, placeholder, Meta-Beschreibungen, data-*-Texte für Skripte).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = process.argv[2] ?? join("dist", "en");

/** Eigennamen und bewusst deutsche Stellen (Adresse, Kundenname, Sprachumschalter, Verweis auf die verbindliche Fassung) */
const ERLAUBT = [
  "Jugend braucht Arbeit e.V.",
  "Westendstraße",
  "Frankfurt am Main",
  "Deutsch",
  "Selim-IT",
  "Gustav-Stresemann-Ring",
  "Der Hessische Beauftragte für Datenschutz und Informationsfreiheit",
  "Datenschutz-Grundverordnung",
  "Umsatzsteuer-Identifikationsnummer",
  "Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz",
  "Einzelunternehmen",
  "GoBD",
];

/** typische deutsche Wörter; Umlaute und ß zählen ebenfalls als Treffer */
const DEUTSCH = /[äöüÄÖÜß]|\b(und|oder|der|die|das|den|dem|des|ein|eine|einen|für|mit|nicht|wir|Sie|Ihr|Ihre|Ihren|Ihrem|ist|sind|auf|bei|zum|zur|auch|werden|wird|über|nach|vom|beim|noch|schon|jetzt|mehr|alle|Uhr|Seite|Anfrage|Beratung|Leistungen)\b/;

function htmlDateien(verzeichnis) {
  const treffer = [];
  for (const eintrag of readdirSync(verzeichnis)) {
    const pfad = join(verzeichnis, eintrag);
    if (statSync(pfad).isDirectory()) treffer.push(...htmlDateien(pfad));
    else if (eintrag.endsWith(".html")) treffer.push(pfad);
  }
  return treffer;
}

const entities = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");

function texte(html) {
  const funde = [];
  // Attribute mit menschenlesbarem Text
  for (const m of html.matchAll(/\s(alt|title|aria-label|placeholder|content|data-[\w-]+)="([^"]*)"/g)) {
    const [, attr, wert] = m;
    if (attr === "content" && !/[a-z]{3,}\s[a-z]{2,}/i.test(wert)) continue; // viewport, Farben, URLs …
    if (attr.startsWith("data-") && !/[A-Za-z]{3,}\s[A-Za-z]{2,}/.test(entities(wert))) continue;
    funde.push({ ort: attr, text: entities(wert) });
  }
  // sichtbarer Text: Skripte, Styles und JSON-LD entfernen, dann Tags auflösen
  const koerper = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  for (const m of koerper.matchAll(/>([^<]+)</g)) {
    const text = entities(m[1]).trim();
    if (text) funde.push({ ort: "text", text });
  }
  return funde;
}

const seiten = htmlDateien(DIST);
if (!seiten.length) {
  console.error("i18n-Prüfung: keine HTML-Dateien in dist/en/ gefunden. Wurde gebaut?");
  process.exit(1);
}

const probleme = [];
for (const seite of seiten) {
  const gesehen = new Set();
  for (const { ort, text } of texte(readFileSync(seite, "utf8"))) {
    let rest = text;
    for (const e of ERLAUBT) rest = rest.replaceAll(e, " ");
    if (!DEUTSCH.test(rest) || gesehen.has(text)) continue;
    gesehen.add(text);
    probleme.push(`  ${seite} [${ort}]: ${text.slice(0, 110).replace(/\s+/g, " ")}`);
  }
}

if (probleme.length) {
  console.error(`\ni18n-Prüfung fehlgeschlagen: ${probleme.length} vermutlich deutsche Texte auf englischen Seiten.`);
  console.error("Übersetzung in src/i18n/en.json ergänzen (bzw. Eigennamen oben in ERLAUBT aufnehmen):\n");
  console.error(probleme.join("\n"));
  process.exit(1);
}

console.log(`i18n-Prüfung: keine deutschen Texte auf ${seiten.length} englischen Seiten gefunden.`);
