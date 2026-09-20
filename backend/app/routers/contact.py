import logging
from collections.abc import Awaitable, Callable
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import mail
from ..altcha import pruefe_loesung
from ..caldav_client import TZ, buche_termin, slot_ist_noch_frei
from ..database import get_db
from ..models import Anfrage
from ..nextcloud_talk import erstelle_talk_raum
from ..schemas import Dringlichkeit, KontaktAnfrageEingabe, KontaktAntwort, Weg

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger(__name__)


async def _fehlertolerant(anfrage_id: str, beschreibung: str, versand: Callable[[], Awaitable[None]]) -> None:
    """E-Mail-Versand darf die Anfrage nicht scheitern lassen: Die Anfrage ist bereits in der DB gespeichert
    (siehe docs/ANFORDERUNGEN.md), ein SMTP-Ausfall wird geloggt statt dem Nutzer als Fehler angezeigt."""
    try:
        await versand()
    except Exception:
        logger.exception("E-Mail-Versand fehlgeschlagen (Anfrage %s): %s", anfrage_id, beschreibung)


def _pruefe_spamschutz(daten: KontaktAnfrageEingabe) -> None:
    if daten.zu_schnell_ausgefuellt():
        raise HTTPException(status_code=400, detail="Das Formular wurde ungewöhnlich schnell abgeschickt.")
    if not daten.altcha or not pruefe_loesung(daten.altcha):
        raise HTTPException(status_code=400, detail="Die Spam-Prüfung ist fehlgeschlagen.")


def _speichere(daten: KontaktAnfrageEingabe, db: Session) -> Anfrage:
    eintrag = Anfrage(
        themen=daten.themen,
        leistungen=daten.leistungen,
        dringlichkeit=daten.dringlichkeit.value,
        groesse=daten.groesse,
        nachricht=daten.nachricht,
        vorname=daten.vorname,
        nachname=daten.nachname,
        unternehmen=daten.unternehmen,
        email=str(daten.email),
        telefon=daten.telefon,
        weg=daten.weg.value,
        herkunft=daten.herkunft,
    )
    db.add(eintrag)
    db.commit()
    db.refresh(eintrag)
    return eintrag


def _betreff_intern(daten: KontaktAnfrageEingabe) -> str:
    praefix = "DRINGEND: " if daten.dringlichkeit is Dringlichkeit.dringend else ""
    art = "Terminbuchung" if daten.weg is Weg.termin else "Anfrage"
    return f"{praefix}{art} von {daten.vorname} {daten.nachname} ({daten.themen_lesbar()})"


@router.post("/contact", response_model=KontaktAntwort)
async def contact(daten: KontaktAnfrageEingabe, db: Session = Depends(get_db)) -> KontaktAntwort:
    # Honeypot ausgefüllt: scheinbar erfolgreich antworten, nichts speichern (Bots erhalten kein Signal)
    if daten.ist_spam_honeypot():
        return KontaktAntwort(ok=True, id="0")
    _pruefe_spamschutz(daten)
    eintrag = _speichere(daten, db)

    await _fehlertolerant(
        eintrag.id, "Bestätigung an Kunde",
        lambda: mail.sende_anfrage_bestaetigung_kunde(str(daten.email), daten.vorname, daten.themen_lesbar()),
    )
    await _fehlertolerant(
        eintrag.id, "interne Benachrichtigung",
        lambda: mail.sende_anfrage_benachrichtigung_intern(eintrag.id, _betreff_intern(daten), daten.zusammenfassung()),
    )

    return KontaktAntwort(ok=True, id=eintrag.id)


@router.post("/contact/booking", response_model=KontaktAntwort)
async def contact_booking(daten: KontaktAnfrageEingabe, db: Session = Depends(get_db)) -> KontaktAntwort:
    if daten.ist_spam_honeypot():
        return KontaktAntwort(ok=True, id="0")
    if daten.weg is not Weg.termin or not daten.termin_slot:
        raise HTTPException(status_code=400, detail="Kein Termin ausgewählt.")
    _pruefe_spamschutz(daten)

    try:
        frei = slot_ist_noch_frei(daten.termin_slot)
    except Exception as exc:
        logger.exception("Kalenderabfrage fehlgeschlagen: %s", exc)
        raise HTTPException(
            status_code=502, detail="Der Kalender ist aktuell nicht erreichbar. Senden Sie Ihre Anfrage gern ohne Termin."
        ) from exc
    if not frei:
        raise HTTPException(status_code=409, detail="Der gewählte Termin ist inzwischen belegt. Bitte wählen Sie einen anderen Termin.")

    eintrag = _speichere(daten, db)

    titel = f"Erstgespräch: {daten.vorname} {daten.nachname}"
    if daten.unternehmen:
        titel += f" ({daten.unternehmen})"
    try:
        buche_termin(daten.termin_slot, titel, daten.zusammenfassung())
    except Exception as exc:
        logger.exception("Terminbuchung im Kalender fehlgeschlagen (Anfrage %s): %s", eintrag.id, exc)
        raise HTTPException(
            status_code=502, detail="Der Kalender ist aktuell nicht erreichbar. Senden Sie Ihre Anfrage gern ohne Termin."
        ) from exc

    talk_url = await erstelle_talk_raum(titel)

    start = datetime.fromisoformat(daten.termin_slot)
    eintrag.termin_start = start
    eintrag.nextcloud_talk_url = talk_url
    db.commit()

    termin_lesbar = _termin_lesbar(start)
    await _fehlertolerant(
        eintrag.id, "Terminbestätigung an Kunde",
        lambda: mail.sende_terminbestaetigung(str(daten.email), daten.vorname, termin_lesbar, talk_url),
    )
    await _fehlertolerant(
        eintrag.id, "interne Benachrichtigung",
        lambda: mail.sende_anfrage_benachrichtigung_intern(
            eintrag.id, _betreff_intern(daten), f"Termin: {termin_lesbar}\nVideo-Link: {talk_url or '-'}\n\n{daten.zusammenfassung()}"
        ),
    )

    return KontaktAntwort(ok=True, id=eintrag.id, nextcloud_talk_url=talk_url)


_WOCHENTAGE = ("Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag")


def _termin_lesbar(start: datetime) -> str:
    """Deutsches Datumsformat unabhängig von der System-Locale des Containers."""
    lokal = start.astimezone(TZ)
    return f"{_WOCHENTAGE[lokal.weekday()]}, {lokal:%d.%m.%Y} um {lokal:%H:%M} Uhr"

