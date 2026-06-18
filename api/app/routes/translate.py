from fastapi import APIRouter

from app.models.translation import TranslationRequest, TranslationResponse
from app.services.translation_service import TranslationService

router = APIRouter(prefix="/api", tags=["translation"])
service = TranslationService()


@router.post("/translate", response_model=TranslationResponse)
async def translate(payload: TranslationRequest) -> TranslationResponse:
    return await service.translate(payload)
