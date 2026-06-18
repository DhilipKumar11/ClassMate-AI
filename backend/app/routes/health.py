from fastapi import APIRouter

from app.core.config import get_settings
from app.models.common import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/api/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    settings = get_settings()
    return HealthResponse(
        status="ok",
        environment=settings.app_env,
        gemini_configured=bool(settings.gemini_api_key),
        model=settings.gemini_model,
    )

