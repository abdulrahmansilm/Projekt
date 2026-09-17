"""Erstellt bei Terminbuchung automatisch einen Nextcloud-Talk-Raum für den Video-Call.

Self-hosted statt Zoom/Teams/Google Meet, siehe docs/ANFORDERUNGEN.md -> DSGVO-Konformität.
"""

import logging

import httpx

from .config import settings

_HEADERS = {"OCS-APIRequest": "true", "Accept": "application/json"}
_ROOM_TYPE_OEFFENTLICH = 3

logger = logging.getLogger(__name__)


async def erstelle_talk_raum(name: str) -> str | None:
    """Liefert None, wenn kein Talk-Link erzeugt werden konnte (z. B. Nextcloud nicht erreichbar).
    Der Termin ist trotzdem gültig gebucht; das Team ergänzt den Video-Link in diesem Fall manuell."""
    if not settings.nextcloud_talk_api_url:
        return None

    try:
        async with httpx.AsyncClient(
            auth=(settings.nextcloud_talk_user, settings.nextcloud_talk_password),
            headers=_HEADERS,
            timeout=10,
        ) as client:
            response = await client.post(
                settings.nextcloud_talk_api_url,
                data={"roomType": _ROOM_TYPE_OEFFENTLICH, "roomName": name[:200]},
            )
            response.raise_for_status()
            daten = response.json()
            token = daten["ocs"]["data"]["token"]
            talk_basis_url = settings.nextcloud_talk_api_url.split("/ocs/")[0]
            return f"{talk_basis_url}/call/{token}"
    except (httpx.HTTPError, KeyError) as exc:
        logger.exception("Nextcloud-Talk-Raum konnte nicht erstellt werden: %s", exc)
        return None
