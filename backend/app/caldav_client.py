"""Live-Terminverfügbarkeit und Terminbuchung über CalDAV (Nextcloud-Kalender).

Erstgespräche sind fest 30 Minuten lang, Mo-Fr 09:00-17:00 Uhr (Europe/Berlin), Slots im 30-Minuten-Raster.
Verfügbarkeit wird live gegen den Kalender geprüft, um Doppelbuchungen zu vermeiden.
"""

from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo

import caldav
from caldav.lib.error import DAVError

from .config import settings
from .schemas import Zeitslot

TZ = ZoneInfo("Europe/Berlin")
GESPRAECH_DAUER = timedelta(minutes=30)
GESCHAEFTSZEIT_START = time(9, 0)
GESCHAEFTSZEIT_ENDE = time(17, 0)
VORSCHAU_TAGE = 14


def _kalender() -> caldav.Calendar:
    client = caldav.DAVClient(url=settings.caldav_url, username=settings.caldav_user, password=settings.caldav_password)
    principal = client.principal()
    for kalender in principal.calendars():
        if kalender.name == settings.caldav_calendar_name:
            return kalender
    raise RuntimeError(f"Kalender '{settings.caldav_calendar_name}' wurde in Nextcloud nicht gefunden.")


def verfuegbare_slots() -> list[Zeitslot]:
    kalender = _kalender()
    jetzt = datetime.now(TZ)
    ende_vorschau = jetzt + timedelta(days=VORSCHAU_TAGE)

    belegte_zeitraeume: list[tuple[datetime, datetime]] = []
    for event in kalender.date_search(start=jetzt, end=ende_vorschau, expand=True):
        vevent = event.icalendar_component
        start = vevent["dtstart"].dt
        dauer = vevent.get("duration")
        if "dtend" in vevent:
            ende = vevent["dtend"].dt
        elif dauer:
            ende = start + dauer.dt
        else:
            ende = start + GESPRAECH_DAUER
        belegte_zeitraeume.append((start, ende))

    slots: list[Zeitslot] = []
    tag = jetzt.date()
    for _ in range(VORSCHAU_TAGE):
        if tag > ende_vorschau.date():
            break
        wochentag = datetime.combine(tag, time(0, 0), TZ).weekday()
        if wochentag < 5:  # Montag-Freitag
            aktuelle_zeit = datetime.combine(tag, GESCHAEFTSZEIT_START, TZ)
            tagesende = datetime.combine(tag, GESCHAEFTSZEIT_ENDE, TZ)
            while aktuelle_zeit + GESPRAECH_DAUER <= tagesende:
                slot_ende = aktuelle_zeit + GESPRAECH_DAUER
                ueberschneidet = any(start < slot_ende and ende > aktuelle_zeit for start, ende in belegte_zeitraeume)
                if aktuelle_zeit > jetzt and not ueberschneidet:
                    slots.append(
                        Zeitslot(
                            start=aktuelle_zeit.isoformat(),
                            label=aktuelle_zeit.strftime("%a., %d.%m. %H:%M"),
                        )
                    )
                aktuelle_zeit += GESPRAECH_DAUER
        tag += timedelta(days=1)

    return slots[:30]


def slot_ist_noch_frei(start_iso: str) -> bool:
    start = datetime.fromisoformat(start_iso)
    ende = start + GESPRAECH_DAUER
    kalender = _kalender()
    treffer = kalender.date_search(start=start, end=ende, expand=True)
    return len(list(treffer)) == 0


def buche_termin(start_iso: str, titel: str, beschreibung: str) -> None:
    start = datetime.fromisoformat(start_iso)
    ende = start + GESPRAECH_DAUER
    kalender = _kalender()
    kalender.save_event(dtstart=start, dtend=ende, summary=titel, description=beschreibung)


def caldav_verfuegbar() -> bool:
    try:
        _kalender()
        return True
    except (DAVError, RuntimeError, OSError):
        return False
