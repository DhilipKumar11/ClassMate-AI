import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


class Settings:
    app_env: str = os.getenv("APP_ENV", "development")
    app_host: str = os.getenv("APP_HOST", "0.0.0.0")
    app_port: int = int(os.getenv("APP_PORT", "8000"))
    allowed_origins: list[str] = [
        origin.strip()
        for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174").split(",")
        if origin.strip()
    ]
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    gemini_model: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    gemini_fallback_models: list[str] = [
        model.strip()
        for model in os.getenv(
            "GEMINI_FALLBACK_MODELS", "gemini-2.0-flash,gemini-1.5-flash"
        ).split(",")
        if model.strip()
    ]
    gemini_retry_attempts: int = int(os.getenv("GEMINI_RETRY_ATTEMPTS", "2"))
    gemini_fallback_models: list[str] = [
        model.strip()
        for model in os.getenv(
            "GEMINI_FALLBACK_MODELS", "gemini-2.0-flash,gemini-1.5-flash"
        ).split(",")
        if model.strip()
    ]
    gemini_retry_attempts: int = int(os.getenv("GEMINI_RETRY_ATTEMPTS", "2"))


@lru_cache
def get_settings() -> Settings:
    return Settings()
