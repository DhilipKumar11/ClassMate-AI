from app.models.translation import TranslationRequest, TranslationResponse
from app.services.gemini_service import GeminiService
from app.services.prompt_service import build_translation_prompt
from app.utils.exceptions import GeminiServiceError
from app.utils.fallback_content import build_translation_fallback


class TranslationService:
    def __init__(self) -> None:
        self.gemini = GeminiService()

    async def translate(self, payload: TranslationRequest) -> TranslationResponse:
        prompt = build_translation_prompt(
            payload.text, payload.source_language, payload.target_language
        )

        if not self.gemini.available:
            return build_translation_fallback(payload.text)

        try:
            return await self.gemini.generate_structured(prompt, TranslationResponse)
        except GeminiServiceError:
            return build_translation_fallback(payload.text)
