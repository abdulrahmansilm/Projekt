"""Minimale, self-hosted ALTCHA-Implementierung (Proof-of-Work-Captcha ohne Drittanbieter/Tracking).

Protokoll (klassisches ALTCHA-Challenge-Format, vom Widget `altcha` v3 weiterhin unterstützt):
1. Server erzeugt eine Challenge: zufälliges Salt (mit Ablaufzeit) + Zufallszahl, Challenge = sha256(salt + zahl).
2. Client (Browser-Widget) sucht per Brute-Force eine Zahl 0..maxnumber, die dieselbe Challenge ergibt.
3. Server prüft Ablaufzeit, Hash, HMAC-Signatur und dass die Lösung nicht bereits verwendet wurde.

Der Wiederverwendungsschutz liegt im Prozessspeicher und gilt damit je Worker; für mehrere Worker
bei Bedarf in die Datenbank oder einen gemeinsamen Cache verlagern.
"""

import hashlib
import hmac
import json
import secrets
import time
from base64 import b64decode
from threading import Lock
from urllib.parse import parse_qs

from .config import settings

MAXNUMBER = 100_000
GUELTIGKEIT_SEKUNDEN = 20 * 60

_verbraucht: dict[str, int] = {}
_sperre = Lock()


def erstelle_challenge() -> dict:
    ablauf = int(time.time()) + GUELTIGKEIT_SEKUNDEN
    salt = f"{secrets.token_hex(12)}?expires={ablauf}"
    zahl = secrets.randbelow(MAXNUMBER)
    challenge = hashlib.sha256(f"{salt}{zahl}".encode()).hexdigest()
    signatur = hmac.new(settings.altcha_secret.encode(), challenge.encode(), hashlib.sha256).hexdigest()
    return {
        "algorithm": "SHA-256",
        "challenge": challenge,
        "salt": salt,
        "signature": signatur,
        "maxnumber": MAXNUMBER,
    }


def _ablauf_aus_salt(salt: str) -> int:
    if "?" not in salt:
        return 0
    try:
        return int(parse_qs(salt.split("?", 1)[1]).get("expires", ["0"])[0])
    except ValueError:
        return 0


def pruefe_loesung(altcha_payload: str) -> bool:
    """Erwartet den base64-kodierten JSON-Payload, den das Widget im Feld `altcha` absendet."""
    try:
        daten = json.loads(b64decode(altcha_payload))
        salt = str(daten["salt"])
        zahl = int(daten["number"])
        challenge = str(daten["challenge"])
        signatur = str(daten["signature"])
    except (KeyError, ValueError, TypeError):
        return False

    jetzt = int(time.time())
    ablauf = _ablauf_aus_salt(salt)
    if ablauf < jetzt:
        return False

    erwartete_challenge = hashlib.sha256(f"{salt}{zahl}".encode()).hexdigest()
    if not hmac.compare_digest(erwartete_challenge, challenge):
        return False

    erwartete_signatur = hmac.new(settings.altcha_secret.encode(), challenge.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(erwartete_signatur, signatur):
        return False

    with _sperre:
        for alt in [c for c, a in _verbraucht.items() if a < jetzt]:
            del _verbraucht[alt]
        if challenge in _verbraucht:
            return False
        _verbraucht[challenge] = ablauf
    return True
