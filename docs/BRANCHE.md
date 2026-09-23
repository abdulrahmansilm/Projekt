# Firmen- und Leistungsdaten: Selim-IT

> Diese Datei ist die **einzige inhaltliche Datenquelle** für Firmendaten und Leistungen. Sie wird in Astro Content Collections überführt (`src/content/leistungen/*.md` + `src/lib/config.ts`). Änderungen an Firmendaten oder Leistungen werden **nur hier** vorgenommen, nie direkt in Komponenten.

---

## Firmendaten

```yaml
firmenname: "Selim-IT"
inhaber: "Ahmad Mahio Silm"
rechtsform: "Einzelunternehmen"
domain: "selim-it.de"
gruendungsjahr: 2026
adresse:
  strasse: "Westendstraße 100"
  plz: "[PLZ fehlt – ergänzen]"
  stadt: "Frankfurt am Main"
kontakt:
  telefon: "[Telefonnummer fehlt – ergänzen]"
  email: "[E-Mail-Adresse fehlt – ergänzen, z. B. info@selim-it.de]"
ust_idnr: "[noch nicht vorhanden – Platzhalter, vor Live-Schaltung ergänzen oder Kleinunternehmerregelung § 19 UStG vermerken]"
```

**Nicht vorhanden / bewusst entfernt (anders als im ursprünglichen Handwerker-Kit):**
- Kein Notdienst/24-7-Banner
- Kein Einzugsgebiet/Städte-Liste
- Keine Meisterbetrieb-/Handwerkskammer-Angaben
- Keine Team-/Über-uns-Sektion mit Namen/Fotos der Gründer
- Keine Bewertungs-/Testimonial-Sektion mit erfundenen Kundenstimmen (neue Firma – unseriös). Struktur im Code vorbereiten, aber inaktiv lassen, bis echte Google-Bewertungen vorliegen.

## Social Proof (Ersatz für Kundenstimmen)

Statt Bewertungen: eine **Technologie-/Partner-Logo-Trust-Bar** direkt unter dem Hero der Startseite (z. B. Microsoft 365, Nextcloud, weitere tatsächlich eingesetzte Technologien/Zertifizierungen – nur reale, abgestimmte Logos, keine erfundenen Partner).

## Startseite – Hero

Inhalt für die Hero Section der Startseite (Struktur: `docs/DESIGNSYSTEM.md` → Komponente 9):

- **hero_headline:** „IT-Dienstleistungen für Ihr Unternehmen"
- **hero_subline:** „Betreuung, Webseiten, Microsoft 365, Automatisierung und KI-Assistenten – alles aus einer Hand, ohne Vorabinvestition."
- **hero_zitat:** keins – die Startseite bekommt bewusst keinen Hero-Zitat-Block (siehe `docs/DESIGNSYSTEM.md` → Komponente 7: „nicht jede Seite bekommt zwangsläufig einen Zitat-Block").
- **hero_visual:** HTML/CSS/JS-Snippet (Cowork-Projekt → `claude/hero-visuals/startseite.html`) – abweichendes Muster (kein Dashboard-Card/Toast, kein Icon-Cluster): großes Logo-Icon (Wortmarke-Symbol) mit Glow-Hintergrund; entlang der echten Logo-Pfad-Kanten läuft ein farbiges Kontur-Segment (SVG `getPointAtLength`, 10s Loop, JS-berechneter Farbverlauf pro Frame), respektiert `prefers-reduced-motion` (Animation entfällt komplett, Logo bleibt statisch sichtbar).

## Navigation / Leistungskategorien

```yaml
navigation:
  - kategorie: "IT & Infrastruktur"
    icon: "server"
    leistungen: [it-betreuung, server-betreuung, fernzugriff-vpn, hardware-beschaffung, microsoft-365, datensicherung, email-sicherheit]
  - kategorie: "KI & Kommunikation"
    icon: "bot"
    leistungen:
      - { slug: ki-telefonassistent, status: aktiv }
      - { slug: whatsapp-chatbot, status: aktiv }
      - { slug: prozessautomatisierung, status: aktiv }
      - { slug: ki-email-assistent, status: "bald verfügbar" }
      - { slug: webchat, status: "bald verfügbar" }
      - { slug: telefonanlage-pbx, status: "bald verfügbar", label: "Telefonanlage/PBX" }
  - kategorie: "Webseiten"
    icon: "layout"
    hinweis: "Eigener Navbar-Punkt, ohne Unterpunkte"
    leistungen: [webseiten]
  - sonderseiten: ["Wissen" (ehem. Blog), "Kontakt (Formular-Flow)"]
  - footer_links: ["Impressum", "Datenschutz", "Erklärung zur Barrierefreiheit"]
```

"Bald verfügbar"-Einträge werden blass dargestellt und sind nicht anklickbar. Die Leistungsliste ist über die Content Collection leicht erweiterbar.

---

## Leistungen (vollständige Datensätze)

Jede Leistung erhält eine eigene Unterseite nach dem generischen Template (siehe `docs/ANFORDERUNGEN.md` → „Leistungsseiten-Template"). Pricing nur, wo unten angegeben – die übrigen Seiten enden mit einer Kontakt-CTA ohne festen Preis.

### 1. `it-betreuung` — IT-Betreuung

- **kurz:** Laufende Betreuung Ihrer gesamten Unternehmens-IT: Monitoring, Wartung, Störungsbeseitigung, ein fester Ansprechpartner.
- **hero_headline:** „Zuverlässige IT-Betreuung für Ihr Unternehmen"
- **hero_subline:** „Laufende Überwachung und Support bundesweit – im Rhein-Main-Gebiet auch vor Ort."
- **hero_zitat:** „Der teuerste IT-Ausfall ist der, der lange vorher sichtbar war, nur hat niemand hingesehen." *(final bestätigt)*
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/it-betreuung.html`) – Dashboard-Card „Ihre Geräte im Blick“ (Geräteliste mit Status „Geschützt“) + zwei schwebende Toast-Karten mit nur leichtem Überlapp auf dem Hauptpanel: oben rechts „Ticket gelöst“, unten links „Support-Hotline erreichbar“.
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen/Dial-Template, ersetzt die frühere lineare Darstellung mit verbundenen Kreisen):
  - Eyebrow: „— Wie es läuft"
  - Überschrift: „IT-Bestandsaufnahme"
  - Schritte:
    1. **01 Erstgespräch** – Wir klären Umfang, Systeme und Ansprechpartner in einem kurzen Gespräch.
    2. **02 Aufnahme & Auswertung** – Wir prüfen Ihre IT und erstellen einen Ampel-Bericht (rot/gelb/grün). Der Bericht gehört Ihnen, ganz ohne Vertragsbindung.
    3. **03 Umsetzung** – Wir beseitigen die roten und optional die gelben Punkte aus dem Bericht.
    4. **04 Übergabe** – Übergabe an die laufende Betreuung mit Monitoring und festen Reaktionszeiten.
- **pricing:** interaktive Pricing-Sektion mit Monatlich/Jährlich-Umschalter (−10 % bei jährlicher Zahlweise), gemeinsamer „Grundsicherung"-Chip-Leiste über den 3 Karten und ausklappbarer Vergleichstabelle. Referenzimplementierung (HTML/CSS/JS, Cowork-Projekt → `claude/components/pricing-it-betreuung.html`) – **ersetzt die frühere statische 3-Spalten-Tabelle.**
  | Paket | Claim | Preis/Monat | + pro Gerät/Monat | Reaktionszeit Standard/Notfall |
  |---|---|---|---|---|
  | Starter | „Für den Einstieg – solide Grundabsicherung für Ihre IT." | 50 € | 30 € | 24 Std. / 8 Std. |
  | Business (Beliebt) | „Für wachsende Teams – schnelle Reaktion, wenn's drauf ankommt." | 80 € | 40 € | 8 Std. / 2 Std. |
  | Premium (Alles inklusive) | „Für maximale Ruhe – ein fester Ansprechpartner übernimmt alles." | 120 € | 60 € | 4 Std. / 1 Std. |

  Bei jährlicher Zahlweise gelten dieselben Preise × 0,9 (10 % Rabatt), Hinweistext „jährliche Zahlweise, 10% Rabatt inklusive" erscheint auf der Karte.

  Immer inklusive (alle 3 Pakete, als Chip-Leiste über den Karten): Monitoring 24/7, Störungsbeseitigung Remote, Wartungsarbeiten, Ticketsystem, Patch-Management, Virenschutz, laufende Dokumentation, monatlicher Report.

  Zusätzlich je Paket:
  - Starter: IT-Strategie-Check einmalig.
  - Business: Backup-Prüfung inklusive, Hotline-Support, IT-Strategie-Check jährlich.
  - Premium: Backup-Prüfung inklusive, Hotline-Support, Störungsbeseitigung vor Ort, fester Ansprechpartner, **Endpoint Security** (neu ggü. früherer Fassung), IT-Strategie-Check halbjährlich.
- **addons:**
  - „Backup-Einrichtung & Recovery-Test" – Badge „🇩🇪 Gespeichert in Deutschland", Claim „Nicht nur gesichert. Bewiesen wiederherstellbar.", sichert Postfächer/Teams/OneDrive/SharePoint/Entra ID/Planner, Hinweis auf erweiterbares Server-Backup, kein Preis sichtbar.
  - „Postfach-Schutzschild" – Badge „🇩🇪 BSI-zertifizierte E-Mail-Security", Claim „Was durchkommt, ist geprüft. Was ausfällt, wird aufgefangen.", Features: Spam-/Phishing-Schutz (99,9 %), ATP, GoBD-Archivierung, E-Mail-Continuity, kein Preis sichtbar.
- **vorteile:** Planbare IT-Kosten, Single Point of Contact, Schnelligkeit.

### 2. `server-betreuung` — Server-Betreuung *(umbenannt, vormals „Managed Server")*

- **kurz:** Überwachung, Wartung und Absicherung Ihrer Server, bevor Auffälligkeiten zum Ausfall werden.
- **hero_headline:** „Ihr Server, dauerhaft im Blick"
- **hero_subline:** „24/7-Monitoring und Patches im festen Wartungsfenster, bevor aus einer Auffälligkeit ein Ausfall wird."
- **hero_zitat:** „Ein Server, der nur mitläuft, ist der teuerste Ausfall im ganzen Netz."
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/server-betreuung.html`, umbenannt von `managed-server.html`, Inhalt unverändert) – Dashboard-Card „Server-Übersicht“ (Icon `assets/Icon_bunt.svg` neben dem Titel, 4 Server, Status „Live überwacht“) + zwei schwebende Toast-Karten mit nur leichtem Überlapp auf dem Hauptpanel: oben rechts „Alle Updates eingespielt“, unten links (etwas weiter entfernt) „Backup läuft automatisch“.
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie es läuft"
  - Überschrift: „Server-Betreuung einrichten"
  - Schritte:
    1. **01 Server-Analyse** – Rollen und Dienste, Auslastung, Patch-Stand, Sicherung und Zugriffsrechte im Überblick.
    2. **02 Einrichtung der Betreuung** – Monitoring-Agent, feste Wartungsfenster, Datensicherung inklusive Wiederherstellungstest.
    3. **03 Laufender Betrieb** – 24/7-Überwachung, Patches im vereinbarten Fenster, protokollierte Zugriffe.
- **pricing:** Interaktive Referenzimplementierung wie bei IT-Betreuung (Cowork-Projekt → `claude/components/pricing-server-betreuung.html`): Monatlich/Jährlich-Toggle (10 % Jährlich-Rabatt), gemeinsame „Grundüberwachung"-Chip-Leiste, 3 Karten mit Hover-Effekt und „Alles aus X, außerdem:"-Darstellung für Standard/Premium, ausklappbare Vergleichstabelle. 3 Pakete pro Server/Monat:
  | Paket | Preis/Server/Monat | Reaktionszeit | Support-Kanal |
  |---|---|---|---|
  | Basis | 79 € | 24 Std. | Ticket-System |
  | Standard (BELIEBT) | 109 € | 8 Std. | Ticket-System + Hotline |
  | Premium (invertiert) | 149 € | 2 Std. | Ticket-System + Hotline + fester Ansprechpartner |

  Feature-Matrix: Alle – 24/7-Monitoring, Patch-/Update-Management, Backup-Prüfung, Remote-Störungsbeseitigung. Standard „Alles aus Basis, außerdem:" – erweiterte Security-Maßnahmen, regelmäßige Systemprüfung, Hotline-Support. Premium „Alles aus Standard, außerdem:" – Störungsbeseitigung vor Ort, umfangreiche Security-Maßnahmen, Kapazitätsplanung, fester Ansprechpartner.
- **addon (Zusatzleistung, eigene Sektion unterhalb der Vergleichstabelle):** „Server-Backup" – Badge „Beliebt", Icon Schild im Deutschland-Flaggen-Verlauf (schwarz/rot/gold, eigenständig, nicht Teil der Türkis/Petrol-Regel), Preis **„Ab XX € / Server / Monat" – Platzhalter, noch nicht final bestätigt**, enthält: Einrichten der automatischen Sicherung, Prüfen des Backups in festen Abständen, Wiederherstellungstest im Ernstfall, Sicherung von Datenbanken.

### 3. `fernzugriff-vpn` — Fernzugriff / VPN

- **kurz:** Sichere, verschlüsselte Verbindung all Ihrer Standorte zu einem gemeinsamen Netzwerk.
- **hero_headline:** „Sicherer Fernzugriff auf Ihr Firmennetzwerk"
- **hero_subline:** „Verschlüsselte VPN-Verbindung zwischen allen Standorten – ein gemeinsames Netzwerk statt getrennter Inseln."
- **hero_zitat:** „Ein Standort, der nicht sicher angebunden ist, ist ein Netzwerk mit einem offenen Fenster."
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/fernzugriff-vpn.html`) – abweichendes Muster (kein Dashboard-Card/Toast, sondern eigenständige Tunnel-Visualisierung): vertikaler VPN-Tunnel zwischen zwei Knoten-Karten („Überall“ oben, „Firmennetzwerk“ unten), Schloss-Icon „Verschlüsselt“ in der Mitte, animierte Punkte fließen in beide Richtungen durch den Tunnel (3.5s Loop, versetzt).
- **vergleich** („Ohne VPN" vs. „Mit VPN", 2-spaltig): Ohne – unverschlüsselte Datenwege, zersplitterte Systeme, eingeschränkter Zugriff, höhere Fehleranfälligkeit. Mit – verschlüsselte Standortverbindung, gemeinsames Firmennetzwerk, zentraler Zugriff, stabile Performance.
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie es läuft"
  - Überschrift: „So bringen wir Ihre Standorte sicher zusammen"
  - Schritte:
    1. **01 Standortanalyse** – Wir erfassen alle Standorte, bestehende Netzwerke und Anforderungen.
    2. **02 Sichere Kopplung** – Einrichtung von VPN-Tunnel, Routern und Firewalls zwischen Ihren Standorten.
    3. **03 Testphase** – Wir prüfen Verbindung, Performance und Zugriffsrechte im laufenden Betrieb.
    4. **04 Laufender Betrieb** – Überwachung der Verbindung, Wartung und Ansprechpartner bei Änderungen.
- **pricing:** keins – Kontakt-CTA ohne festen Preis.

### 4. `hardware-beschaffung` — Hardware-Beschaffung

- **kurz:** Bedarfsgerechte Auswahl, Beschaffung und Einrichtung Ihrer Arbeitsplatz-Hardware, direkt in die laufende Betreuung übergeben.
- **hero_headline:** „Neue Arbeitsplätze, komplett eingerichtet"
- **hero_subline:** „Wir beschaffen, richten ein und binden jeden Arbeitsplatz direkt an Ihr Netzwerk an."
- **hero_zitat:** „Zwischen Auspacken und Arbeitsfähigkeit liegt mehr als ein Klick." *(ersetzt frühere Fassung „Ein Gerät ist erst einsatzbereit, wenn es im Monitoring hängt...")*
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/hardware-beschaffung.html`) – abweichendes Muster (kein Dashboard-Card/Toast): zentrales, unbewegtes Piktogramm (Monitor + Server-Rack) umgeben von drei diagonal versetzten, leicht schwebenden Info-Karten (oben links „Beratung, Auswahl & Beschaffung“, oben rechts „Eingerichtet & startklar“, unten links „Angebunden & einsatzbereit“), jede Karte mit eigenem, leicht versetztem Float-Loop (7s/8s/9s).
- **trust_bar:** Partner-/Hersteller-Logo-Leiste – **Logos noch offen**, nur reale, abgestimmte Partner zeigen.
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie es läuft"
  - Überschrift: „Drei Schritte von der Anforderung bis zum fertigen Arbeitsplatz"
  - Schritte:
    1. **01 Bedarfsermittlung & Planung** – Bestehende Arbeitsplätze, Softwareanforderungen, Sicherheitsvorgaben und technisches Konzept.
    2. **02 Auswahl, Beschaffung & Bereitstellung** – Hersteller- und Modellvergleich, Bestellung im Kundenauftrag über Distributoren, kein eigenes Lager.
    3. **03 Einrichtung, Integration & Übergabe** – Vollständige Einrichtung, Sicherheits-Baseline, Anbindung an Netzwerk, Server und Cloud, Übergabe in die laufende Betreuung.
- **detail_tabelle** (Bereich | Was wir übernehmen | Ergebnis für Sie): Bedarfsanalyse, Auswahl & Beschaffung, Vorbereitung, Einrichtung vor Ort, Übergabe in die Betreuung (vollständige Zeilen siehe `docs/ANFORDERUNGEN.md`). Rechte Spalte farblich/typografisch abgesetzt (Verlauf-Text/Petrol), moderne Hover-/Scroll-Animation auf den 3 Karten.
- **cross_sell:** kurzer, nicht drängender Absatz zur IT-Betreuung. Kernaussage (wörtlich): „Ein neu eingerichteter Arbeitsplatz, der nicht in die laufende Betreuung übergeht, verliert genau dort seinen Wert wieder, kein Monitoring, keine Patches." Sekundärer Button „Mehr zur IT-Betreuung" → verlinkt `it-betreuung`.
- **pricing:** keins – Kontakt-CTA ohne festen Preis (evtl. spätere Einrichtungspauschale offen).

### 5. `microsoft-365` — Microsoft 365

- **kurz:** Einrichtung, Absicherung und laufende Betreuung Ihrer Microsoft-365-Umgebung.
- **hero_headline:** „Microsoft 365, richtig eingerichtet und betreut"
- **hero_subline:** „Von der Einrichtung bis zum laufenden Support – Outlook, Teams und SharePoint aus einer Hand."
- **hero_zitat:** „Eine Lizenz ist ein Zugang. Kein Betrieb."
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/microsoft-365.html`) – abweichendes Muster (kein Dashboard-Card/Toast): sechs App-Icon-Kacheln (Mail, Chat, Dateien, Kalender, Sicherheit, Team) locker über die Fläche verteilt, jede Kachel schwebt leicht mit eigenem Float+Rotate-Loop (3.4–4.8s, individuell versetzt).
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie wir vorgehen"
  - Überschrift: „Wie wir vorgehen"
  - Schritte:
    1. **01 Bedarfsanalyse** – Einmalig: Wir klären Lizenzbedarf, Anwendungen und Sicherheitsanforderungen.
    2. **02 Einrichtung** – Einmalig: Tenant, Domain, Postfächer, MFA und Sicherheitsrichtlinien.
    3. **03 Betreuung** – Laufend: Ticketsupport und Störungsbeseitigung.
- **anwendungen:** Kommunikation & Zusammenarbeit (Outlook, Teams) · Dateimanagement & Intranet (SharePoint, OneDrive) · Modern Work/Automatisierung/KI (Copilot für M365).
- **bundle:** „Betreuung + M365-Backup" – sichert Exchange Online, OneDrive for Business, SharePoint Online, Microsoft Teams, Entra ID, Planner & To Do, OneNote, Forms & Loop. Führt in den Kontakt-Formular-Flow, kein fester Preis.
- **pricing:** keins – Button „Preis anfragen" → Kontakt-Formular-Flow.

### 6. `datensicherung` — Datensicherung (Managed Backup)

- **kurz:** Automatisierte, versionierte Datensicherung mit regelmäßig getesteter Wiederherstellung.
- **hero_headline:** „Datensicherung, die im Ernstfall wirklich funktioniert"
- **hero_subline:** „Automatisierte Backups, mehrfach versioniert, regelmäßig auf Wiederherstellbarkeit geprüft."
- **hero_zitat:** „Ein Backup, das nie zurückgespielt wurde, ist eine Vermutung."
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/datensicherung.html`) – abweichendes Muster (kein Dashboard-Card/Toast): Deutschland-Flagge in Wolkenform mit Schloss-Icon in der Mitte (schwebt leicht), umgeben von zwei schwebenden Toast-Karten (oben rechts „Deutsches Rechenzentrum“, unten links „DSGVO-konform“).
- **zeitstrahl** (zyklisch, 4 Schritte mit Rhythmus-Label, „Kein einmaliges Projekt. Ein Kreislauf, der nie stillsteht."):
  1. Sichern · täglich – automatisiert, verschlüsselt, getrennte Umgebung.
  2. Aufbewahren · laufend – mehrere Versionsstände parallel.
  3. Prüfen · quartalsweise – echte Testwiederherstellung von Datei und Postfach.
  4. Protokoll · je Test – schriftlicher Nachweis für Kunde und ggf. Versicherung.
- **was_wird_gesichert:** Microsoft 365 (siehe `microsoft-365`-Bundle-Umfang), Server (siehe `managed-server`-Addon-Umfang), Arbeitsplätze/Endgeräte (lokale Dateien/Profile), individuelle Anwendungen/Datenbanken (nach Analyse).
- **vergleich** („Nur Standard-Sync/-Aufbewahrung" vs. „Echte Datensicherung"): Standard – Löschfristen greifen, Ransomware trifft auch die Sync-Kopie, Zugriff verfällt nach Austritt/Lizenzende, ungeprüfte Wiederherstellung. Echt – unabhängige, monatelang versionierte Kopie, getrennt von der Live-Umgebung, frei wählbare Aufbewahrung, regelmäßig getestete Wiederherstellung.
- **pricing:** keins – verweist auf die Preise/Umfänge bei `microsoft-365` und `managed-server`.

### 7. `email-sicherheit` — E-Mail-Sicherheit

- **kurz:** Mehrstufige Prüfung jeder eingehenden Mail, bevor sie Ihr Postfach erreicht.
- **hero_headline:** „E-Mail-Sicherheit für Ihr Unternehmen"
- **hero_subline:** „Spam- und Phishing-Schutz, Bedrohungserkennung per KI-Analyse und rechtssichere Archivierung – bevor die gefährliche Mail den Posteingang erreicht."
- **hero_zitat:** „99 % der Cyberangriffe beginnen mit einer E-Mail." *(ersetzt frühere Fassung „Der gefährlichste Anhang ist der, der nie in der Quarantäne landet.")*
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/email-sicherheit.html`) – abweichendes Muster (kein Dashboard-Card/Toast): Umschlag-Illustration (drei SVG-Ebenen) mit Schild-Häkchen-Karte in der Mitte (leichtes Schweben), umgeben von zwei diagonal versetzten Toast-Karten (oben rechts „Rechtssichere Archivierung“, unten links „Spam- & Phishing-Schutz“).
- **zeitstrahl** (linear, 4 Schritte, laiengerecht formuliert, „Der Weg einer E-Mail, bevor sie bei Ihnen ankommt"): Umleitung → Prüfung (Absender, Links, Anhänge) → Entscheidung (durchlassen oder zurückhalten) → Wochenbericht.
- **statistik_sektion** („Die Lage in Zahlen", Quelle Bitkom Wirtschaftsschutz-Studie 2026, vor Go-Live gegenprüfen): 96 % der Unternehmen bereits von Datendiebstahl/Spionage/Sabotage betroffen oder vermuten es · 211–271 Mrd. € Gesamtschaden/Jahr · 58 % mit nachgewiesenem Schaden im letzten Jahr · 63 % registrierten Zunahme der Angriffe · Angriffsmethoden: Ransomware 25 %, Passwort-Angriffe 18 %, Phishing 16 %, DDoS 15 %.
- **lead_magnet:** „Phishing-Checkliste" (Download gegen E-Mail).
- **pricing:** keins – kann optional auf „Postfach-Schutzschild"-Addon (`it-betreuung`) verweisen.

### 8. `prozessautomatisierung` — Prozessautomatisierung

- **kurz:** Wiederkehrende manuelle Abläufe zwischen Systemen automatisieren, statt sie von Hand zu wiederholen.
- **hero_headline:** „Prozessautomatisierung für Ihr Unternehmen"
- **hero_subline:** „Wiederkehrende Aufgaben laufen automatisch – Systeme sprechen miteinander, ohne manuelles Abtippen."
- **hero_zitat:** „Was von Hand erledigt wird, wird irgendwann vergessen. Was automatisiert ist, nie." *(final bestätigt)*
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/prozessautomatisierung.html`) – abweichendes Muster (kein Dashboard-Card/Toast): zentraler Zahnrad-Hub, umgeben von fünf Knoten-Karten (Dokument/Rechnung, Postfach, Datenbank, Kalender, Schnittstellen) in Pentagon-Anordnung, verbunden durch dünne Linien mit fließenden Datenpunkten (2.6s Loop, je Knoten versetzt) zum Hub.
- **anwendungsfaelle** (6 Hover-Karten, ein Grid, 3×2): Datenzusammenführung · System zu System · Formular → System · Rechnungen & Ablage · On-/Offboarding · Eskalation nach Regel. (Volltexte siehe `docs/ANFORDERUNGEN.md`.)
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie wir vorgehen"
  - Überschrift: „Wie wir vorgehen"
  - Schritte:
    1. **01 Analyse** – Wir erfassen den bestehenden Ablauf und identifizieren Automatisierungspotenzial.
    2. **02 Angebot** – Festpreis statt Stundensatz, transparent kalkuliert.
    3. **03 Umsetzung** – Test mit echten Fällen, Übergabe. Die Automatisierung gehört Ihnen.
    4. **04 Betreuung** – Optional: Wir überwachen die Automatisierung bei Systemänderungen.
- **pricing:** keins – Kontakt-CTA direkt in den Formular-Flow.

### 9. `webseiten` — Webseiten

- **kurz:** Individuelle, SEO- und GEO-optimierte Websites statt austauschbarer Vorlagen.
- **hero_headline:** „Ihre neue Website für Ihr Unternehmen"
- **hero_subline:** „Individuell gestaltet statt Vorlage von der Stange – optimiert für Google (SEO) und KI-Auffindbarkeit bei ChatGPT & Co."
- **hero_zitat:** „Eine Vorlage sieht aus wie hundert andere. Eine individuelle Website sieht aus wie Ihr Betrieb."
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/webseiten.html`) – abweichendes Muster (kein Dashboard-Card/Toast): isometrisch geneigter Ebenen-Stapel aus 6 Karten (von unten „Hosting & Server“ über „Datenschutz“, „Content“, „SEO“, „KI-Auffindbarkeit“ bis oben „Ihre Website“, hell hervorgehoben mit Glow), jede Karte schwebt leicht zeitversetzt; bei Hover löst sich die jeweilige Karte aus dem Stapel und legt sich über die anderen (progressive Enhancement, rein CSS, kein JS).
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— So entsteht Ihre Website"
  - Überschrift: „So entsteht Ihre neue Website"
  - Schritte:
    1. **01 Verständnis & Strategie-Planung** – Wir klären Zielgruppe, Angebot und Struktur Ihrer neuen Website.
    2. **02 Marken-Identität** – Optional: Logo, Farbwelt, Schriftarten und Bildstil.
    3. **03 Kostenlose Vorschau** – Sie sehen Ihre Website, bevor Sie sich entscheiden.
    4. **04 SEO- & GEO-Optimierung** – Auffindbarkeit über Google und KI-Assistenten von Anfang an eingebaut.
- **geo_sektion:** „SEO sorgt dafür, dass Menschen Sie über Google finden. GEO erhöht die Chance, dass eine KI Sie aktiv als passende Lösung nennt."
- **pricing:** Interaktive Referenzimplementierung, gleiches Grundmuster wie IT-Betreuung/Server-Betreuung (Cowork-Projekt → `claude/components/pricing-webseiten.html`) – **ersetzt die frühere statische 3-Spalten-Tabelle.** Gemeinsame „Website-Grundausstattung"-Chip-Leiste oberhalb der Karten (11 Merkmale, u. a. Mobile-/Desktop-optimiert, Kontaktformular, SEO Basis, DSGVO-konform, individuelles Webdesign mit Live-Vorschau, 3 finale Korrekturläufe), 3 Karten mit Hover-Effekt und „Alles aus X, außerdem:"-Darstellung, kein Monatlich/Jährlich-Toggle (einmalige Festpreise). 3 Pakete, einmalig/Festpreis – **Preise deutlich angehoben ggü. der zuvor dokumentierten Fassung (499/699/999 € → 990/1.490/1.990 €), siehe offener Punkt unten:**
  | Paket | Preis | Umfang |
  |---|---|---|
  | Starter | 990 € | 8 Inhaltsseiten, persönliche Beratung |
  | Business (Beliebt) | 1.490 € | Alles aus Starter, außerdem: 10 Inhaltsseiten, SEO Erweitert, KI-gestützte Auffindbarkeit, Lead-optimierte Struktur, Karriere-Bereich mit Stellenportal, Google Jobs & Bewerbung *(neu)* |
  | Premium (invertiert, „Alles inklusive") | 1.990 € | Alles aus Business, außerdem: 12 Inhaltsseiten, individuell erweiterte KI-Auffindbarkeit, Mehrsprachigkeit, Priority Support, Portfolio-Funktion für Referenzen & Projekte *(neu)* |

  Zusatzleistungen (eigene Sektion unterhalb der Karten):
  - „Hosting-Paket": Ab 49 €/Monat, keine Mindestlaufzeit, DE-Rechenzentrum, Domain inklusive, Postfächer inklusive, Wartung/Sicherheit/Backup, laufende Inhaltsoptimierung.
  - „Branding" *(umbenannt von „Marken-Identität")*: Logo, Farbpalette und Typografie, Social-Media-Profilbilder, Auslieferung von Farblogos/Monochrom-/Inversvarianten in allen gängigen Dateiformaten inkl. hochskalierbarer Vektorgrafiken – „Preis nach Aufwand".

  **Entfällt in der neuen Fassung:** die „Enterprise Komplett"-Bundle-Sektion (Premium-Website + Hosting gebündelt mit Preisvergleich) ist in der neuen interaktiven Komponente nicht mehr enthalten.
- **branchen_sektion:** Handwerk · Immobilien & Bau · Lokale Dienstleistungen · Rechtsanwälte · Fahrzeugbranche & Autowerkstätten · Fahrschulen · Fitnessstudios · Arztpraxen · Gastronomie · Tierbetreuung · Hotels & Pensionen · Unternehmensberater · Selbstständige · Architekten · Umzugsunternehmen.

### 10. `ki-telefonassistent` — KI-Telefonassistent (Kategorie: KI & Kommunikation)

- **kurz:** Ein KI-Assistent, der Anrufe rund um die Uhr entgegennimmt, Anliegen erkennt und Aktionen auslöst.
- **hero_headline:** „KI-Telefonassistent für Ihr Unternehmen"
- **hero_subline:** „Verwaltet Termine, nimmt Bestellungen auf, erfasst Daten, wickelt Prozesse ab, leitet weiter – und vieles mehr, rund um die Uhr erreichbar."
- **hero_zitat:** „Der teuerste Moment in der Kundenkommunikation ist der Anruf, den niemand entgegennimmt." *(gekürzte Fassung, final bestätigt; Original: „... ist nicht das schlechte Gespräch, es ist der Anruf, den niemand entgegennimmt.")*
- **hero_visual:** HTML/CSS/JS-Snippet (Cowork-Projekt → `claude/hero-visuals/ki-telefonassistent.html`) – abweichendes, funktionales Muster (kein Dashboard-Card/Toast, keine reine Deko-Animation): echter Audio-Player („Jetzt anhören“) mit Play/Pause-Button (Glow-Puls), interaktiver Wellenform (klickbar/scrubbar), Zeitanzeige und ausklappbarem Transkript (`<details>`, für SEO/Screenreader immer im DOM). **Benötigt eine echte Audiodatei** (`audio.mp3`, Beispielgespräch) – aktuell nur als Platzhalter-Pfad im `<audio>`-Tag hinterlegt, muss vor Go-Live bereitgestellt werden.
- **hero_audio:** eingebetteter, selbst gehosteter Audio-Player mit vollständigem Beispielgespräch (branchenneutral), inkl. Text-Transkript (Barrierefreiheit).
- **ablauf_sektion** (4 Schritte, „Was bei jedem Anruf passiert"): Anruf kommt rein → Anliegen wird erkannt → Aktion wird ausgelöst (Termin, Rückruf, Weiterleitung) → Protokoll geht an Sie.
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie wir Kunden aufnehmen"
  - Überschrift: „Wie wir Kunden aufnehmen"
  - Schritte:
    1. **01 Kennenlernen** – Wir klären Ihre Anforderungen und typischen Anrufsituationen.
    2. **02 Prozesse verstehen** – Wir erfassen, wie Anrufe heute behandelt werden.
    3. **03 Individuell einrichten** – Routing, Eskalation, Gesprächsführung und Stimmauswahl.
    4. **04 Testen & optimieren** – Proof of Concept mit echten Anrufsituationen.
    5. **05 Live gehen** – Go-Live-Begleitung durch unser Team.
    6. **06 Dauerhaft betreut** – Laufende Betreuung und Optimierung.
- **branchen_sektion:** Handwerk & Bau · Automobil · Gesundheit · Beauty & Lifestyle · Immobilien & Hausverwaltung · Recht & Beratung · Versicherungen & Finanzen · Gastronomie & Hotellerie · Handel · Logistik & Transport · Bildung · Tourismus · Fitness & Sport · IT & Technologie · Kundenservice & Callcenter.
- **kostenvergleich_tabelle** (statisch, Mitarbeiter 20 Std./Woche vs. KI-Telefonassistent): Kosten im 1. Jahr 18.000–27.000 € vs. ca. 1.800 € · Erreichbarkeit Mo–Fr vormittags vs. 24/7 · Urlaub/Krankheit/Kündigung entfällt bei KI · Einarbeitung Wochen vs. Tage · Verfügbar ab Personalfindung vs. ab nächster Woche · Einsatzort vor Ort/Homeoffice vs. deutschlandweit remote. Claim darunter (zur Abnahme): „Die Zeit, die Sie nicht mehr am Telefon verbringen, arbeitet weiter, nur eben an Ihrem Kerngeschäft."
- **roi_rechner:** siehe generische Detailspec in `docs/DESIGNSYSTEM.md` → ROI-Rechner. Defaults: 25 Anrufe/Tag, 4 Min./Anruf, 60 % KI-Anteil, 20 € Stundenlohn; Beispielergebnis 21 Std./Monat, 420 € → 293 €, +127 €/Monat.
- **pricing:** Interaktive Referenzimplementierung (Cowork-Projekt → `claude/components/pricing-ki-telefonassistent.html`) – **ersetzt die frühere statische 3-Spalten-Tabelle mit Platzhalter-Paketnamen.** Finale Paketnamen Solo/Team/Scale, Monatlich/Jährlich-Toggle (Jahrespreise fest hinterlegt statt Prozent-Rabatt-Formel), separate gestrichelt umrandete „Einrichtung & Onboarding"-Karte oberhalb der 3 Pakete, ausklappbare Vergleichstabelle in 4 Gruppen (Nutzung/Assistenten/Operations & Support/Add-ons) mit Info-Tooltips auf einzelnen Zeilen.

  **Einrichtung & Onboarding (einmalig):** Ab **990 €** *(angehoben ggü. der zuvor dokumentierten 599 €, siehe offener Punkt unten)*. Enthält: Analyse der Geschäftsprozesse, unternehmensspezifische Konfiguration, Routing-Logik & Eskalationsregeln, rechtskonforme Gesprächsführung, Stimmauswahl & Feintuning, Systemanbindung & technisches Setup, Proof of Concept & Revisionen, Go-Live-Begleitung.

  | Paket | Zielgruppe | Preis/Monat | Preis jährlich (pro Monat) | Enthält (Kernumfang) |
  |---|---|---|---|---|
  | Solo | 1–20 Anrufe/Tag | 119 € | 99 € (spart 20 €) | 1.000 Min. inkl. (Ø 0,12 €/Min.), keine gleichzeitigen Anrufe, 1 Telefonnummer (+7 €/Monat je weitere), ∞ Assistenten, 1 User; Features: 120+ Stimmen, 60+ Sprachen, Kalender + Buchungen |
  | Team (Beliebt) | 20–100 Anrufe/Tag | 359 € | 299 € (spart 60 €) | Alles aus Solo, außerdem: 3.600 Min. inkl. (Ø 0,10 €/Min.), 3 gleichzeitige Anrufe, 3 Telefonnummern (+7 €/Monat je weitere), ∞ User; Features: dedizierter SIP-Trunk, Outbound-Anrufe (zu Verbindungskosten) |
  | Scale | ab 100 Anrufe/Tag | ab 599 € | ab 499 € (spart 100 €) | Alles aus Team, außerdem: ab 6.000 Min. inkl. (bis 0,10 €/Min.), individuelle gleichzeitige Anrufe/Telefonnummern; Features: eigene Stimme, keine Datenspeicherung, und mehr |

  **Vollständiger Funktionsvergleich** (ausklappbar, 4 Gruppen): *Nutzung* (inkl. Minuten/Kontakte, gleichzeitige Anrufe, Nutzer/Seats, Telefonnummern, Kontoverbindungen, Outbound & Kampagnen, SIP-Trunk-Integration) · *Assistenten* (Stimmen 120+, Sprachen 60+, individuelle Stimme nur Scale, unlimitierte Assistenten) · *Operations & Support* (SSO und individuelle Vertragsvereinbarungen nur Scale, Onboarding Academy und Community-Zugang bei allen, individuelles SLA/Account Manager nur Scale, Support E-Mail/Priorität/individuell) · *Add-ons* (Zusatzminuten-Pakete je 100 Min., Zusatzkontakte-Pakete je 1.000 Kontakte/Monat, Preis je weiterer Telefonnummer/Kontoverbindung).

  Disclaimer unter den Karten: „Alle Preise verstehen sich netto, zzgl. gesetzlicher MwSt." Alle CTAs führen in den Kontakt-Formular-Flow (kein externer Registrierungslink).
- **lead_magnet:** interaktiver ROI-Rechner (statt Checkliste), Hinweis auf Kombi-Rabatt mit WhatsApp-Chatbot.

### 11. `whatsapp-chatbot` — WhatsApp-Chatbot (Kategorie: KI & Kommunikation)

- **kurz:** Ein Chat-Assistent, der WhatsApp-Anfragen sofort beantwortet, qualifiziert oder weiterleitet.
- **hero_headline:** „WhatsApp-Chatbot für Ihr Unternehmen"
- **hero_subline:** „Beantwortet Fragen, bucht Termine, nimmt Anfragen auf, leitet weiter – und vieles mehr, rund um die Uhr erreichbar."
- **hero_zitat:** „Eine Nachricht, die erst morgen beantwortet wird, hat den Kunden heute schon verloren." *(final bestätigt)*
- **hero_visual:** HTML/CSS-Snippet (Cowork-Projekt → `claude/hero-visuals/whatsapp-chatbot.html`) – abweichendes Muster (kein Dashboard-Card/Toast): animiertes Chat-Fenster mit Logo-Header, spielt einmalig eine 8s-Sequenz aus 4 Nachrichten (Kunde/Bot abwechselnd, jeweils mit Schreib-Punkten davor, seitlich einschiebend) ab und schwebt danach dauerhaft leicht; vollständig `prefers-reduced-motion`-kompatibel (Sequenz entfällt, alle Nachrichten sofort sichtbar).
- **hero_mockup:** Bild eines WhatsApp-Chatverlaufs (dunkle Kopfzeile, Firmenname + „· WhatsApp", Kunden-Bubbles links/Bot-Bubbles rechts in Verlauf-Farbe). Beispieldialog (Arztpraxis, branchenneutral): „Hallo, ich möchte einen Termin vereinbaren." → „Gerne. Worum geht es und bei welchem Arzt?" → „Kontrolluntersuchung bei Dr. Müller." → „Welche Tage und Uhrzeiten passen Ihnen?"
- **ablauf_sektion** (4 Schritte, „Wie eine Konversation abläuft"): Nachricht kommt an → Anliegen wird verstanden → Antwort oder Weiterleitung (inkl. Anbindung an Kalender/Terminplaner, Wissensdatenbanken, CRM-Systeme, Automatisierung & Schnittstellen – als Kategorien, keine Markennamen) → Verlauf bleibt sichtbar.
- **branchen_sektion** (8 Einträge): Arztpraxen & Gesundheitswesen · Handwerker & Dienstleister · Autowerkstätten · Immobilien & Hausverwaltungen · Friseure & Beauty · Hotels & Gastronomie · IT & Support · Behörden & Kundenservice.
- **roi_rechner:** Defaults 18 Chat-Anfragen/Tag, 3 Min./Anfrage, 60 % Chatbot-Anteil, 19 € Stundenlohn; Beispielergebnis 11 Std./Monat, 215 € → 99 €, +116 €/Monat; Fußnote verweist auf Telefon-Kombi-Rabatt.
- **pricing:** Interaktive Referenzimplementierung, gleiches Grundmuster wie KI-Telefonassistent (Cowork-Projekt → `claude/components/pricing-whatsapp-chatbot.html`) – **ersetzt die frühere statische 3-Spalten-Tabelle.** Eigene, gestrichelt umrandete „Einrichtung & Onboarding"-Karte oberhalb des Monatlich/Jährlich-Togglers, 3 Karten mit Hover-Effekt, „Inkludiert"/„Features"-Abschnitt getrennt je Karte, „Alles in X"-Verweis für Team/Scale, Info-Icons an einzelnen Features (ohne ausklappbare Gesamt-Vergleichstabelle, anders als bei KI-Telefonassistent). Disclaimer unter den Karten: „Alle Preise verstehen sich netto, zzgl. gesetzlicher MwSt."

  **Einrichtung & Onboarding (einmalig):** Ab **499 €** *(angehoben ggü. der zuvor dokumentierten 299 €, siehe offener Punkt unten)*. Enthält: Analyse der Geschäftsprozesse, unternehmensspezifische Konfiguration, Dialogflows & Antwortlogik, rechtskonforme Kommunikation (DSGVO-konform), Anbindung an WhatsApp Business API, Systemanbindung & technisches Setup, Proof of Concept & Revisionen, Go-Live-Begleitung.

  | Paket | Zielgruppe | Preis/Monat | Preis jährlich (pro Monat) | Enthält |
  |---|---|---|---|---|
  | Solo | bis 100 Konversationen/Monat | 69 € | 58 € (spart 11 €) | 100 Konversationen/Monat, 1 WhatsApp-Nummer (+19 €/Monat je weitere), ∞ Chatbots, 1 User; Features: Chat-Übergabe an Menschen, automatischer Terminplaner |
  | Team (Beliebt) | bis 500 Konversationen/Monat | 249 € | 208 € (spart 41 €) | Alles aus Solo, außerdem: 500 Konversationen/Monat, 3 WhatsApp-Nummern (+19 €/Monat je weitere), ∞ User; Features: Unterstützung bei der Einrichtung |
  | Scale | ab 1.000 Konversationen/Monat | ab 499 € | ab 424 € (spart 75 €) | Alles aus Team, außerdem: 1.000 Konversationen/Monat, individuelle WhatsApp-Nummern; Features: keine Datenspeicherung, individueller SLA |

  CTAs: Solo/Team „Jetzt starten", Scale „Plan erstellen" – alle in den Kontakt-Formular-Flow.
- **zeitstrahl_schritte** (Zeitstrahl/Ablauf-Sektion, Komponente 5 – Bogen-Template):
  - Eyebrow: „— Wie wir Kunden aufnehmen"
  - Überschrift: „Wie wir Kunden aufnehmen"
  - Schritte:
    1. **01 Erstgespräch** – Wir klären Ihre typischen Anfragen und Anforderungen.
    2. **02 Analyse & Konzept** – Wir entwerfen die passenden Gesprächsabläufe.
    3. **03 Einrichtung & Individualisierung** – Der Chatbot wird auf Ihr Unternehmen zugeschnitten.
    4. **04 Test & Optimierung** – Testphase mit echten Anfragen.
    5. **05 Laufende Betreuung** – Wir betreuen den Chatbot dauerhaft weiter.
- **lead_magnet:** interaktiver ROI-Rechner, Hinweis auf Kombi-Rabatt mit KI-Telefonassistent.

**„Bald verfügbar" (nicht anklickbar, kein Inhalt nötig):** KI-E-Mail-Assistent, Web-Chat, PBX.

---

## FAQ

FAQ-Inhalte für die Startseite sind jetzt final (8 Fragen, Referenzimplementierung `claude/components/faq-startseite.html`, siehe `docs/DESIGNSYSTEM.md` → Komponente 15). FAQ-Inhalte für die vier Leistungsseiten ohne eigenes Pricing (Fernzugriff/VPN, Datensicherung, E-Mail-Sicherheit, Hardware-Beschaffung) sind **weiterhin offen** und werden vor Content-Erstellung final festgelegt.

## Lead Magnets (Übersicht)

| Leistungsseite | Lead Magnet |
|---|---|
| E-Mail-Sicherheit | Download „Phishing-Checkliste" |
| Datensicherung | Download „Backup-Checkliste" |
| KI-Telefonassistent | interaktiver ROI-Rechner |
| WhatsApp-Chatbot | interaktiver ROI-Rechner |

Alle übrigen Leistungsseiten: Haupt-Conversion-Hebel ist das 5-stufige Kontaktformular.

## "Wissen" (ehemals Blog)

- Astro Content Collection, 2–3 Startartikel, abgeleitet aus vorhandenen Runbooks, ohne kundenspezifische Angaben.
- Navigationsbegriff „Wissen" statt „Blog".

## Anpassung bei neuen/geänderten Leistungen

Nur diese Datei ändern (neue Leistung ergänzen oder bestehende anpassen: Slug, Kategorie, Kurztext, Hero-Headline/-Subline/-Zitat, Hero-Visual [HTML/CSS-Snippet, kein PNG], Sektionen, Pricing). Design, Technik, Komponenten-Bibliothek bleiben unverändert – sie lesen strukturiert aus dieser Datenquelle.

---

<sub>Selim-IT Website-Kit · Stand: 2026-08-29</sub>
