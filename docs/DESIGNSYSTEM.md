# Design-System: Selim-IT Website

> Definiert die visuelle Sprache der selim-it.de-Website. Ziel: professionell, technisch kompetent, vertrauenswürdig – **kein AI-Look**, aber auch kein Handwerks-Look. Selim-IT ist ein IT-Dienstleister; die Seite darf moderner/technischer wirken als eine Handwerker-Landingpage, bleibt aber ebenso frei von generischem SaaS-Einheitsbrei.

---

## Design-Philosophie

- **IT-Kompetenz statt Startup-Klischee.** Klare, technisch wirkende Gestaltung (Monospace für Zahlen/Daten, präzise Raster), keine verspielte Lila-Gradient-SaaS-Optik.
- **Vertrauen vor Wow.** Neue Firma ohne Kundenstimmen – Vertrauen entsteht über Klarheit, Substanz (Feature-Details, echte Zahlen) und ein konsistentes, durchdachtes Design, nicht über Effekthascherei.
- **Deutsch, sachlich, direkt.** Sie-Form, keine übertriebene Lockerheit, keine KI-Floskeln (siehe `CLAUDE.md` → Anti-Vibe-Coding-Regeln).

### Das Anti-Vibe-Coding-Manifest

| ❌ Vibe-Coding-Look | ✅ Unser Ansatz |
|---|---|
| `rounded-2xl`/`rounded-3xl` auf allem | Bewusster Mix: kantige Cards, Pill-Buttons, Footer oben stark gerundet/unten eckig |
| Beliebiges Lila/Violet als Akzent | Nur die 4 Kernfarben (siehe Farbpalette) |
| Reine Solid-Color-Buttons ohne Konzept | Verlauf-Gradient gezielt für CTAs/Akzente, sonst solide Farben |
| `shadow-2xl` auf jeder Card | Kein Shadow oder max. `shadow-sm`, Border statt Shadow, gezielter Türkis-Glow (15–20% Opacity) nur bei Premium-Hervorhebung |
| Identische Card-Höhe überall | Bewusst unterschiedliche Layouts je Sektion: Grid, Split, Full-Width, invertierte Karten |
| Inter/Poppins überall | Space Grotesk (Headlines) + Outfit (Fließtext) |
| Übertriebener Whitespace | Straffe Abstände: `py-16 md:py-20`, `gap-6 md:gap-8` |
| Emojis in Headlines | Lucide-Icons, dezent, in Kernfarben. Ausnahme: Länder-/Themen-Badges dürfen ein einzelnes Flaggen-/Symbol-Emoji als Marker führen (z. B. „🇩🇪 Gespeichert in Deutschland"), wenn es Teil eines vom Nutzer bestätigten Badge-Musters ist |
| Hero mit riesigem Farbverlauf-Overlay ohne Zweck | Hero mit klarem Layout, Zitat-Block/Audio/Chat-Mockup als inhaltlicher Blickfang statt Deko-Gradient |

---

## Farbpalette (verbindlich, final bestätigt)

| Token | Hex | Name | Verwendung |
|---|---|---|---|
| `background` | `#F0F4F3` | Nebel | Standard-Hintergrund (hell) |
| `background-dark` | `#0B2E3C` | Tiefsee | NavBar, Footer, invertierte Karten, besondere Sections |
| `accent-start` | `#1B6E7A` | Petrol | Verlauf-Start |
| `accent-end` | `#4FB8A6` | Türkis | Verlauf-Ende |
| `accent-light` | `#7FD9C4` | Helltürkis | **5. Akzentfarbe (final bestätigt):** helle Akzente auf dunklem Grund (`#0B2E3C`), wo mehr Leuchtkraft/Kontrast als der Standard-Verlauf gewünscht ist – z. B. Icon-Strichfarbe (Komponente „Ihre Vorteile") und Spalten-Überschriften im Footer. Kein Ersatz für den Standard-Verlauf, sondern zusätzliche, gezielt eingesetzte Akzentfarbe. |

**Verlauf (verbindlich, gilt für ALLE Vorkommen im gesamten Projekt):** `linear-gradient(135deg, #4FB8A6 0%, #1B6E7A 100%)` – Start Türkis, Ende Petrol, 135°. Verwendung: Buttons, Badges, Akzent-Elemente, Logo-Mark, Text-Gradient (`background-clip: text`) für hervorgehobene Wörter/Kennzahlen. **Richtung ist absichtlich Türkis → Petrol** (nicht umgekehrt) – bei jeder neuen Komponente und jedem bestehenden Snippet in dieser Reihenfolge verwenden.

**Opacity-Regeln (keine zusätzlichen Farben, nur die 4 Kernfarben mit reduzierter Deckkraft):**
- Sekundärtext (Fußnoten, ergänzende Hinweise): 68 % Opacity der jeweiligen Textfarbe
- Rahmen: 8–25 % Opacity
- Schatten/Glow (nur bei Premium-Hervorhebung): 15–20 % Opacity, Türkis

**Text-auf-Hintergrund-Farblogik (verbindlich, aus offizieller Visuelle-Identität-Vorgabe):**
| Fläche | Headline | Flow-Text |
|---|---|---|
| `#F0F4F3` (hell) | `#0B2E3C` | `#0B2E3C` |
| `#0B2E3C` (dunkel) | `#FFFFFF` (voll deckend) | `#F0F4F3` (voll deckend) |

Die 68%-Opacity-Regel gilt **nur** für Sekundärtext, nicht für normale Headlines/Flow-Text auf dunklem Grund.

```css
:root {
  --color-bg: #F0F4F3;
  --color-bg-dark: #0B2E3C;
  --color-accent-start: #1B6E7A;
  --color-accent-end: #4FB8A6;
  --gradient-primary: linear-gradient(135deg, var(--color-accent-end) 0%, var(--color-accent-start) 100%); /* Türkis → Petrol */
}

@theme inline {
  --color-bg: var(--color-bg);
  --color-bg-dark: var(--color-bg-dark);
  --color-accent-start: var(--color-accent-start);
  --color-accent-end: var(--color-accent-end);
  --font-headline: var(--font-headline);
  --font-body: var(--font-body);
}
```

> ⚠️ **Kontrast-Check (a11y, Pflicht):** `#0B2E3C` auf `#F0F4F3` und `#FFFFFF`/`#F0F4F3` auf `#0B2E3C` sind beide sehr hoher Kontrast (deutlich > 4,5:1) – unkritisch. Türkis `#4FB8A6` **nie** als Fließtextfarbe auf hellem Grund verwenden (zu geringer Kontrast) – nur als Verlauf-Bestandteil, Icon-Akzent auf dunklem Grund, oder Slider-Element. Details: `docs/BARRIEREFREIHEIT.md`.

---

## Typografie

- **Headline:** Space Grotesk, Medium, self-hosted als WOFF2 (`public/fonts/`), `font-display: swap`.
- **Flow-Text:** Outfit, Regular, self-hosted als WOFF2.
- **Schlagwort/Akzent-Elemente** (Badges, Kategorie-Tags, hervorgehobene Begriffe): Space Grotesk, Medium, entweder mit Verlauf eingefärbt (`background-clip: text`) oder auf Verlauf-Hintergrund mit dunklem Text `#0B2E3C` (Badge-Muster, siehe unten).
- **Monospace** (Zahlen, Kennzahlen, Tabellen-Kopfzeilen, ROI-Rechner-Ergebnis): systemweiter Mono-Stack oder ein self-hosted Mono-Font, konsistent mit dem „technischen" Grundcharakter der Marke.

> ⚠️ **DSGVO-Pflicht:** Fonts ausschließlich self-hosted über lokale WOFF2-Dateien. Niemals `fonts.googleapis.com`, Fontshare-CDN oder ähnliche externe Font-Requests.

### Typografie-Skala

```
h1 / Hero:       text-4xl md:text-5xl lg:text-6xl, Space Grotesk Medium, tracking-tight, leading-[1.1]
h2 / Sektion:    text-3xl md:text-4xl, Space Grotesk Medium, tracking-tight
h3 / Card-Titel: text-xl md:text-2xl, Space Grotesk Medium
h4 / Sub-Titel:  text-lg, Outfit Medium
Body:            text-base, Outfit Regular, leading-relaxed
Small/Fußnote:   text-sm, Outfit Regular, 68% Opacity
Kennzahl/Mono:   Space Grotesk oder Mono, sehr groß (text-5xl+), oft mit Verlauf-Text
```

---

## Logo

Wortmarke „Selim IT": Ligatur aus „l" (Abstrich biegt zu einer „u"-Form) und „i" (i-Punkt = Verlauf-Punkt Petrol→Türkis, leicht versetzt über dem Bogen), „IT" in kleinerer Großschrift daneben.

- **Dunkle Variante** (auf `#F0F4F3`-Flächen): Wortmarke `#0B2E3C`, Verlauf-Punkt farbig.
- **Helle Variante** (auf `#0B2E3C`-Flächen, z. B. Footer/NavBar): Wortmarke `#FFFFFF`, Verlauf-Punkt farbig.
- **Icon/Logo-Mark** (Favicon, App-Icon, kompakte Platzierungen): isolierte „li"-Ligatur (Bogen + Verlauf-Punkt), quadratisch, gleiche Hell-/Dunkel-Logik.

Asset-Dateien liegen im Projekt unter `public/logo/` (aus den vom Nutzer gelieferten PNG/SVG-Quellen, gepflegt in Cowork).

---

## Button-Spezifikation (final, verbindlich)

- **Form:** vollständig abgerundet (Pill-Shape)
- **Größe:** 16px, Semibold
- **Farbe (Verlauf-Hintergrund-CTA, Standardfall):** Text `#FFFFFF` (weiß) – gilt für **alle** primären CTA-Buttons mit Verlauf-Hintergrund.
- **Badges/Schlagwort-Pills** (z. B. „BELIEBT", „ALLES INKLUSIVE", Kategorie-Tags): eigenes, separates Muster – Verlauf-Hintergrund mit **dunklem** Text `#0B2E3C`, Pill-Form, Großbuchstaben. Badge und Button sind bewusst unterschiedliche Textfarb-Konventionen, nicht verwechseln.
- **Sekundär-/Ghost-Button** (z. B. „Mehr zur IT-Betreuung"): kein Verlauf, dezenter Text/Underline in Petrol `#1B6E7A`, keine primäre Aufmerksamkeit.

### Hover-Glanz (verbindlich, global — alle primären CTA-Buttons)

Jeder primäre CTA-Button mit Verlauf-Hintergrund ("Jetzt anfragen", "Beratung anfragen", "Anfragen", "Kostenloses Erstgespräch" usw., site-weit, unabhängig von Leistungsseite) bekommt beim Hover einen diagonalen Glanz-Streifen, der einmal über den Button läuft — kein Loop, kein wiederholter Sweep. Referenzimplementierung `claude/components/button-hover-glanz.html`.

- Technik: `::after`-Pseudo-Element, `position:absolute`, 55% Breite, 100% Höhe, `linear-gradient(75deg, transparent 0%, transparent 35%, rgba(255,255,255,0.7) 50%, transparent 65%, transparent 100%)`. Button selbst braucht `position:relative`, `overflow:hidden` (für das Clipping am Pill-Rand) und `isolation:isolate`.
- Ruhezustand: `transform:translateX(-220%)` (komplett links außerhalb des Buttons, unsichtbar).
- Hover: `transform:translateX(220%)` über `700ms` mit der verbindlichen Custom-Ease-Out-Kurve `cubic-bezier(0.23, 1, 0.32, 1)` (siehe „Animationen" unten) — der Streifen läuft einmal diagonal über den Button und verlässt ihn rechts.
- Beim Verlassen des Hovers: Transition-Dauer auf `0ms` zurücksetzen (sofortiger Reset auf die Ausgangsposition), damit kein rückwärtslaufender Streifen erscheint, wenn die Maus den Button erneut betritt.
- **Pflicht:** Hover-Glanz nur unter `@media (hover: hover) and (pointer: fine)` — auf Touch-Geräten löst ein Tap sonst fälschlich den Hover-Zustand aus.
- Zusätzlich zum Glanz: Button-Press-Feedback `transform:scale(0.97)` auf `:active` (siehe „Animationen" unten, gilt für alle Buttons/Badges, nicht nur den CTA-Glanz).
- `prefers-reduced-motion: reduce`: der Bewegungs-Sweep wird deaktiviert (Streifen bleibt an Ausgangsposition), der Hover-Schatten (`box-shadow`) als reines Farb-/Kontrast-Signal bleibt erlaubt bestehen.
- Sekundär-/Ghost-Buttons (kein Verlauf-Hintergrund) bekommen **keinen** Glanz-Effekt — nur die primären Verlauf-CTAs.

---

## Border-Radius-Strategie

Kein einheitlicher Radius:

```
Buttons/CTAs:     rounded-full (Pill)
Badges:           rounded-full (Pill)
Standard-Cards:   rounded-none oder rounded-sm (kantig)
Footer-Card:      obere Ecken stark gerundet, untere Ecken eckig
Input-Felder:     rounded-md
Avatare/Icons:    rounded-full nur wo funktional (Icon-Container optional quadratisch mit rounded-md)
```

## Shadow-Strategie

- Standard-Cards: kein Shadow, Border in reduzierter Opacity (8–25 %).
- Premium-/hervorgehobene Karten: feiner Türkis-Glow (15–20 % Opacity) statt generischem `shadow-2xl`.
- Header beim Scrollen: einziger stärkerer Schatten erlaubt, dezent.

---

## Komponenten-Bibliothek (verbindlich, wiederverwendet über alle Leistungsseiten)

### 1. Pricing-Card (3-Tier)

Visuelle Hierarchie, verwendet bei IT-Betreuung, Server-Betreuung, KI-Telefonassistent, WhatsApp-Chatbot, Webseiten:

- **Neutral (Einstieg):** heller Hintergrund `#F0F4F3`, dünner Rahmen, keine Hervorhebung.
- **Badge-Hervorhebung (mittleres Paket):** Badge oben mittig (z. B. „BELIEBT"/„Empfohlen"), Pill-Form, Verlauf-Hintergrund + dunkler Text, Karte leicht größer/skaliert oder mit 2px-Verlauf-Rahmen.
- **Invertiert (Premium):** Badge „ALLES INKLUSIVE" o. ä., Hintergrund invertiert zu `#0B2E3C`, heller Text, Checkmarks in Türkis, feiner Türkis-Glow um die Karte – deutlichster Kontrast der drei Karten.

Struktur pro Karte: Paketname (Space Grotesk Medium) → Claim/Tagline → Preis (Grundpreis groß + Zusatz klein darunter, z. B. „+ X €/Gerät/Monat") → Feature-Liste (Checkmark in Verlauf-Farbe; fehlende Features als „–" ausgegraut anzeigen, **nie weglassen**) → optionaler Text-Wert-Block für graduelle Merkmale (z. B. Support-Kanal, Reaktionszeit) → CTA-Button (Verlauf, weißer Text, Pill).

Layout: 3 Karten nebeneinander (Desktop), mittlere hervorgehoben; mobil gestapelt.

**Interaktive Referenzimplementierung (verbindliches Grundmuster für alle Pricing-Seiten mit Paketen):** `claude/components/pricing-it-betreuung.html` im Cowork-Projekt – ergänzt die reine Karten-Optik um: einen Monatlich/Jährlich-Umschalter (Pill-Toggle mit gleitendem Verlauf-Thumb, −10 % bei jährlicher Zahlweise, Spar-Hinweis-Badge darunter), eine gemeinsame „Grundsicherung“-Chip-Leiste oberhalb der Karten (zeigt die allen Paketen gemeinsamen Leistungen als Icon-Chips, damit die Karten selbst nur noch die Unterschiede zeigen müssen), Karten mit Hover-Effekt (Schatten + leichtes Anheben), eine „Alles aus X, außerdem:“-Darstellung für die höherwertigen Pakete (statt alle Features je Karte zu wiederholen) und eine ausklappbare Vergleichstabelle (`<details>`) unterhalb der Karten mit allen Merkmalen aller Pakete nebeneinander. Ersetzt die frühere statische 3-Spalten-Tabelle.

Weitere Umsetzungen nach demselben Grundmuster, jeweils mit leistungsspezifischen Erweiterungen:
- **Server-Betreuung:** `claude/components/pricing-server-betreuung.html` – zusätzlich eine „Zusatzleistung“-Sektion unterhalb der Vergleichstabelle mit einer Add-on-Karte („Server-Backup“, Icon im Deutschland-Flaggen-Verlauf).
- **KI-Telefonassistent:** `claude/components/pricing-ki-telefonassistent.html` – abweichende Ausprägung: eigene, gestrichelt umrandete „Einrichtung & Onboarding“-Karte (Einmalig-Badge) oberhalb der 3 Pakete statt einer Chip-Leiste, „Inkludiert“- und „Features“-Abschnitt getrennt je Karte, Info-Tooltip-Icons an einzelnen Merkmalen, mehrgruppige Vergleichstabelle (4 Abschnitte statt einer einzelnen Tabelle) und ein Preis-Disclaimer („netto, zzgl. gesetzlicher MwSt.“) unterhalb der Karten.
- **WhatsApp-Chatbot:** `claude/components/pricing-whatsapp-chatbot.html` – gleiches Muster wie KI-Telefonassistent (Einrichtung & Onboarding-Karte, Monatlich/Jährlich-Toggle direkt darunter über den 3 Karten, „Inkludiert“/„Features“ getrennt, „Alles in X“-Verweis, Preis-Disclaimer), jedoch **ohne** ausklappbare Gesamt-Vergleichstabelle – die 3 Karten stehen für sich.
- **Webseiten:** `claude/components/pricing-webseiten.html` – näher am Grundmuster von IT-Betreuung/Server-Betreuung (Chip-Leiste statt Einrichtung-Karte), aber **ohne** Monatlich/Jährlich-Toggle, da alle 3 Pakete Festpreise (einmalig) sind statt laufender Monatspreise. Zusätzlich eine „Zusatzleistungen“-Sektion mit 2 Add-on-Karten (Hosting-Paket, Branding).

### 2. Add-on-Card

Für Zusatzleistungen ohne sichtbaren Preis (z. B. Backup-Einrichtung, Postfach-Schutzschild): Badge oben (Pill, Verlauf + dunkler Text, z. B. „🇩🇪 Gespeichert in Deutschland"), Headline, Claim in Verlauf-Text, Checkmark- oder Feature-Liste, optional ein herausgehobener Block mit `#0B2E3C`-Hintergrund/hellem Text für eine Kernaussage, CTA „Jetzt anfragen" (Verlauf, weißer Text), **kein Preis sichtbar**.

### 3. "Ohne X / Mit X"-Vergleichs-Card

2-spaltig, eine gemeinsame Card (Desktop; mobil gestapelt): linke Spalte neutral/hell mit rotbraunem Punkt-Marker + „–"-Symbolen, rechte Spalte positiv hervorgehoben (gedämpfter Petrol-Ton) mit grünem Punkt-Marker + Checkmarks in Petrol/Verlauf, gepunktete Trennlinien zwischen den Punkten.

### 4. Kennzahl-/Statistik-Callout

Große Zahl in Space Grotesk mit Verlauf-Text (`background-clip: text`), kleine Erklärung darunter. Karten im Wechsel hell/dunkel. Für Statistik-Sektionen (z. B. E-Mail-Sicherheit) und für herausgezogene Einzelkennzahlen (z. B. „99,9 %" bei Postfach-Schutzschild).

### 5. Zeitstrahl / Ablauf-Sektion (eigene Sektion, verbindliches Referenz-Template)

Zeigt „wie wir arbeiten" für eine Leistung als **eigenständige Sektion** auf der Leistungsseite (kein Teil von Hero oder einer anderen Sektion). Umsetzung: interaktive Bogen-/Dial-Visualisierung – links Textspalte (Kicker/Eyebrow in Monospace + H2 + kurzer Lead-Text), rechts ein gebogener, gepunkteter Pfad mit den Schritt-Nummern darauf verteilt; der aktive Schritt ist groß hervorgehoben (Verlaufs-Zahl + Titel + Beschreibungssatz). Klick auf eine Nummer/einen Punkt wechselt den aktiven Schritt, der Bogen rotiert dabei weich in die neue Ausrichtung.

**Referenzimplementierung (verbindlich):** `claude/components/zeitstrahl-template.html` im Cowork-Projekt – wird 1:1 auf jeder betroffenen Leistungsseite wiederverwendet, es werden nur die Inhalte ausgetauscht (kein Neubau je Seite).

**Content-Vertrag:** alle Texte stehen direkt im HTML in einer versteckten `<ol class="zt-steps">`-Liste (bleibt für SEO/Screenreader lesbar, da nur optisch versteckt). Pro Schritt: `data-num` (Anzeigenummer, z. B. „01"), `data-title` (Titel), der Text-Inhalt des `<li>` ist der Beschreibungssatz in Alltagssprache. `data-active` auf der `<section class="zt">` bestimmt, welcher Schritt beim Laden hervorgehoben ist. Anzahl der Schritte ist variabel – die Geometrie des Bogens skaliert automatisch mit der Schrittzahl.

**Typografie:** Space Grotesk (Headline/große Nummern), Outfit (Fließtext), SUSE Mono (Eyebrow/Kicker) – im Referenz-Template per Google-Fonts-CDN eingebunden; das ist nur ein Platzhalter für den Cowork-Prototyp, in der finalen Astro-Umsetzung werden dieselben Schriftschnitte wie überall sonst selbst gehostet (siehe Abschnitt „Typografie").

**Verhalten & Barrierefreiheit:** Bogen wird per JS (ResizeObserver) proportional herunterskaliert, wenn der verfügbare Platz schmaler ist; unter 1120px Breite stapelt sich die Textspalte über dem Bogen. Schritt-Nummern/-Punkte sind klickbar, fokussierbar (`focus-visible`-Outline) und per Tastatur bedienbar; `aria-current="step"` markiert den aktiven Schritt. Positions-/Größen-Übergänge respektieren `prefers-reduced-motion` (Transitions werden deaktiviert, siehe `docs/BARRIEREFREIHEIT.md`).

**Einsatz:** siehe `docs/ANFORDERUNGEN.md` → Leistungsseiten-Template für die konkrete Liste der Seiten, die diese Sektion erhalten, sowie die jeweiligen Schritt-Inhalte (sobald geliefert).

**Ablösung der bisherigen Darstellung:** eine ältere, bereits live gebaute Variante zeigt die Schritte linear als nummerierte Kreise (01–04), durch einfache Pfeile verbunden, ohne Bogen/Rotation und ohne hervorgehobenen aktiven Schritt (z. B. auf der IT-Betreuung-Seite unter „IT-Bestandsaufnahme"). Diese lineare Darstellung ist **veraltet** und wird überall, wo sie aktuell existiert, durch das Bogen-/Dial-Template ersetzt – die Schritt-Inhalte (Titel/Beschreibung) bleiben dabei erhalten, nur die visuelle Umsetzung wechselt.

### 6. Interaktiver ROI-Rechner

Zweispaltiges Layout:
- **Links – Eingabe-Card** (`#F0F4F3`): 4 Slider (Label links, aktueller Wert rechts in Petrol, Slider-Knopf in Türkis), darunter ein Toggle (z. B. „Arbeitgeber-Vollkosten einrechnen"), Toggle-Switch in Türkis wenn aktiv.
- **Rechts – Ergebnis-Card** (`#0B2E3C`): Header-Label in Großbuchstaben (reduzierte Opacity) + Trennlinie, große Monospace-Zeitanzeige, zweispaltiger Kosten-Vergleich (heutige Kosten vs. Assistent-Kosten), Ersparnis in Türkis hervorgehoben, Fußnote (68% Opacity).

Konkrete Werte je Leistungsseite: siehe `docs/BRANCHE.md` (KI-Telefonassistent, WhatsApp-Chatbot).

### 7. Hero-Zitat-Block

Ergänzung des Leistungsseiten-Hero (siehe Abschnitt „Leistungsseiten-Template" in `docs/ANFORDERUNGEN.md`):
- Kategorie-Tag oben (Pill, gedämpfter Petrol-Hintergrund, Punkt-Marker, Großbuchstaben, Format `<BAUSTEIN-EINORDNUNG> · <LEISTUNGSNAME>`)
- Große Headline (Space Grotesk)
- Kurzer Fließtext (2–3 Zeilen)
- **Zitat-Card:** linke Akzent-Linie (vertikaler Strich in Verlauf-Farbe), Anführungszeichen-Stil, Monospace-Schrift für das Zitat selbst.

Nicht jede Leistungsseite bekommt zwangsläufig einen Zitat-Block – nur wo ein passendes Statement existiert (siehe `docs/BRANCHE.md` für die konkreten Zitate je Leistung).

### 8. Footer (seitenweit) — **überholt, siehe Komponente 18 für die finale Referenzimplementierung**

*(Ursprüngliches, nie final umgesetztes Muster, hier nur noch zur Historie erhalten: freistehende Karte mit oben gerundeten/unten eckigen Ecken, Pill-CTA neben Logo, Social-Media-Icons in der unteren Zeile. Vom Nutzer bestätigt, dass die tatsächliche, finale Fassung — Komponente 18 — dieses Muster ersetzt: vollbreiter Footer ohne Radius, ohne Pill-CTA im Kopf, ohne Social-Icons in der unteren Zeile.)*

### 9. Hero Section

Vollflächige Hero-Komponente, **universell einsetzbar**: identisches Hintergrund-Design und identisches Layout auf der Startseite **und** im Hero jeder einzelnen Leistungsseite (nicht nur ein Startseiten-Sonderfall). Enthält Kopfzeile + Hero-Bereich in einem gemeinsamen Container, inkl. Dashboard-Card und Toast-Notification als Hero-Visual (Inhalt der Dashboard-Card/Toast ist pro Seite austauschbar, siehe „Variable Slots" unten).

**Header/Logo-Verhalten beim Scrollen:** Die Kopfzeile (Logo + Navigation) sitzt oben im Hero-Container und liegt damit immer auf dessen dunklem Verlaufshintergrund (`#1B6E7A`/`#0B2E3C`/`#4FB8A6`) – das Logo verwendet hier durchgehend die **helle Variante** (siehe „Logo" oben). Beim Herunterscrollen verlässt man den Hero-Container und erreicht den Standard-Seitenhintergrund `#F0F4F3` (Nebel, Off-White). Ein danach sticky eingeblendeter, kompakter Header läuft auf diesem hellen Hintergrund und verwendet entsprechend die **dunkle Logo-Variante** (`#0B2E3C`) – siehe aktualisierten Abschnitt „Sektions-Rhythmus" unten.

**Layout-Struktur:**
- Container: volle Breite, Radius 18px, alle Inhalte innerhalb eines abgerundeten Blocks.
- Innenabstand: 32px oben, 48px seitlich, 56px unten.
- Zweizeilige vertikale Struktur:
  1. Kopfzeile (Flex, `space-between`, vertikal zentriert): Logo links (helle Variante, da Hero-Hintergrund dunkel ist), Navigation rechts.
  2. Hero-Bereich (Flex, zwei Spalten, vertikal zentriert, `gap: 56px`, wrapt auf kleinen Breiten): Textblock links (`flex: 1 1 420px`, min. 320px), Hero-Visual rechts (`flex: 1 1 460px`, min. 340px, zentriert).
- Abstand Kopfzeile → Hero-Bereich: 40px. Textblock intern: vertikaler Flex, `gap: 22px` zwischen Headline, Subline, CTA.

**Hintergrund (verbindliche Referenzimplementierung, Cowork-Projekt → `claude/hero-visuals/hero-background.html`):**
- Diagonaler Verlauf, 135°, Gradient-Fläche auf 250% Größe (Bewegungsspielraum). Farbstopps: `#1B6E7A` (0%) → `#0B2E3C` (38%) → `#0B2E3C` (62%) → gedimmtes `#4FB8A6` (100%, ca. 65% mit `#0B2E3C` gemischt).
- Animation: Position des Gradients wandert, ~22s Loop, ease-in-out, kaum wahrnehmbar – die Fläche selbst bleibt formstabil, nur der Farbverlauf bewegt sich. `prefers-reduced-motion: reduce` deaktiviert die Animation vollständig (statischer Verlauf).
- **Randkontur/laufende Linie entfällt** *(Entscheidung, ersetzt die frühere Beschreibung einer animierten SVG-Kontur mit laufender Linie im Verlauf `#1B6E7A → #4FB8A6 → #F0F4F3` um den Rand)* – der Hero-Hintergrund besteht ausschließlich aus der atmenden Verlaufsfläche, ohne zusätzliche Rand-Animation.
- Logo/Wordmark sitzt in der Kopfzeile (siehe „Layout-Struktur" oben), nicht als eigenes Element im Hero-Panel-Hintergrund selbst.

**Typografie:**
- Headline/Logo: Space Grotesk, Gewicht 600–700. Headline 46px, Zeilenhöhe 1.12, Farbe `#F0F4F3`, leicht negativer Letter-Spacing. Logo-Wortmarke 19px, Gewicht 600.
- Navigation/Subline: Outfit. Navigation 14.5px, `rgba(240,244,243,0.82)`. Subline 17px, Zeilenhöhe 1.6, `rgba(240,244,243,0.75)`, max. Breite 440px. CTA-Label: Outfit, Gewicht 600, 15px.

**Abstände (Spacing-Skala im Einsatz):** 8px / 10px / 14px / 18px / 22px / 24px / 32px / 40px / 48px / 56px – konsistent für Innenabstände, Lücken zwischen Elementen und Abschnittsübergänge.

**Dashboard-Card (Hero-Visual):**
- Trägerkarte: heller Hintergrund `#F0F4F3`, Radius 16px, Innenabstand 18px, weicher Schlagschatten (0 24px 60px, 35% Schwarz).
- Kartenkopf: Titelzeile links (Space Grotesk, 600, 13.5px, `#0B2E3C`), drei dezente Fensterpunkte rechts (20% Deckkraft).
- Geräteliste: vertikaler Stack, `gap: 8px`, je Zeile Status-Punkt (8px, farbcodiert grün/gelb je Zustand) + Gerätename (12.5px) + Metrik-Wert rechts (11px, Mono-Font).
- Kennzahlen-Grid darunter: zwei gleich breite Kacheln (`gap: 10px`), leicht getönter Hintergrund, Radius 10px – Kachel 1: Balkendiagramm (Mini-Bars, Verlaufsfüllung `#4FB8A6 → #1B6E7A`); Kachel 2: große Kennzahl (Space Grotesk, 600, 20px).

**Toast-Notification (schwebendes Element) – verbindliches Standard-Layout bei 1–2 Karten:**
- Positionierung (Standard, gilt für alle Hero-Visuals mit ein oder zwei Mini-/Toast-Karten): **erste Karte oben rechts**, **zweite Karte unten links**, jeweils `position: absolute` relativ zur Hauptkarte (`position: relative` auf dem Hauptpanel). Die Karten liegen **überwiegend außerhalb** des Hauptpanels – nur die jeweilige Ecke berührt sich leicht mit der Panel-Kante (kein großflächiges Überlappen). Die untere linke Karte sitzt dabei bewusst **etwas weiter vom Panel entfernt** als die obere rechte (mehr Abstand/Luft, teils ganz ohne Überlapp) – asymmetrisch, nicht spiegelsymmetrisch. Konkrete, geprüfte Referenzwerte: „IT-Betreuung" (Karte 250px breit): oben rechts `top:-58px; right:-210px`, unten links `bottom:-88px; left:-240px`. „Server-Betreuung" (Karte 280px breit): oben rechts `top:-58px; right:-235px`, unten links `bottom:-88px; left:-265px`. Faustregel: horizontaler/vertikaler Versatz der oberen Karte ≈ Kartenbreite/-höhe minus ca. 20–40px (kleiner Eckberührung); bei der unteren Karte zusätzlich ca. 25–30px mehr Versatz in beide Richtungen. Bei nur einer Karte: oben rechts, gleiche Logik wie die obere Karte.
- Breite ca. 250–300px, heller ODER dunkler Hintergrund je nach Inhalt (`#FFFFFF` mit weichem Schatten, oder `#0B2E3C` mit stärkerem Schatten (0 16px 34px, 40% Schwarz) und 3px Verlaufsakzent-Rand `#4FB8A6 → #1B6E7A`).
- Inhalt: Icon links (in Verlaufskachel `#4FB8A6 → #1B6E7A`, Radius 10px) + zweizeiliger Text rechts (Titel 11.5–15px/600, Beschreibung 11–12px/gedämpft).
- Bewegung: sanftes Floaten (auf/ab, `translateY`, ~5s Loop, ease-in-out). Bei zwei Karten leicht versetzter Loop (`animation-delay: -2.5s`), damit sie nicht synchron schweben. Über `prefers-reduced-motion: reduce` deaktivierbar (siehe `docs/BARRIEREFREIHEIT.md`).

**States/Props:**
- `showToast` (boolean, Default: `true`): steuert Sichtbarkeit der Notification-Karte. `false` = reine Dashboard-Karte ohne Popup.
- `reduceMotion` (boolean, Default: `false`): deaktiviert die laufende Randlinien-Animation (Dauer → 0s). Hintergrundverlauf-Bewegung und Toast-Floating sind hiervon aktuell nicht erfasst und sollten bei Bedarf ergänzt werden (siehe `docs/BARRIEREFREIHEIT.md` → `prefers-reduced-motion`).

**Variable Slots (seitenspezifischer Inhalt):** Layout-Struktur, Hintergrund-Animation, Typografie-Regeln, Abstände und Card-Rahmen sind fix und seitenübergreifend identisch. Folgende Bereiche sind Content-Slots:
- Headline-Text – z. B. Startseite: „Verlässliche IT für den Mittelstand"; Leistungsseite: leistungsspezifische Headline.
- Subline-Text – kurze Erläuterung, passend zur Headline/Seite.
- CTA-Text – z. B. „Anfragen", alternativ „Beratung vereinbaren", „Mehr erfahren" je Seitenziel.
- Hero-Visual-Inhalt (Dashboard-Card-Daten) – Geräteliste, Metriken, Kennzahl und Toast-Inhalt sind austauschbar, um das jeweils relevante Szenario zu zeigen (z. B. Startseite: allgemeines Monitoring; Leistungsseite „Cloud & Sicherheit": sicherheitsbezogene Meldung statt Speicherplatz-Warnung).

**Umsetzung als HTML/CSS statt Rasterbild (verbindlich, kein PNG):** Alle Hero-Visuals (Dashboard-Card + Toast-Notification(s)) werden grundsätzlich als eigenständige HTML/CSS-Snippets umgesetzt – bewusst kein PNG-Export, wegen besserer Ladezeit und SEO (kein Bild-Request, Inhalt als echter, indexierbarer Text statt Pixel). Das gilt für die Startseite und alle 11 Leistungsseiten gleichermaßen. Referenzimplementierung (erste fertige Seite): **IT-Betreuung**, abgelegt im Cowork-Projekt unter `claude/hero-visuals/it-betreuung.html`. Das zugehörige Favicon-Icon (`assets/favicon.svg`) liegt ebenfalls im Cowork-Projekt. Weitere Leistungsseiten und die Startseite folgen nach demselben Muster, sobald der jeweilige HTML/CSS-Code geliefert wird; bis dahin steht in `docs/BRANCHE.md` bei der jeweiligen Seite der Hinweis „folgt".

**Abweichung „Webseiten“ (eigenes Hero-Visual statt Dashboard-Card/Toast):** Wie bereits beim KI-Telefonassistenten (Audio-Player-Visual) und beim WhatsApp-Chatbot (Chat-Mockup) ersetzt auch die Leistungsseite „Webseiten“ den Standard-Hero-Visual-Slot komplett durch ein eigenes, thematisch passendes Muster statt der Dashboard-Card/Toast-Kombination: ein **Browser-Fenster mit animiertem Vorher/Nachher-Slider**. Referenzimplementierung `claude/hero-visuals/webseiten.html`.

- **Browser-Fenster:** weiße Karte, Radius 18px, dreipunktige Chrome-Leiste + Adresszeile mit Schloss-Icon und `ihrefirma.de`, sanftes Schweben (`rotate(-3deg)` + `translateY`-Loop, 5s, ease-in-out).
- **Vorher/Nachher-Mechanik:** volle, fertig gestaltete Website-Vorschau („nachher“, Verlauf-Akzente in Petrol/Türkis, volle Deckkraft) liegt immer sichtbar als Basisebene; eine zweite, identisch aufgebaute aber unfertig/generisch wirkende Vorlage („vorher“, alle Elemente in gedaempften Grautoenen `rgba(11,46,60,...)`) liegt darüber, per `overflow:hidden` auf 42% Breite geclippt – wirkt wie ein aufgeschobener Vergleichs-Regler. Mittig auf der Trennlinie sitzt ein Slider-Griff (weißer Kreis mit Pfeile-Icon).
- **Badges:** „Standard-Vorlage“ (gedaempft, links/vorher) vs. „Ihre individuelle Website“ (Verlauf-Badge, volle Fläche/nachher) – macht den Vergleich auch ohne den Slider-Kontext sofort lesbar.
- **Schwebende Info-Karten** (gleiches Floating-Prinzip wie die Toast-Notification aus diesem Abschnitt, `animation-delay: -2.5s` bei der zweiten Karte, damit sie nicht synchron schweben): oben rechts „Ihre Marke“ mit 4 Farbkreisen (die 4 Kernfarben als Swatches), unten links „Individuell für Sie gestaltet“ mit Icon-Kachel (Verlauf-Hintergrund) + zweizeiligem Text.
- `prefers-reduced-motion: reduce` deaktiviert sowohl das Browser-Floaten als auch das Floaten der Info-Karten vollständig.
- Getestet: Desktop (1280px, Ausgangszustand + Zustand nach Animationsschritt) und Mobile (390px) sauber ohne Layout-Fehler, Vorher/Nachher-Clip und schwebende Karten korrekt positioniert.

### 10. „Ihre Vorteile"-Sektion (Startseite)

4-spaltige Vorteils-Leiste direkt unter dem Hero der Startseite, auf dunklem Hintergrund `#0B2E3C` mit einem dezenten Türkis-Radial-Glow (`radial-gradient`, oben rechts positioniert, `background-attachment: fixed`). Kopfbereich: H2 „Ihre Vorteile" (Space Grotesk, 36px) + kurzer Subtext, linksbündig, max. Breite 600px. Darunter 4 Spalten (Grid, gleich breit), durch vertikale 1px-Trennlinien (`rgba(240,244,243,0.16)`) getrennt (erste/letzte Spalte ohne äußeres Padding). Jede Spalte: 40×40px Icon (Outline-SVG mit Verlaufs-Stroke), Headline (Space Grotesk 600, 18px), Fließtext (Outfit, 14.5px, 72% Opacity).

**Responsive:** ab 900px Breite 2×2-Grid (Trennlinie vor Spalte 3 entfällt), ab 560px Breite einspaltig gestapelt mit horizontalen statt vertikalen Trennlinien.

**Referenzimplementierung:** `claude/components/vorteile-startseite.html` im Cowork-Projekt. Aktuelle 4 Vorteile: Alles aus einer Hand, Proaktive Betreuung, Persönlicher Support, Planbare Kosten.

**Abweichung von der Verlaufsregel (geklärt):** die Icon-Strokes verwenden den Verlauf `#7FD9C4 → #4FB8A6` (Helltürkis → Türkis) statt der Standard-Verlaufsregel `#4FB8A6 → #1B6E7A`. Vom Nutzer bestätigt: `#7FD9C4` ist die neue, offizielle 5. Akzentfarbe für helle Elemente auf dunklem Grund (siehe Farbpalette oben) – bewusster Kontrast-Boost auf dem dunklen `#0B2E3C`-Hintergrund, kein Fehler und keine offene Frage mehr.

### 11. „Leistungen"-Sektion (Startseite)

3-spaltiges Karten-Grid (300px hoch, 16px Gap) direkt unter „Ihre Vorteile", auf bg-dark (`#0B2E3C`). Jede Karte: dunkler Verlaufs-Platzhalterhintergrund (`linear-gradient(160deg, #1B6E7A 0%, #0B2E3C 100%)` + radialer Türkis-Glow) mit zentriertem 76×76px Outline-Icon im Ruhezustand. Beim Hover/Fokus: Icon blendet aus, ein Farbschleier (Petrol/Tiefsee-Verlauf) legt sich über die Karte, der Titel fährt von einer versetzten Position nach oben, Beschreibungstext + „Mehr lesen"-Link blenden gestaffelt ein, der Plus-Button unten rechts füllt sich mit dem Standard-Verlauf. Karten sind per `tabindex` fokussierbar, `:focus-visible` zeigt denselben Zustand wie `:hover` plus Verlauf-Outline.

**Responsive:** ab 940px Breite 2 Spalten, ab 600px Breite 1 Spalte gestapelt. Unter 600px ist die Hover-Interaktion aufgehoben – Titel, Beschreibung und „Mehr lesen"-Link sind permanent sichtbar (kein Hover auf Touch-Geräten), und das große Icon wird bewusst ausgeblendet (`display:none`), da es sonst mit dem jetzt dauerhaft sichtbaren Text überlappen würde.

**Referenzimplementierung:** `claude/components/leistungen-startseite.html` im Cowork-Projekt.

**Bewusst nur 9 von 11 Leistungen als Karte (bestätigt durch Nutzer):** Server-Betreuung und E-Mail-Sicherheit sind **absichtlich nicht** Teil dieser Karten-Übersicht. Enthalten sind: IT-Betreuung, Microsoft 365, Datensicherung, KI-Telefonassistent, WhatsApp-Chatbot, Prozessautomatisierung, Webseiten, Hardware-Beschaffung, Fernzugriff & VPN.

### 12. „How we work"-Sektion (Startseite)

4-spaltiges Schritte-Band (Kennenlernen → Analyse → Umsetzung → Betreuung), auf bg-hell (`#F1F3F0`). Jeder Schritt: ein kleines Viertelkreis-„Pictogramm" (Space Grotesk-Kicker-Optik in Petrol `#1B6E7A`), das den Fortschritt visualisiert – Schritt 1 zeigt ein Viertelkreis-Segment, Schritt 2 ein Halbkreis, Schritt 3 drei Viertel, Schritt 4 einen vollen Kreis (zunehmend gefüllter Kreis = Fortschritt der Zusammenarbeit). Die Schritte sind über eine dünne horizontale Haarlinie (`--hairline`) verbunden. Titel (Space Grotesk 600, 19px) + kurzer Fließtext (14.5px) je Schritt.

**Scroll-Reveal:** Schritte sind initial `opacity:0; translateY(18px)` und blenden per `IntersectionObserver` gestaffelt ein (90ms Versatz je Schritt), sobald sie zu 20% im Viewport sichtbar sind. `prefers-reduced-motion: reduce` deaktiviert die Transition vollständig (Schritte sind sofort sichtbar).

**Responsive:** ab 900px Breite 2 Spalten (Verbindungslinie entfällt), ab 760px Breite 1 Spalte mit Icon+Text nebeneinander (kein vertikaler Stack der Pictogramme).

**Abgrenzung zu Komponente 5 (Zeitstrahl/Ablauf-Sektion):** Diese „How we work"-Sektion ist ein eigenständiges, einfacheres Muster **nur für die Startseite** (allgemeiner Überblick über den Ablauf der Zusammenarbeit) – **nicht** dasselbe wie die Bogen-/Dial-Zeitstrahl-Komponente auf den Leistungsseiten (Komponente 5). Beide Muster bleiben nebeneinander bestehen und werden nicht vereinheitlicht.

**Referenzimplementierung:** `claude/components/howwework-praxisbeispiel-startseite.html` im Cowork-Projekt (enthält auch Komponente 13, siehe unten).

### 13. „Praxisbeispiel"-Sektion (Startseite, Vertrauen)

Zeigt aktuell **einen** Referenzfall: Jugend braucht Arbeit e.V. Aufbau:

- **„Ausgangssituation"** – 4-spaltiges Karten-Grid (bg-hell, weiße Karten), je eine Problem-Karte mit getöntem Icon-Kreis + rotem „!"-Badge oben rechts + Kurztext (z. B. „Veraltete Hardware ohne Support", „Ständige Ausfälle im Betrieb", „Niemand zuständig bei Problemen", „Server ohne Wartung und Backup").
- **Zwei-Spalten-Hauptbereich** (Desktop, 0.62fr/1.38fr):
  - **Links – Zitat-Card** (bg-dark `#0B2E3C`, abgerundet 24px): Logo-Platzhalter (gestrichelter Rahmen, aktuell Textplatzhalter „Logo / Jugend braucht Arbeit e.V." – echtes Logo folgt), Kunde-Headline, Zitat in Kursiv, Trennlinie, Ansprechperson (Name fett + Rolle/Ort).
  - **Rechts – „Was wir umgesetzt haben"-Flow-Diagramm**: 4 Ergebnis-Karten (nummeriert 01–04) im Zickzack angeordnet (abwechselnd oben/unten), verbunden durch geschwungene Verlaufs-Linien (`#4FB8A6 → #1B6E7A`) mit Pfeilspitzen; endet rechts in einem kleinen Marken-Icon (isolierte „li"-Ligatur aus dem Logo, siehe `docs/DESIGNSYSTEM.md` → „Logo").

**Responsive:** ab 1050px Breite 1-spaltiger Hauptbereich (Zitat-Card über dem Flow), Problem-Grid 2×2. Unter 760px: Flow-Diagramm wechselt von absolut positionierten/verbundenen Karten auf eine einfache vertikale Liste mit linker Akzent-Linie (Verbindungslinien/Pfeile werden ausgeblendet), Problem-Grid einspaltig.

**Offener Punkt:** Bei der Desktop-/Tablet-Darstellung des Flow-Diagramms endet die letzte Verbindungslinie (nach Karte 04) mit sichtbarem Abstand zum abschließenden Marken-Icon rechts, statt es direkt zu berühren – vermutlich gewollt (Icon als eigenständiger „Abschluss-Punkt", nicht als direkt angebundenes Element), aber nicht abschließend bestätigt.

**Referenzimplementierung:** `claude/components/howwework-praxisbeispiel-startseite.html` im Cowork-Projekt (gemeinsame Datei mit Komponente 12).

### 14. „Starke Partner für starke Lösungen"-Sektion (Startseite, Kompetenz)

Zentrierte Intro (Headline + kurzer Fließtext) über einer „Bühne": vier konzentrische Halbkreise (Radien 120/235/350/465px, 115px Abstand) auf einer horizontalen Grundlinie, Mittelpunkt unten mittig. Im innersten Halbkreis sitzt das Marken-Icon (isolierte „li"-Ligatur, Verlauf `#4FB8A6 → #1B6E7A`) als „Hub". Auf den drei äußeren Halbkreisen schweben 10 weiße „Chip"-Platzhalterkarten (je mit einem abgerundeten Verlaufs-Quadrat als Icon-Platzhalter – echte Partner-/Hersteller-Logos folgen später), leicht individuell versetzt „float"-animiert (`translateY`, 6.9–9.1s Loop, individuelle Delays). `prefers-reduced-motion: reduce` deaktiviert das Floaten.

**Responsive:** Die 1000×500px-Bühne wird bei 1060/820/560px Breite per `transform: scale()` verkleinert (0.78 / 0.58 / 0.4), bleibt dabei aber eine fixe 1000px-Box, die über `left:50%; margin-left:-500px` (statt `margin:auto`) horizontal zentriert und dann von `transform-origin: top center` aus symmetrisch skaliert wird – nur so bleibt sie bei jeder Breite mittig statt einseitig aus dem Bild zu rutschen (siehe „Fix" unten).

**Fix gegenüber der gelieferten Datei (mit Nutzer abgestimmt):** Die ursprüngliche Version zentrierte die Bühne über `margin: 56px auto 0`. Da die Box mit fester Breite 1000px auf Mobile breiter als der Viewport ist, berechnen Browser die `auto`-Margins in diesem Fall zu `0` (kein Zentrieren bei Overflow) – die Box blieb linksbündig bei `x:0`, während die Skalierung weiterhin um einen `transform-origin` bei `x:500px` erfolgte. Bei 420px Viewport-Breite war die Bühne dadurch zu rund 80 % nach rechts aus dem sichtbaren Bereich verschoben (nur 2 von 10 Partner-Chips + kein Logo sichtbar). Behoben durch `left:50%; margin-left:-500px` (fester Versatz statt `auto`), wodurch die Box unabhängig von der Containerbreite immer korrekt mittig sitzt, bevor die Skalierung greift.

**Referenzimplementierung:** `claude/components/starke-partner-startseite.html` im Cowork-Projekt.

### 15. FAQ-Akkordeon (Startseite)

Zentrierte Kopfzeile (H2 „Häufige Fragen" + kurzer Fließtext) über einer vertikalen Liste weißer Akkordeon-Karten (16px Radius, dezenter Schatten). Jede Frage ist ein `<button>` mit Frage-Text links und rundem Chevron-Icon rechts; beim Öffnen dreht sich der Chevron um 180°, füllt sich mit dem Standard-Verlauf (`#4FB8A6 → #1B6E7A`) und der Pfeil-Strich wird weiß. Antwort klappt per `max-height`-Transition auf (0.5s), **nur eine Frage gleichzeitig offen** – ein Klick auf eine andere Frage schließt die vorherige automatisch. Erste Frage ist beim Laden bereits geöffnet (`class="open"`). `aria-expanded` wird korrekt mitgeführt. `prefers-reduced-motion: reduce` deaktiviert die Transitions.

**Responsive:** ab 600px Breite kleinere Schrift/Innenabstände, sonst identisches Verhalten.

**Update (finale v2, ersetzt vorherige Fassung):** Die Frage „Habe ich einen festen Ansprechpartner?" wurde durch „Welche Leistungen bieten Sie an?" ersetzt. Diese neue Antwort enthält zusätzlich eine strukturierte Leistungsliste (`.svc-groups`) mit drei Gruppen – **IT & Infrastruktur** (IT-Betreuung, Server-Betreuung, Fernzugriff/VPN, Hardware-Beschaffung, Microsoft 365, Datensicherung, E-Mail-Sicherheit), **KI & Kommunikation** (KI-Telefonassistent, WhatsApp-Chatbot, Prozessautomatisierung, plus 3 grau/gedimmte „— bald"-Pills für KI-E-Mail-Assistent, Webchat, Telefonanlage/PBX) und **Webseiten** (Neubau, Relaunch und Betreuung) – als Pill-Tags in Zeilenumbruch (`flex-wrap`), mit türkisfarbenen Gruppentiteln. Diese Struktur entspricht 1:1 der finalen 4-Kategorien-Navbar (siehe `docs/ANFORDERUNGEN.md` → Navigation). Getestet: Öffnen der Leistungen-Antwort funktioniert einwandfrei bei Desktop (1280px) und Mobile (390px), Pills brechen sauber um, keine Überläufe.

**Inhalt (8 Fragen, final v2):** Kosten der IT-Betreuung (ab 30 €/Gerät/Monat), Leistungsübersicht (3 Kategorien als Pill-Gruppen, s.o.), passende Unternehmensgröße (2–100 Mitarbeitende), Abrechnungsmodelle (monatliches Festpreis-Paket vs. einmalig nach Aufwand), Umzugsdauer (2–3 Wochen), Reaktionszeiten bei Störungen (Standard 4–24 Std., Notfall 1–8 Std., Support-Zeiten 8–18 Uhr), Vor-Ort-Verfügbarkeit (Rhein-Main-Gebiet), Vertragsbindung (monatlich kündbar, 10–20 % Rabatt bei Jahreslaufzeit).

**Referenzimplementierung:** `claude/components/faq-startseite.html` im Cowork-Projekt.

### 16. CTA + Kontaktformular (Startseite, Handlung)

Mehrstufiger Anfrage-Wizard auf bg-hell (`#F1F3F0`, **nicht** bg-dark wie im ursprünglichen Sektions-Rhythmus-Platzhalter vermerkt – korrigiert, siehe unten). Zentrierte Kopfzeile (H2 „Lassen Sie sich von Experten beraten" + Subline) mit zwei sich überlappenden Ansprechpartner-Avataren und Vertrauenstext („Sie sprechen direkt mit den Menschen, die Ihre IT betreuen"). Darunter eine 4-stufige Fortschrittsanzeige (nummerierte Punkte, durch Linie verbunden; aktiver Schritt im Standard-Verlauf gefüllt, abgeschlossene Schritte in Türkis, anklickbar zum Zurückspringen):

1. **Anliegen:** Mehrfachauswahl-Karten – **entspricht 1:1 der finalen 3-Kategorien-Navbar** (siehe `docs/ANFORDERUNGEN.md` → Abschnitt Navigation): „IT & Infrastruktur", „KI & Kommunikation", „Webseiten", plus eine vierte Karte „Etwas anderes" als Fallback für allgemeine Anfragen.
2. **Details:** Für jeden in Schritt 1 gewählten Bereich erscheint eine eigene Options-Gruppe mit den zugehörigen Leistungen als Mehrfachauswahl-Chips (IT & Infrastruktur: IT-Betreuung, Server-Betreuung, Fernzugriff & VPN, Hardware-Beschaffung, Microsoft 365, Datensicherung, E-Mail-Sicherheit; KI & Kommunikation: KI-Telefonassistent, WhatsApp-Chatbot, Prozessautomatisierung, „Noch unklar"; Webseiten: Neue Webseite, Relaunch, Betreuung, Auffindbarkeit/SEO-GEO). Darunter Einzelauswahl „Dringlichkeit" (Dringend/rot, In den nächsten Tagen/gelb, Allgemein/türkis – bei „Dringend" erscheint ein Hinweis-Kasten, direkt anzurufen statt auf E-Mail zu warten), Einzelauswahl „Unternehmensgröße" (1–10 bis über 100) und ein optionales Freitextfeld.
3. **Kontakt:** Vor-/Nachname, Unternehmen (optional), E-Mail, Telefon (optional) – mit Inline-Validierung (Pflichtfelder, E-Mail-Format), Fehlermeldung in Rot (`#C0392B`) erst nach fehlgeschlagenem „Weiter"-Klick.
4. **Absenden:** Zusammenfassung aller Angaben als Tabelle, danach zwei gleichwertige Wege: „Anfrage senden" (primärer Verlauf-Button) oder „Kostenloses Erstgespräch buchen" (Outline-Button, klappt einen Kalender-Platzhalter für die spätere CalDAV-Integration auf). Nach dem Absenden ersetzt eine Bestätigungsansicht (Verlauf-Kreis mit Haken-Icon + Dankestext) den Formularbereich.

Alle Buttons/Chips/Icons nutzen den Standard-Verlauf (`#4FB8A6 → #1B6E7A`) und die 4 Kernfarben; Dringlichkeits-Punkte (Rot/Gelb/Türkis) sind eine bewusste Ausnahme als Statusfarben, analog zu anderen semantischen Farbmarkierungen im Kit (z. B. Ampel-Berichte). `prefers-reduced-motion: reduce` deaktiviert die Panel-Übergänge.

**Responsive:** ab 700px Breite Karten/Felder/Zwei-Spalten-Layouts einspaltig, Schritt-Labels unter der Fortschrittsanzeige ausgeblendet (nur noch Nummern-Punkte sichtbar).

**Hinweis zum Sektions-Rhythmus:** Der ursprüngliche Platzhalter-Eintrag "CTA + KONTAKTFORMULAR → bg-dark, zentriert" ist damit überholt – die tatsächliche Referenzimplementierung läuft auf bg-hell, konsistent mit FAQ/How-we-work/Praxisbeispiel/Starke-Partner (alle bg-hell `#F1F3F0`).

**Referenzimplementierung:** `claude/components/cta-kontaktformular-startseite.html` im Cowork-Projekt.

### 17. Wissen-Teaser (Startseite)

Kopfzeile im Flex-Layout: links H2 „Wissen" + kurze Subline, rechts (nur Desktop) Textlink „Alle Beiträge →" mit Pfeil-Hover-Animation (Pfeil verschiebt sich 4px nach rechts). Darunter ein 3-spaltiges Karten-Grid mit den 3 neuesten Wissen-Artikeln: jede Karte ein `<a>`-Link, oben ein 150px hoher Bildbereich mit Verlauf-Hintergrund (`#1B6E7A → #0B2E3C`, 150°) und zentriertem Outline-Icon passend zum Thema, darunter Kategorie-Badge (Pill, Türkis bei 13% Opacity, dunkler Text), Titel (2-zeilig, feste Mindesthöhe für gleichmäßige Kartenhöhe), Teaser-Text und Lesezeit-Angabe. Karten heben sich beim Hover/Focus-visible 4px an (Shadow verstärkt sich), Focus-Ring in Türkis.

**Responsive:** ab 940px Breite 2-spaltiges Grid, dritte Karte bewusst ausgeblendet (`display:none` auf der letzten `<li>`) — der Desktop-Textlink „Alle Beiträge" bleibt der Zugang zu allen Artikeln. Ab 600px Breite (Mobile) einspaltig, alle 3 Karten wieder sichtbar, der Kopfzeilen-Textlink verschwindet zugunsten eines vollwertigen Verlauf-Buttons „Alle Beiträge ansehen" unterhalb der Karten. `prefers-reduced-motion: reduce` deaktiviert die Hover-/Pfeil-Transitions.

**Inhalt (3 Beispiel-Artikel, Platzhalter-Inhalte zur Veranschaulichung des Musters, keine finalen Titel):** „Was kostet IT-Betreuung im Monat?" (Kosten, 6 Min.), „NIS-2: Welche Unternehmen betroffen sind" (Sicherheit, 9 Min.), „Die 3-2-1-Regel: Wie Sie Firmendaten wirklich sicher sichern" (Datensicherung, 7 Min.) — Verweis auf die noch offenen finalen Wissen-Startartikel, siehe `claude/Selim-IT-Website-Spec-Fortschritt.md` Abschnitt 9.

**Referenzimplementierung:** `claude/components/wissen-teaser-startseite.html` im Cowork-Projekt.

### 18. Footer (seitenweit, final — ersetzt Komponente 8)

Vollbreiter Footer (kein freistehender Karten-Radius), Hintergrund als diagonaler Verlauf `linear-gradient(150deg, #1B6E7A 0%, #0B2E3C 65%)`. 4-spaltiges Grid im oberen Bereich:

1. **Spalte 1 (breiter, 1.25fr):** helle Logo-Wortmarke, kurzer Claim, darunter Kontaktzeilen (Anschrift, PLZ/Ort, Telefon, E-Mail — PLZ und Telefonnummer aktuell noch Platzhalter, kursiv/reduzierte Opacity markiert).
2. **Spalte 2 „IT & Infrastruktur":** alle 7 Leistungen dieser Nav-Kategorie als Text-Links.
3. **Spalte 3 „KI & Kommunikation":** die 3 aktiven Leistungen als Links, darunter ein „Bald verfügbar"-Badge (Pill) + die 3 kommenden Leistungen (KI-E-Mail-Assistent, Webchat, Telefonanlage/PBX) als nicht-anklickbarer, reduzierter Text — **spiegelt exakt die Navbar-Struktur.**
4. **Spalte 4:** oben „Webseiten" (nur der eine Navbar-Punkt, ohne Unterpunkte, wie in der Navigation), darunter ein zweiter Block „Unternehmen" (Über uns, Preise, Kontakt, Partner & Lösungen).

Spalten-Überschriften in der neuen 5. Akzentfarbe Helltürkis `#7FD9C4` (siehe Farbpalette oben), Großbuchstaben, Space Grotesk. Unterer Bereich (oberhalb durch feine helle Trennlinie abgesetzt): links 3 Rechtslinks (Impressum/Datenschutz/AGB), rechts Copyright-Zeile — **keine Social-Media-Icons** (bewusste finale Entscheidung, ersetzt die frühere Social-Icons-Idee aus Komponente 8).

**Responsive:** ab 940px Breite 2-spaltiges Grid (Spalte 1 bleibt oben, die 3 Leistungs-/Unternehmen-Spalten brechen in ein 2×2-Raster um); ab 600px Breite alle Spalten einspaltig gestapelt.

**Referenzimplementierung:** `claude/components/footer-startseite.html` im Cowork-Projekt.

### 19. Problem & Lösung ("Reaktiv vs. proaktiv", Leistungsseiten)

Bg-dark (`#0B2E3C`) mit derselben subtilen radialen Türkis-Glow-Textur wie „Ihre Vorteile". Kopfzeile mit Eyebrow-Label ("Reaktiv oder proaktiv"), zweizeiliger Headline (zweite Zeile als Verlauf-Text-Gradient `#7FD9C4 → #4FB8A6`) und Intro-Absatz. Darunter ein 2×2-Karten-Grid: jede Karte hat einen gemeinsamen Titel (Icon + Thema, z. B. „Störungen & Ausfälle") und darunter zwei gegenübergestellte Blöcke — oben gedämpft „Reaktive IT-Hilfe" (grauer X-Badge, reduzierte Opacity) und darunter hervorgehoben „Mit [Selim-IT-Logo]" (grüner Haken-Badge, Verlauf-getönte Box mit Border). Karten heben sich beim Hover leicht an (`translateY(-3px)`), der „Mit Selim-IT"-Block verstärkt dabei Hintergrund/Schatten, der „Reaktive Hilfe"-Block dimmt zusätzlich ab. Abschließender Kicker-Satz unterhalb des Grids. Das Selim-IT-Logo wird als Inline-SVG über ein `<svg><defs><path id="silm-logo">` + mehrere `<use href="#silm-logo">` referenziert (ein Sprite, mehrfach wiederverwendet).

**Responsive:** ab 760px Breite Karten einspaltig, ab 560px reduzierte Innenabstände/Schriftgrößen.

**Referenzimplementierung:** `claude/components/problem-loesung-trustbar-it-betreuung.html` im Cowork-Projekt (kombinierte Datei mit Komponente 20).

**Zweite Referenz (Server-Betreuung, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-server-betreuung.html`. 2×2-Karten: „Verfügbarkeit & Ausfälle" (Ausfall erst nach dem Fakt bemerkt vs. 24/7-Monitoring von CPU/Speicher/Festplatte/Diensten), „Backup & Datensicherheit" (ungeprüftes Backup-Skript vs. automatisierte 3-2-1-Sicherung mit Wiederherstellungstests), „Patch-Management & Sicherheit" (aufgeschobene Updates vs. geplante, vorab geprüfte Wartungsfenster außerhalb der Betriebszeiten), „Performance & Kapazität" (Server wird unbemerkt langsamer vs. verfolgte Auslastungstrends bei CPU/RAM/Storage). Getestet: Desktop (1280px, inkl. Hover-Zustand auf Karte 1 — Border/Icon-Hervorhebung funktioniert) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Dritte Referenz (VPN / Fernzugriff, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-vpn.html`. 2×2-Karten: „Verschlüsselung & Angriffsfläche" (ungeprüfte Verbindungen in öffentlichem WLAN vs. durchgehend verschlüsselter VPN-Tunnel unabhängig vom Netz), „Zugriffsrechte & Kontrolle" (ein Zugang für alle, Alt-Zugänge bleiben bestehen vs. rollenbasierte, sofort entziehbare Zugänge), „Verbindung & Verfügbarkeit" (Ausfälle werden erst über Support-Anfragen bekannt vs. überwachte Verbindungsstabilität/-geschwindigkeit), „Geräte & Einheitlichkeit" (Wildwuchs einzelner Insellösungen vs. eine zentral einsehbare, einheitlich eingerichtete Lösung). Getestet: Desktop (1280px, inkl. Hover-Zustand) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Vierte Referenz (Hardware-Beschaffung, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-hardware-beschaffung.html`. 2×2-Karten: „Bedarfsplanung & Vorlauf" (Bestellung erst nach Ausfall bzw. am ersten Arbeitstag ohne Gerät vs. vorausschauend geplanter Bedarf für Ersatz/Neueinstellungen), „Passende Ausstattung" (Bestellung nach Verfügbarkeit/Preis vs. Empfehlung nach tatsächlichem Einsatzzweck), „Einrichtung & Rollout" (Einrichtung durch fachfremde Mitarbeiter nach Lieferung vs. fertig eingerichtete Geräte inkl. Software/Zugänge/Sicherheitseinstellungen), „Lebenszyklus & Garantie" (keine Übersicht über Gerätealter/Garantiestatus bis zum Ausfall vs. erfasster Lebenszyklus mit vorausschauender Ersatzplanung). Getestet: Desktop (1280px, inkl. Hover-Zustand auf Karte 1) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Fünfte Referenz (Microsoft 365, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-m365.html`. 2×2-Karten: „Lizenzverwaltung & Kosten" (Lizenzen einmal gebucht, nie wieder geprüft, auch nicht für ausgeschiedene Mitarbeiter vs. regelmäßiger Abgleich von Bestand/Bedarf), „Zugriffsschutz & Anmeldesicherheit" (einfaches Passwort genügt, auffällige Anmeldungen fallen nicht auf vs. Multi-Faktor-Authentifizierung + Anmelderegeln), „Onboarding & Offboarding" (neuer Mitarbeiter wartet am ersten Tag auf Postfach/Teams-Zugang, ausgeschiedene Konten bleiben aktiv vs. Zugänge ab Tag 1 bereit und beim Austritt zuverlässig entzogen), „Datensicherung in der Cloud" (Annahme „Microsoft sichert das schon" bis eine Datei nach Ablauf der Aufbewahrungsfrist unwiederbringlich weg ist vs. zusätzliches, von Microsoft unabhängiges Backup). Getestet: Desktop (1280px, inkl. Hover-Zustand) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Sechste Referenz (Datensicherung, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-datensicherung.html`. 2×2-Karten: „Backup-Überwachung" (Backup läuft unüberwacht im Hintergrund, Erfolg niemals geprüft vs. jede Sicherung wird geprüft, Fehlschläge melden sich proaktiv), „Wiederherstellbarkeit" (Backup vorhanden, aber nie zurückgespielt vs. regelmäßig getestete Wiederherstellung), „Schutz vor Ransomware" (Backup im selben Netzwerk wie Originaldaten, Verschlüsselungstrojaner trifft beides vs. unveränderliche/getrennte Kopie nach 3-2-1-Regel), „Aufbewahrungsfristen & Compliance" (unklare Aufbewahrungsdauer bis eine Prüfung danach fragt vs. dokumentierte Fristen nach Bedarf und Vorgaben). Getestet: Desktop (1280px, inkl. Hover-Zustand) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Siebte Referenz (E-Mail-Sicherheit, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-email-sicherheit.html`. 2×2-Karten: „Phishing & Spam" (Standardfilter des E-Mail-Anbieters lässt vieles durch, Mitarbeiter klickt vs. verdächtige Mails erreichen den Posteingang gar nicht erst), „Schadsoftware & Anhänge" (Anhänge/Links landen ungeprüft im Postfach vs. automatische Prüfung vor Zustellung), „Identitätsschutz & Spoofing" (gefälschte Absenderadresse sieht echt aus, CEO-Fraud-Risiko vs. technische Absender-Authentifizierung stoppt Spoofing), „Verschlüsselung & Vertraulichkeit" (vertrauliche Inhalte unverschlüsselt per Mail vs. verschlüsselte Übertragung sensibler Mails). Getestet: Desktop (1280px, inkl. Hover-Zustand) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Achte Referenz (KI-Telefonassistent, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-ki-telefonassistent.html`. 2×2-Karten: „Erreichbarkeit“ (Anruf geht außerhalb der Öffnungszeiten/bei Belegtzeichen einfach unter vs. jeder Anruf wird rund um die Uhr angenommen), „Verpasste Anrufe“ (verpasster Anruf ist meist verpasster Auftrag vs. Termine/Rückrufwünsche werden direkt im Gespräch geklärt), „Mitarbeiterzeit“ (Standardfragen unterbrechen ständig die eigentliche Arbeit vs. Routineanrufe laufen ohne das Team, Einbindung nur bei echtem Bedarf), „Qualität & Konsistenz“ (Auskunft variiert je nach Tagesform/Mitarbeiter, nichts wird festgehalten vs. immer dieselbe geprüfte Auskunft, jedes Gespräch protokolliert). Getestet: Desktop (1280px, inkl. Hover-Zustand) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Neunte Referenz (WhatsApp-Chatbot, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-whatsapp-chatbot.html`. 2×2-Karten: „Erreichbarkeit“ (Nachricht bleibt abends/am Wochenende/im Tagesgeschäft liegen vs. jede Nachricht wird rund um die Uhr direkt in WhatsApp beantwortet), „Verpasste Anfragen“ (Anfrage geht zwischen anderen Nachrichten unter, wird erst spät bemerkt vs. jede Anfrage wird erkannt und direkt im Chat bearbeitet), „Mitarbeiterzeit“ (dieselben Fragen zu Öffnungszeiten/Preisen/Verfügbarkeit werden immer wieder einzeln beantwortet vs. Routineanfragen laufen ohne das Team, Einbindung nur bei echtem Bedarf), „Qualität & Nachvollziehbarkeit“ (Auskunft variiert je nach Bearbeiter, kein durchsuchbares Protokoll vs. immer dieselbe geprüfte Auskunft, jeder Chatverlauf nachvollziehbar). Getestet: Desktop (1280px, inkl. Hover-Zustand) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Zehnte Referenz (Webseiten, identisches Muster, andere Inhalte):** `claude/components/problem-loesung-trustbar-webseiten.html`. Abweichende Headline-Struktur: zweizeilige H2, bei der beide Zeilen inhaltlich zusammengehören (erste Zeile normal, zweite Zeile als Akzent-Verlauf-Text — nicht nur ein einzelnes Akzentwort wie bei den übrigen Referenzen). 2×2-Karten: „Performance & Ladezeit“ (Bilder nie komprimiert, Plugins häufen sich an, Website wird langsamer vs. Ladezeit wird laufend geprüft, Bremsen werden behoben bevor Besucher sie bemerken), „Sichtbarkeit bei Google“ (Website online, aber bei der eigenen Leistungssuche nicht auffindbar, technische SEO nie gepflegt vs. technische SEO/Meta-Daten/lokale Auffindbarkeit bleiben laufend aktuell), „Wartung & Sicherheit“ (nach Launch nie wieder angefasst, veraltete Plugins und offene Sicherheitslücken unbemerkt vs. Updates/Backups/Sicherheitschecks laufen laufend im Hintergrund), „KI-Auffindbarkeit“ (für klassische Suchmaschinen optimiert, bei ChatGPT/Perplexity & Co. trotzdem nicht auffindbar vs. strukturierte Daten/semantisches HTML sorgen für Verständnis und Zitierbarkeit durch KI-Systeme). Getestet: Desktop (1280px, inkl. Hover-Zustand auf Karte 1), Tablet-Breakpoint (740px, einspaltig) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

### 20. Trustbar (Partner-Logo-Marquee, Leistungsseiten)

Endlos laufendes horizontales Logo-Band (CSS-Keyframe-Animation, Logo-Liste einmal dupliziert für nahtlose Schleife), zentriertes Label „Zertifizierte Partner & Technologien" darüber. Rand-Fade per `mask-image`-Gradient (Logos erscheinen/verschwinden weich an den Kanten statt hart abgeschnitten). Pausiert bei Hover über die Leiste. Aktuell Platzhalter-Logos (Microsoft, Hornetsecurity + 4× „Partner-Logo") — echte Partner-Logos folgen später (siehe `claude/Selim-IT-Website-Spec-Fortschritt.md` Abschnitt 31, offener Punkt zu Hardware-Beschaffung-Trustbar, hier zusätzlich für IT-Betreuung genutzt). `prefers-reduced-motion: reduce` stoppt die Animation vollständig.

**Referenzimplementierung:** `claude/components/problem-loesung-trustbar-it-betreuung.html` im Cowork-Projekt (kombinierte Datei mit Komponente 19).

**Zweite Referenz (Server-Betreuung):** `claude/components/problem-loesung-trustbar-server-betreuung.html` (kombinierte Datei mit der zweiten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Dritte Referenz (VPN / Fernzugriff):** `claude/components/problem-loesung-trustbar-vpn.html` (kombinierte Datei mit der dritten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Vierte Referenz (Hardware-Beschaffung):** `claude/components/problem-loesung-trustbar-hardware-beschaffung.html` (kombinierte Datei mit der vierten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Fünfte Referenz (Microsoft 365):** `claude/components/problem-loesung-trustbar-m365.html` (kombinierte Datei mit der fünften Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Sechste Referenz (Datensicherung):** `claude/components/problem-loesung-trustbar-datensicherung.html` (kombinierte Datei mit der sechsten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Siebte Referenz (E-Mail-Sicherheit):** `claude/components/problem-loesung-trustbar-email-sicherheit.html` (kombinierte Datei mit der siebten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Achte Referenz (KI-Telefonassistent):** `claude/components/problem-loesung-trustbar-ki-telefonassistent.html` (kombinierte Datei mit der achten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Neunte Referenz (WhatsApp-Chatbot):** `claude/components/problem-loesung-trustbar-whatsapp-chatbot.html` (kombinierte Datei mit der neunten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

**Zehnte Referenz (Prozessautomatisierung):** `claude/components/typische-anwendungsfaelle-prozessautomatisierung.html` (kombinierte Datei mit Komponente 22i „Typische Anwendungsfälle“, s.u.) — identisches Marquee-Muster, unverändert. Hier ohne begleitende Komponente 19 (kein Problem-&-Lösung-Abschnitt auf dieser Seite, stattdessen die Flip-Card-Sektion).

**Elfte Referenz (Webseiten):** `claude/components/problem-loesung-trustbar-webseiten.html` (kombinierte Datei mit der zehnten Referenz von Komponente 19, s.o.) — identisches Marquee-Muster, unverändert.

### 21. FAQ (Leistungsseiten)

Identisches Muster zur Startseiten-FAQ (Komponente 15): bg-hell (`#F1F3F0`), zentrierte Kopfzeile (H2 „Häufige Fragen" + Subline), darunter ein Akkordeon aus Karten (weiß, `border-radius:16px`, dezenter Schatten). Single-Open-Verhalten — es kann immer nur eine Frage gleichzeitig geöffnet sein, das Öffnen einer neuen Frage schließt automatisch die vorherige. Chevron-Icon rechts in rundem Kreis-Badge, wechselt beim Öffnen auf Verlauf-Hintergrund (`#4FB8A6 → #1B6E7A`) und rotiert 180°. Erste Frage ist standardmäßig geöffnet. `prefers-reduced-motion: reduce` deaktiviert die Höhen-/Rotations-Transitions.

**Inhalt (IT-Betreuung, 8 Fragen final):** Kosten (ab 30 €/Gerät/Monat), Zielgruppe (2–100 Mitarbeitende), Abrechnungsmodelle (Festpreis monatlich vs. Projekt nach Aufwand), Umzugsdauer (2–3 Wochen), Reaktionszeiten (Standard 4–24h, Notfall 1–8h, Support-Zeiten 8–18 Uhr), fester Ansprechpartner, Vor-Ort-Verfügbarkeit (Rhein-Main-Gebiet + Remote), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit).

**Responsive:** ab 600px Breite reduzierte Innenabstände/Schriftgrößen, sonst identisches Verhalten wie Komponente 15 auf allen Breakpoints.

**Referenzimplementierung:** `claude/components/faq-it-betreuung.html` im Cowork-Projekt.

**Zweite Referenz (Server-Betreuung, identisches Muster, andere Inhalte, 8 Fragen final):** `claude/components/faq-server-betreuung.html`. Kosten (ab 79 €/Server/Monat), betreute Server-Arten (physisch, VM, Cloud; Windows Server oder Linux; Fileserver/Domain-Controller/Datenbank-/Anwendungsserver), Backup-Ablauf (3-2-1-Regel, Überwachung + Wiederherstellungstests), Update-Zeitpunkt (feste Wartungsfenster außerhalb der Kernbetriebszeiten, vorab geprüft), Übernahme bestehender Server vs. Neuaufbau, Reaktionszeit bei Serverausfall (1–8h kritisch, 4–24h Standard, abhängig vom Paket), Vorgehen bei Totalausfall (Rückspielung auf Ersatz-Hardware/neue VM), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21 IT-Betreuung). Getestet: Desktop (1280px, Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Dritte Referenz (VPN / Fernzugriff, identisches Muster, andere Inhalte, 8 Fragen final):** `claude/components/faq-vpn.html`. Kosten (abhängig von Nutzer-/Standortanzahl sowie Einzelzugang vs. Standortvernetzung, Angebot nach Bedarfsklärung), Geräte-Kompatibilität (Windows, macOS, Linux, iOS, Android), Einrichtungsdauer (Einzelzugang wenige Tage; Standortvernetzung abhängig von bestehender Netzwerktechnik), Offboarding (Zugang wird bei Austritt gesperrt, i. d. R. zum letzten Arbeitstag, Zugriffe personenbezogen nachvollziehbar), Eignung für mehrere Standorte (Site-to-Site-Verbindungen), Verbindungssicherheit (verschlüsselter Tunnel nach aktuellem Standard, laufend überwacht — Kontrast zu einmalig eingerichteten Lösungen), zusätzliche Hardware (für Einzelzugänge meist nicht nötig, für Standortvernetzung ggf.), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Vierte Referenz (Hardware-Beschaffung, identisches Muster, andere Inhalte, 8 Fragen final):** `claude/components/faq-hardware-beschaffung.html`. Kauf vs. Leasing (beides möglich, Beratung je nach Liquidität/Austauschrhythmus), Hersteller-Unabhängigkeit (keine Markenbindung, Auswahl nach Einsatzzweck/Budget), Lieferdauer (gängige Geräte wenige Werktage, individuell konfigurierte/knappe Hardware ggf. Wochen), Auslieferungszustand (fertig eingerichtet: Betriebssystem, Software, Zugänge, Sicherheitseinstellungen), Altgeräte-Entsorgung (datenschutzkonforme Löschung + fachgerechte Entsorgung/Weiterverwertung), Garantieabwicklung (Garantiezeiten je Gerät erfasst, Reklamation direkt mit Hersteller), Mindestbestellmenge (auch Einzelgeräte möglich, bessere Konditionen bei größeren Bestellungen), einmalige Bestellung vs. laufende Zusammenarbeit (auch als dauerhafte Geräteflotten-Planung im Rahmen der IT-Betreuung möglich). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Fünfte Referenz (Microsoft 365, identisches Muster, andere Inhalte, 8 Fragen final):** `claude/components/faq-m365.html`. Kosten (abhängig von Nutzeranzahl und Betreuungsumfang, Angebot nach Bedarfsklärung), Plan-Wahl (Empfehlung nach tatsächlichem Bedarf statt pauschal teuerster Plan), Migration bestehender Postfächer (E-Mails/Kalender/Kontakte/Dateien ohne Datenverlust, bestehende Domain bleibt erhalten), Onboarding/Offboarding (Postfach/Lizenz/Teams-Zugang vor Starttermin eingerichtet, Zugang bei Austritt zuverlässig gesperrt), Backup-Notwendigkeit (Microsofts eingebaute Aufbewahrung ist kein vollwertiges Backup gegen Löschung/Ransomware — zusätzliche unabhängige Datensicherung), Multi-Faktor-Authentifizierung (standardmäßig umgesetzt, inkl. Anmelderegeln gegen auffällige Zugriffe), bestehende Domain-Nutzung (wird eingebunden, E-Mail-Adressen bleiben unverändert), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Sechste Referenz (Datensicherung, identisches Muster, andere Inhalte):** `claude/components/faq-datensicherung.html`. 8 Fragen final: Kosten (richtet sich nach Datenmenge, Systemanzahl, Aufbewahrungsdauer — konkretes Angebot nach kurzem Blick auf die Umgebung), Backup-Strategie (3-2-1-Regel: mind. drei Kopien, zwei Medien, eine räumlich getrennt), Sicherungshäufigkeit (je nach Datenkritikalität mehrmals täglich bis stündlich, gemeinsam festgelegt), Aufbewahrungsdauer (mehrere Wochen kurzfristig, Monate bis Jahre langfristig für ausgewählte Daten, nach Bedarf/Vorgaben), Ransomware-Schutz der Backups (mind. eine Kopie unveränderlich oder physisch getrennt vom Produktivnetzwerk), Wiederherstellungsgeschwindigkeit (abhängig von Datenmenge/System — einzelne Dateien schnell, vollständige Serverwiederherstellung dauert länger, realistische Zeitrahmen vorab besprochen), Wiederherstellungs-Tests (regelmäßige Stichproben-Rückspielung zur Funktionskontrolle), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Achte Referenz (E-Mail-Sicherheit, identisches Muster, andere Inhalte):** `claude/components/faq-email-sicherheit.html`. 6 Fragen final: Kosten (richtet sich nach Anzahl der Postfächer und gewünschtem Schutzumfang — konkretes Angebot nach kurzem Blick auf die Umgebung), Abgrenzung zum Standard-Spamfilter des Providers (erkennt offensichtlichen Spam, lässt gezielte Phishing-Versuche durch — zusätzliche Prüfung von Absender, Inhalten, Links, Anhängen, laufend an neue Angriffsmuster angepasst), Anhang-/Link-Prüfung (Anhänge vor Zustellung auf Schadsoftware geprüft, Links auf gefälschte/schädliche Ziele), Schutz vor gefälschten Absendern/CEO-Fraud (technische Absenderauthentifizierung erkennt gefälschte/nachgeahmte Adressen), Vorgehen bei tatsächlichem Phishing-Versuch (Mail wird vor Zustellung blockiert, gemeldete verdächtige Mails werden geprüft und Filterregeln bei Bedarf angepasst), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Neunte Referenz (KI-Telefonassistent, identisches Muster, andere Inhalte):** `claude/components/faq-ki-telefonassistent.html`. 7 Fragen final: Kosten (richtet sich nach Anrufvolumen und Funktionsumfang — konkretes Angebot nach kurzem Blick auf den Bedarf), Erkennbarkeit als KI (Stimme klingt natürlich, transparenter Hinweis zu Gesprächsbeginn aus rechtlichen und Fairness-Gründen), Kalenderanbindung (prüft freie Zeiten, trägt Termine direkt ein inkl. Bestätigung an den Anrufer, ohne Team-Eingriff), Umgang mit unbeantwortbaren Fragen (Anfrage wird aufgenommen und weitergeleitet oder bei Bedarf zu einer echten Person verbunden, statt falscher Antwort), Grad der Telefonzentrale-Ablösung (frei wählbar — von Randzeiten/Standardanfragen bis vollständige Übernahme), Sprachunterstützung (Deutsch/Englisch standardmäßig, weitere Sprachen auf Wunsch), Vertragsbindung (monatlich kündbar, 10–20% Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Zehnte Referenz (WhatsApp-Chatbot, identisches Muster, andere Inhalte):** `claude/components/faq-whatsapp-chatbot.html`. 5 Fragen final: Kosten (richtet sich nach Nachrichtenvolumen und Funktionsumfang — konkretes Angebot nach kurzem Blick auf den Bedarf), bestehende WhatsApp-Nummer nutzbar (Chatbot wird i. d. R. an die vorhandene Geschäftsnummer über die offizielle WhatsApp Business Plattform angeschlossen), Verständnis von Bildern/Dokumenten (neben Text auch Bilder, Sprachnachrichten und Dokumente je nach Anwendungsfall), Umgang mit unlösbaren Anfragen (Weiterleitung an das Team inkl. Chatverlauf statt falscher Antwort), Vertragsbindung (monatlich kündbar, 10–20 % Rabatt bei Jahreslaufzeit — identisch zu Komponente 15/21). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Elfte Referenz (Prozessautomatisierung, identisches Muster, andere Inhalte):** `claude/components/faq-prozessautomatisierung.html`. 6 Fragen final: Kosten (richtet sich nach Umfang und Komplexität des Prozesses — konkretes Angebot nach kurzem Blick auf den Ablauf), welche Prozesse sich eignen (wiederkehrende, regelbasierte Abläufe wie Rechnungsverarbeitung, Datenabgleich, Berichte, Benachrichtigungen), Programmierkenntnisse nötig (nein — fertig laufende Lösung wird übergeben, Team bedient sie wie gewohnt), Umsetzungsdauer (wenige Tage bis zwei Wochen bei klar abgegrenztem Prozess, länger bei mehreren Systemen), Umgang mit späteren Prozessänderungen (Automatisierung wird angepasst, jede Lösung dokumentiert), Verhältnis zur bestehenden Software (ergänzt und verbindet vorhandene Systeme, ersetzt sie nicht). Kein eigener Vertragsbindungs-Punkt in dieser Referenz (abweichend von den anderen FAQ-Referenzen). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

**Zwölfte Referenz (Webseiten, identisches Muster, andere Inhalte):** `claude/components/faq-webseiten.html`. 6 Fragen final: Kosten (richtet sich nach Umfang, Funktionen und Anzahl der Seiten — konkretes Angebot nach kurzem Blick auf den Bedarf), Erstellungsdauer (schlanke Website meist innerhalb weniger Wochen, umfangreichere Projekte entsprechend länger, Zeitrahmen vorab gemeinsam festgelegt), Wartung nach dem Launch (ausdrücklich empfohlen — Updates/Backups/Sicherheitschecks laufen laufend im Hintergrund), Auffindbarkeit bei KI-Systemen (strukturierte Daten und semantisches HTML von Anfang an mit eingebaut, zusätzlich zur klassischen Google-Optimierung), Inhalte selbst bearbeiten (einfacher Zugang ohne Programmierkenntnisse, für größere Änderungen weiterhin Unterstützung), Umzug einer bestehenden Website (Übernahme von Inhalten und Domain, keine Sichtbarkeitsverluste bei Google). Kein eigener Vertragsbindungs-Punkt in dieser Referenz (abweichend von den Abo-Leistungsseiten, analog zur Prozessautomatisierung-Referenz — Website-Erstellung ist ein einmaliges Projekt, keine laufende Abo-Leistung). Getestet: Desktop (1280px, Standard-Zustand + Single-Open-Verhalten bestätigt — Öffnen von Frage 3 schließt automatisch Frage 1) und Mobile (390px, Standard-Zustand) sauber ohne Layout-Fehler.

### 22a. Einsatzszenarien (Hub-and-Spoke-Diagramm, Leistungsseiten)

Neue eigenständige Komponente (bisher nicht existent, erstmals bei VPN/Fernzugriff eingeführt). Bg-dark (`#0B2E3C`) mit dezenter radialer Türkis-Glow-Textur, zentrierte Kopfzeile (Eyebrow „Einsatzszenarien" + H2 + Intro-Absatz). Darunter ein animiertes Hub-and-Spoke-Diagramm: ein zentraler runder „Hub" („Ihr Firmennetzwerk", pulsierender Glow-Ring, `animation:pulse`) mit vier peripheren Szenario-Knoten in den vier Ecken, verbunden durch gestrichelte, laufend animierte SVG-Pfade (`stroke-dasharray` + `stroke-dashoffset`-Keyframe „flow"). Beim Hover/Focus auf einen Knoten hebt sich dessen Verbindungslinie hervor (volle Deckkraft + größere Strichbreite), alle anderen Linien dimmen ab (`diagram.has-active` steuert die Opacity aller Pfade global); der gehoverte Knoten-Icon-Kreis füllt sich mit dem Standard-Verlauf. Vier Szenarien: Homeoffice, Außendienst & unterwegs (beide „Einzelne Mitarbeiter"), Standortvernetzung („Mehrere Standorte"), Externer Zugriff für Dienstleister & Partner („Externe Partner").

**Responsive:** Diagramm bleibt bis 820px Breite erhalten (bei 900px getestet, unverändert korrekt), darunter (Mobile) weicht es komplett einer gestapelten Karten-Liste (`.mobile-list`/`.mcard`) mit denselben vier Einträgen, Icons dort direkt mit Verlauf-Hintergrund gefüllt (kein Hover-Zustand nötig, da Touch). `prefers-reduced-motion: reduce` stoppt sowohl die Leitungs- als auch die Hub-Puls-Animation.

**Getestet:** Desktop (1280px, Default- und Hover-Zustand auf Knoten „Homeoffice" — Icon-Füllung und Linien-Hervorhebung funktionieren), Tablet (900px, Diagramm-Variante bleibt korrekt erhalten), Mobile (390px, Karten-Liste statt Diagramm, alle vier Einträge korrekt mit gefüllten Icons).

**Referenzimplementierung:** `claude/components/einsatzszenarien-vpn.html` im Cowork-Projekt.

### 22b. Bild-Text-Split-Sektion (zweispaltig, Leistungsseiten)

Neue eigenständige Komponente (bisher nicht existent, erstmals bei Hardware-Beschaffung eingeführt). Bg-hell (`#F1F3F0`), zweispaltiges Grid (Text links, Bild rechts, `gap:64px`, vertikal zentriert). Textspalte: Eyebrow-Label mit Punkt-Icon (z. B. „Passende Ausstattung"), H2, ein bis zwei Absätze Fließtext. Bildspalte: gestrichelt umrandeter Platzhalter-Container (`border:1.5px dashed`, `border-radius:20px`, `aspect-ratio:4/5`) mit zentriertem Icon-Badge + Label „Bildplatzhalter" — reserviert die Fläche für ein später einzusetzendes echtes Foto/Bild.

**Responsive:** ab 820px Breite einspaltig gestapelt, Bildspalte per `order:-1` vor den Text gezogen (Bild zuerst, dann Text) und Seitenverhältnis auf `16/10` verbreitert; ab 560px reduzierte Innenabstände/Schriftgröße.

**Getestet:** Desktop (1280px, zweispaltig), Tablet (800px, einspaltig gestapelt mit Bild oben — Breakpoint-Wechsel bei 820px bestätigt), Mobile (390px) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/ausstattung-hardware-beschaffung.html` im Cowork-Projekt. Diese Sektion ist spezifisch für die Hardware-Beschaffung-Seite (Thema „Passende Ausstattung"); bei Wiederverwendung auf anderen Leistungsseiten ändern sich nur Eyebrow/Headline/Text, nicht Struktur oder Styling.

### 22c. Feature-Grid-Sektion (2×2, mit hervorgehobener Karte, Leistungsseiten)

Neue eigenständige Komponente (bisher nicht existent, erstmals bei Microsoft 365 als „Microsoft Teams"-Sektion eingeführt). Bg-dark (`#0B2E3C`) mit dezenter radialer Türkis-Glow-Textur (oben links statt zentriert wie bei Komponente 19). Kopfzeile mit Eyebrow-Label, H2, Intro-Absatz. Darunter ein 2×2-Karten-Grid (`gap:18px`): jede Karte hat einen Icon-Badge (Verlauf-getönter Kreis, `border-radius:13px`), Titel und Beschreibungstext. Eine Karte kann als `.highlight` markiert werden — verstärkter Verlauf-Hintergrund/Border plus optionalem Eyebrow-Tag-Badge oberhalb des Icons (z. B. „Ersetzt die klassische Telefonanlage"), um eine besonders relevante Funktion hervorzuheben. Karten heben sich beim Hover leicht an (`translateY(-3px)`) mit verstärktem Hintergrund/Border, identisch zum Hover-Verhalten von Komponente 19.

**Responsive:** ab 760px Breite Karten einspaltig gestapelt; ab 560px reduzierte Innenabstände/Schriftgrößen.

**Getestet:** Desktop (1280px, inkl. Hover-Zustand auf Karte 1) und Mobile (390px, einspaltig gestapelt, Highlight-Karte mit Tag-Badge korrekt) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/teams-m365.html` im Cowork-Projekt. Diese Sektion ist spezifisch für die Microsoft-365-Seite (Thema „Microsoft Teams"); bei Wiederverwendung auf anderen Leistungsseiten ändern sich Eyebrow/Headline/Text/Icons/Highlight-Karte, nicht Struktur oder Styling.

### 22d. Tool-Grid-Sektion (2×2, Bg-hell, Leistungsseiten)

Neue eigenständige Komponente (bisher nicht existent, erstmals bei Microsoft 365 als „Die wichtigsten M365-Tools"-Sektion eingeführt, ergänzend zu Komponente 22c). Bg-hell (`#F1F3F0`), Kopfzeile mit Eyebrow-Label, H2, Intro-Absatz. Darunter ein 2×2-Karten-Grid (`gap:20px`, weiße Karten `<ul class="grid"><li class="card">`, dezenter Schatten): jede Karte hat einen quadratischen Icon-Badge (heller Verlauf-Tönung, `border-radius:12px`), Titel und Beschreibungstext. Beim Hover hebt sich die Karte an (`translateY(-4px)`), Schatten verstärkt sich, Border erhält Türkis-Ton, und der Icon-Badge füllt sich mit dem Standard-Verlauf, während die SVG-Icon-Strichfarbe auf Weiß wechselt (`.card:hover .ico svg path{ stroke:#FFFFFF; }` überschreibt den `stroke="url(...)"`-Verlauf des Icons — funktioniert, da CSS-Deklarationen Präsentationsattribute überschreiben). Optionale `.featured`-Modifier-Klasse für eine hervorgehobene Karte (leichter Verlauf-Hintergrund) ist vorbereitet, wird in der Referenzimplementierung aktuell nicht genutzt.

**Responsive:** ab 560px Breite Karten einspaltig gestapelt (bleibt bis dahin zweispaltig, kein separater 900px-Zwischenschritt nötig); reduzierte Innenabstände/Schriftgröße ab 560px.

**Getestet:** Desktop (1280px, inkl. Hover-Zustand auf Karte 1 — Icon-Verlauf-Füllung und weiße Strichfarbe per Zoom-Screenshot bestätigt) und Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/tools-m365.html` im Cowork-Projekt. Diese Sektion ist spezifisch für die Microsoft-365-Seite (Thema „weitere M365-Bausteine": Outlook/Exchange, SharePoint, OneDrive, Word/Excel/PowerPoint); bei Wiederverwendung auf anderen Leistungsseiten ändern sich Eyebrow/Headline/Text/Icons/Kartenzahl, nicht Struktur oder Styling.

### 22e. Sicherungs-Kreislauf-Sektion (4-Segment-Kreisdiagramm, Leistungsseite Datensicherung)

**Kontext:** Besondere Sektion direkt nach dem Hero auf der Leistungsseite „Datensicherung" — visualisiert den fortlaufenden Backup-Prozess als geschlossenen Kreislauf, nicht als linearen Ablauf (Abgrenzung zu Komponente 5, dem Zeitstrahl/Ablauf-Template).

**Aufbau:** Bg-dunkel (`#0B2E3C`) mit radialem Türkis-Glow von oben (analog Komponente 19/20), zentrierter Kopfbereich (Eyebrow, H2, Subtext), darunter ein quadratisches Kreisdiagramm (`aspect-ratio:1/1`, max. 680px): vier gleich große Kreissegmente (reines SVG, `viewBox="0 0 700 700"`) in aufsteigender Verlauf-Intensität (Segment 1 am hellsten/transparentesten bis Segment 4 am kräftigsten getönt — visualisiert den „Fortschritt" im Kreislauf), mit dünner Trennlinie zwischen den Segmenten. In der Mitte ein kreisrunder Hub (dunkler Hintergrund, Titel „Der Sicherungskreislauf" + Kurzbeschreibung), außen auf den vier Segmenten platzierte Textknoten (Nummer 01–04, Titel, Beschreibung, kleines Frequenz-Tag in Caps wie „TÄGLICH"/„LAUFEND"/„QUARTALSWEISE"/„JE TEST"). Unter dem Kreis ein kleiner Hinweis mit Kreispfeil-Icon: „Nach dem letzten Schritt beginnt der Kreislauf erneut bei Schritt 1."

**Vier Phasen (Referenzinhalt Datensicherung):** 01 Sichern (automatisiert, verschlüsselt, in getrennter Umgebung — täglich), 02 Aufbewahren (mehrere Versionsstände parallel verfügbar — laufend), 03 Prüfen (echte Testwiederherstellung von Datei und Postfach — quartalsweise), 04 Protokoll (schriftlicher Nachweis für Kunde und ggf. Versicherung — je Test).

**Responsive:** Ab 760px Breite reduziert sich der Kreis auf reine Titel/Nummern/Frequenz-Tags (Beschreibungstexte werden ausgeblendet, Hub-Subtext ebenfalls), darunter erscheint eine gestapelte Legende (Nummer + Titel + volle Beschreibung je Zeile, durch Trennlinien abgesetzt) — der Kreis bleibt als visuelles Element sichtbar, die Textdetails wandern darunter. Ab 420px zusätzlich verkleinerte Schriftgrößen in den Knoten.

**Getestet:** Desktop (1280px, inkl. Hover-Zustand auf einem Segment), Tablet-Breakpoint (700px, Legende erscheint korrekt) und Mobile (390px, Legende + reduzierter Kreis) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/kreislauf-datensicherung.html` im Cowork-Projekt. Diese Sektion ist spezifisch für die Datensicherung-Seite (Thema „Backup als Kreislauf"); bei Wiederverwendung auf anderen Leistungsseiten mit zyklischen Prozessen ändern sich Eyebrow/Headline/Text/Phasenzahl/-inhalte, nicht Struktur oder Styling.


### 22f. Kostenvergleich-Tabelle (Bg-dark, Leistungsseiten mit quantifizierbarem Nutzen)

**Kontext:** Besondere Sektion auf der Leistungsseite „KI-Telefonassistent“ — stellt die Kosten eines klassischen Personalansatzes (Teilzeitkraft für Telefonannahme) den Kosten der KI-Lösung direkt gegenüber.

**Aufbau:** Bg-dunkel (`#0B2E3C`) mit radialem Türkis-Glow oben links (analog Komponente 19/20), linksbündiger Kopfbereich (Eyebrow, H2, Subtext), darunter eine Vergleichstabelle als CSS-Grid-Zeilen (`grid-template-columns:1.1fr 1fr 1fr`): Kopfzeile mit den beiden Vergleichsspalten-Titeln, darunter je eine Zeile pro Vergleichskriterium (Label + zwei Werte), getrennt durch dünne Trennlinien. Die KI-Spalte ist durchgehend in Türkis (`#7FD9C4`, Space Grotesk 600) hervorgehoben, die Personal-Spalte in normalem Weiß/Grau. Abschließender Fazit-Satz unterhalb der Tabelle.

**Referenzinhalt (KI-Telefonassistent):** Vergleich „Mitarbeiter, 20 Std./Woche“ vs. „KI-Telefonassistent“ über sechs Kriterien: Kosten in einem Jahr (18.000–27.000 € vs. ab 1.430 €, Solo × 12), Erreichbarkeit (Mo–Fr vormittags vs. 24/7), Urlaub/Krankheit/Kündigung (wirkt sich aus vs. entfällt), Einarbeitung (Wochen vs. Tage), Verfügbar ab (Personalfindung vs. ab nächster Woche), Einsatzort (vor Ort/Homeoffice vs. deutschlandweit remote).

**Responsive:** Ab 640px Breite wird die Kopfzeile ausgeblendet und jede Vergleichszeile bricht auf eine eigene Karten-artige Zeile um — das Kriterium erscheint als kleine Caps-Beschriftung darüber, darunter beide Werte je mit vorangestelltem Spaltennamen (`content:attr(data-k)`) statt der Tabellen-Kopfzeile. Ab 560px zusätzlich reduzierte Sektions-Innenabstände und kleinere Überschrift.

**Getestet:** Desktop (1280px), Breakpoint-Kontrolle (640px) und Mobile (390px, Label-Wert-Darstellung) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/kostenvergleich-ki-telefonassistent.html` im Cowork-Projekt. Diese Sektion ist spezifisch für Leistungsseiten mit klar quantifizierbarem Kostenvorteil gegenüber der klassischen/manuellen Alternative; bei Wiederverwendung ändern sich Eyebrow/Headline/Vergleichskriterien/Werte, nicht Struktur oder Styling.

### 22g. Ersparnis-Rechner — „Rechnen Sie selbst“ (interaktiv, Leistungsseiten mit quantifizierbarem Nutzen)

**Kontext:** Besondere Sektion auf der Leistungsseite „KI-Telefonassistent“ — interaktiver Rechner, mit dem der Besucher anhand seiner eigenen Angaben (Anrufvolumen, Stundenlohn) live seine individuelle Ersparnis sieht, statt nur die pauschale Kostenvergleich-Tabelle (Komponente 22f) zu lesen.

**Aufbau:** Bg-hell Sektion mit linksbündigem Kopfbereich (Eyebrow, H2, Subtext), darunter eine zweispaltige weiße Karte (`border-radius:20px`, Schatten) im Verhältnis 1.05fr/0.95fr: links „Ihre Angaben“ mit vier Range-Slidern (Anrufe/Tag, Minuten/Anruf, Anteil den die KI übernimmt, Stundenlohn — Wert jeweils live rechts neben dem Label) sowie darunter ein Toggle-Schalter „Arbeitgeber-Vollkosten einrechnen“ (Standard: an). Rechts ein Bg-dark-Ergebnis-Panel (`#0B2E3C`) mit Hero-Stat „Eingesparte Zeit pro Monat“ (große Zahl + „Std.“), darunter ein Zwei-Spalten-Paar „Heutige Kosten“ vs. „Kosten mit Assistent“, darunter „Ersparnis pro Monat“ in Türkis (`#7FD9C4`) hervorgehoben, und ein kleiner Hinweistext zum Kombi-Rabatt mit dem WhatsApp-Chatbot. Slider-Thumbs nutzen den Standard-Gradient (`#4FB8A6→#1B6E7A`), der Toggle färbt sich bei „an“ ebenfalls im Gradient.

**Logik:** Alle Werte werden bei jedem `input`-Event (Slider-Bewegung oder Toggle) live neu berechnet, keine Server-Anfrage. Feste Annahmen: `WORKDAYS_PER_MONTH = 21`, `EMPLOYER_COST_FACTOR = 1.3` (grobe Näherung für Lohnnebenkosten, nur wenn Vollkosten-Toggle aktiv). Die KI-Kosten folgen einer Staffelpreis-Funktion nach Anrufen/Tag: ≤ 20 Anrufe → 119 €, 21–80 → 359 €, 81–100 → 599 € (identische Staffel wie im Pricing der Seite). Berechnung: tägliche Minuten = Anrufe×Minuten, monatliche Minuten = ×21 Arbeitstage, KI-Minuten = Anteil-% davon, eingesparte Stunden = KI-Minuten/60, heutige Kosten = eingesparte Stunden × (Stundenlohn bzw. Stundenlohn×1.3), Ersparnis = heutige Kosten − KI-Kosten. Standardwerte bei Seitenaufruf: 25 Anrufe/Tag, 4 Minuten/Anruf, 80 % KI-Anteil, 23 € Stundenlohn, Vollkosten an → ergibt 28 Std./478 € Ersparnis als Ausgangsanzeige.

**Responsive:** Ab 780px Breite bricht die zweispaltige Karte auf eine Spalte um (Eingabe-Bereich über Ergebnis-Panel gestapelt). Ab 560px zusätzlich reduzierte Sektions- und Karten-Innenabstände sowie kleinere Überschrift.

**Getestet:** Desktop (1280px, Ausgangszustand), Live-Neuberechnung nach Slider-Änderung (Anrufe/Minuten/Anteil/Stundenlohn gleichzeitig geändert — alle Ergebniswerte aktualisieren korrekt) und nach Deaktivieren des Vollkosten-Toggles (Werte sinken korrekt), sowie Mobile (390px, einspaltig gestapelt) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/rechnen-sie-selbst-ki-telefonassistent.html` im Cowork-Projekt. Diese Sektion ist spezifisch für Leistungsseiten mit individuell quantifizierbarem Nutzen (variables Volumen × Preis); bei Wiederverwendung ändern sich Eingabefelder, Staffelpreis-Logik und Ergebnis-Beschriftungen, nicht Struktur oder Styling.

### 22h. Wie eine Konversation abläuft (Sticky-Textspalte + Prozess-Karten, WhatsApp-Chatbot)

**Kontext:** Besondere Sektion auf der Leistungsseite „WhatsApp-Chatbot“ — erklärt in vier Schritten, wie eine einzelne Konversation vom Eingang der Nachricht bis zur Lösung abläuft, inklusive Hinweis auf automatisch eingebundene Drittsysteme.

**Aufbau:** Bg-hell Sektion, zweispaltiges Layout (0.85fr/1.15fr). Linke Spalte: Eyebrow, H2 mit farbig hervorgehobenem Akzentwort (Gradient-Textclip), Subtext — auf Desktop-Breite vertikal zentriert `position:sticky`, sodass die Erklärung beim Scrollen der rechten Spalte sichtbar bleibt. Rechte Spalte: gestricheltes Rahmen-Panel (`border-radius:22px`), darin drei gestapelte weiße Karten (Schritt 1–3) mit Icon-Kachel, Kicker-Titel und Kurztext, verbunden durch eine gepunktete vertikale Trennlinie. Schritt 3 ist als „Kernstück“ hervorgehoben (dezenter Gradient-Hintergrund, farbiger Badge-Tag, Icon dauerhaft im Gradient statt nur bei Hover) und enthält zusätzlich eine Reihe kleiner Pill-Chips für angebundene Systeme. Außerhalb des gestrichelten Rahmens folgt ein Abwärtspfeil und eine vierte, freistehende Abschlusskarte (rund es Icon statt Kachel) für den letzten Schritt. Alle Karten heben bei Hover leicht an (`translateY`), verstärken den Schatten und färben das Icon in den Gradient um (Icon-Strokes wechseln auf Weiß).

**Referenzinhalt (WhatsApp-Chatbot):** 01 Nachricht kommt an (Anfrage trifft sofort beim Chatbot ein), 02 Anliegen wird verstanden (Chatbot erkennt, worum es geht), 03 Antwort oder Weiterleitung (Kernstück — direkte Antwort oder automatische Anbindung an Kalender/Terminplaner, Wissensdatenbanken, CRM-Systeme, Automatisierung & Schnittstellen), 04 Verlauf bleibt sichtbar (gesamter Chatverlauf im Nachhinein einsehbar, nicht nur der aktuelle Stand).

**Responsive:** Ab 920px Breite bricht das zweispaltige Layout auf eine Spalte um, die linke Textspalte verliert `position:sticky` und wird statisch über dem Prozess-Panel angezeigt. Ab 560px zusätzlich reduzierte Sektions-Innenabstände, kleinere Überschrift und kompaktere Karten/Icon-Kacheln.

**Getestet:** Desktop (1280px, inkl. Hover-Zustand auf der Kernstück-Karte), Breakpoint-Kontrolle (900px, einspaltiges Layout) und Mobile (390px, gestapelt) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/wie-konversation-ablaeuft-whatsapp-chatbot.html` im Cowork-Projekt. Diese Sektion ist spezifisch für Leistungsseiten mit einem mehrstufigen, erklärungsbedürftigen Ablauf innerhalb eines einzelnen Vorgangs (im Unterschied zu Komponente 5 „So arbeiten wir“, die den projektweiten Onboarding-Ablauf beschreibt); bei Wiederverwendung ändern sich Schrittanzahl, Icons, Texte und Chip-Inhalte, nicht Struktur oder Styling.

### 22i. Typische Anwendungsfälle (3D-Flip-Karten, Prozessautomatisierung)

**Kontext:** Zentrale Sektion auf der Leistungsseite „Prozessautomatisierung“ — ersetzt dort die sonst übliche Problem-&-Lösung-Sektion (Komponente 19), da die Seite stattdessen sechs konkrete, wiederkehrende Automatisierungs-Muster zeigt. Trustbar folgt direkt im selben File (siehe Komponente 20, zehnte Referenz).

**Aufbau:** Bg-dark (`#0B2E3C`) radialer Türkis-Glow oben rechts, linksbündiger Kopfbereich (Eyebrow, H2, Subtext), darunter ein 3-Spalten-Grid aus sechs Flip-Karten mit CSS-3D-Transform (`perspective` + `transform-style:preserve-3d`, 0.7s Rotation um die Y-Achse). Vorderseite: Nummern-Badge oben, Icon in Gradient-Ring-Kachel, Titel unten, kleiner Rotations-Hinweis-Icon unten rechts. Bei Hover dreht sich die Karte um 180° und zeigt die Rückseite (Gradient-Flaeche Türkis→Dunkel, Tag „Anwendungsfall 0X“ + Erklärtext). Zusätzlich zu `:hover` schaltet ein Klick/Tap die Klasse `.active` um (per JS), damit die Karten auch auf Touch-Geräten ohne Hover umgeklappt werden können; `tabindex` + Enter/Leertaste-Handler für Tastaturbedienung.

**Referenzinhalt (Prozessautomatisierung):** 01 Datenzusammenführung, 02 System zu System, 03 Formular → System, 04 Rechnungen & Ablage, 05 On-/Offboarding, 06 Eskalation nach Regel — je mit kurzem Vorderseiten-Titel und ausführlicherem Rückseiten-Text.

**Responsive:** Ab 900px Breite wechselt das Grid von 3 auf 2 Spalten. Ab 600px auf 1 Spalte, Kartenhöhe reduziert (220px → 190px). `prefers-reduced-motion: reduce` deaktiviert die Flip-Transition.

**Getestet:** Desktop (1280px, inkl. Hover-Flip auf Karte 1), Breakpoint-Kontrolle (900px, 2-spaltig) und Mobile (390px, 1-spaltig, inkl. Tap-Flip ohne Hover bestätigt) sauber ohne Layout-Fehler.

**Referenzimplementierung:** `claude/components/typische-anwendungsfaelle-prozessautomatisierung.html` im Cowork-Projekt (enthält auch die zehnte Trustbar-Referenz von Komponente 20). Diese Sektion ist spezifisch für Leistungsseiten mit mehreren gleichrangigen, kurz erklärungsbedürftigen Anwendungsbeispielen statt eines klassischen Problem-&-Lösung-Vergleichs; bei Wiederverwendung ändern sich Anzahl/Icons/Texte der Karten, nicht Struktur oder Styling.

### 22j. Ebenen-Stapel (Besondere Sektion, Leistungsseite Webseiten)

**Kontext:** Eigenständige "Besondere Sektion" auf der Leistungsseite "Webseiten", zusätzlich zu den Standard-Sektionen. Zeigt isometrisch gestapelte Karten, die die sechs Ebenen darstellen, aus denen eine von Selim-IT betreute Website besteht: Hosting & Server → Datenschutz & Sicherheit → Content & Struktur → SEO → KI-Auffindbarkeit → Ihre Website (oberste, sichtbare Ebene).

**Aufbau:** Isometrischer Kartenstapel (`.stage-wrap`), sechs übereinanderliegende Ebenen-Karten mit Versatz, per Klick wählbar. Beim Auswählen einer Karte öffnet sich ein Erklärungs-Panel mit Detailtext zur gewählten Ebene. Vor der ersten Interaktion läuft ein CTA-Pulse-Hinweis, um auf die Klickbarkeit aufmerksam zu machen.

**Bekannter, ungelöster Bug (verbindlich vor Produktiv-Einsatz zu beheben):** Unterhalb von 1080px Breite (bestätigt bei 1000px und bei Mobile 390px) überlappt das Erklärungs-Panel nach Auswahl einer Karte sichtbar den Kartenstapel. Ursache: ein negativer `margin-bottom` (`-90px` bzw. `-230px` je Breakpoint) auf `.stage-wrap`, der nur für den leeren/eingeklappten Zustand des Panels passt, nicht aber sobald das Panel durch den Detailtext an Höhe gewinnt. **Entscheidung des Nutzers:** Die Referenzdatei bleibt unverändert wie geliefert (keine eigenmächtige CSS-Korrektur durch Claude) — die Behebung dieses Responsive-Bugs ist Teil der eigentlichen Implementierung durch Claude Code: die `margin-bottom`-Offsets auf `.stage-wrap` müssen unterhalb 1080px so angepasst werden (z. B. dynamisch anhand der tatsächlichen Panel-Höhe statt eines festen negativen Werts), dass Panel und Kartenstapel bei keiner Panel-Auswahl mehr überlappen — auf allen Breakpoints inklusive Mobile.

**Getestet:** Desktop (1280px, alle sechs Karten anklickbar, korrektes Verhalten oberhalb 1080px), Breakpoint-Kontrolle (1000px) und Mobile (390px) — beide Breakpoints zeigen den oben beschriebenen Overlap-Bug, ansonsten funktional (Klick-Handling korrekt, auch bei überlappenden Karten im Stapel).

**Status (16.09.2026): Bug in der Astro-Implementierung behoben** (`src/components/sections/EbenenStapel.astro`). Statt fester negativer `margin-bottom`-Werte bekommt der Stapel-Rahmen per `ResizeObserver` die tatsächlich skalierte Höhe (664 × Skalierung); unterhalb 1080px liegt das Panel einspaltig im normalen Dokumentfluss unter dem Stapel und erscheint erst nach Auswahl einer Karte. Geprüft bei 1000px, 390px und 320px: keine Überlappung, kein horizontaler Scroll.

**Referenzimplementierung:** `claude/components/besondere-sektion-ebenen-webseiten.html`.

### 22. Wissen-Übersichtsseite ("/wissen", eigene Seite)

Eigenständige Seite (kein Startseiten-Abschnitt), bg-hell (`#F1F3F0`), `max-width:1120px`. Kopfzeile wie Komponente 17 (H2 „Wissen" + Subline links, Textlink „Alle Beiträge" rechts — hier ohne Pfeil-Icon, da bereits die Übersichtsseite selbst). Direkt darunter ein **Featured-Artikel** als große Karte (2-spaltiges Grid `1.15fr 1fr`: links Bildbereich mit Verlauf-Hintergrund `#1B6E7A → #0B2E3C` + zentriertem Outline-Icon, rechts Kategorie-Badge, Titel, Teaser, Lesezeit). Darunter ein 3-spaltiges Karten-Grid mit allen weiteren Artikeln (identisches Karten-Muster wie Komponente 17: Bildbereich 132px mit Verlauf + Icon, Badge, 2-zeiliger Titel mit fester Mindesthöhe, Teaser, Lesezeit). Karten heben sich beim Hover 4px an (Shadow verstärkt).

**Responsive:** ab 940px Breite Featured-Karte einspaltig gestapelt (Bildbereich min-height 200px), Artikel-Grid 2-spaltig. Ab 600px Breite (Mobile) Kopfzeile gestapelt (Textlink unter der Headline statt daneben), Artikel-Grid 1-spaltig, Featured-Innenabstände/Titelgröße reduziert. `prefers-reduced-motion: reduce` deaktiviert die Hover-Transitions.

**Inhalt (1 Featured + 9 Artikel, Platzhalter-Inhalte zur Veranschaulichung des Musters, keine finalen Titel):** Featured „Was ist ein Managed Service Provider — und wann lohnt er sich?" (Grundlagen, 8 Min.); Grid: „Was kostet IT-Betreuung im Monat?" (Kosten, 6 Min.), „NIS-2: Welche Unternehmen betroffen sind" (Sicherheit, 9 Min.), „Die 3-2-1-Regel" (Datensicherung, 7 Min.), „Phishing erkennen: 8 Warnzeichen" (Sicherheit, 6 Min.), „Microsoft 365 Business: Welcher Plan passt" (Microsoft 365, 7 Min.), „Welche Arbeitsabläufe sich automatisieren lassen" (Automatisierung, 8 Min.), „VPN im Betrieb" (Homeoffice, 6 Min.), „KI-Telefonassistent: Was er kann" (KI im Betrieb, 7 Min.), „Was eine Firmenwebseite 2026 kostet" (Webseiten, 9 Min.). Die drei Startseiten-Teaser-Artikel (Komponente 17) sind eine Teilmenge dieser vollständigen Liste.

**Referenzimplementierung:** `claude/components/wissen-uebersicht.html` im Cowork-Projekt.

### 23. Wissen-Artikel-Detailseite ("/wissen/<slug>", Blog-Artikel-Template)

Eigenständiges Seiten-Template für einzelne Wissen-Artikel (`<article>`-Element). **Artikel-Hero:** Verlauf-Hintergrund (`#1B6E7A → #0B2E3C`, 150°), `max-width:760px`, Breadcrumb (Startseite › Wissen › Kategorie), Kategorie-Badge in Helltürkis `#7FD9C4`, H1 (Space Grotesk, `clamp(28px,4.2vw,42px)`), Standfirst-Absatz (18px, reduzierte Opacity), Meta-Zeile (Lesezeit + Aktualisierungsdatum). **Artikel-Body:** `max-width:760px`, Fließtext 17px/1.75, H2/H3-Zwischenüberschriften, Listen. **Keypoint-Callout:** weiße Box mit linker Akzent-Border (3px, `--grad-start`), abgerundete rechte Ecken, für hervorgehobene Kernaussagen/Rechenbeispiele. **Tabellen:** weißer Hintergrund, abgerundete Ecken, Kopfzeile leicht getönt (`rgba(27,110,122,0.08)`). **FAQ-Block:** eigene Sektion am Artikelende, einzelne weiße Karten (nicht als Akkordeon, alle Antworten direkt sichtbar) — Inhalt identisch zu den `FAQPage`-Schema-Daten. **Abschluss-CTA:** Verlauf-Box (Standard-Gradient), weißer Button, Link zu Kontakt/Beratung.

**SEO/Structured Data:** vollständiges Meta-Set (description, canonical, Open Graph, Twitter Card) + JSON-LD `@graph` mit `BlogPosting` (headline, description, datePublished/dateModified, author/publisher als Organization) und `FAQPage` (mainEntity-Array, 1:1 deckungsgleich mit dem sichtbaren FAQ-Block) — verbindliches Muster für alle künftigen Wissen-Artikel.

**Responsive:** ab 600px Breite reduzierte Innenabstände, kleinere Schriftgrößen (H1/H2/Fließtext/Tabellen), Hero-Padding verringert.

**Inhalt (fertige Artikel, final):**
1. „Welche Arbeitsabläufe im Büro sich automatisieren lassen" (Kategorie Automatisierung, 8 Min., Slug `/wissen/bueroablaeufe-automatisieren`) — Der-Test-in-drei-Fragen, lohnende vs. nicht lohnende Kandidaten, 5-Schritte-Projektablauf, 4 FAQ. Referenzimplementierung `claude/components/blog-bueroablaeufe-automatisieren.html`.
2. „Die 3-2-1-Regel: Wie Sie Firmendaten wirklich sicher sichern" (Kategorie Datensicherung, 7 Min., Slug `/wissen/datensicherung-3-2-1-regel`) — 3-2-1- und 3-2-1-1-0-Regel, RPO/RTO-Tabelle (erster Artikel mit Tabellen-Element), DSGVO-/NIS-2-Bezug, 5-Fragen-Selbsttest, 5 FAQ. Referenzimplementierung `claude/components/blog-datensicherung-3-2-1.html`.
3. „Was eine Firmenwebseite kostet — und woran Sie sparen können" (Kategorie Webseiten, 8 Min., Slug `/wissen/firmenwebseite-kosten`) — Baukasten/WordPress/individuell im Vergleich, Kostenübersicht-Tabelle, Fünf-Fragen-Anbieter-Checkliste, 4 FAQ. Referenzimplementierung `claude/components/blog-webseite-kosten.html`.
4. „Was kostet IT-Betreuung im Monat? Preise und Modelle im Überblick" (Kategorie Kosten, 7 Min., Slug `/wissen/it-betreuung-kosten`) — drei Abrechnungsmodelle (pro Gerät/Nutzer/Aufwand), Grundpaket-Checkliste, separat abgerechnete Posten-Tabelle, Rechenbeispiel für 10 Arbeitsplätze; Preise/Reaktionszeiten decken sich mit Komponente 21 (FAQ IT-Betreuung) und `claude/components/pricing-it-betreuung.html`. 4 FAQ. Referenzimplementierung `claude/components/blog-itbetreuung-kosten.html`.
5. „Von der KI empfohlen werden: Was GEO ist und wie es funktioniert" (Kategorie Sichtbarkeit — neue Artikel-Kategorie, 9 Min., Slug `/wissen/ki-auffindbarkeit-geo`) — Generative Engine Optimization, SEO-vs.-GEO-Abgrenzung, 7 wirksame Maßnahmen, was nicht funktioniert (FAQ-Rich-Snippets eingestellt, llms.txt wirkungslos), Mess-Ansätze. 5 FAQ. Referenzimplementierung `claude/components/blog-geo-sichtbarkeit.html`.
6. „KI-Telefonassistent: Was er kann, was er nicht kann" (Kategorie KI im Betrieb, 7 Min., Slug `/wissen/ki-telefonassistent`) — Stärken/Grenzen-Gegenüberstellung, Eignungskriterien je Betrieb, DSGVO-Pflichtpunkte (Transparenz, AVV, Löschkonzept), 5-Schritte-Einrichtungsablauf. 5 FAQ. Referenzimplementierung `claude/components/blog-ki-telefonassistent.html`.
7. „Was ist ein Managed Service Provider — und wann lohnt er sich?" (Kategorie Grundlagen, 8 Min., Slug `/wissen/managed-service-provider`) — MSP-vs.-Systemhaus-Abgrenzung, Leistungsumfang, Eignungskriterien, 4-Punkte-Anbieter-Checkliste, Wechselablauf; dies ist der Featured-Artikel auf Komponente 22 (Wissen-Übersichtsseite). 4 FAQ. Referenzimplementierung `claude/components/blog-msp-grundlagen.html`.
8. „Microsoft 365 Business: Welcher Plan passt zu welchem Betrieb?" (Kategorie Microsoft 365, 7 Min., Slug `/wissen/microsoft-365-plaene-vergleich`) — Vergleich Business Basic / Standard / Premium anhand einer 4-spaltigen Vergleichstabelle (Feature × Plan), getestet und sauber umbrechend bei 1280px und 390px ohne horizontales Scrollen. FAQ zu Plan-Unterschieden und den Preiserhöhungen zum 1. Juli 2026. Referenzimplementierung `claude/components/blog-m365-plaene.html`.
9. „NIS-2: Welche Unternehmen betroffen sind und was jetzt zu tun ist" (Kategorie Sicherheit, 9 Min., Slug `/wissen/nis2-betroffene-unternehmen`) — Zwei-Schritte-Prüfung (Sektor + Schwellenwerte), zehn Pflichtmaßnahmen nach § 30, 24/72-Stunden/1-Monat-Meldepflicht-Stufen, Bußgelder und persönliche Haftung der Geschäftsleitung, 6-Schritte-Vorgehensplan, häufigste Fehleinschätzungen. 5 FAQ. Referenzimplementierung `claude/components/blog-nis2-betroffene.html`.
10. „Phishing erkennen: 8 Warnzeichen in geschäftlichen E-Mails" (Kategorie Sicherheit, 6 Min., Slug `/wissen/phishing-erkennen`) — acht Warnzeichen im Detail (Absenderadresse, Dringlichkeit, geänderte Bankverbindung, abweichendes Link-Ziel, unerwarteter Anhang, unpassende Anrede, Kanalwechsel, Umgehung des Freigabeprozesses/CEO-Fraud), Technik-vs.-Prozess-Abgrenzung, 5-Schritte-Sofortmaßnahmen nach Fehlklick, 4 umsetzbare Schutzmaßnahmen. 4 FAQ. Referenzimplementierung `claude/components/blog-phishing-erkennen.html`.
11. „SEO heute: Was für kleine Unternehmen wirklich zählt" (Kategorie Sichtbarkeit, 8 Min., Slug `/wissen/seo-fuer-unternehmen-heute`) — vier Prioritäten in Reihenfolge (technische Grundlagen, Google-Unternehmensprofil, Inhalte zu konkreten Fragen, externe Erwähnungen), Abschnitt „Was sich 2026 verändert hat" (AI Overviews, Vertrauenssignale, Ende der FAQ-Rich-Snippets), Ignorieren-Liste, 4-Monats-Umsetzungsplan. 5 FAQ. Referenzimplementierung `claude/components/blog-seo-fuer-unternehmen.html`.
12. „VPN im Betrieb: Wann Sie einen brauchen und wann nicht" (Kategorie Homeoffice, 6 Min., Slug `/wissen/vpn-im-unternehmen`) — Abgrenzung, was ein VPN leistet vs. ausdrücklich nicht leistet, 3-Varianten-Tabelle (Client-to-Site/Site-to-Site/Zero Trust), Zero-Trust-Network-Access als Alternative, 5-Punkte-Einrichtungscheckliste, 4-Fragen-Entscheidungshilfe. 4 FAQ. Referenzimplementierung `claude/components/blog-vpn-im-unternehmen.html`.

Mit den ursprünglich in der Wissen-Übersichtsseite (Komponente 22) als Featured + 9 Grid angelegten 10 Artikeln ist die Erst-Bestückung vollständig; Artikel ab Nr. 11 sind zusätzliche, vom Nutzer nachgereichte Inhalte.

---

### 24. Ladescreen (seitenweit — initialer Seitenaufruf + Seitenübergang)

Vollflächiger Ladescreen auf `#0B2E3C` (Tiefsee-Hintergrund), mittig ausgerichtet per Flexbox (`display:flex; align-items:center; justify-content:center` auf `body`, `height:100%` auf `html`/`body`). Inhalt: das Selim-IT-Wortmarken-Logo als Inline-SVG (weißer Schriftzug „Selim" + „IT", `viewBox="0 -25 652.94 243.71"`, Container `#loader{width:320px}`), bei dem der i-Punkt als eigenständiges, animiertes Element (`#dot-wrap` mit `transform-box:fill-box`, darin `#dot` mit eigenem Gradient-Fill `url(#dotGrad)`, Verlauf `#1a6f7b → #4cb7a7`) unabhängig vom restlichen Logo animiert wird.

**Animation:** `#dot` erhält `animation: dotBounce 1.8s cubic-bezier(.45,0,.2,1) infinite` — ein sanftes, endlos wiederholtes Auf-und-Ab zwischen `translateY(0)` (Ruheposition auf dem „i") und `translateY(-100px)` (angehoben, bei 50% der Keyframe-Sequenz). `#loader svg` erhält `overflow:visible`, damit der Punkt beim Hochschweben nicht am SVG-Rand abgeschnitten wird. Dies ist — analog zur Trustbar-Marquee (Komponente 20) und den Float-Animationen im Webseiten-Hero-Visual (Komponente 9) — eine bewusste **Dauerschleifen-Animation** und dadurch von der 300ms-Obergrenze für UI-Animationen im Abschnitt „Animationen" ausdrücklich ausgenommen; die 1.8s-Zykluslänge ist für eine ruhige, meditative Wirkung während der Wartezeit gewählt, nicht für UI-Feedback.

**Verwendung (seitenweit, zwei Einsatzorte):**
1. **Initialer Seitenaufruf:** wird beim ersten Laden der Webseite (bzw. bei jedem harten Seitenaufruf) vollflächig angezeigt, bis die Zielseite bereit ist, und blendet dann aus.
2. **Seitenübergang:** dient als Zwischen-Animation beim Wechsel zwischen Unterseiten (z. B. bei clientseitiger Navigation), damit der Übergang nicht abrupt wirkt.

Die konkrete Ein-/Ausblend-Choreografie (Fade-Dauer, Mindestanzeigedauer, Übergangs-Logik zwischen den Seiten) ist Aufgabe der technischen Umsetzung durch Claude Code und an die Prinzipien aus dem Abschnitt „Animationen" gebunden (u. a. `transform`/`opacity`-only, angemessene Easing-Kurve für Ein-/Ausblenden, kein `ease-in`).

**Accessibility:** `@media (prefers-reduced-motion: reduce){ #dot{ animation:none; } }` — die Punkt-Animation wird bei reduzierter Bewegungspräferenz vollständig deaktiviert, der Punkt bleibt in Ruheposition auf dem „i" stehen; das Logo selbst bleibt sichtbar.

**Referenzimplementierung:** `claude/components/ladescreen.html`. Getestet: Desktop (1280px, Ruhezustand + Zustand während der Aufwärtsbewegung des Punkts) und Mobile (390px, beide Zustände) sauber zentriert ohne Clipping; `prefers-reduced-motion` bestätigt korrekt deaktiviert (Animation greift nicht, Punkt bleibt in Ruheposition).

---

## Sektions-Rhythmus (Startseite)

**Update (finale Reihenfolge vom Nutzer vorgegeben, siehe auch `docs/ANFORDERUNGEN.md` → „Startseite – Sektionsreihenfolge"):**

```
HERO              → Komponente 9, dunkler Verlaufshintergrund, enthält Kopfzeile (Logo hell + Navigation)
                     + Headline/Subline/CTA + Dashboard-Card/Toast-Visual
STICKY HEADER     → erscheint erst beim Verlassen des Hero-Bereichs: bg-hell (`#F0F4F3`), Logo dunkle Variante,
                     dezenter Schatten (siehe Shadow-Strategie)
IHRE VORTEILE     → Komponente 10, bg-dark (`#0B2E3C`), 4-spaltige Vorteils-Leiste
LEISTUNGEN        → Komponente 11, bg-dark, 3-spaltiges Hover-Karten-Grid (9 von 11 Leistungen, siehe Komponente 11)
HOW WE WORK       → Komponente 12, bg-hell, 4 Schritte mit Fortschritts-Pictogrammen, Scroll-Reveal
PRAXISBEISPIEL     → Komponente 13, bg-hell/bg-dark gemischt, aktuell nur Jugend braucht Arbeit e.V.
STARKE PARTNER     → Komponente 14, bg-hell, konzentrische Halbkreis-Bühne mit 10 schwebenden Partner-Chips um das Marken-Icon
FAQ               → Komponente 15, bg-hell, Akkordeon (Einwände klären), 8 Fragen final
CTA + KONTAKTFORMULAR → Komponente 16, bg-hell, 4-stufiger Anfrage-Wizard (Handlung), Bereichsauswahl = 3 Nav-Kategorien
WISSEN/BLOG       → Komponente 17, bg-hell, 3-spaltiges Artikel-Karten-Grid + Link/Button "Alle Beiträge"
FOOTER            → Komponente 18, vollbreiter Verlauf-Hintergrund, 4-Spalten-Grid = 3 Nav-Kategorien + Unternehmen
```

Auf Leistungsseiten gilt dasselbe Muster: HERO (Komponente 9, identisches Hintergrund-Design/Layout, Inhalt der Dashboard-Card/Textblock je Leistung ausgetauscht) → STICKY HEADER beim Scrollen → leistungsspezifische Sektionen (siehe `docs/ANFORDERUNGEN.md` → Leistungsseiten-Template).

## Animationen

**Update: verbindlicher Feinschliff-Standard nach dem „emil-design-eng"-Skill.** Der Nutzer hat den Skill `.claude/skills/emil-design-eng` (Design-Engineering-Philosophie nach Emil Kowalski — Motion-Sonner, professionelles UI-Polishing) als Projekt-Skill hinterlegt und angewiesen, ihn **überall** auf der Webseite anzuwenden. Das gilt sowohl für die noch zu bauende Seite selbst als auch rückwirkend für die Feinjustierung der Timing-/Easing-Werte in allen bereits gelieferten Referenz-Snippets — die Referenzdateien zeigen weiterhin verbindlich Layout, Inhalt und Interaktionslogik, aber ihre konkreten Transition-/Animation-Werte (Dauer, Easing-Funktion) sind mit den folgenden Regeln zu verfeinern, wo sie davon abweichen. Bei der Website-Umsetzung durch Claude Code ist dieser Abschnitt zusammen mit dem Skill selbst maßgeblich.

**Grundprinzip:** Geschwindigkeit wird auch wahrgenommen, nicht nur gemessen — knappe Dauer + starkes Easing wirkt responsiver als es objektiv ist. Jede Animation braucht einen klaren Zweck (räumliche Konsistenz, Zustandsanzeige, Feedback, Vermeidung eines harten Sprungs) — reines „sieht cool aus" reicht nicht, wenn das Element häufig gesehen wird.

**Sollte das überhaupt animiert werden?**

| Häufigkeit | Entscheidung |
|---|---|
| 100+ ×/Tag (Tastenkürzel, wiederkehrende Mikro-Interaktionen) | Nicht animieren |
| Mehrfach täglich (Hover-Effekte, Listen-Navigation) | Entfernen oder stark reduzieren |
| Gelegentlich (Modals, Drawer, Toasts) | Standard-Animation |
| Selten/einmalig (Onboarding, Formular-Feedback) | Delight erlaubt |

**Custom-Easing-Kurven (verbindlich, ersetzen die schwachen CSS-Standardkurven):**

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* UI-Interaktionen, Eintreten/Austreten */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* Bewegung/Morphing auf dem Bildschirm */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-artige Drawer-Kurve */
```

Auswahl-Logik: Element betritt/verlässt die Ansicht → `--ease-out`. Element bewegt/morpht auf dem Bildschirm → `--ease-in-out`. Hover-/Farbwechsel → einfaches `ease`. Konstante Bewegung (Marquee, Fortschrittsbalken) → `linear`. **Nie `ease-in`** für UI-Animationen (fühlt sich träge an, da die Bewegung ausgerechnet im Moment der höchsten Aufmerksamkeit verzögert startet).

**Dauer-Richtwerte (verbindlich, UI-Animationen bleiben unter 300ms):**

| Element | Dauer |
|---|---|
| Button-Press-Feedback | 100–160ms |
| Tooltips, kleine Popover | 125–200ms |
| Dropdowns, Selects | 150–250ms |
| Modals, Drawer | 200–500ms |
| Marketing/erklärend (Hero-Illustrationen, Prozess-Diagramme) | darf länger sein |

**Konkrete, sofort anzuwendende Regeln:**

- **Buttons/Badges müssen sich gedrückt anfühlen:** `transform:scale(0.97)` auf `:active`, `transition:transform 160ms var(--ease-out)`. Gilt für jedes klickbare Element site-weit (Buttons, Badges, FAQ-Fragen, Flip-Cards, Ebenen-Karten usw.), nicht nur die primären CTAs.
- **Nie von `scale(0)` einblenden:** Eintretende Elemente starten mindestens bei `scale(0.95)` kombiniert mit `opacity:0` — nichts erscheint in der echten Welt aus dem Nichts.
- **Popover/Dropdowns sind Ursprungs-bewusst:** `transform-origin` zeigt zum auslösenden Element, nicht `center` (Ausnahme: Modals — die bleiben zentriert, da sie an keinen Trigger gebunden sind).
- **Transitions statt Keyframes bei wiederholt/schnell auslösbaren UI-Elementen** (z. B. Akkordeon-Öffnen/Schließen, Toasts, Flip-Card-Hover): CSS-Transitions lassen sich unterbrechen und neu ansteuern, Keyframes starten immer bei null neu.
- **Hover-Animationen nur unter `@media (hover: hover) and (pointer: fine)`** — Touch-Geräte lösen `:hover` sonst fälschlich per Tap aus (betrifft u. a. den CTA-Hover-Glanz oben, Flip-Card-Hover, Karten-Hover-Anhebung).
- **Nur `transform` und `opacity` animieren** wo möglich — diese laufen auf der GPU und überspringen Layout/Paint; `padding`/`margin`/`width`/`height` vermeiden.
- **Asymmetrisches Eintreten/Verlassen:** Verlassen/Schließen darf spürbar schneller sein als Eintreten/Öffnen (System reagiert schnell, der Nutzer entscheidet langsamer).
- **Gestaffelte Listen (Stagger):** bei mehreren gleichzeitig eintretenden Elementen (z. B. Karten-Grids, FAQ-Liste beim ersten Laden) kurze Verzögerung von 30–80ms zwischen den Elementen, nie länger.
- Max. 4–5 gestaggerte Elemente pro Sektion, Animationen subtil und einmalig (nicht wiederholt), außer bei ausdrücklich als Loop dokumentierten Mustern (Trustbar-Marquee, Float-Animationen der Hero-Visuals/Ebenen-Karten — diese bleiben Dauerschleifen, wie in den jeweiligen Komponenten beschrieben).
- Technisch: View-Transitions/kleines eigenes Reveal-Utility (`RevealOnScroll`-Astro-Island) statt einer schweren Animationsbibliothek – Astro bleibt weitgehend statisch, Animation ist eine dünne, gezielt eingesetzte Insel. Für dynamische, unterbrechbare Interaktionen (Drag, schnelle Zustandswechsel) native CSS-Transitions/WAAPI nutzen statt einer JS-Bibliothek.
- **Pflicht:** `prefers-reduced-motion` respektieren – bei aktivierter Einstellung wird sofort der sichtbare Endzustand gerendert, keine Reveal-/Slide-/Sweep-Animation. Farb- und Opacity-Übergänge, die dem Verständnis dienen, dürfen bestehen bleiben; Bewegungs-/Positions-Animationen werden entfernt, nicht nur verlangsamt.

## Responsive Breakpoints

Tailwind-Standard: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`. Container `max-w-6xl` (nicht `max-w-7xl` – strafferes Layout).

## Bild-Strategie

- Astro Image (sharp) für alle Bilder, `alt`-Texte sinnvoll, dekorative Bilder `alt=""`.
- Hero-Bilder/-Mockups sind inhaltlich (Audio-Player-Visual, WhatsApp-Chat-Mockup), kein generisches Stock-Foto.
- Platzhalter (falls nötig): neutraler Kasten mit klar beschriftetem Hinweistext, nicht `rounded-2xl`.

---

## Zusammenfassung: Die 10 Design-Gebote

1. **Kantig vor rund** bei Cards, **Pill vor eckig** bei Buttons/Badges – bewusster Kontrast, kein einheitlicher Radius.
2. **Border vor Shadow** – Shadow nur gezielt (Premium-Glow, Header beim Scrollen).
3. **Verlauf gezielt, nicht überall** – Gradient für CTAs/Akzente/Badges, sonst solide Flächen aus den 4 Kernfarben.
4. **Straff vor luftig** – `py-16` statt `py-32`.
5. **Space Grotesk + Outfit** statt Inter/Poppins – self-hosted.
6. **Mono für Zahlen** – Kennzahlen, ROI-Ergebnisse, Tabellenköpfe.
7. **Nur die 4 Kernfarben** – keine Zusatzfarben außer über Opacity-Varianten.
8. **Konsistente Komponenten-Bibliothek** – Pricing-, Add-on-, Vergleichs-, Kennzahl-, Zeitstrahl-, ROI-, Zitat-, Hero-Komponente je einmal gebaut, überall wiederverwendet.
9. **Weniger animieren** – 0.5s max., einmalig, `prefers-reduced-motion` respektieren.
10. **Zugänglich vor hübsch** – Kontrast ≥ 4,5:1, sichtbarer Fokus, Tastatur-bedienbar. Verbindlich: `docs/BARRIEREFREIHEIT.md`.

---

<sub>Selim-IT Website-Kit · Stand: 2026-08-29</sub>
