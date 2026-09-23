"""E-Mail-Versand über den eigenen Mailserver (Mailcow via SMTP), kein externer Versanddienstleister."""

from email.message import EmailMessage

import aiosmtplib

from .config import settings


async def _sende(empfaenger: str, betreff: str, text: str, antwort_an: str | None = None) -> None:
    nachricht = EmailMessage()
    nachricht["From"] = settings.smtp_from
    nachricht["To"] = empfaenger
    nachricht["Subject"] = betreff
    if antwort_an:
        nachricht["Reply-To"] = antwort_an
    nachricht.set_content(text)

    await aiosmtplib.send(
        nachricht,
        hostname=settings.smtp_host,
        port=settings.smtp_port,
        username=settings.smtp_user,
        password=settings.smtp_password,
        start_tls=True,
        timeout=10,
    )


async def sende_anfrage_bestaetigung_kunde(empfaenger_email: str, vorname: str, themen: str, sprache: str = "de") -> None:
    # Runde 8: Anfragen von der englischen Seite bekommen die Bestätigung auf Englisch
    if sprache == "en":
        betreff = "Your request to Selim-IT"
        text = (
            f"Hello {vorname},\n\n"
            f"Thank you for your request ({themen}). We'll review it and get back to you shortly with a concrete assessment.\n\n"
            f"If you're dealing with an acute outage, please call us directly: that's the fastest way.\n\n"
            f"Best regards\nSelim-IT"
        )
    else:
        betreff = "Ihre Anfrage bei Selim-IT"
        text = (
            f"Hallo {vorname},\n\n"
            f"vielen Dank für Ihre Anfrage ({themen}). Wir prüfen Ihr Anliegen und melden uns zeitnah mit einer konkreten Einschätzung.\n\n"
            f"Bei einem akuten Ausfall rufen Sie uns bitte direkt an, das ist der schnellste Weg.\n\n"
            f"Viele Grüße\nSelim-IT"
        )
    await _sende(empfaenger_email, betreff, text, antwort_an=settings.smtp_to)


async def sende_anfrage_benachrichtigung_intern(anfrage_id: str, betreff: str, zusammenfassung: str) -> None:
    text = f"Neue Anfrage über selim-it.de (ID {anfrage_id})\n\n{zusammenfassung}\n"
    await _sende(settings.smtp_to, betreff, text)


async def sende_terminbestaetigung(
    empfaenger_email: str, vorname: str, termin_start_lesbar: str, talk_url: str | None, sprache: str = "de"
) -> None:
    if sprache == "en":
        talk_zeile = (
            f"\nYour video call link: {talk_url}\n"
            if talk_url
            else "\nWe'll send you the video call link separately before the appointment.\n"
        )
        text = (
            f"Hello {vorname},\n\n"
            f"Your free initial consultation is confirmed: {termin_start_lesbar}.\n{talk_zeile}\n"
            f"We look forward to speaking with you.\n\nBest regards\nSelim-IT"
        )
        await _sende(empfaenger_email, "Appointment confirmed: your initial consultation with Selim-IT", text, antwort_an=settings.smtp_to)
        return

    talk_zeile = (
        f"\nIhr Link zum Videogespräch: {talk_url}\n"
        if talk_url
        else "\nDen Link zum Videogespräch senden wir Ihnen vor dem Termin separat zu.\n"
    )
    text = (
        f"Hallo {vorname},\n\n"
        f"Ihr kostenloses Erstgespräch ist bestätigt: {termin_start_lesbar}.\n{talk_zeile}\n"
        f"Wir freuen uns auf das Gespräch.\n\nViele Grüße\nSelim-IT"
    )
    await _sende(empfaenger_email, "Terminbestätigung: Ihr Erstgespräch bei Selim-IT", text, antwort_an=settings.smtp_to)
