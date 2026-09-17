import uuid
from datetime import datetime, timezone

from sqlalchemy import JSON, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


def neue_id() -> str:
    return str(uuid.uuid4())


def jetzt_utc() -> datetime:
    return datetime.now(timezone.utc)


class Anfrage(Base):
    """Speichert jede Anfrage aus dem 4-Schritte-Wizard (Nachricht oder Terminbuchung) zusätzlich zur E-Mail.

    Ersetzt die frühere Tabelle `kontakt_anfragen` des 5-Schritte-Formulars (Leistung/Kurzthema/Datei-Upload).
    """

    __tablename__ = "anfragen"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=neue_id)
    erstellt_am: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=jetzt_utc)

    themen: Mapped[list[str]] = mapped_column(JSON)
    dringlichkeit: Mapped[str] = mapped_column(String(20))
    groesse: Mapped[str] = mapped_column(String(20))
    nachricht: Mapped[str | None] = mapped_column(Text, nullable=True)

    vorname: Mapped[str] = mapped_column(String(100))
    nachname: Mapped[str] = mapped_column(String(100))
    unternehmen: Mapped[str | None] = mapped_column(String(200), nullable=True)
    email: Mapped[str] = mapped_column(String(254))
    telefon: Mapped[str | None] = mapped_column(String(40), nullable=True)

    weg: Mapped[str] = mapped_column(String(20))
    herkunft: Mapped[str] = mapped_column(String(200))
    termin_start: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    nextcloud_talk_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
