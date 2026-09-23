"""FastAPI-App des Anfrage-Backends.

Security-Hardening (Anforderung 22.09.2026):
- API-Dokumentation ist in Produktion abgeschaltet (nur mit DEBUG=true erreichbar).
- CORS erlaubt nur die konfigurierten Ursprünge, die tatsächlich benötigten Methoden und Header.
- Nur erwartete Hosts werden bedient (Host-Header-Spoofing).
- Anfragen mit übergroßem Body werden abgewiesen, bevor sie geparst werden.
- Schreibende Endpunkte sind pro IP mengenbegrenzt.
- Jede Antwort trägt die passenden Sicherheits-Header und wird nicht zwischengespeichert.
"""

import logging
import time
from collections import deque

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .database import Base, engine
from .routers import altcha, availability, contact

logger = logging.getLogger(__name__)

#: Anfragen mit größerem Body lehnen wir ab (das Formular sendet wenige Kilobyte)
MAX_BODY_BYTES = 64 * 1024
#: Mengenbegrenzung für schreibende Endpunkte: Anfragen je IP innerhalb des Zeitfensters
RATE_LIMIT_ANFRAGEN = 10
RATE_LIMIT_FENSTER_S = 600

Base.metadata.create_all(bind=engine)

if settings.altcha_secret == "change-me":
    logger.warning("ALTCHA_SECRET ist noch der Standardwert. Vor dem Go-Live in der .env setzen.")

app = FastAPI(
    title="Selim-IT Backend",
    version="0.2.0",
    docs_url="/api/docs" if settings.debug else None,
    redoc_url=None,
    openapi_url="/api/openapi.json" if settings.debug else None,
)

erlaubte_hosts = [h.strip() for h in settings.allowed_hosts.split(",") if h.strip()] or ["*"]
app.add_middleware(TrustedHostMiddleware, allowed_hosts=erlaubte_hosts)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept"],
    max_age=600,
)


def _client_ip(request: Request) -> str:
    """Hinter Caddy steht die echte Adresse in X-Forwarded-For (erster Eintrag)."""
    weitergeleitet = request.headers.get("x-forwarded-for", "")
    if weitergeleitet:
        return weitergeleitet.split(",")[0].strip()
    return request.client.host if request.client else "unbekannt"


_zugriffe: dict[str, deque[float]] = {}


@app.middleware("http")
async def schutz(request: Request, call_next):
    if request.method == "POST":
        laenge = request.headers.get("content-length")
        if laenge and laenge.isdigit() and int(laenge) > MAX_BODY_BYTES:
            return JSONResponse({"detail": "Die Anfrage ist zu groß."}, status_code=413)

        ip = _client_ip(request)
        jetzt = time.monotonic()
        fenster = _zugriffe.setdefault(ip, deque())
        while fenster and jetzt - fenster[0] > RATE_LIMIT_FENSTER_S:
            fenster.popleft()
        if len(fenster) >= RATE_LIMIT_ANFRAGEN:
            logger.warning("Mengenbegrenzung erreicht für %s", ip)
            return JSONResponse(
                {"detail": "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut."},
                status_code=429,
                headers={"Retry-After": str(RATE_LIMIT_FENSTER_S)},
            )
        fenster.append(jetzt)
        # Speicher begrenzen: alte, leere Einträge aufräumen
        if len(_zugriffe) > 5000:
            for schluessel in [k for k, v in _zugriffe.items() if not v]:
                _zugriffe.pop(schluessel, None)

    antwort = await call_next(request)
    antwort.headers["X-Content-Type-Options"] = "nosniff"
    antwort.headers["Referrer-Policy"] = "no-referrer"
    antwort.headers["Cache-Control"] = "no-store"
    antwort.headers["X-Frame-Options"] = "DENY"
    return antwort


app.include_router(contact.router)
app.include_router(availability.router)
app.include_router(altcha.router)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}
