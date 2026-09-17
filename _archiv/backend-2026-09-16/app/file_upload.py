"""Serverseitige Datei-Validierung und verschlüsselte Ablage von Formular-Anhängen.

Regeln (siehe docs/ANFORDERUNGEN.md -> Kontaktformular): max. 3 Dateien, je max. 5 MB,
nur JPG/PNG/PDF, serverseitiger Content-Type-Check über echte Datei-Signaturen (nicht nur
Dateiendung/Client-Header), verschlüsselt abgelegt, nicht ausführbar.
"""

import uuid
from pathlib import Path

from cryptography.fernet import Fernet
from fastapi import UploadFile

from .config import settings

MAX_DATEIEN = 3
MAX_GROESSE_BYTES = 5 * 1024 * 1024

_SIGNATUREN: dict[bytes, str] = {
    b"\xff\xd8\xff": "image/jpeg",
    b"\x89PNG\r\n\x1a\n": "image/png",
    b"%PDF-": "application/pdf",
}


def _erkenne_echten_typ(kopf: bytes) -> str | None:
    for signatur, mime in _SIGNATUREN.items():
        if kopf.startswith(signatur):
            return mime
    return None


class DateiValidierungsFehler(Exception):
    pass


async def validiere_und_speichere(dateien: list[UploadFile]) -> list[str]:
    if len(dateien) > MAX_DATEIEN:
        raise DateiValidierungsFehler(f"Maximal {MAX_DATEIEN} Dateien erlaubt.")

    if not settings.upload_encryption_key:
        raise RuntimeError("UPLOAD_ENCRYPTION_KEY ist nicht gesetzt.")
    fernet = Fernet(settings.upload_encryption_key.encode())

    upload_pfad = Path(settings.upload_dir)
    upload_pfad.mkdir(parents=True, exist_ok=True)

    gespeicherte_namen: list[str] = []
    for datei in dateien:
        inhalt = await datei.read()
        if len(inhalt) > MAX_GROESSE_BYTES:
            raise DateiValidierungsFehler(f"{datei.filename}: Datei größer als 5 MB.")

        echter_typ = _erkenne_echten_typ(inhalt[:16])
        if echter_typ is None:
            raise DateiValidierungsFehler(f"{datei.filename}: Dateityp nicht erlaubt (nur JPG/PNG/PDF).")

        endung = {"image/jpeg": ".jpg", "image/png": ".png", "application/pdf": ".pdf"}[echter_typ]
        dateiname = f"{uuid.uuid4()}{endung}.enc"
        verschluesselt = fernet.encrypt(inhalt)
        (upload_pfad / dateiname).write_bytes(verschluesselt)
        gespeicherte_namen.append(dateiname)

    return gespeicherte_namen
