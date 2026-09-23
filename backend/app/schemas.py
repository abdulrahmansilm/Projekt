"""Eingabe-/Antwortmodelle der API.

Spiegelt den Vertrag des Anfrage-Wizards im Frontend (src/lib/validation.ts → anfrageSchema,
Optionen aus src/content/seiten/kontakt.json). Serverseitig wird immer vollständig neu validiert.
"""

from datetime import datetime, timezone
from enum import Enum

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator

# Bereiche aus Schritt 1 des Wizards (id → Anzeigename für E-Mails). Deckungsgleich mit den 3
# Navbar-Hauptkategorien (src/lib/config.ts → navigation) plus "Allgemeine Beratung" (17.09.2026).
THEMEN: dict[str, str] = {
    "it-infrastruktur": "IT & Infrastruktur",
    "ki-kommunikation": "KI & Kommunikation",
    "webseiten": "Webentwicklung",
    "allgemein": "Allgemeine Beratung",
}

# Runde 8: Anfragen von der englischen Seite (Pfad /en/…) bekommen englische Kunden-Mails
THEMEN_EN: dict[str, str] = {
    "it-infrastruktur": "IT & Infrastructure",
    "ki-kommunikation": "AI & Communication",
    "webseiten": "Web Development",
    "allgemein": "General consultation",
}


def sprache_aus_herkunft(herkunft: str) -> str:
    """'en' für Seiten unter /en, sonst 'de' (gleiche Regel wie spracheAus() in src/i18n/index.ts)."""
    return "en" if herkunft == "/en" or herkunft.startswith("/en/") else "de"


# Leistungen der Navbar (Slug -> Anzeigename), Interessen sind optional
LEISTUNGEN: dict[str, str] = {
    "it-betreuung": "IT-Betreuung",
    "server-betreuung": "Server-Betreuung",
    "fernzugriff-vpn": "Fernzugriff / VPN",
    "hardware-beschaffung": "Hardware-Beschaffung",
    "microsoft-365": "Microsoft 365",
    "datensicherung": "Datensicherung",
    "email-sicherheit": "E-Mail-Sicherheit",
    "ki-telefonassistent": "KI-Telefonassistent",
    "whatsapp-chatbot": "WhatsApp-Chatbot",
    "prozessautomatisierung": "Automatisierung",
    "webseiten": "Webentwicklung",
    # Runde 4: Zusatzoptionen, wenn „Webentwicklung“ als Anliegen gewählt ist
    "branding": "Branding",
    "hosting": "Hosting",
}

GROESSEN: tuple[str, ...] = ("1–10", "11–25", "26–50", "51–100", "Über 100")

MINDEST_AUSFUELLZEIT_MS = 3000


class Dringlichkeit(str, Enum):
    dringend = "dringend"
    bald = "bald"
    allgemein = "allgemein"


DRINGLICHKEIT_LABEL: dict[Dringlichkeit, str] = {
    Dringlichkeit.dringend: "Dringend, wir benötigen schnell Hilfe",
    Dringlichkeit.bald: "In der nächsten Zeit",
    Dringlichkeit.allgemein: "Allgemeine Anfrage / Beratung",
}


class Weg(str, Enum):
    anfrage = "anfrage"
    termin = "termin"


class KontaktAnfrageEingabe(BaseModel):
    themen: list[str] = Field(min_length=1, max_length=len(THEMEN))
    leistungen: list[str] = Field(default_factory=list, max_length=len(LEISTUNGEN))
    dringlichkeit: Dringlichkeit
    groesse: str
    # Runde 8: wieder optional (Pflichtfeld aus Runde 4 zurückgenommen)
    nachricht: str | None = Field(default=None, max_length=4000)

    vorname: str = Field(min_length=1, max_length=100)
    nachname: str = Field(min_length=1, max_length=100)
    unternehmen: str | None = Field(default=None, max_length=200)
    email: EmailStr
    telefon: str | None = Field(default=None, max_length=40)

    weg: Weg
    termin_slot: str | None = Field(default=None, alias="terminSlot")
    herkunft: str = Field(default="/", max_length=200)

    # Spam-Schutz
    website: str = ""  # Honeypot, bei Menschen immer leer
    formular_geladen_um: int = Field(alias="formularGeladenUm")
    altcha: str | None = Field(default=None, max_length=4000)

    model_config = {"populate_by_name": True, "str_strip_whitespace": True}

    @field_validator("themen")
    @classmethod
    def themen_bekannt(cls, v: list[str]) -> list[str]:
        unbekannt = [t for t in v if t not in THEMEN]
        if unbekannt:
            raise ValueError(f"Unbekannter Bereich: {', '.join(unbekannt)}")
        return list(dict.fromkeys(v))

    @field_validator("leistungen")
    @classmethod
    def leistungen_bekannt(cls, v: list[str]) -> list[str]:
        unbekannt = [x for x in v if x not in LEISTUNGEN]
        if unbekannt:
            raise ValueError(f"Unbekannte Leistung: {', '.join(unbekannt)}")
        return list(dict.fromkeys(v))

    @field_validator("groesse")
    @classmethod
    def groesse_bekannt(cls, v: str) -> str:
        if v not in GROESSEN:
            raise ValueError("Unbekannte Unternehmensgröße.")
        return v

    @field_validator("nachricht", "unternehmen", "telefon")
    @classmethod
    def leer_zu_none(cls, v: str | None) -> str | None:
        return v or None

    @field_validator("herkunft")
    @classmethod
    def herkunft_ist_pfad(cls, v: str) -> str:
        return v if v.startswith("/") else "/"

    @model_validator(mode="after")
    def termin_erfordert_slot(self) -> "KontaktAnfrageEingabe":
        if self.weg is Weg.termin:
            if not self.termin_slot:
                raise ValueError("Kein Termin ausgewählt.")
            try:
                start = datetime.fromisoformat(self.termin_slot)
            except ValueError as exc:
                raise ValueError("Ungültiger Termin.") from exc
            if start.tzinfo is None or start <= datetime.now(timezone.utc):
                raise ValueError("Ungültiger Termin.")
        return self

    # ---- Hilfen für Mails/Kalender
    def ist_spam_honeypot(self) -> bool:
        return bool(self.website)

    def zu_schnell_ausgefuellt(self) -> bool:
        jetzt_ms = int(datetime.now(timezone.utc).timestamp() * 1000)
        return jetzt_ms - self.formular_geladen_um < MINDEST_AUSFUELLZEIT_MS

    @property
    def sprache(self) -> str:
        return sprache_aus_herkunft(self.herkunft)

    def themen_lesbar(self, sprache: str = "de") -> str:
        namen = THEMEN_EN if sprache == "en" else THEMEN
        return ", ".join(namen[t] for t in self.themen)

    def leistungen_lesbar(self) -> str:
        return ", ".join(LEISTUNGEN[x] for x in self.leistungen) or "-"

    def zusammenfassung(self) -> str:
        zeilen = [f"Bereiche: {self.themen_lesbar()}"] + [
            f"Interesse an: {self.leistungen_lesbar()}",
            f"Dringlichkeit: {DRINGLICHKEIT_LABEL[self.dringlichkeit]}",
            f"Mitarbeitende: {self.groesse}",
            "",
            f"Name: {self.vorname} {self.nachname}",
            f"Unternehmen: {self.unternehmen or '-'}",
            f"E-Mail: {self.email}",
            f"Telefon: {self.telefon or '-'}",
            f"Gesendet von: {self.herkunft}",
        ]
        if self.sprache == "en":
            zeilen.append("Sprache: Englisch (bitte auf Englisch antworten)")
        if self.nachricht:
            zeilen += ["", "Nachricht:", self.nachricht]
        return "\n".join(zeilen)


class TerminNachtragEingabe(BaseModel):
    """Termin, der nachträglich an eine bereits gesendete Anfrage gehängt wird.

    Der Wizard fragt den Termin seit 22.09.2026 erst nach dem Absenden ab (optional), damit die Anfrage
    nicht doppelt gespeichert wird. Die Anfrage-Id (UUID) dient als Nachweis.
    """

    termin_slot: str = Field(alias="terminSlot")

    model_config = {"populate_by_name": True, "str_strip_whitespace": True}

    @field_validator("termin_slot")
    @classmethod
    def slot_gueltig(cls, v: str) -> str:
        try:
            start = datetime.fromisoformat(v)
        except ValueError as exc:
            raise ValueError("Ungültiger Termin.") from exc
        if start.tzinfo is None or start <= datetime.now(timezone.utc):
            raise ValueError("Ungültiger Termin.")
        return v


class Zeitslot(BaseModel):
    start: str  # ISO 8601 mit Zeitzone
    label: str


class VerfuegbarkeitAntwort(BaseModel):
    slots: list[Zeitslot]


class KontaktAntwort(BaseModel):
    ok: bool
    id: str
    nextcloud_talk_url: str | None = None
