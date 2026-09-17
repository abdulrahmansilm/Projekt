# Selim-IT Website – Projekt-Guide

> Dieses Kit beschreibt die **selim-it.de**-Website: die Website eines IT-Dienstleisters (Managed Services, Cloud/Sicherheit, Digitalisierung/Automatisierung, KI-Assistenten). Es ist die auf Selim-IT angepasste Version eines ursprünglich für Handwerksbetriebe gebauten Spec-Kits – Struktur und Qualitätsanspruch (Barrierefreiheit, DSGVO, Anti-KI-Look) sind identisch geblieben, Tech-Stack, Inhalte und Design sind vollständig auf Selim-IT umgestellt.

## Kontext

Selim-IT ist ein neu gegründetes IT-Dienstleistungsunternehmen (Einzelunternehmen, Inhaber Ahmad Mahio Silm, Sitz Frankfurt am Main). Die Website ist der zentrale Vertriebskanal: 11 Leistungsseiten in 4 Kategorien, ein mehrstufiges Kontaktformular mit Live-Terminbuchung, ein "Wissen"-Bereich (Blog) für GEO/SEO, keine erfundenen Kundenstimmen (neue Firma – Seriosität vor Wow-Effekt).

## Tech-Stack (verbindlich – nicht das Original-Kit-Setup)

- **Frontend:** Astro (Islands Architecture) + TypeScript + Tailwind CSS. Vollständig statisch (SSG), kein Node-Adapter/Hybrid-Rendering nötig.
- **Inhalte:** Astro Content Collections (Markdown/MDX) für Leistungen, FAQ, "Wissen"-Artikel – analog zum `BRANCHE.md`-Prinzip des Original-Kits: eine Datenquelle, die die Seite erzeugt, statt Hardcoding in Komponenten.
- **Bilder:** Astro Image (sharp) für Optimierung/responsive Bilder.
- **Icons:** astro-icon mit Lucide-Icon-Set.
- **Fonts:** Space Grotesk (Headlines) + Outfit (Fließtext), self-hosted als WOFF2 unter `public/fonts/`, `font-display: swap`. **Niemals** Google Fonts/CDN-Einbindung (DSGVO).
- **Backend:** eigenes **Python-Backend mit FastAPI** (nicht Next.js API-Routes – Astro liefert nur statische Dateien aus). Übernimmt Formularlogik, DB-Speicherung, CalDAV-Terminbuchung, Nextcloud-Talk-Erstellung, E-Mail-Versand.
- **Datenbank:** SQLite oder Postgres, self-hosted, speichert alle Anfragen (Nachricht **und** Terminbuchung) zusätzlich zur E-Mail.
- **Hosting/Infra:** self-hosted auf silm-server, Docker Compose unter `/opt/website`, Caddy als Reverse Proxy (eigener Site-Block, öffentlich erreichbar), Code-Hosting via Forgejo, CI/CD via Forgejo Actions (Push auf `main` → Build → Rollout).
- **Analytics:** Umami oder Plausible, self-hosted, cookiefrei – **kein Cookie-Consent-Banner nötig**, da keine einwilligungspflichtigen Dienste eingesetzt werden.
- **SEO/GEO:** `@astrojs/sitemap`, `robots.txt` mit expliziter Freigabe für GPTBot/ClaudeBot/PerplexityBot/Google-Extended, `llms.txt`, JSON-LD (`Organization`/`LocalBusiness`/`Service`/`FAQPage`/`BreadcrumbList`).

> ⚠️ **Kein Next.js, kein React, kein shadcn/ui, kein Motion/Framer Motion, kein Vercel.** Diese Begriffe aus einer früheren Kit-Version sind vollständig ersetzt. Wo Interaktivität nötig ist (Formular, ROI-Rechner, FAQ-Akkordeon), werden **Astro Islands** verwendet (z.B. leichte Vanilla-TS-Komponenten oder ein kleines Preact-Island bei Bedarf – kein vollständiges React/Next mounten).

## Goldene Regeln

1. **Nie Firmendaten hardcoden.** Firmenname, Adresse, Kontaktdaten, Leistungen kommen aus den Content Collections (`src/content/`), nie fest in Komponenten verdrahtet.
2. **Konsistente Komponenten-Bibliothek.** Wiederkehrende Muster (Pricing-Card, Add-on-Card, Vergleichs-Card, Kennzahl-Callout, Zeitstrahl linear/zyklisch, ROI-Rechner, Hero-Zitat-Block, Footer) werden **einmal** als Astro-Komponente gebaut und überall wiederverwendet – siehe `docs/DESIGNSYSTEM.md`.
3. **Animationen nur aus dem zentralen Set.** Reveal-on-Scroll & Co. zentral definiert (View Transitions API / kleines eigenes Utility), nicht pro Komponente neu erfunden. `prefers-reduced-motion` wird immer respektiert.
4. **Mobile-First.** Jede Sektion wird zuerst für 375px Breite entworfen, dann für Desktop erweitert.
5. **Click-to-Call & klare CTAs.** Jede Telefonnummer ist ein `tel:`-Link. Jede Leistungsseite hat eine "Anfrage senden"-CTA, die den 5-Schritte-Formular-Flow mit vorausgefüllter Leistung startet.
6. **Deutsche Texte, Sie-Form, keine KI-Sprache.** Siehe Abschnitt "Anti-Vibe-Coding" unten – gilt für Design **und** Copy.
7. **Astro Image für alle Bilder.** Kein rohes `<img>` ohne Optimierung, sinnvolle `alt`-Texte, dekorative Bilder mit `alt=""`.
8. **WCAG 2.2 AA ist Pflicht, kein Aufpreis-Feature.** Siehe `docs/BARRIEREFREIHEIT.md` – verbindlich für jede Komponente.
9. **DSGVO by Default.** Keine externen Requests ohne Grund (Fonts self-hosted, keine Fremd-CDNs, kein Google Maps ohne Not, kein reCAPTCHA). Analytics ist cookiefrei und läuft ohne Einwilligung – trotzdem im Datenschutztext transparent nennen.
10. **Rechtstexte sind Platzhalter mit Prüf-Pflicht.** Impressum, Datenschutzerklärung (Entwürfe liegen als Projekt-Dokumente vor, siehe `docs/ANFORDERUNGEN.md` → „Rechtliche Seiten") sind **keine Rechtsberatung** und müssen vor Go-Live anwaltlich geprüft werden. Dieser Hinweis bleibt als Kommentar im Code, erscheint aber nicht im für Besucher sichtbaren Text.

## Anti-Vibe-Coding-Regeln (Design UND Copy)

Ziel: Die Seite soll aussehen und klingen wie von einer spezialisierten IT-Agentur gebaut, nicht wie eine generische AI-generierte Landingpage. Details, Farben, Typografie und die 10 Design-Gebote: siehe `docs/DESIGNSYSTEM.md`. Grundprinzip: **kantig vor rund, Border vor Shadow, die 4 Kernfarben statt beliebiger Zusatzfarben, Space Grotesk/Outfit statt Inter/Poppins, straffe statt übertriebene Abstände.**

**Copy-Regeln (verbindlich für alle sichtbaren Texte):**
- Normale Satzzeichen (Punkt, Komma, Doppelpunkt, Klammern) statt Gedankenstrich (Em-/En-Dash `—`/`–`) als Stilmittel. Ausnahme: wörtliche Nutzer-Zitate im Hero-Zitat-Block werden **unverändert** übernommen, auch wenn sie einen Gedankenstrich enthalten (siehe `docs/ANFORDERUNGEN.md` → Hero-Zitat-Block) – dort ist der Gedankenstrich Teil des zitierten Originaltons, keine KI-Formulierung.
- Keine KI-Floskeln ("nahtlos", "maßgeschneidert", "in der heutigen schnelllebigen Welt", "Ihr verlässlicher Partner", "revolutionär", "Exzellenz", "Journey").
- Konkret statt generisch, Zahlen und Fakten statt Adjektive.
- Sie-Form, sachlich, direkt – wie ein IT-Fachmann es im Erstgespräch erklären würde.

## Datei-Regeln

- `src/pages/**/*.astro` – Seiten (Startseite, Leistungsseiten via dynamisches Routing, Wissen-Artikel, rechtliche Seiten).
- `src/components/**/*.astro` – wiederverwendbare Komponenten (siehe Komponenten-Bibliothek, Regel 2). Interaktive Inseln zusätzlich als `*.ts`/`*.tsx`-Island-Komponente, wo nötig.
- `src/content/**` – Content Collections: `leistungen/`, `faq/`, `wissen/` (Artikel), `zitate/` (Hero-Zitat-Block-Texte). Schema-Definitionen in `src/content/config.ts`.
- `src/lib/**/*.ts` – Konfiguration (Firmendaten, Farben, Navigation), Hilfsfunktionen, Formular-Validierung (Zod).
- `src/styles/**` – globales CSS, Tailwind-Theme (`@theme`-Block, CSS-first, keine `tailwind.config.ts`-Altlast).
- `backend/**` – FastAPI-Anwendung (separates Deployment, eigenes Docker-Image): Routen, DB-Modelle, CalDAV-/Nextcloud-Talk-Integration, E-Mail-Versand.
- `docs/**` – dieses Spec-Kit (Anforderungen, Designsystem, Barrierefreiheit, Branchendaten-Vorlage).

## Projekt-Struktur (Ziel-Layout)

```
selim-it-website/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── leistungen/[slug].astro
│   │   ├── wissen/index.astro
│   │   ├── wissen/[slug].astro
│   │   ├── impressum.astro
│   │   ├── datenschutz.astro
│   │   └── barrierefreiheit.astro
│   ├── components/
│   │   ├── layout/ (Header.astro, Footer.astro)
│   │   ├── shared/ (RevealOnScroll, PricingCard, AddonCard, CompareCard,
│   │   │            KennzahlCallout, Zeitstrahl, ROIRechner, HeroZitatBlock)
│   │   └── sections/ (Hero, TrustBar, Leistungsuebersicht, AblaufGrafik, ...)
│   ├── content/
│   │   ├── config.ts
│   │   ├── leistungen/
│   │   ├── faq/
│   │   ├── wissen/
│   │   └── zitate/
│   ├── lib/ (config.ts, animations.ts, utils.ts, validation.ts)
│   └── styles/global.css
├── backend/ (FastAPI: main.py, routers/, models/, caldav.py, nextcloud_talk.py, mail.py)
├── public/fonts/ (Space Grotesk, Outfit – WOFF2)
├── docs/ (ANFORDERUNGEN.md, DESIGNSYSTEM.md, BARRIEREFREIHEIT.md, BRANCHE.md)
└── .claude/skills/selim-it-website/SKILL.md
```

## Referenzen

- `docs/ANFORDERUNGEN.md` – vollständige Seitenstruktur, Formular-Flow, SEO, DSGVO-Checkliste, Deployment.
- `docs/DESIGNSYSTEM.md` – Farben, Typografie, Komponenten-Bibliothek, Animationsregeln.
- `docs/BARRIEREFREIHEIT.md` – verbindliche WCAG-2.2-AA-Regeln.
- `docs/BRANCHE.md` – Firmendaten und alle 11 Leistungen als strukturierte Datenquelle.
- `.claude/skills/selim-it-website/SKILL.md` – Build-Ablauf für dieses Kit.

---

<sub>Selim-IT Website-Kit · Stand: 2026-08-29</sub>
