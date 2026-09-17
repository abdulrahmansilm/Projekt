# Selim-IT Website

Die Website von **Selim-IT** (IT-Dienstleister, Frankfurt am Main): 11 Leistungsseiten in 4 Kategorien, ein mehrstufiges Kontaktformular mit Live-Terminbuchung, ein „Wissen"-Bereich für GEO/SEO, WCAG-2.2-AA-Barrierefreiheit und DSGVO-konformes, self-hosted Hosting.

Dieses Repo ist aus dem [Handwerker-Landingpage-Kit](https://aibymike.de) hervorgegangen, aber vollständig auf Selim-IT umgestellt: anderer Tech-Stack, andere Inhalte, anderes Design. Details: [CLAUDE.md](CLAUDE.md).

| | |
|---|---|
| **Frontend** | Astro (SSG) · TypeScript · Tailwind CSS 4 |
| **Backend** | Python · FastAPI (separates Deployment) |
| **Datenbank** | SQLite/Postgres |
| **Hosting** | self-hosted, Docker Compose + Caddy |

## Struktur

| Pfad | Inhalt |
|---|---|
| `src/pages/` | Seiten: Startseite, `leistungen/[slug]`, `wissen/`, Kontaktformular, Rechtsseiten |
| `src/components/` | Komponenten-Bibliothek (Pricing-Card, Zeitstrahl, ROI-Rechner, Header/Footer …) |
| `src/content/` | Content Collections: `leistungen/`, `faq/`, `wissen/` – einzige Datenquelle für Inhalte |
| `src/lib/` | Firmendaten/Navigation (`config.ts`), Formular-Validierung (`validation.ts`), Utilities |
| `backend/` | FastAPI-Anwendung: Kontaktformular-API, CalDAV-Terminbuchung, Nextcloud Talk, E-Mail-Versand |
| `docs/` | Spezifikations-Kit (Anforderungen, Designsystem, Barrierefreiheit, Branchendaten) |

## Entwicklung

```bash
npm install
npm run dev       # Frontend, http://localhost:4321
```

Backend siehe [`backend/README.md`](backend/README.md).

## Inhalte ändern

Firmendaten, Leistungen, Preise: **ausschließlich** [`docs/BRANCHE.md`](docs/BRANCHE.md) anpassen und daraus die Dateien unter `src/content/leistungen/` aktualisieren. Design, Technik und Komponenten-Bibliothek bleiben unverändert, siehe [`docs/DESIGNSYSTEM.md`](docs/DESIGNSYSTEM.md).

## Offene Punkte vor Go-Live

Siehe „Offene Punkte" in [`docs/BRANCHE.md`](docs/BRANCHE.md): Telefonnummer, E-Mail-Adresse, PLZ, USt-IdNr., FAQ-Inhalte für vier Leistungsseiten, Partner-Logos (Hardware-Beschaffung), Freigabe der drei neu vorgeschlagenen Hero-Zitate, anwaltliche Prüfung von Impressum/Datenschutzerklärung, sowie reale SMTP-/CalDAV-/Nextcloud-Talk-Zugangsdaten im Backend (`backend/.env`).

---

<sub>Basiert auf dem Handwerker-Landingpage-Kit von [AIbyMike](https://aibymike.de), Lizenz siehe [LICENSE.md](LICENSE.md).</sub>
