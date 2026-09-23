# Selim-IT Backend (FastAPI)

Separates Deployment vom Astro-Frontend. Übernimmt Formular-Validierung, DB-Speicherung, CalDAV-Terminbuchung, Nextcloud-Talk-Erstellung und E-Mail-Versand. Details: [`../docs/ANFORDERUNGEN.md`](../docs/ANFORDERUNGEN.md).

## Lokale Entwicklung

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # Werte eintragen, insbesondere ALTCHA_SECRET (langer Zufallswert)
uvicorn app.main:app --reload --port 8000
```

Ohne echte SMTP-/CalDAV-/Nextcloud-Talk-Zugangsdaten laufen `/api/contact` und `/api/contact/booking` trotzdem: Die Anfrage wird immer in der Datenbank gespeichert, ein fehlgeschlagener E-Mail-Versand wird nur geloggt (siehe `_fehlertolerant` in `app/routers/contact.py`). `/api/availability` und die Terminbuchung benötigen einen erreichbaren CalDAV-Server.

## API

| Route | Zweck |
|---|---|
| `POST /api/contact` | Anfrage aus dem 4-Schritte-Wizard ohne Termin (JSON, siehe unten) |
| `POST /api/contact/booking` | Formular-Anfrage mit Terminbuchung in einem Schritt (CalDAV + Nextcloud Talk) |
| `POST /api/contact/{id}/termin` | Hängt einen Termin an eine bereits gesendete Anfrage (der Wizard fragt den Termin seit 22.09.2026 erst nach dem Absenden ab) |
| `GET /api/availability` | Verfügbare 30-Minuten-Slots, live gegen den Kalender geprüft |
| `GET /api/altcha-challenge` | Self-hosted Spam-Schutz-Challenge fürs Kontaktformular |
| `GET /api/health` | Healthcheck |

## Änderungen Runde 4

- `nachricht` ist jetzt Pflicht (Frontend und `schemas.py`).
- Neue Leistungs-Werte `branding` und `hosting`: Zusatzoptionen, wenn „Webentwicklung“ als Anliegen gewählt ist.

## Sicherheit

Stand 22.09.2026 (siehe `app/main.py`):

- API-Dokumentation nur mit `DEBUG=true` erreichbar (`/api/docs`), in Produktion abgeschaltet.
- `ALLOWED_HOSTS` begrenzt die bedienten Host-Header, `CORS_ORIGINS` die erlaubten Ursprünge.
- POST-Anfragen über 64 kB werden abgewiesen, pro IP sind 10 POSTs je 10 Minuten erlaubt (danach 429).
- Jede Antwort trägt `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` und `Cache-Control: no-store`.
- Bleibt `ALTCHA_SECRET` auf dem Standardwert, wird beim Start gewarnt.

Der Kalenderzugriff steckt vollständig in `app/caldav_client.py`. Soll später ein anderer Kalender angebunden werden,
genügt es, dieses Modul auszutauschen; die Routen bleiben unverändert.

## Tests vor Deployment

Vor dem produktiven Einsatz mit echten Zugangsdaten prüfen: Terminbuchung (Doppelbuchungsschutz), Altcha-Verifikation, E-Mail-Zustellung.

## Anfrage-Payload (JSON)

Vertrag mit dem Frontend: `src/lib/validation.ts` → `anfrageSchema`, Optionen aus `src/content/seiten/kontakt.json`. Beide Seiten validieren; bei neuen Bereichen oder Größen `THEMEN`/`GROESSEN` in `app/schemas.py` mitpflegen.

```json
{
  "themen": ["it-infrastruktur", "ki-kommunikation"],
  "leistungen": ["it-betreuung", "webseiten"],
  "dringlichkeit": "dringend | bald | allgemein",
  "groesse": "1–10 | 11–25 | 26–50 | 51–100 | Über 100",
  "nachricht": "optional",
  "vorname": "Max", "nachname": "Muster", "unternehmen": "optional",
  "email": "max@example.de", "telefon": "optional",
  "weg": "anfrage | termin",
  "terminSlot": "2026-09-21T10:00:00+02:00 (nur bei termin)",
  "herkunft": "/leistungen/it-betreuung",
  "website": "",
  "formularGeladenUm": 1789574700000,
  "altcha": "<base64-Payload des Widgets>"
}
```

Spam-Schutz: Honeypot `website` (gefüllt → scheinbarer Erfolg, nichts gespeichert), Mindest-Ausfüllzeit 3 s, Altcha mit Ablaufzeit (20 Min.) und Wiederverwendungsschutz. Die Tabelle heißt `anfragen` und ersetzt `kontakt_anfragen` des früheren 5-Schritte-Formulars (Datei-Upload entfällt; alter Code unter `_archiv/backend-2026-09-16/`).
