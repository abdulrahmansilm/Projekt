# Vollständige Anforderungen: Selim-IT Website

> Beschreibt die komplette Seitenstruktur, alle Sektionen, den Formular-Flow, SEO, DSGVO-Anforderungen und technische Details für selim-it.de. Referenziert aus `CLAUDE.md`.

---

## Tech-Stack im Überblick

Astro (statisch) + TypeScript + Tailwind CSS (Frontend) · FastAPI (Backend, separates Deployment) · SQLite/Postgres (DB) · CalDAV/Nextcloud Calendar + Nextcloud Talk (Terminbuchung/Video) · Mailcow/SMTP (E-Mail) · Umami/Plausible (cookiefreie Analytics) · Caddy + Docker Compose auf silm-server · Forgejo + Forgejo Actions (Code/CI-CD). Details: `CLAUDE.md`.

---

## Firmendaten & Leistungen: einzige Datenquelle

Alle Firmendaten und alle 11 Leistungen (inkl. Pricing, Zeitstrahlen, Zitate) stehen strukturiert in `docs/BRANCHE.md`. Diese Datei wird in Astro Content Collections überführt; Komponenten lesen daraus, statt Inhalte hart zu verdrahten.

---

## Sitemap / Navigation

**Update (finale 4-Kategorien-Navbar, vom Nutzer am 10.09.2026 bestätigt — ersetzt die vorherige 3-Kategorien + Wissen + Kontakt-Struktur):**

Startseite | Navigation: **1. IT & Infrastruktur** (IT-Betreuung, Server-Betreuung, Fernzugriff/VPN, Hardware-Beschaffung, Microsoft 365, Datensicherung, E-Mail-Sicherheit) · **2. KI & Kommunikation** (KI-Telefonassistent, WhatsApp-Chatbot, Prozessautomatisierung aktiv; KI-E-Mail-Assistent, Webchat, Telefonanlage/PBX „Bald verfügbar") · **3. Webseiten** (eigener Navbar-Punkt, ohne Unterpunkte) · **4. Unternehmen** (neue Dropdown-Kategorie: Über uns, Wissen — Wissen ist damit kein eigener Top-Level-Navpunkt mehr, sondern unter Unternehmen eingeordnet) | **Kontakt entfällt als eigener Navbar-Punkt**, ersetzt durch den Header-CTA-Button „Beratung vereinbaren" (siehe „Globaler Header" unten) | Footer: Impressum, Datenschutz, Erklärung zur Barrierefreiheit.

**Offen:** Die Footer-Spalte „Unternehmen" (Komponente 18) listet aktuell noch Über uns, Preise, Kontakt, Partner & Lösungen — das weicht von der neuen Navbar-Kategorie „Unternehmen" (nur Über uns, Wissen) ab. Muss noch abgeglichen werden, sobald der Footer entsprechend überarbeitet wird.

**Wissen-Übersichtsseite** ("/wissen", erreichbar über Navbar-Kategorie „Unternehmen"): eigenständige Seite mit Featured-Artikel + 3-spaltigem Artikel-Grid, siehe `docs/DESIGNSYSTEM.md` → Komponente 22. Referenzimplementierung `claude/components/wissen-uebersicht.html`.

---

## Globaler Header

Die Kopfzeile (Logo + Navigation) ist Teil der **Hero Section** (`docs/DESIGNSYSTEM.md` → Komponente 9) und liegt auf deren dunklem Verlaufshintergrund – gilt identisch auf der Startseite und im Hero jeder Leistungsseite:

- Auf dem Hero-Hintergrund: Logo in **heller Variante**, Navigation/CTA wie unten.
- Sobald der Hero-Bereich beim Scrollen verlassen wird (Standard-Seitenhintergrund `#F0F4F3`), erscheint ein kompakter **Sticky Header**: heller Hintergrund, Logo in **dunkler Variante**, dezenter Schatten (siehe `docs/DESIGNSYSTEM.md` → Shadow-Strategie).
- Navigation mittig (Desktop) / Hamburger (Mobile).
- Rechts: Telefonnummer (Desktop, `tel:`-Link) + CTA-Button „Beratung vereinbaren" (Verlauf, Pill) — ersetzt den bisherigen Navbar-Punkt „Kontakt" (siehe „Sitemap / Navigation" oben).
- Skip-Link „Zum Inhalt springen" als erstes fokussierbares Element.

## Globaler Footer

Siehe Komponente 18 „Footer" in `docs/DESIGNSYSTEM.md` (finale Fassung, ersetzt das frühere Karten-Muster aus Komponente 8): vollbreiter Verlauf-Hintergrund (kein Karten-Radius), 4-Spalten-Grid im oberen Bereich (Logo/Kontakt · IT & Infrastruktur · KI & Kommunikation · Webseiten + Unternehmen — spiegelt 1:1 die 3 Nav-Kategorien), untere Zeile mit Rechtslinks + Copyright, **bewusst ohne Social-Media-Icons**. Referenzimplementierung `claude/components/footer-startseite.html`.

## Rechtliche Seiten

> ⚠️ **Ausdrücklicher Hinweis – keine Gewähr, keine Rechtsberatung.** Impressum, Datenschutzerklärung und ggf. Erklärung zur Barrierefreiheit sind unverbindliche Platzhalter-Vorlagen. Sie müssen vor Veröffentlichung von einer fachkundigen Person (Rechtsanwalt/Datenschutzbeauftragter) geprüft und angepasst werden. Dieser Hinweis wird zusätzlich als Kommentar im Code jeder Rechtsseite platziert, erscheint aber nicht im für Besucher sichtbaren Text.

- **Impressum** (§ 5 DDG – Digitale-Dienste-Gesetz, Nachfolgeregelung zu § 5 TMG seit Mai 2024): Entwurf liegt als Projekt-Dokument `Selim-IT-Impressum-Entwurf.md` vor. Offene Punkte vor Go-Live: Postleitzahl, geschäftliche E-Mail-Adresse, Telefonnummer, USt-IdNr. (oder Kleinunternehmerregelung), anwaltliche Prüfung.
- **Datenschutzerklärung** (DSGVO): Entwurf liegt als Projekt-Dokument `Selim-IT-Datenschutzerklaerung-Entwurf.md` vor. Deckt ab: Hosting/Server-Logfiles, cookiefreie Analytics (Art. 6 Abs. 1 lit. f DSGVO, kein Consent nötig), Kontaktformular (DB-Speicherung), Terminbuchung (CalDAV + Nextcloud Talk, self-hosted, kein Drittlandtransfer), E-Mail-Kommunikation, Betroffenenrechte (zuständige Aufsichtsbehörde: HBDI, Postfach 3163, 65021 Wiesbaden). Offene Punkte: PLZ/E-Mail/Telefon, konkrete Logfile-Aufbewahrungsdauer, anwaltliche Prüfung.
- **Erklärung zur Barrierefreiheit:** eigene Seite wie im Original-Kit vorgesehen (BFSG-Hinweis, Konformitätsstatus WCAG 2.2 AA, Feedback-Mechanismus). Details: `docs/BARRIEREFREIHEIT.md`.

**Kein Cookie-Consent-Banner nötig:** Analytics ist cookiefrei (Umami/Plausible, self-hosted), es werden keine einwilligungspflichtigen Drittanbieter-Dienste eingesetzt (kein Google Maps, kein YouTube-Embed, kein reCAPTCHA). Sollte sich das künftig ändern (z. B. Einbindung eines einwilligungspflichtigen Dienstes), ist ein Consent-Banner nachzurüsten.

---

## Startseite – Sektionsreihenfolge

**Update (finale Struktur vom Nutzer vorgegeben, ersetzt die vorherige 8-Sektionen-Gliederung):**

1. **Hero** – siehe `docs/DESIGNSYSTEM.md` → Komponente 9 (Hero Section): universelles Hintergrund-Design/Layout, hier mit den Startseiten-Inhalten (Headline/Subline/CTA, Dashboard-Card mit allgemeinem Monitoring-Szenario).
2. **Ihre Vorteile** – 4-spaltige Vorteils-Leiste auf dunklem Hintergrund (`#0B2E3C`), Referenzimplementierung `claude/components/vorteile-startseite.html`: Alles aus einer Hand, Proaktive Betreuung, Persönlicher Support, Planbare Kosten. *(Ersetzt/entspricht inhaltlich der vorherigen Sektion „Warum Selim-IT".)*
3. **Leistungen** – 3-spaltiges Hover-Karten-Grid, Referenzimplementierung `claude/components/leistungen-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 11). Zeigt bewusst nur 9 von 11 Leistungen als Karte (Server-Betreuung und E-Mail-Sicherheit sind absichtlich nicht enthalten, vom Nutzer bestätigt) – keine 1:1-Abbildung der 3 Navigationskategorien.
4. **How we work** – 4 Schritte (Kennenlernen → Analyse → Umsetzung → Betreuung) mit Fortschritts-Pictogrammen und Scroll-Reveal-Animation. Referenzimplementierung `claude/components/howwework-praxisbeispiel-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 12). *Eigenständiges Muster, ersetzt die frühere Ablauf/Prozess-Grafik-Idee (Remote-Erstgespräch → IT-Analyse & Angebot → Seamless Onboarding → Laufende Betreuung) – nicht identisch mit dem Zeitstrahl/Ablauf-Template der Leistungsseiten (Komponente 5).*
5. **Praxisbeispiel (Vertrauen)** – aktuell nur ein Referenzfall: Jugend braucht Arbeit e.V. – „Ausgangssituation"-Problem-Karten, Zitat-Card, „Was wir umgesetzt haben"-Flow-Diagramm. Referenzimplementierung `claude/components/howwework-praxisbeispiel-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 13, gemeinsame Datei mit Komponente 12).
6. **Starke Partner für starke Lösungen (Kompetenz)** – konzentrische Halbkreis-Bühne mit 10 schwebenden Partner-Platzhalter-Chips um das zentrale Marken-Icon (echte Partner-Logos folgen später). Referenzimplementierung `claude/components/starke-partner-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 14) – ersetzt die frühere, einfachere Trust-Bar-Idee (Logo-Leiste, siehe `docs/BRANCHE.md` → Social Proof).
7. **FAQ** (Einwände klären) – Akkordeon, 8 Fragen final. Referenzimplementierung `claude/components/faq-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 15).
8. **CTA + Kontaktformular** (Handlung) – 4-stufiger Anfrage-Wizard (Anliegen → Details → Kontakt → Absenden) auf bg-hell (`#F1F3F0`). Die Bereichsauswahl in Schritt 1 entspricht 1:1 der finalen 3-Kategorien-Navbar („IT & Infrastruktur" / „KI & Kommunikation" / „Webseiten" + Fallback „Etwas anderes"); Schritt 2 listet je gewähltem Bereich die zugehörigen Leistungen zur Mehrfachauswahl. Endet mit Wahl zwischen „Anfrage senden" und „Kostenloses Erstgespräch buchen" (Kalender-Platzhalter für spätere CalDAV-Integration, siehe Abschnitt 2). Referenzimplementierung `claude/components/cta-kontaktformular-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 16).
9. **Wissen/Blog** – 3-spaltiges Karten-Grid mit den neuesten Wissen-Artikeln (Bild-Platzhalter im Standard-Verlauf, Kategorie-Badge, Titel, Teaser, Lesezeit). Desktop: Textlink „Alle Beiträge" oben rechts, dritte Karte bewusst ausgeblendet ab 940px Breite. Mobile: alle 3 Karten einspaltig plus Verlauf-Button „Alle Beiträge ansehen" unterhalb. Referenzimplementierung `claude/components/wissen-teaser-startseite.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 17). Artikel-Inhalte sind Platzhalter — finale Wissen-Startartikel siehe `claude/Selim-IT-Website-Spec-Fortschritt.md` Abschnitt 9.
10. **Footer** – siehe „Globaler Footer" oben und `docs/DESIGNSYSTEM.md` → Komponente 18. Seitenweit identisch auf Startseite und allen Leistungsseiten.

*(Offene Zuordnung: Sektionen 4–6 wurden vom Nutzer als HTML noch nicht geliefert – die Klammer-Hinweise oben sind vorläufige Verknüpfungen zur vorherigen Dokumentation, keine bestätigten 1:1-Übernahmen. Bei Lieferung der jeweiligen HTML-Datei wird dieser Abschnitt präzisiert.)*

---

## Leistungsseiten-Template (gilt für alle 11 Leistungsseiten)

1. **Hero** – dieselbe Hero Section wie auf der Startseite (`docs/DESIGNSYSTEM.md` → Komponente 9: identisches Hintergrund-Design und Layout, universell auf allen Seiten eingesetzt), nur mit leistungsspezifischem Inhalt in den Variable Slots (Headline/Subline/CTA, Dashboard-Card-Daten passend zur Leistung). Enthält, wo passend, zusätzlich den **Hero-Zitat-Block** (siehe `docs/DESIGNSYSTEM.md` → Komponente 7 und `docs/BRANCHE.md` für die konkreten Zitate) sowie ggf. weitere leistungsspezifische Hero-Elemente (Audio-Player bei KI-Telefonassistent, Chat-Mockup bei WhatsApp-Chatbot).
2. *Leistungsspezifischer Inhalt* – Zeitstrahl, Pricing, Vergleichs-Sektion, Statistik-Sektion etc. je nach Leistung, siehe `docs/BRANCHE.md`.
   - **Zeitstrahl/Ablauf-Sektion** (eigene Sektion, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`): zeigt „wie wir arbeiten" für die jeweilige Leistung. Kommt auf: IT-Betreuung (Schritt 1 ist hier die IT-Bestandsaufnahme), Server-Betreuung, Fernzugriff/VPN, Hardware-Beschaffung, Microsoft 365, Prozessautomatisierung, Webseiten, KI-Telefonassistent, WhatsApp-Chatbot. **Bewusst ausgenommen:** E-Mail-Sicherheit und Datensicherung erhalten keine Zeitstrahl-Sektion. Die konkreten Schritt-Inhalte (Nummer/Titel/Beschreibung je Seite) sind bereits in `docs/BRANCHE.md` je Leistung im Feld `zeitstrahl_schritte:` hinterlegt.
3. **Kontakt-Aufnahme-CTA** – startet den 5-Schritte-Formular-Flow mit vorausgefüllter Leistung.
4. **FAQ zur Leistung** – leistungsspezifische Fragen (Inhalte teilweise noch offen, siehe `docs/BRANCHE.md`).
5. **Passende Wissens-Artikel** – Teaser aus dem „Wissen"-Bereich.
6. **Footer** (seitenweit).

### Leistungsseite „IT-Betreuung" – konkrete Sektionsreihenfolge (erste vollständig ausformulierte Leistungsseite)

Detailliert die generische Template-Struktur oben für diese erste Leistungsseite (weicht in der Reihenfolge/Zusammensetzung leicht vom generischen Template ab — keine separate „Kontakt-Aufnahme-CTA"-Sektion, da CTAs bereits in Preise/Ablauf eingebettet sind):

1. **Hero** – siehe Komponente 9.
2. **Problem & Lösung** ("Wir sind keine IT-Feuerwehr" — Feuerwehr-Konzept, 2×2-Karten „Reaktiv vs. proaktiv"). Referenzimplementierung `claude/components/problem-loesung-trustbar-it-betreuung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19).
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-it-betreuung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, gemeinsame Datei mit Komponente 19).
4. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`, Inhalt siehe `docs/BRANCHE.md`).
5. **Preise** (siehe `claude/components/pricing-it-betreuung.html`).
6. **FAQ** – leistungsspezifisch, 8 Fragen final. Referenzimplementierung `claude/components/faq-it-betreuung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21).
7. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
8. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Einziger Unterschied je Leistungsseite: welche konkreten Blog-Artikel verlinkt werden (auf IT-Betreuung zugeschnitten statt der allgemeinen Startseiten-Artikel). **Offen:** welche konkreten Artikel für IT-Betreuung verlinkt werden, steht noch aus.
9. **Footer** (seitenweit, Komponente 18).

*(Reihenfolge vom Nutzer am 10.09.2026 final bestätigt: CTA steht hier — abweichend vom generischen Template oben — zwischen FAQ und Wissen/Blog-Teaser, nicht als eigene „Kontakt-Aufnahme-CTA" vor der FAQ.)*

### Leistungsseite „Server-Betreuung" – konkrete Sektionsreihenfolge (zweite vollständig ausformulierte Leistungsseite, vollständig)

Identische Struktur wie „IT-Betreuung" oben:

1. **Hero** – siehe Komponente 9.
2. **Problem & Lösung** (2×2-Karten „Reaktiv vs. proaktiv": Verfügbarkeit & Ausfälle, Backup & Datensicherheit, Patch-Management & Sicherheit, Performance & Kapazität). Referenzimplementierung `claude/components/problem-loesung-trustbar-server-betreuung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, zweite Referenz).
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-server-betreuung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, zweite Referenz, gemeinsame Datei mit Komponente 19).
4. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
5. **Preise** (siehe `claude/components/pricing-server-betreuung.html`).
6. **FAQ** – leistungsspezifisch, 8 Fragen final. Referenzimplementierung `claude/components/faq-server-betreuung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, zweite Referenz).
7. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
8. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Einziger Unterschied je Leistungsseite: welche konkreten Blog-Artikel verlinkt werden (auf Server-Betreuung zugeschnitten statt der allgemeinen Startseiten-Artikel). **Offen:** welche konkreten Artikel für Server-Betreuung verlinkt werden, steht noch aus (gleiches offenes Muster wie bei IT-Betreuung, s.o.).
9. **Footer** (seitenweit, Komponente 18).

**Status (10.09.2026): Leistungsseite „Server-Betreuung" ist mit dieser Reihenfolge vollständig** — alle Abschnitte haben eine Referenzimplementierung oder verweisen 1:1 auf eine wiederverwendete Startseiten-Komponente. Einzige offene Detailfrage bleibt der Wissen/Blog-Teaser-Inhalt (Punkt 8), analog zu IT-Betreuung.

### Leistungsseite „Fernzugriff / VPN" – konkrete Sektionsreihenfolge (dritte vollständig ausformulierte Leistungsseite)

Ähnliche Struktur wie „IT-Betreuung" und „Server-Betreuung" oben, mit einer zusätzlichen Sektion „Einsatzszenarien":

1. **Hero** – siehe Komponente 9, Hero-Visual `claude/hero-visuals/fernzugriff-vpn.html`.
2. **Problem & Lösung** (2×2-Karten „Reaktiv vs. proaktiv": Verschlüsselung & Angriffsfläche, Zugriffsrechte & Kontrolle, Verbindung & Verfügbarkeit, Geräte & Einheitlichkeit). Referenzimplementierung `claude/components/problem-loesung-trustbar-vpn.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, dritte Referenz).
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-vpn.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, dritte Referenz, gemeinsame Datei mit Komponente 19).
4. **Einsatzszenarien** (Hub-and-Spoke-Diagramm mit 4 Szenarien: Homeoffice, Außendienst & unterwegs, Standortvernetzung, Externer Zugriff für Dienstleister & Partner; auf Mobile ersetzt durch eine Kartenliste). Referenzimplementierung `claude/components/einsatzszenarien-vpn.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22a). Diese Sektion ist spezifisch für die VPN-Seite, kein wiederverwendetes Startseiten-Muster.
5. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
6. **Preise** – abweichend von IT-Betreuung/Server-Betreuung **keine feste Preistabelle**: Preise sind hier „auf Anfrage" (richten sich nach Nutzer-/Standortanzahl und Einzelzugang vs. Standortvernetzung, siehe FAQ-Antwort zu Kosten). Keine eigene Pricing-Referenzdatei nötig — die Preise-Sektion führt stattdessen direkt zum Kontaktformular/CTA.
7. **FAQ** – leistungsspezifisch, 8 Fragen final. Referenzimplementierung `claude/components/faq-vpn.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, dritte Referenz).
8. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
9. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Einziger Unterschied je Leistungsseite: welche konkreten Blog-Artikel verlinkt werden — für VPN naheliegend u. a. `claude/components/blog-vpn-im-unternehmen.html`. **Offen:** finale Auswahl der verlinkten Artikel steht noch aus (gleiches offenes Muster wie bei IT-Betreuung/Server-Betreuung).
10. **Footer** (seitenweit, Komponente 18).

**Status (10.09.2026): Leistungsseite „Fernzugriff / VPN" ist mit dieser Reihenfolge vollständig** — alle Abschnitte haben eine Referenzimplementierung, verweisen 1:1 auf eine wiederverwendete Startseiten-Komponente, oder sind bewusst ohne Referenzdatei umgesetzt (Preise „auf Anfrage", Punkt 6). Einzige offene Detailfrage bleibt die finale Artikel-Auswahl für den Wissen/Blog-Teaser (Punkt 9), analog zu den anderen beiden Leistungsseiten.

### Leistungsseite „Hardware-Beschaffung" – konkrete Sektionsreihenfolge (vierte vollständig ausformulierte Leistungsseite, vollständig)

Ähnliche Struktur wie „IT-Betreuung"/„Server-Betreuung"/„Fernzugriff / VPN" oben, mit einer zusätzlichen Bild-Text-Split-Sektion „Passende Ausstattung":

1. **Hero** – siehe Komponente 9, Hero-Visual `claude/hero-visuals/hardware-beschaffung.html`.
2. **Passende Ausstattung** (zweispaltige Bild-Text-Split-Sektion: Text links, Bildplatzhalter rechts). Referenzimplementierung `claude/components/ausstattung-hardware-beschaffung.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22b). Diese Sektion ist spezifisch für die Hardware-Beschaffung-Seite, kein wiederverwendetes Startseiten-Muster.
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-hardware-beschaffung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, vierte Referenz, gemeinsame Datei mit Komponente 19).
4. **Problem & Lösung** (2×2-Karten „Reaktiv vs. proaktiv": Bedarfsplanung & Vorlauf, Passende Ausstattung, Einrichtung & Rollout, Lebenszyklus & Garantie). Referenzimplementierung `claude/components/problem-loesung-trustbar-hardware-beschaffung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, vierte Referenz).
5. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
6. **Preise** – wie bei VPN **keine feste Preistabelle**: Preise sind hier „individuell nach Beratung". Keine eigene Pricing-Referenzdatei nötig — die Preise-Sektion führt stattdessen direkt zum Kontaktformular/CTA.
7. **FAQ** – leistungsspezifisch, 8 Fragen final. Referenzimplementierung `claude/components/faq-hardware-beschaffung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, vierte Referenz).
8. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
9. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für Hardware-Beschaffung verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten).
10. **Footer** (seitenweit, Komponente 18).

*(Reihenfolge vom Nutzer am 11.09.2026 final bestätigt: „Passende Ausstattung" steht vor Trustbar/Problem & Lösung, nicht danach — abweichend von der ursprünglichen Reihenfolge.)*

**Status (11.09.2026): Leistungsseite „Hardware-Beschaffung" ist mit dieser Reihenfolge vollständig** — alle Abschnitte haben eine Referenzimplementierung, verweisen 1:1 auf eine wiederverwendete Startseiten-Komponente, oder sind bewusst ohne Referenzdatei umgesetzt (Preise „individuell nach Beratung", Punkt 6). Einzige offene Detailfrage bleibt die finale Artikel-Auswahl für den Wissen/Blog-Teaser (Punkt 9), analog zu den anderen Leistungsseiten.

### Leistungsseite „Microsoft 365" – konkrete Sektionsreihenfolge (fünfte vollständig ausformulierte Leistungsseite, vollständig)

Ähnliche Struktur wie die vorherigen Leistungsseiten, mit zwei zusätzlichen, seitenspezifischen Feature-Grid-Sektionen direkt nach dem Hero:

1. **Hero** – siehe Komponente 9, Hero-Visual `claude/hero-visuals/microsoft-365.html`.
2. **Microsoft Teams** (2×2-Feature-Grid, Bg-dark, mit hervorgehobener „Teams Phone"-Karte). Referenzimplementierung `claude/components/teams-m365.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22c). Seitenspezifisch, kein wiederverwendetes Startseiten-Muster.
3. **Die wichtigsten M365-Tools** (2×2-Feature-Grid, Bg-hell: Outlook/Exchange, SharePoint, OneDrive, Word/Excel/PowerPoint). Referenzimplementierung `claude/components/tools-m365.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22d). Seitenspezifisch, kein wiederverwendetes Startseiten-Muster.
4. **Problem & Lösung** (2×2-Karten „Reaktiv vs. proaktiv": Lizenzverwaltung & Kosten, Zugriffsschutz & Anmeldesicherheit, Onboarding & Offboarding, Datensicherung in der Cloud). Referenzimplementierung `claude/components/problem-loesung-trustbar-m365.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, fünfte Referenz).
5. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-m365.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, fünfte Referenz, gemeinsame Datei mit Komponente 19).
6. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
7. **Preise** – wie bei VPN/Hardware-Beschaffung **keine feste Preistabelle**: Preise richten sich nach Nutzeranzahl und Betreuungsumfang (siehe FAQ-Antwort zu Kosten), Angebot nach kurzer Bedarfsklärung. Keine eigene Pricing-Referenzdatei nötig — die Preise-Sektion führt stattdessen direkt zum Kontaktformular/CTA.
8. **FAQ** – leistungsspezifisch, 8 Fragen final. Referenzimplementierung `claude/components/faq-m365.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, fünfte Referenz).
9. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
10. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für Microsoft 365 verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten — naheliegend u. a. `claude/components/blog-m365-plaene.html`).
11. **Footer** (seitenweit, Komponente 18).

**Status (11.09.2026): Leistungsseite „Microsoft 365" ist mit dieser Reihenfolge vollständig** (vom Nutzer bestätigt) — alle Abschnitte haben eine Referenzimplementierung, verweisen 1:1 auf eine wiederverwendete Startseiten-Komponente, oder sind bewusst ohne Referenzdatei umgesetzt (Preise „nach Bedarf", Punkt 7). Einzige offene Detailfrage bleibt die finale Artikel-Auswahl für den Wissen/Blog-Teaser (Punkt 10), analog zu den anderen Leistungsseiten.

### Leistungsseite „E-Mail-Sicherheit“ – konkrete Sektionsreihenfolge (sechste vollständig ausformulierte Leistungsseite, vollständig)

Gleiche Grundstruktur wie die vorherigen Leistungsseiten, ohne seitenspezifische Zusatzsektion nach dem Hero:

1. **Hero** – siehe Komponente 9, Hero-Visual `claude/hero-visuals/email-sicherheit.html`.
2. **Problem & Lösung** (2×2-Karten „Reaktiv vs. proaktiv“: Phishing & Spam, Schadsoftware & Anhänge, Identitätsschutz & Spoofing, Verschlüsselung & Vertraulichkeit). Referenzimplementierung `claude/components/problem-loesung-trustbar-email-sicherheit.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, siebte Referenz).
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-email-sicherheit.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, siebte Referenz, gemeinsame Datei mit Komponente 19).
4. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
5. **FAQ** – leistungsspezifisch, 6 Fragen final. Referenzimplementierung `claude/components/faq-email-sicherheit.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, achte Referenz).
6. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
7. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für E-Mail-Sicherheit verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten — naheliegend u. a. `claude/components/blog-phishing-erkennen.html`).
8. **Footer** (seitenweit, Komponente 18).

**Hinweis Preise:** Der Nutzer hat für diese Seite — anders als bei Hardware-Beschaffung/M365 — keine eigene Preise-Sektion in der Reihenfolge genannt. Die Kostenfrage wird stattdessen ausschließlich über die erste FAQ-Antwort ("Was kostet E-Mail-Sicherheit?" — richtet sich nach Anzahl der Postfächer und Schutzumfang, Angebot nach Bedarfsklärung) abgedeckt. Sollte doch noch eine separate Preise-Sektion gewünscht sein, wäre das analog zum „auf Anfrage“-Muster der anderen Seiten nachzutragen.

**Status (15.09.2026): Leistungsseite „E-Mail-Sicherheit“ ist mit dieser Reihenfolge vollständig** (vom Nutzer bestätigt) — alle Abschnitte haben eine Referenzimplementierung oder verweisen 1:1 auf eine wiederverwendete Startseiten-Komponente. Offene Detailfragen: finale Artikel-Auswahl für den Wissen/Blog-Teaser (Punkt 7, analog zu den anderen Leistungsseiten) sowie die oben genannte Preise-Frage.

### Leistungsseite „Datensicherung“ – konkrete Sektionsreihenfolge (siebte vollständig ausformulierte Leistungsseite, vollständig)

Ähnliche Struktur wie die Microsoft-365-Seite, mit einer seitenspezifischen Zusatzsektion direkt nach dem Hero:

1. **Hero** – siehe Komponente 9, Hero-Visual `claude/hero-visuals/datensicherung.html`.
2. **Der Sicherungs-Kreislauf** (4-Segment-Kreisdiagramm, Bg-dark: Sichern, Aufbewahren, Prüfen, Protokoll). Referenzimplementierung `claude/components/kreislauf-datensicherung.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22e). Seitenspezifisch, kein wiederverwendetes Startseiten-Muster.
3. **Problem & Lösung** (2×2-Karten „Reaktiv vs. proaktiv“: Backup-Überwachung, Wiederherstellbarkeit, Schutz vor Ransomware, Aufbewahrungsfristen & Compliance). Referenzimplementierung `claude/components/problem-loesung-trustbar-datensicherung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, sechste Referenz).
4. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-datensicherung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, sechste Referenz, gemeinsame Datei mit Komponente 19).
5. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
6. **FAQ** – leistungsspezifisch, 8 Fragen final. Referenzimplementierung `claude/components/faq-datensicherung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, sechste Referenz).
7. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
8. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für Datensicherung verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten — naheliegend `claude/components/blog-datensicherung-3-2-1.html`).
9. **Footer** (seitenweit, Komponente 18).

**Hinweis Preise:** Wie bei E-Mail-Sicherheit hat der Nutzer auch hier keine eigene Preise-Sektion in der Reihenfolge genannt. Die Kostenfrage wird stattdessen über die erste FAQ-Antwort ("Was kostet die Datensicherung?" — richtet sich nach Datenmenge, Systemanzahl und Aufbewahrungsdauer, Angebot nach Bedarfsklärung) abgedeckt.

**Status (15.09.2026): Leistungsseite „Datensicherung“ ist mit dieser Reihenfolge vollständig** (vom Nutzer bestätigt) — alle Abschnitte haben eine Referenzimplementierung oder verweisen 1:1 auf eine wiederverwendete Startseiten-Komponente. Offene Detailfragen: finale Artikel-Auswahl für den Wissen/Blog-Teaser (Punkt 8, analog zu den anderen Leistungsseiten) sowie die oben genannte Preise-Frage.


### Leistungsseite „KI-Telefonassistent“ – konkrete Sektionsreihenfolge (achte vollständig ausformulierte Leistungsseite, vollständig)

Ähnliche Struktur wie die vorherigen Leistungsseiten, mit zwei seitenspezifischen Zusatzsektionen (Kostenvergleich-Tabelle und interaktiver Ersparnis-Rechner) nach Problem & Lösung/Trustbar:

1. **Hero** – Hero-Visual `claude/hero-visuals/ki-telefonassistent.html`.
2. **Problem & Lösung** (2×2-Karten, „Ohne KI-Assistent“ vs. „Mit [Logo]“: Erreichbarkeit, Verpasste Anrufe, Mitarbeiterzeit, Qualität & Konsistenz). Referenzimplementierung `claude/components/problem-loesung-trustbar-ki-telefonassistent.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, achte Referenz).
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-ki-telefonassistent.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, achte Referenz, gemeinsame Datei mit Komponente 19).
4. **Besondere Sektion: Kostenvergleich-Tabelle** (Bg-dark, „Mitarbeiter, 20 Std./Woche“ vs. „KI-Telefonassistent“ über sechs Kriterien). Referenzimplementierung `claude/components/kostenvergleich-ki-telefonassistent.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22f). Seitenspezifisch, kein wiederverwendetes Startseiten-Muster.
5. **Besondere Sektion: Rechnen Sie selbst** (interaktiver Ersparnis-Rechner mit Slidern und Live-Ergebnis-Panel). Referenzimplementierung `claude/components/rechnen-sie-selbst-ki-telefonassistent.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22g). Seitenspezifisch, kein wiederverwendetes Startseiten-Muster.
6. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
7. **Preise** – 3-Tier-Pricing mit zusätzlicher, gestrichelt umrandeter „Einrichtung & Onboarding“-Karte oberhalb der Pakete. Referenzimplementierung `claude/components/pricing-ki-telefonassistent.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 1).
8. **FAQ** – leistungsspezifisch, 7 Fragen final. Referenzimplementierung `claude/components/faq-ki-telefonassistent.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, neunte Referenz).
9. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
10. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für KI-Telefonassistent verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten — naheliegend `claude/components/blog-ki-telefonassistent.html`).
11. **Footer** (seitenweit, Komponente 18).

**Offener Punkt:** In der ursprünglichen Sektionsliste des Nutzers war zusätzlich eine dritte besondere Sektion „Für diese Branchen geeignet“ vorgesehen. Diese wurde bislang nicht übergeben und ist weder als Referenzdatei im Cowork-Projekt noch hier dokumentiert. Der Nutzer hat die Seite dennoch als fertig markiert — offen, ob die Sektion bewusst entfallen ist oder noch nachgereicht wird.

**Status (15.09.2026): Leistungsseite „KI-Telefonassistent“ ist mit dieser Sektionsreihenfolge inhaltlich abgeschlossen (bis auf den oben genannten offenen Punkt zur Branchen-Sektion sowie die Wissen-Teaser-Artikelauswahl).**

### Leistungsseite „WhatsApp-Chatbot“ – konkrete Sektionsreihenfolge (neunte vollständig ausformulierte Leistungsseite, vollständig)

Ähnliche Struktur wie die vorherigen Leistungsseiten, mit einer seitenspezifischen Zusatzsektion (Prozess-Erklärung „Wie eine Konversation abläuft“) nach Problem & Lösung/Trustbar:

1. **Hero** – Hero-Visual `claude/hero-visuals/whatsapp-chatbot.html`.
2. **Problem & Lösung** (2×2-Karten, „Ohne Chatbot“ vs. „Mit [Logo]“: Erreichbarkeit, Verpasste Anfragen, Mitarbeiterzeit, Qualität & Nachvollziehbarkeit). Referenzimplementierung `claude/components/problem-loesung-trustbar-whatsapp-chatbot.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, neunte Referenz).
3. **Trustbar** (Partner-Logo-Marquee, laufend). Referenzimplementierung `claude/components/problem-loesung-trustbar-whatsapp-chatbot.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, neunte Referenz, gemeinsame Datei mit Komponente 19).
4. **Besondere Sektion: Wie eine Konversation abläuft** (Sticky-Textspalte + vier Prozess-Karten im gestrichelten Rahmen, Schritt 3 als Kernstück hervorgehoben). Referenzimplementierung `claude/components/wie-konversation-ablaeuft-whatsapp-chatbot.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22h). Seitenspezifisch, kein wiederverwendetes Startseiten-Muster.
5. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
6. **Preise** – 3-Tier-Pricing nach demselben Grundmuster. Referenzimplementierung `claude/components/pricing-whatsapp-chatbot.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 1).
7. **FAQ** – leistungsspezifisch, 5 Fragen final. Referenzimplementierung `claude/components/faq-whatsapp-chatbot.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, zehnte Referenz).
8. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
9. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für WhatsApp-Chatbot verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten).
10. **Footer** (seitenweit, Komponente 18).

**Status (15.09.2026): Leistungsseite „WhatsApp-Chatbot“ ist mit dieser Sektionsreihenfolge inhaltlich abgeschlossen (bis auf die Wissen-Teaser-Artikelauswahl).**

### Leistungsseite „Prozessautomatisierung“ – konkrete Sektionsreihenfolge (zehnte vollständig ausformulierte Leistungsseite, vollständig)

Abweichende Struktur gegenüber den vorherigen Leistungsseiten: Statt der klassischen Problem-&-Lösung-Sektion (Komponente 19) zeigt diese Seite direkt sechs konkrete Anwendungsbeispiele als 3D-Flip-Karten:

1. **Hero** – Hero-Visual `claude/hero-visuals/prozessautomatisierung.html`.
2. **Typische Anwendungsfälle** (3D-Flip-Karten, 3-spaltiges Grid: Datenzusammenführung, System zu System, Formular → System, Rechnungen & Ablage, On-/Offboarding, Eskalation nach Regel). Ersetzt hier die sonst übliche Problem-&-Lösung-Sektion. Referenzimplementierung `claude/components/typische-anwendungsfaelle-prozessautomatisierung.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22i).
3. **Trustbar** (Partner-Logo-Marquee, laufend, gemeinsame Datei mit Punkt 2). Referenzimplementierung `claude/components/typische-anwendungsfaelle-prozessautomatisierung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, zehnte Referenz).
4. **Ablauf** ("So arbeiten wir" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`).
5. **FAQ** – leistungsspezifisch, 6 Fragen final. Referenzimplementierung `claude/components/faq-prozessautomatisierung.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, elfte Referenz).
6. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
7. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für Prozessautomatisierung verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten — naheliegend `claude/components/blog-bueroablaeufe-automatisieren.html`).
8. **Footer** (seitenweit, Komponente 18).

**Hinweis Preise:** Der Nutzer hat für diese Seite keine eigene Preise-Sektion in der Reihenfolge genannt (anders als bei KI-Telefonassistent/WhatsApp-Chatbot). Die Kostenfrage wird stattdessen über die erste FAQ-Antwort abgedeckt ("Was kostet Prozessautomatisierung?" — richtet sich nach Umfang und Komplexität, Angebot nach Bedarfsklärung).

**Status (16.09.2026): Leistungsseite „Prozessautomatisierung“ ist mit dieser Sektionsreihenfolge inhaltlich abgeschlossen (bis auf die Wissen-Teaser-Artikelauswahl).**

### Leistungsseite „Webseiten“ – konkrete Sektionsreihenfolge (elfte und letzte vollständig ausformulierte Leistungsseite, vollständig)

Abweichende Struktur gegenüber den vorherigen Leistungsseiten: eigener Hero-Visual-Typ (Vorher/Nachher-Slider statt Dashboard-Card/Toast) und eine zusätzliche „Besondere Sektion" (Ebenen-Stapel) nach Problem & Lösung/Trustbar:

1. **Hero** – abweichendes Hero-Visual: Browser-Fenster-Mockup mit animiertem Vorher/Nachher-Slider (klassische Vorlagen-Website vs. individuell gestaltete Website), floating Info-Cards. Referenzimplementierung `claude/hero-visuals/webseiten.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 9, dokumentierte Abweichung).
2. **Problem & Lösung** (2×2-Karten, zweizeilige Akzent-Headline: Performance & Ladezeit, Sichtbarkeit bei Google, Wartung & Sicherheit, KI-Auffindbarkeit). Referenzimplementierung `claude/components/problem-loesung-trustbar-webseiten.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 19, zehnte Referenz).
3. **Trustbar** (Partner-Logo-Marquee, laufend, gemeinsame Datei mit Punkt 2). Referenzimplementierung `claude/components/problem-loesung-trustbar-webseiten.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 20, elfte Referenz).
4. **Besondere Sektion: Ebenen-Stapel** (isometrischer Kartenstapel der sechs Ebenen einer betreuten Website, Hosting & Server → Datenschutz & Sicherheit → Content & Struktur → SEO → KI-Auffindbarkeit → Ihre Website, Klick-zu-Detail-Panel). Referenzimplementierung `claude/components/besondere-sektion-ebenen-webseiten.html` (siehe `docs/DESIGNSYSTEM.md` → neue Komponente 22j). **Verbindlich vor Go-Live zu beheben:** dokumentierter Responsive-Bug unterhalb 1080px (Panel überlappt Kartenstapel, siehe Komponente 22j für die genaue Ursache und die geforderte Lösung) — Behebung ist Teil der Implementierung durch Claude Code, nicht der Referenzdatei.
5. **Ablauf** ("So entsteht Ihre Website" — Zeitstrahl, siehe `docs/DESIGNSYSTEM.md` → Komponente 5, Referenz-Template `claude/components/zeitstrahl-template.html`; konkrete 4 Schritte in `docs/BRANCHE.md` → `webseiten` → `zeitstrahl_schritte`).
6. **Preise** – interaktive Referenzimplementierung, 3 Festpreis-Pakete (kein Monatlich/Jährlich-Toggle, einmalige Preise), gemeinsame „Website-Grundausstattung"-Chip-Leiste oberhalb der Karten, Zusatzleistungen „Hosting-Paket" und „Branding" als eigene Sektion darunter. Referenzimplementierung `claude/components/pricing-webseiten.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 1; konkrete Paketpreise in `docs/BRANCHE.md` → `webseiten` → `pricing`).
7. **FAQ** – leistungsspezifisch, 6 Fragen final, **kein eigener Vertragsbindungs-Punkt** (Website-Erstellung ist ein einmaliges Projekt, keine laufende Abo-Leistung — analog zur Prozessautomatisierung-Referenz). Referenzimplementierung `claude/components/faq-webseiten.html` (siehe `docs/DESIGNSYSTEM.md` → Komponente 21, zwölfte Referenz).
8. **CTA + Kontaktformular** – identisch zur Startseiten-Komponente, keine eigene Referenzdatei nötig (1:1-Wiederverwendung). Siehe `docs/DESIGNSYSTEM.md` → Komponente 16.
9. **Wissen/Blog-Teaser** – identische Komponente wie auf der Startseite (Komponente 17), keine eigene Referenzdatei nötig (1:1-Wiederverwendung). **Offen:** finale Auswahl der für Webseiten verlinkten Artikel steht noch aus (gleiches offene Muster wie bei den anderen Leistungsseiten — naheliegend `claude/components/blog-webseite-kosten.html` und `claude/components/blog-seo-fuer-unternehmen.html`).
10. **Footer** (seitenweit, Komponente 18).

**Hinweis GEO-Sektion:** `docs/BRANCHE.md` → `webseiten` → `geo_sektion` sieht ursprünglich eine eigene GEO-Erklär-Sektion vor. In der final gelieferten Sektionsreihenfolge ist das Thema stattdessen in Punkt 2 (Problem & Lösung, Karte „KI-Auffindbarkeit") und in Punkt 7 (FAQ, Frage zu ChatGPT & Co.) abgedeckt — keine separate Sektion nötig.

**Status (16.09.2026): Leistungsseite „Webseiten" ist mit dieser Sektionsreihenfolge inhaltlich abgeschlossen (bis auf die Wissen-Teaser-Artikelauswahl und die Behebung des Ebenen-Stapel-Responsive-Bugs durch Claude Code). Damit sind alle 11 Leistungsseiten inhaltlich vollständig spezifiziert.**

**Update (16.09.2026, Implementierung):** Ebenen-Stapel-Bug behoben (siehe `docs/DESIGNSYSTEM.md` → 22j). Wissen-Teaser-Auswahl als Vorschlag umgesetzt: je Leistungsseite drei thematisch passende Artikel im Feld `wissenArtikel` in `src/content/leistungen/<slug>.json` (Startseite: `src/content/seiten/startseite.json` → `wissen.artikel`); Änderungen nur dort, keine Code-Anpassung nötig.

### Technik (Astro dynamisches Routing)

```
src/pages/leistungen/[slug].astro
```

```astro
---
import { getCollection, getEntry } from "astro:content";

export async function getStaticPaths() {
  const leistungen = await getCollection("leistungen");
  return leistungen.map((l) => ({ params: { slug: l.slug }, props: { leistung: l } }));
}

const { leistung } = Astro.props;
---
```

- Statisch generiert (`getStaticPaths`), keine Server-Runtime nötig.
- SEO pro Unterseite: `seo_title`/`seo_description`/`seo_keywords` aus der Content Collection, JSON-LD `Service`-Schema.

---

## Kontaktformular – 5-Schritte-Flow (verbindlich, vom Nutzer im Detail vorgegeben)

Fortschrittsbalken mit 5 sichtbaren Schritten: ① Anliegen → ② Details → ③ Beschreibung → ④ Kontakt → ⑤ Termin.

1. **Wobei können wir helfen?** – große klickbare Karten, eine Leistung auswählen. Von einer Leistungsseite gestartet: Leistung automatisch vorausgefüllt (anhand der Herkunftsseite erkannt). Von der Startseite: Leistung muss explizit gewählt werden.
2. **Details** (generisches Fragen-Set für alle Leistungsbereiche):
   - Dringlichkeit: 🔴 Dringend / 🟡 In den nächsten Tagen / 🟢 Allgemeine Anfrage
   - Kurzthema (Freitext-Kurzfeld: „Worum geht es hauptsächlich?")
   - Anzahl Mitarbeiter/IT-Arbeitsplätze: 1–10 / 11–25 / 26–50 / 51–100 / über 100
3. **Anliegen beschreiben** – Freitextfeld + optionaler Datei-Upload (max. 3 Dateien, max. 5 MB/Datei, nur JPG/PNG/PDF, serverseitiger Content-Type-Check, verschlüsselt abgelegt, nicht ausführbar).
4. **Kontaktdaten** – Vorname & Nachname, Unternehmen, E-Mail, Telefonnummer (optional/empfohlen). Hier auch der DSGVO-Hinweistext (Link zur Datenschutzerklärung) – **keine Pflicht-Checkbox** vor Absenden (bewusste Entscheidung; rechtlich robuster wäre eine explizite Checkbox, da Daten dauerhaft in einer eigenen DB gespeichert werden – keine Rechtsberatung, im Zweifel anwaltlich prüfen).
5. **Wie möchten Sie fortfahren?** – zwei große Optionen:
   - ✉️ **Anfrage senden** („Wir prüfen Ihr Anliegen und melden uns bei Ihnen.")
   - 📅 **Kostenloses Erstgespräch buchen** (30 Min.) – Kalenderauswahl mit Live-Verfügbarkeit (CalDAV), nach Buchung automatischer Nextcloud-Talk-Link.

Vor dem finalen Absenden: automatische **Zusammenfassung** (Bereich, Unternehmensgröße, Anliegen) mit „Zurück"/„Anfrage senden"-Buttons.

**Spam-Schutz:** Honeypot-Feld (`aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"`) + Zeitstempel-Prüfung + Altcha (datenschutzfreundlich, kein reCAPTCHA). Rate-Limiting auf Caddy-Ebene.

**Barrierefreiheit des Formulars:** siehe `docs/BARRIEREFREIHEIT.md` → Abschnitt „Formulare".

---

## Backend (FastAPI) – Aufgaben

- Multi-Step-Formular entgegennehmen und serverseitig validieren (nie nur clientseitig).
- Alle Anfragen (Nachricht **und** Terminbuchung) zusätzlich zur E-Mail in eigener DB speichern (SQLite/Postgres) – Historie/spätere CRM-Basis.
- E-Mail-Versand über SMTP via Mailcow (eigener Mailserver, kein externer Versanddienstleister).
- Terminbuchung: **Live-Abgleich per CalDAV** mit dem Nextcloud-Kalender (echte Verfügbarkeit, keine Doppelbuchungen).
- Bei Buchung: automatische Erstellung eines Nextcloud-Talk-Raums über die Nextcloud-API; Kalender-Link + Video-Call-Link gehen per E-Mail an Kunde **und** Selim-IT.
- Datei-Upload: siehe Limits oben, serverseitiger Content-Type-Check (nicht nur Dateiendung).

### API-Grundriss

```
POST /api/contact          – Formular-Anfrage (ohne Termin)
POST /api/contact/booking  – Formular-Anfrage mit Terminbuchung (CalDAV + Nextcloud Talk)
GET  /api/availability     – verfügbare Zeitslots (Live-Abgleich CalDAV)
```

---

## DSGVO-Konformität (verbindliche Checkliste)

> Ziel: Datensparsamkeit by Default, keine ungefragten Drittanbieter-Requests. Keine Rechtsberatung, keine Gewähr – rechtliche Verantwortung trägt der Seitenbetreiber.

- ✅ Fonts self-hosted (Space Grotesk, Outfit, WOFF2) – kein Google-Fonts-/CDN-Request.
- ✅ Keine externen CDNs für JS/CSS/Icons/Bilder. Lucide-Icons via astro-icon lokal gebündelt.
- ✅ Keine Social-Media-Widgets/-Embeds. Social-Links sind einfache `<a>`-Links mit lokalen Icons.
- ✅ Kein Google reCAPTCHA. Spamschutz über Honeypot + Zeitstempel + Altcha + Rate-Limiting.
- ✅ Analytics (Umami/Plausible) ist cookiefrei, setzt keine Cookies, keine individualisierbaren Profile, IP nicht gespeichert/sofort anonymisiert. Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO) – **kein Consent-Banner nötig**.
- ✅ Kontaktformular: Datensparsamkeit (nur nötige Felder), HTTPS/TLS erzwungen, Zweckbindung (Art. 6 Abs. 1 lit. b/f DSGVO), DSGVO-Hinweistext mit Link zur Datenschutzerklärung.
- ✅ Terminbuchung/Video: ausschließlich selbst gehostete Systeme (Nextcloud Kalender + Talk) – keine externen Anbieter (Google Calendar, Zoom, Teams), kein Drittlandtransfer.
- ✅ Hosting: self-hosted auf silm-server (Deutschland) – im Datenschutztext Server-Logfiles (inkl. IP) und Speicherdauer benennen.
- ✅ Datenschutzerklärung & Impressum ohne Einwilligung und von jeder Seite (Footer) erreichbar.
- ✅ Kein `user-scalable=no` (Zoom muss möglich bleiben).

---

## SEO & GEO

- `@astrojs/sitemap` → XML-Sitemap.
- `robots.txt` mit expliziter Freigabe für GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- `llms.txt` für strukturierte KI-Auffindbarkeit.
- JSON-LD: `Organization`/`LocalBusiness` auf jeder Seite, `Service` auf Leistungsseiten, `FAQPage` bei FAQ-Sektionen, `BreadcrumbList` für Navigation.
- Dynamische Metadata (Open Graph, Twitter Cards, Canonical URLs) pro Seite aus der Content Collection.
- GEO-Erklär-Sektion auf der Webseiten-Leistungsseite (siehe `docs/BRANCHE.md` → `webseiten`).

---

## Barrierefreiheit

Vollständige, verbindliche Regeln: `docs/BARRIEREFREIHEIT.md`. Kurzfassung: Landmarks/Semantik, ein `h1` pro Seite, vollständige Tastaturbedienung, sichtbarer Fokus, Skip-Link, Kontrast ≥ 4,5:1 (≥ 3:1 großer Text/UI), Formulare mit echten Labels + `aria-describedby`-Fehlern, `prefers-reduced-motion` respektiert, sinnvolle `alt`-Texte. Eigene Seite „Erklärung zur Barrierefreiheit" (BFSG-Hinweis) wird angelegt.

---

## Performance

- Lighthouse-Ziel: 90+ in allen Kategorien, Accessibility 100.
- Core Web Vitals: LCP < 2,5s, INP < 200ms, CLS < 0,1.
- Astro Image mit `priority` für Hero-Bilder, `loading="lazy"` sonst, immer Breite/Höhe oder `fill` gesetzt (kein CLS).
- Statisches Astro-Build (SSG) für alle Seiten – keine unnötigen Client-Islands, Interaktivität nur wo nötig (Formular, ROI-Rechner, FAQ-Akkordeon, Reveal-Animationen).

---

## Mobil-spezifisch

- Floating CTA am unteren Rand (mobil): „Jetzt anrufen" mit Telefon-Icon.
- Click-to-Call auf allen Telefonnummern.
- Mobile Navigation als eigenes Overlay/Sheet-Pattern (Astro-Island), kein Fullscreen-Reload.
- Touch-Targets mindestens 44×44px.
- Kein Hover-only-Content – alles auch per Tap erreichbar.

---

## Deployment (self-hosted, silm-server)

```bash
# Frontend (Astro, statisch)
npm create astro@latest selim-it-website -- --template minimal --typescript strict
cd selim-it-website
npx astro add tailwind
npx astro add sitemap

# Content Collections, Icons, Bildoptimierung
npm install astro-icon lucide-static sharp

# Build
npm run build   # erzeugt dist/ – statische Dateien

# Backend (FastAPI, separates Deployment)
cd backend
python -m venv .venv && source .venv/bin/activate
pip install fastapi uvicorn caldav icalendar httpx sqlalchemy
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Infra:**
- Docker Compose unter `/opt/website` auf silm-server (89.167.40.206): ein Service für das statische Astro-Build (z. B. via Caddy `file_server`), ein Service für das FastAPI-Backend, eine Datenbank (SQLite-Datei-Volume oder Postgres-Container).
- Caddy: eigener Site-Block für `selim-it.de` (öffentlich erreichbar, kein `remote_ip`-Matcher wie bei internen Diensten), Reverse Proxy `/api/*` → FastAPI-Container.
- CI/CD: Forgejo Actions – Push auf `main` → Build (Astro + Backend-Image) → Rollout via Docker Compose auf silm-server.

### Env-Variablen (Backend, `.env`)

```
DATABASE_URL=postgresql://... (oder sqlite:///./data.db)
SMTP_HOST=... / SMTP_USER=... / SMTP_PASSWORD=...
CALDAV_URL=... / CALDAV_USER=... / CALDAV_PASSWORD=...
NEXTCLOUD_TALK_API_URL=... / NEXTCLOUD_TALK_TOKEN=...
ALTCHA_SECRET=...
SITE_URL=https://selim-it.de
```

---

## Lead-Generierung: Strategie-Zusammenfassung

### Conversion-Hebel auf der Seite
1. Hero-CTA – sofort sichtbar, benefit-driven
2. Telefonnummer überall (Header, Hero, Footer, Floating Button)
3. Lead Magnets auf 4 Leistungsseiten (siehe `docs/BRANCHE.md`)
4. Kontaktformular – 5-Schritte-Flow mit vorausgefüllter Leistung
5. Interaktive ROI-Rechner (KI-Telefonassistent, WhatsApp-Chatbot) – Kombi-Rabatt-Hinweis zwischen beiden
6. Substanz statt Social Proof – Technologie-Trust-Bar, konkrete Feature-/Zahlen-Details
7. CTA-Banner vor dem Footer

---

## Reihenfolge der Implementierung

1. Projekt-Scaffold: Astro + Tailwind + Sitemap-Integration.
2. `src/styles/global.css`: Tailwind-Theme (`@theme`) mit den 4 Kernfarben und Verlauf (siehe `docs/DESIGNSYSTEM.md`).
3. `src/content/config.ts` + Content Collections (`leistungen/`, `faq/`, `wissen/`, `zitate/`) aus `docs/BRANCHE.md` befüllen.
4. `src/lib/config.ts` (Firmendaten, Navigation), `src/lib/animations.ts` (Reveal-Utility mit `prefers-reduced-motion`-Fallback), `src/lib/utils.ts`, `src/lib/validation.ts` (Zod-Schemas fürs Formular).
5. `src/components/shared/RevealOnScroll.astro` + Komponenten-Bibliothek (Pricing-Card, Add-on-Card, Vergleichs-Card, Kennzahl-Callout, Zeitstrahl, ROI-Rechner-Island, Hero-Zitat-Block).
6. `src/components/layout/Header.astro` + `Footer.astro` (inkl. Skip-Link).
7. `src/layouts/BaseLayout.astro` (Fonts, `<html lang="de">`, Skip-Link-Ziel `<main id="main">`, JSON-LD `LocalBusiness`).
8. Startseiten-Sektionen (Reihenfolge siehe oben) + `src/pages/index.astro`.
9. `src/pages/leistungen/[slug].astro` (dynamisches Routing über Content Collection).
10. Kontaktformular-Island + FastAPI-Backend-Routen (Zod client + serverseitige Validierung, Honeypot, Rate-Limit, CalDAV, Nextcloud Talk).
11. Rechtliche Seiten (Impressum, Datenschutz, Erklärung zur Barrierefreiheit).
12. SEO (Metadata, JSON-LD, `sitemap.ts`-Äquivalent, `robots.txt`, `llms.txt`).
13. Mobile Floating CTA.
14. „Wissen"-Bereich (Content Collection + Listing + Detailseite, 2–3 Startartikel).
15. **Barrierefreiheits-Check** gegen `docs/BARRIEREFREIHEIT.md` (Tastatur-Durchlauf, Kontraste, Screenreader-Stichprobe, axe/Lighthouse a11y).
16. Performance-Audit (Lighthouse/Core Web Vitals) + Deployment auf silm-server (Docker Compose, Caddy, Forgejo Actions).

---

<sub>Selim-IT Website-Kit · Stand: 2026-08-29</sub>

---

## Änderungen Runde 3 (22.09.2026)

Kurzfassung der Punkte, die den Stand gegenüber den Runden 1 und 2 verändern. Maßgeblich ist immer der Code.

### Global

- **Wechselwort im Hero** läuft als Drehrad (Opacity + Rotation, `initWortrad` in `src/lib/animations.ts`), nicht mehr als Schreibmaschine. 7,5 s Standzeit, die Rahmenbreite läuft weich mit, damit die Zeile nicht springt.
- **Navigationspunkt „Webseiten“ heißt „Webentwicklung“** (`src/lib/config.ts`); die URL bleibt `/leistungen/webseiten`.
- **Problem & Lösung**: Logo im Lösungskasten ohne „IT“ (`WORTMARKE_NUR_SELIM` in `src/lib/brand.ts`), Piktogramme größer und ohne Rahmen.
- **Laufbänder** (Branchen und Trustbar) laufen ununterbrochen und lückenlos: zwei identische Gruppen, jede mit eigenem Abstand am Ende, Verschiebung um exakt −50 %.
- **Partner-Logos** liegen zentral in `src/lib/partner.ts` (Dateien unter `public/partner/`) und werden in Trustbar und „Starke Partner“ verwendet. Lenovo und Dell folgen später.
- **Kontaktformular**: kein Dringlichkeits-Hinweis mehr, kurzer Vertraulichkeitssatz statt Datenschutz-Link, im Schritt „Details“ nur die Leistungen der gewählten Bereiche, Termin erst **nach** dem Absenden (optional) über `POST /api/contact/{id}/termin`.
- **Footer**: weißer Seitenrand und runde Ecken wie beim Hero, Verlauf dunkel (links) → hell (rechts unten), LinkedIn ohne Kreis, Button „Beratungstermin vereinbaren“, Impressum/Datenschutz als Buttons, kein Eintrag „Barrierefreiheit“ mehr.
- **Adresse und Telefon**: 60324 Frankfurt am Main, Westendstraße 100 · 069 247541950.
- **Hero-Sublines** nennen Frankfurt und das Rhein-Main-Gebiet. Ausnahme: KI-Telefonassistent und WhatsApp-Chatbot („für ganz Deutschland“, weil ortsunabhängig).
- **Preis-Sektionen**: Ersparnis steckt im Jahres-Umschalter, Netto-Hinweis unter den Paketen, „Alles inklusive“ in der besonderen Farbe, weißer Premium-Button mit Glanz in der Markenfarbe, Reaktionszeit-Kasten ohne türkise Linie.
- **Zeitstrahl** ohne „Schritt 01 von 03“.

### Seiten

- **Startseite**: zweite Bild-&-Text-Sektion („Erst verstehen, dann umsetzen“), Vorteile ohne Hover-Linie, FAQ mit Button und verlinkten Leistungen.
- **IT-Betreuung**: neue Bild-&-Text-Sektion zu Updates und Wartung, Geräte-Regler so breit wie die Pakete, Premium erbt aus Business.
- **Server-Betreuung**: Preise 79/109/149 €, Standard- und Notfall-Reaktionszeit in allen Paketen.
- **Hardware**: zusätzliche Bild-&-Text-Sektion zur Server-Beschaffung.
- **Datensicherung**: zusätzliche Bild-&-Text-Sektion „Das alles lässt sich sichern“.
- **KI-Telefonassistent / WhatsApp-Chatbot**: neue Preise, Scale-Paket in der besonderen Farbe, überarbeitete Betreuungs-Punkte, Transkript eingeklappt.
- **Automatisierung**: „Typische Anwendungsfälle“ vor „Beispiele aus der Praxis“, Karten wechseln per Überblendung statt 3D-Drehung (war ruckelig).
- **Webentwicklung**: Reihenfolge der Bild-&-Text-Sektionen getauscht, sechster Ablaufschritt „Betreuung und Hosting“, Preise 1.299/1.990/ab 2.490 €.
- **Wissen**: Inhaltsverzeichnis links neben jedem Beitrag (die Überschriften stehen dafür als Markdown statt als rohes `<h2>`), Abschluss-Button führt zur CTA-Sektion der Startseite. Die Seite `/kontakt` und `/barrierefreiheit` entfallen.

### Sicherheit

- **Content-Security-Policy** über `security.csp` in `astro.config.mjs`; Astro hasht seine Skripte und Styles selbst. Die drei `is:inline`-Skripte und der Laufzeit-Style des Altcha-Widgets sind als feste Hashes hinterlegt. `npm run build` ruft `scripts/csp-pruefen.mjs` auf und bricht ab, sobald ein Inline-Skript nicht mehr erlaubt ist.
- **Caddy** setzt HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP sowie Cache-Regeln (`/_astro/*` unveränderlich, HTML `no-cache`, `/api/*` `no-store`).
- **Backend**: API-Doku in Produktion aus, Host-Prüfung, 64-kB-Limit für POST-Bodies, Mengenbegrenzung 10 POSTs je IP und 10 Minuten, Sicherheits-Header auf jeder Antwort.

---

## Änderungen Runde 4 (22.09.2026)

### Global

- **Trustbar und Branchen-Laufband**: Logos bzw. Chips stehen pro Gruppe mehrfach hintereinander, damit eine Gruppe auch auf 2560-px-Bildschirmen breiter ist als das Fenster – keine leere Stelle mehr. Microsoft erscheint nur noch als Schriftzug.
- **Wechselwort im Hero**: Überblendung mit leichtem Hochgleiten (`initWortwechsel`). Alle Wörter liegen übereinander, das breiteste bestimmt die Breite → keine Verschiebung. Steht das Wort am Satzanfang, bekommt es eine eigene Zeile.
- **Navbar-Logo**: das K ist eine gefüllte Glyphe in derselben Strichstärke wie I und T.
- **Navbar-Dropdowns** zweispaltig mit Überschriften, Piktogramme ohne Rahmen, Datensicherung als Wolke mit Deutschlandflagge; „KI-Chatbot“ und „E-Mail-Assistent“ blass mit „bald verfügbar“, Telefonanlage entfällt.
- **Hero-Sublines**: Standort immer als eigener Satz („Aus Frankfurt für das Rhein-Main-Gebiet.“), KI-Telefon und WhatsApp „Für Unternehmen in ganz Deutschland.“, Wissen ohne Standortsatz.
- **Zeitstrahl**: Die große Zahl steht auf Höhe des Markers; die Beschreibung wächst nach unten.
- **Sprung zur CTA** landet an der Oberkante der Sektion.
- **Formular**: Freitext ist Pflicht; bei „Webentwicklung“ die Zusatzoptionen Branding/Hosting statt der Leistungsfrage; bei nur „Allgemeine Beratung“ keine Leistungsfrage; Terminkasten in Schritt 4 sichtbar, aber bis zum Absenden gesperrt.
- **Preise**: Jahrespreise auf volle Euro aufgerundet, Grundpreis (IT-Betreuung) sinkt nicht, Häkchen der Grundsicherung ohne Kreis, Zusatzleistungen mit Link zur Leistungsseite.
- **Footer**: „Beratung vereinbaren“ unter Logo und Slogan, Impressum/Datenschutz als schlichte Links.

### Seiten

- **KI-Telefon / WhatsApp**: Kasten „Laufende Betreuung“ je Paket, Vererbung wie bei IT-Betreuung, Tooltip als Portal unter `<body>` (vorher falsch positioniert, weil Karten ein transform tragen).
- **Neue Seite `/leitbild`** (Navbar → Unternehmen), **Über uns** neu aufgebaut, **Wissen** mit Hero-Bild.
- Weitere Punkte: siehe Code und Zusammenfassung Runde 4.

---

## Änderungen Runde 8 (23.09.2026)

### KI-Telefonassistent und WhatsApp-Chatbot

- **Siegel-Band** nach dem ersten Bild-&-Text-Abschnitt: „DSGVO-konform“ und „EU-AI-Act-konform“ (Sektionstyp `siegel`, Komponente `Siegel.astro`).
- **Preise**: KI-Telefon 119 / 359 / 599 € mit Minutenpreis in Cent neben dem Kontingent; WhatsApp 69 / 249 / 499 €. „∞ Assistenten“ bzw. „∞ Chatbots“ in allen Paketen.
- **Laufende Betreuung** ist kein Kasten in den Paketkarten mehr, sondern ein eigenes Paket neben der Einrichtung (`pricingSetup.betreuungPaket`): KI-Telefon 99 €, WhatsApp 79 € netto/Monat, sechs Leistungen mit Häkchen.
- **Einrichtung**: „Rechtskonforme Gesprächsführung“ entfällt beim KI-Telefon, „netto“ steht unter dem Preis.

### Formular

- Freitext „Erzählen Sie uns kurz mehr“ ist wieder **optional** (Frontend-Validierung und Backend: `nachricht` darf fehlen, leere Werte werden zu `None`).

### Englische Version

- Deutsch bleibt Ausgangssprache; Englisch liegt unter `/en/` mit englischen Slugs (`src/i18n/routen.ts`, z. B. `/en/services/managed-it`, `/en/insights/…`, `/en/about`, `/en/mission`, `/en/legal-notice`, `/en/privacy`).
- **Übersetzung**: ein Wörterbuch `src/i18n/en.json` (deutsch → englisch). Komponenten nutzen `t("…")`, Content-JSON läuft durch `lokalisiere()`. Preise, Icons und Struktur existieren nur einmal im deutschen Content – eine Preisänderung gilt automatisch für beide Sprachen. Reine Zahlenangaben werden automatisch ins englische Format gesetzt (`499 €` → `€499`, `87 %` → `87%`). Feldbezogene Übersetzungen über `"feld:Text"` (z. B. `mehrzahl:Server`).
- **Wissen-Artikel** liegen als eigene Collection `wissenEn` (`src/content/wissen-en/`, gleiche Ids wie die deutschen).
- **Impressum/Datenschutz** haben eigene englische Fassungen mit Hinweis, dass die deutsche Fassung verbindlich ist.
- **Sprachumschalter** DE | EN in Navbar und mobilem Menü, verlinkt jeweils auf dieselbe Seite in der anderen Sprache. `hreflang` (de/en/x-default), `og:locale` und `<html lang>` werden pro Seite gesetzt.
- Amerikanisches Englisch, sinngemäß statt wörtlich übersetzt; dieselben Copy-Regeln wie im Deutschen (keine Gedankenstriche als Stilmittel, keine KI-Floskeln).
- **Build-Prüfung** `npm run i18n:pruefen` (läuft nach jedem Build): bricht ab, wenn auf einer englischen Seite deutscher Text steht, z. B. weil ein neuer Text noch nicht im Wörterbuch ist.
- **Neue Texte**: deutschen Text wie gewohnt schreiben, englische Übersetzung in `src/i18n/en.json` ergänzen.
- **Bestätigungsmails**: Anfragen von `/en/…` bekommen Anfrage- und Terminbestätigung auf Englisch; die interne Mail ist mit `[EN]` markiert (siehe `backend/README.md`).
- **Caddy**: nicht gefundene `/en/…`-Pfade zeigen die englische 404-Seite; `try_files` prüft zusätzlich `{path}/`, damit Verzeichnisse ohne abschließenden Schrägstrich ihre `index.html` liefern.
