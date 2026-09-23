from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./data.db"

    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = "noreply@selim-it.de"
    smtp_to: str = "info@selim-it.de"

    caldav_url: str = ""
    caldav_user: str = ""
    caldav_password: str = ""
    caldav_calendar_name: str = "Erstgespraeche"

    nextcloud_talk_api_url: str = ""
    nextcloud_talk_user: str = ""
    nextcloud_talk_password: str = ""

    altcha_secret: str = "change-me"

    site_url: str = "https://selim-it.de"
    cors_origins: str = "https://selim-it.de"
    #: Hosts, die das Backend bedient (Komma-getrennt). Schützt vor Host-Header-Spoofing.
    allowed_hosts: str = "selim-it.de,www.selim-it.de,localhost,127.0.0.1,backend"
    #: nur lokal aktivieren: schaltet die API-Dokumentation unter /api/docs frei
    debug: bool = False


settings = Settings()
