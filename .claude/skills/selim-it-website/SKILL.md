---
name: selim-it-website
description: Baut/pflegt die selim-it.de-Website (Astro, TypeScript, Tailwind CSS, FastAPI-Backend) aus diesem Spezifikations-Kit. Nutze diesen Skill, wenn der User sagt "Selim-IT Website bauen", "Leistungsseite ergänzen", "Kit umsetzen" oder Inhalte/Design gemäß docs/BRANCHE.md generieren will. Liest zuerst alle Specs, dann generiert/aktualisiert er den Code exakt nach den Regeln.
---

# Selim-IT Website – Build-Skill

Dieser Skill steuert den Ablauf von der Spec zur deploybaren Astro-Website mit FastAPI-Backend. Das Repo enthält **keinen Anwendungscode**, sondern Specs – du liest die Specs, befüllst bei Bedarf die Datenquelle (`docs/BRANCHE.md`) und generierst dann den Code exakt nach den Regeln. Improvisiere nicht; die Specs sind die Wahrheit.

## Ablauf

### Schritt 0 – Specs laden (immer zuerst)

Lies in dieser Reihenfolge:
1. `CLAUDE.md` – Tech-Stack, goldene Regeln, Datei-Regeln, Anti-Vibe-Coding.
2. `docs/ANFORDERUNGEN.md` – vollständige Spec: Seitenstruktur, Formular-Flow, SEO, DSGVO, Deployment.
3. `docs/DESIGNSYSTEM.md` – Farben, Typografie, Komponenten-Bibliothek, Animationsregeln.
4. `docs/BARRIEREFREIHEIT.md` – verbindliche WCAG-2.2-AA-Regeln.
5. `docs/BRANCHE.md` – Firmendaten und alle 11 Leistungen (die Datenquelle).

### Schritt 1 – Datenquelle prüfen/ergänzen

`docs/BRANCHE.md` ist bereits mit Selim-ITs Firmendaten und allen 11 Leistungen befüllt. Bei neuen Anforderungen (neue Leistung, geänderter Preis, neues Zitat) **nur diese Datei** ändern, danach die Content Collections (`src/content/leistungen/*.md` etc.) daraus ableiten.

Offene Punkte, die vor Live-Schaltung noch zu klären sind (siehe `docs/BRANCHE.md`): FAQ-Inhalte für Startseite und für die vier Leistungsseiten ohne eigenes Pricing, Freigabe der drei neu vorgeschlagenen Hero-Zitate (IT-Betreuung, Prozessautomatisierung, WhatsApp-Chatbot), Partner-/Hersteller-Logos für die Hardware-Beschaffung-Trust-Bar, finale Platzhalter in den Rechtstexten (PLZ, Telefon, E-Mail, USt-IdNr.).

### Schritt 2 – Generieren (Reihenfolge strikt einhalten)

Folge der „Reihenfolge der Implementierung" (16 Schritte) aus `docs/ANFORDERUNGEN.md`. Kurzfassung:
Scaffold (Astro + Tailwind + Sitemap) → Theme/Farben (`docs/DESIGNSYSTEM.md`) → Content Collections aus `docs/BRANCHE.md` → `lib/config.ts`/`animations.ts`/`validation.ts` → Komponenten-Bibliothek (Pricing-Card, Add-on-Card, Vergleichs-Card, Kennzahl-Callout, Zeitstrahl, ROI-Rechner, Hero-Zitat-Block) → Layout (Header/Footer inkl. Skip-Link) → Startseiten-Sektionen → Leistungsseiten (`[slug].astro`) → Kontaktformular-Island + FastAPI-Backend (CalDAV, Nextcloud Talk, DB) → Rechtsseiten → SEO/GEO → Mobile Floating CTA → „Wissen"-Bereich → Barrierefreiheits-Check → Performance-Audit + Deployment.

### Schritt 3 – Qualitäts-Gates (vor „fertig")

- **Tech-Stack-Korrektheit:** Astro statisch (kein Node-Adapter ohne Grund), Tailwind CSS-first (`@theme`, keine `tailwind.config.ts`-Altlast), FastAPI-Backend getrennt vom Frontend deployt, keine Next.js/React/shadcn/Motion-Reste aus einer früheren Kit-Version.
- **Anti-Vibe-Coding:** Regeln aus `CLAUDE.md` und `docs/DESIGNSYSTEM.md` einhalten – nur die 4 Kernfarben, Space Grotesk/Outfit, kein Gedankenstrich in eigener Copy (Ausnahme: wörtliche Nutzer-Zitate im Hero-Zitat-Block).
- **Komponenten-Wiederverwendung:** Pricing-Card, Add-on-Card, Vergleichs-Card, Kennzahl-Callout, Zeitstrahl (linear/zyklisch), ROI-Rechner, Hero-Zitat-Block je **einmal** gebaut und für alle passenden Leistungsseiten wiederverwendet, nicht pro Seite neu erfunden.
- **Barrierefreiheit:** Checkliste + Tests aus `docs/BARRIEREFREIHEIT.md` durchgehen (Tastatur, Kontrast, Fokus, Labels, ROI-Rechner-Slider, Audio-Transkript, `prefers-reduced-motion`).
- **DSGVO:** Checkliste aus `docs/ANFORDERUNGEN.md` → „DSGVO-Konformität". Fonts self-hosted, keine externen Requests ohne Grund, kein Consent-Banner nötig (cookiefreie Analytics, keine einwilligungspflichtigen Dienste) – sollte sich das ändern, Banner nachrüsten. Rechtstexte mit „keine Gewähr/keine Rechtsberatung"-Hinweis (als Code-Kommentar, nicht sichtbar).
- **Performance:** SSG, Astro Image korrekt genutzt, Core Web Vitals im Budget.

## Wichtige Stolpersteine

- ❌ Next.js/React/shadcn/Motion-Konventionen aus einer früheren Kit-Version übernehmen → ✅ Astro Islands, native `<input type="range">`/`<button>` etc.
- ❌ Firmendaten/Leistungen in Komponenten hardcoden → ✅ alles aus `docs/BRANCHE.md` → Content Collections → `lib/config.ts`
- ❌ Google Fonts/CDN-Einbindung → ✅ Space Grotesk + Outfit self-hosted als WOFF2
- ❌ Consent-Banner „vorsichtshalber" einbauen, obwohl keine einwilligungspflichtigen Dienste genutzt werden → ✅ keiner nötig, solange Analytics cookiefrei bleibt und keine weiteren Drittanbieter dazukommen
- ❌ CTA-Buttons mit dunklem Text auf Verlauf-Hintergrund → ✅ weißer Text (`#FFFFFF`), Semibold, 16px, Pill – Badges (z. B. „BELIEBT") behalten dagegen dunklen Text, siehe `docs/DESIGNSYSTEM.md`
- ❌ Eigene Kundenstimmen/Bewertungen erfinden → ✅ Technologie-/Partner-Logo-Trust-Bar, echte Bewertungen erst nachrüsten, wenn vorhanden
- ❌ `outline: none` ohne Fokus-Ersatz / Icon-Buttons ohne Label → ✅ siehe `docs/BARRIEREFREIHEIT.md`

## Anpassung bei neuen Leistungen/Änderungen

Nur `docs/BRANCHE.md` ändern (neue Leistung, geänderter Preis, neues Zitat, neue Kategorie). Design, Technik, Komponenten-Bibliothek, Struktur bleiben unverändert – sie lesen strukturiert aus dieser Datenquelle.
