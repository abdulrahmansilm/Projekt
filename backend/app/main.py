from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import altcha, availability, contact

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Selim-IT Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(contact.router)
app.include_router(availability.router)
app.include_router(altcha.router)


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}
