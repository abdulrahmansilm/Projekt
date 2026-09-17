from fastapi import APIRouter

from ..altcha import erstelle_challenge

router = APIRouter(prefix="/api", tags=["altcha"])


@router.get("/altcha-challenge")
def altcha_challenge() -> dict:
    return erstelle_challenge()
