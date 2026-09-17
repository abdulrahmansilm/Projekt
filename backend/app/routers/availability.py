from fastapi import APIRouter

from ..caldav_client import verfuegbare_slots
from ..schemas import VerfuegbarkeitAntwort

router = APIRouter(prefix="/api", tags=["availability"])


@router.get("/availability", response_model=VerfuegbarkeitAntwort)
def availability() -> VerfuegbarkeitAntwort:
    """Live-Abgleich per CalDAV mit dem Nextcloud-Kalender, keine Doppelbuchungen."""
    slots = verfuegbare_slots()
    return VerfuegbarkeitAntwort(slots=slots)
