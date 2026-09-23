/**
 * Zweisprachigkeit (Runde 8): Deutsch ist die Ausgangssprache, Englisch liegt unter /en/ mit englischen Slugs.
 *
 * - Texte: `t("Deutscher Text")` liefert auf englischen Seiten die Übersetzung aus src/i18n/en.json,
 *   auf deutschen Seiten den Text selbst. Platzhalter in geschweiften Klammern werden ersetzt:
 *   t("Alles aus {paket}, außerdem:", { paket: "Solo" }).
 * - Content-JSON: `lokalisiere(daten, lang)` übersetzt alle Textfelder über dasselbe Wörterbuch und
 *   stellt interne Links auf die englischen Pfade um. Preise, Icons und Struktur bleiben dadurch
 *   einmalig im deutschen Content – eine Preisänderung gilt automatisch für beide Sprachen.
 * - Fehlt eine Übersetzung, erscheint der deutsche Text. `npm run i18n:pruefen` (läuft nach jedem Build)
 *   durchsucht die englischen Seiten nach deutschem Text und bricht den Build dann ab.
 */
import en from "./en.json";
import { pfadIn } from "./routen";

export type Sprache = "de" | "en";
export { pfadIn, dePfadVon, LEISTUNG_SLUG_EN, ARTIKEL_SLUG_EN, leistungIdVonEnSlug, artikelIdVonEnSlug } from "./routen";

const WOERTERBUCH = en as Record<string, string>;

export function spracheAus(pfad: string): Sprache {
  return pfad === "/en" || pfad.startsWith("/en/") ? "en" : "de";
}

/** Sprache der gerade gerenderten Seite (in jeder .astro-Komponente nutzbar) */
export function sprache(astro: { url: URL }): Sprache {
  return spracheAus(astro.url.pathname);
}

export function uebersetze(text: string, lang: Sprache, werte?: Record<string, string | number>): string {
  let s = lang === "en" ? (WOERTERBUCH[text] ?? text) : text;
  if (werte) for (const [k, v] of Object.entries(werte)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

export type Uebersetzer = ((text: string, werte?: Record<string, string | number>) => string) & {
  lang: Sprache;
  /** Deutscher Pfad → Pfad in der aktuellen Sprache */
  pfad: (dePfad: string) => string;
};

/** `const t = uebersetzer(Astro);` → t("…"), t.lang, t.pfad("/leistungen/…") */
export function uebersetzer(astro: { url: URL }): Uebersetzer {
  const lang = sprache(astro);
  const t = ((text: string, werte?: Record<string, string | number>) => uebersetze(text, lang, werte)) as Uebersetzer;
  t.lang = lang;
  t.pfad = (dePfad: string) => pfadIn(dePfad, lang);
  return t;
}

/**
 * Felder, die keine sichtbaren Texte enthalten (Ids, Enums, Markup, Dateipfade) oder deren Wert ans Backend
 * geht (groessen, stufe) – deren Anzeige übersetzt die Komponente selbst per t().
 */
const OHNE_TEXT = new Set([
  "icon", "piktogramm", "typ", "variante", "bild", "pos", "preisFeld", "kategorie", "thema", "option",
  "wissenArtikel", "slug", "artikel", "id", "stufe", "groessen", "logos",
]);
/** Felder mit internen Links */
const LINK_FELDER = new Set(["href", "link"]);

export function lokalisiere<T>(daten: T, lang: Sprache): T {
  if (lang === "de") return daten;
  const lauf = (wert: unknown, feld?: string): unknown => {
    if (typeof wert === "string") {
      if (feld && LINK_FELDER.has(feld) && wert.startsWith("/")) return pfadIn(wert, lang);
      if (feld && OHNE_TEXT.has(feld)) return wert;
      // "feld:Text" erlaubt eine abweichende Übersetzung je Feld (z. B. mehrzahl:Server → servers)
      const uebersetzt = (feld && WOERTERBUCH[`${feld}:${wert}`]) ?? WOERTERBUCH[wert];
      if (uebersetzt !== undefined) return uebersetzt;
      return /[A-Za-zÄÖÜäöüß]/.test(wert) ? wert : zahlenformatEn(wert);
    }
    if (Array.isArray(wert)) return wert.map((w) => lauf(w, feld));
    if (wert && typeof wert === "object" && !(wert instanceof Date)) {
      return Object.fromEntries(Object.entries(wert).map(([k, v]) => [k, lauf(v, k)]));
    }
    return wert;
  };
  return lauf(daten) as T;
}

/**
 * Reine Zahlenangaben aus dem Content ("18.000–27.000 €", "87 %", "6.000+") ins englische Format:
 * Tausender- und Dezimaltrenner tauschen, € vor die Zahl, Prozent ohne Leerzeichen.
 */
function zahlenformatEn(s: string): string {
  return s
    .replace(/\d[\d.,]*\d|\d/g, (n) => n.replace(/[.,]/g, (z) => (z === "." ? "," : ".")))
    .replace(/([\d.,]+(?:\s?[–-]\s?[\d.,]+)?)\s?€/g, "€$1")
    .replace(/(\d)\s%/g, "$1%");
}

/** 1.290 € (de) bzw. €1,290 (en) */
export function euro(n: number, lang: Sprache): string {
  return lang === "en"
    ? `€${Math.round(n).toLocaleString("en-US")}`
    : `${Math.round(n).toLocaleString("de-DE")} €`;
}

export function zahl(n: number, lang: Sprache): string {
  return n.toLocaleString(lang === "en" ? "en-US" : "de-DE");
}

export function datum(d: Date, lang: Sprache, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  return d.toLocaleDateString(lang === "en" ? "en-US" : "de-DE", opts);
}

/** Anker der Kontakt-Sektion; auf englischen Seiten #contact */
export function kontaktAnker(lang: Sprache): string {
  return lang === "en" ? "#contact" : "#kontakt";
}
