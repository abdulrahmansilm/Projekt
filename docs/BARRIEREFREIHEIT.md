# Barrierefreiheit (WCAG 2.2 AA)

> Diese Datei ist **verbindlich**. Jede generierte Seite und jede Komponente der selim-it.de-Website muss WCAG 2.2 Level AA erfüllen. Barrierefreiheit ist kein optionales Feature und kein Aufpreis-Feature, sie ist Teil der Definition von „fertig". Ziel: **Lighthouse Accessibility 100** und ein sauberer axe-Scan ohne kritische Verstöße.

---

## Warum (rechtlicher Kontext DE)

- Das **Barrierefreiheitsstärkungsgesetz (BFSG)** gilt seit **28.06.2025**. Es setzt den European Accessibility Act in Deutschland um.
- Betroffen sind u. a. Websites mit elektronischem Geschäftsverkehr (Online-Terminbuchung, Vertragsabschluss, Dienstleistungsbuchung). Da selim-it.de über das Kontaktformular eine Terminbuchung (30-Minuten-Erstgespräch) anbietet, ist von einer Anwendbarkeit auszugehen – die rechtliche Bewertung bleibt beim Betreiber/dessen Anwalt.
- **Kleinstunternehmen** (< 10 Mitarbeitende und ≤ 2 Mio. € Jahresumsatz) sind bei Dienstleistungen teils ausgenommen – das ist eine rechtliche Einzelfallfrage.
- **Haltung dieses Kits:** Wir bauen grundsätzlich konform. Das ist günstiger als Nachrüsten, besser fürs SEO/GEO und schützt den Betreiber.

---

## Die 4 Prinzipien (POUR) – konkret für diese Seite

### 1. Wahrnehmbar (Perceivable)

- **Textalternativen:** Jedes Bild hat einen sinnvollen `alt`-Text, der den Zweck beschreibt. Rein dekorative Bilder: `alt=""` (leer, nicht weglassen). Der WhatsApp-Chat-Mockup und das Audio-Player-Visual (KI-Telefonassistent) brauchen eine knappe Beschreibung.
- **Audio-Inhalte:** Das Beispielgespräch im Hero der KI-Telefonassistent-Seite bekommt zwingend ein **Text-Transkript** direkt auf der Seite (nicht nur verlinkt) – Audio allein ist für gehörlose/schwerhörige Nutzer nicht zugänglich.
- **Icons:** Icons, die allein eine Bedeutung tragen, brauchen ein `aria-label` oder begleitenden sichtbaren Text. Icons neben Text sind dekorativ → `aria-hidden="true"`.
- **Kontrast (AA):**
  - Normaler Text: ≥ 4,5:1
  - Großer Text (≥ 24px, oder ≥ 18,66px/14pt bold): ≥ 3:1
  - UI-Komponenten & Grafik-Begrenzungen (Button-Rand, Input-Border, Fokus-Ring, Slider-Knopf): ≥ 3:1
  - `#0B2E3C` auf `#F0F4F3` und `#FFFFFF`/`#F0F4F3` auf `#0B2E3C` sind unkritisch (hoher Kontrast). **Türkis `#4FB8A6` nie als Fließtextfarbe auf hellem Grund** – nur als Verlauf-Bestandteil, Icon-Akzent auf dunklem Grund oder Slider-Element. Details/Werte: `docs/DESIGNSYSTEM.md`.
- **Keine reine Farbcodierung:** z. B. bei „Ohne VPN"/„Mit VPN"-Vergleichs-Cards nie nur über Rot/Grün, sondern zusätzlich über Minus-/Checkmark-Symbol und Text.
- **Reflow & Zoom:** Layout funktioniert bis 200 % Zoom und bei 320px Breite ohne horizontales Scrollen. Kein `user-scalable=no`.
- **Text statt Bild-Text:** Keine wichtigen Texte (Preise, Feature-Listen) als Bild rendern.

### 2. Bedienbar (Operable)

- **Vollständige Tastaturbedienung:** Alles per Tastatur erreichbar – inkl. des 5-Schritte-Kontaktformulars, der ROI-Rechner-Slider (Pfeiltasten), des FAQ-Akkordeons, des Audio-Players.
- **Sichtbarer Fokus:** globaler `:focus-visible`-Stil (siehe `docs/DESIGNSYSTEM.md` → global.css). Nie `outline: none` ohne Ersatz.
- **Skip-Link:** erstes fokussierbares Element ist „Zum Inhalt springen" → `<main id="main">`.
- **Logische Reihenfolge:** DOM-Reihenfolge = visuelle Reihenfolge, kein positives `tabindex`.
- **Touch-Targets:** mindestens 44×44px.
- **Fokus nicht verdeckt (WCAG 2.2):** Sticky-Header darf fokussierte Elemente nicht überdecken → `scroll-margin-top` auf Anker-Ziele.
- **Bewegung:** `prefers-reduced-motion` respektieren (Reveal-Animationen, Zeitstrahl-Hover-Effekte auf der Hardware-Beschaffung-Seite).
- **ROI-Rechner-Slider:** per Tastatur bedienbar (native `<input type="range">` bevorzugen), Wert wird bei Änderung angesagt (z. B. über `aria-valuetext`).
- **Konsistente Navigation:** Header/Footer auf allen Seiten identisch aufgebaut.

### 3. Verständlich (Understandable)

- **Sprache gesetzt:** `<html lang="de">`.
- **Klare Labels & Fehlermeldungen** in einfacher Sprache (Sie-Form) – insbesondere im 5-Schritte-Formular, das an mehreren Stellen technische Begriffe vermeidet.
- **Vorhersehbarkeit:** Fokus/Auswahl löst keinen unerwarteten Kontextwechsel aus (kein Auto-Submit bei Formular-Schritten).
- **Fortschritt sichtbar & angekündigt:** Der 5-Schritte-Fortschrittsbalken im Kontaktformular ist auch für Screenreader als Fortschritt erkennbar (z. B. `aria-current="step"` oder vergleichbares Muster), nicht nur visuell.

### 4. Robust (Robust)

- **Valides, semantisches HTML:** echte Landmarks (`header`/`nav`/`main`/`footer`), korrekte Überschriften-Hierarchie (genau ein `h1` pro Seite), Buttons sind `<button>`, Links sind `<a>`.
- **Name/Rolle/Wert:** interaktive Elemente (Slider, Toggle, Akkordeon, Formular-Schritte) haben einen zugänglichen Namen und einen korrekten Status.
- **ARIA nur wo nötig:** native Elemente bevorzugen. „No ARIA is better than bad ARIA."

---

## Komponenten-Checkliste (auf diese Seite gemünzt)

### Semantische Struktur (Pflicht pro Seite)
- Genau ein `<h1>` pro Seite (Hero-Headline). Danach hierarchisch `h2` → `h3`, keine Ebene überspringen.
- Landmarks: `<header>`, `<nav aria-label="Hauptnavigation">`, `<main id="main">`, `<footer>`. Mehrere `nav` jeweils mit eigenem `aria-label`.
- Sektionen als `<section aria-labelledby="…">` mit Bezug zur jeweiligen Überschrift.

### Header / Navigation
- Skip-Link als erstes Element.
- Logo-Link mit zugänglichem Namen („Selim-IT – Startseite").
- Mobile-Menü: per Tastatur öffn-/schließbar, Fokus wandert ins Menü, Escape schließt, Fokus kehrt zum Trigger zurück. Hamburger-Button mit `aria-label="Menü öffnen"` und `aria-expanded`.
- „Bald verfügbar"-Einträge (KI-E-Mail-Assistent, Web-Chat, PBX) sind nicht fokussierbar/nicht anklickbar und dürfen nicht wie ein defekter Link wirken (z. B. `aria-disabled="true"` statt totem Link).

### Buttons & Links
- Telefon-CTAs: `<a href="tel:…">` mit klarem Text, nicht nur ein Icon.
- Kein Icon-only-Button ohne `aria-label`.
- Links, die in neuem Tab öffnen: Hinweis im Namen + `rel="noopener noreferrer"`.

### Formular (5-Schritte-Kontaktformular)
- Jedes Feld hat ein sichtbares `<label for>`.
- Pflichtfelder im Label kennzeichnen, nicht nur per `*`-Farbe.
- Fehler: `aria-invalid="true"` + Fehlermeldung per `aria-describedby`, als Text (nicht nur roter Rand). Bei Fehlern: Fokus auf das erste fehlerhafte Feld.
- Erfolg/Fehler nach Absenden über eine Live-Region ankündigen (`role="status"`).
- DSGVO-Hinweistext: als Text mit Link zur Datenschutzerklärung, gut lesbar platziert (siehe `docs/ANFORDERUNGEN.md` – bewusst keine Pflicht-Checkbox, siehe dortige Begründung).
- Honeypot-Feld: `aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"`.
- Datei-Upload: Format-/Größenhinweise als Text vor dem Feld, Fehlerfälle (falscher Typ, zu groß) klar angesagt.
- Terminauswahl (Schritt 5, CalDAV-Live-Verfügbarkeit): Kalender/Zeitslot-Auswahl per Tastatur bedienbar, verfügbare/nicht verfügbare Slots nicht nur farblich unterschieden.

### ROI-Rechner (KI-Telefonassistent, WhatsApp-Chatbot)
- Slider als native `<input type="range">` mit Label, aktuellem Wert sichtbar und für Screenreader über `aria-valuetext` verfügbar.
- Toggle („Arbeitgeber-Vollkosten einrechnen") als natives `<input type="checkbox">`/Switch-Pattern mit Label und Status.
- Ergebnis-Card aktualisiert sich live – Änderung wird nicht nur visuell, sondern bei Bedarf über eine dezente Live-Region kommuniziert (kein aufdringliches Announce bei jeder Slider-Bewegung, sondern z. B. beim Loslassen).

### FAQ-Akkordeon
- Natives Akkordeon-Pattern mit `button`, `aria-expanded`, `aria-controls` – nicht durch eigene `div`-Klick-Logik ersetzen.

### Bilder & Media
- Hero-Bilder/-Mockups: `alt` beschreibt den Zweck knapp; `priority`/`fetchpriority` für LCP-relevante Bilder.
- Partner-/Hersteller-Logo-Trust-Bar (Hardware-Beschaffung, Startseite): jedes Logo mit aussagekräftigem `alt` (Markenname).
- Audio-Player (KI-Telefonassistent): eigene, per Tastatur bedienbare Steuerung (Play/Pause, Fortschritt), zusätzliches Text-Transkript direkt auf der Seite.

---

## Erklärung zur Barrierefreiheit (eigene Seite)

`src/pages/barrierefreiheit.astro` mit:
- Geltungsbereich (selim-it.de),
- angestrebter Konformitätsstatus (WCAG 2.2 AA),
- bekannte Einschränkungen (falls vorhanden),
- Feedback-/Kontaktmechanismus (Barriere melden) – Link zum Kontaktformular/zur Mail,
- Datum der Erstellung/letzten Prüfung.

Footer-Link „Barrierefreiheit" neben Impressum/Datenschutz.

---

## Testen (vor „fertig")

1. **Tastatur-Durchlauf:** komplette Seite nur mit Tab/Shift+Tab/Enter/Escape/Pfeiltasten bedienen – inkl. Mobile-Menü, FAQ, 5-Schritte-Formular, ROI-Rechner-Slider, Audio-Player.
2. **Zoom 200 %** und Breite **320px** – kein Inhaltsverlust, kein horizontales Scrollen.
3. **Automatik:** Lighthouse (Accessibility) + axe DevTools/`@axe-core/playwright`. Ziel: keine kritischen Verstöße, Lighthouse a11y = 100.
4. **Kontrast:** alle Text-/Hintergrund-Kombinationen prüfen, insbesondere Badge-Text auf Verlauf-Hintergrund und Türkis-Akzente.
5. **Screenreader-Stichprobe:** NVDA (Windows) oder VoiceOver – Überschriften-Navigation, Formular-Labels/Fehlermeldungen, Slider-Werte werden korrekt vorgelesen.
6. **`prefers-reduced-motion`** aktiv → keine Reveal-Animationen, keine Hover-Scroll-Effekte auf der Hardware-Beschaffung-Zeitstrahl-Sektion.

> Automatische Tools finden nur ~30–40 % der Probleme. Tastatur- und Screenreader-Stichprobentest sind Pflicht, nicht optional.

---

## Schnell-Referenz: häufige Fehler in AI-generiertem Code (vermeiden)

- ❌ `<div onClick>` statt `<button>` → ✅ echtes `<button>`
- ❌ Placeholder als einziges Label → ✅ `<label>`
- ❌ `outline: none` ohne Fokus-Ersatz → ✅ `:focus-visible`-Stil
- ❌ Mehrere `<h1>` oder übersprungene Ebenen → ✅ eine `h1`, saubere Hierarchie
- ❌ Icon-Button ohne Namen → ✅ `aria-label`
- ❌ Fehler nur per Farbe → ✅ Text + `aria-describedby`
- ❌ Slider ohne sichtbaren/ansagbaren Wert → ✅ Wert sichtbar + `aria-valuetext`
- ❌ Audio ohne Transkript → ✅ Text-Transkript auf der Seite
- ❌ `alt` weggelassen → ✅ sinnvoll oder `alt=""`

---

<sub>Selim-IT Website-Kit · Stand: 2026-08-29</sub>
