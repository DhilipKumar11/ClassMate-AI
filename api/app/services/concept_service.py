from app.models.concept import ConceptSimplifyRequest, ConceptSimplifyResponse
from app.services.gemini_service import GeminiService
from app.services.prompt_service import build_concept_prompt
from app.utils.exceptions import GeminiServiceError
from app.utils.fallback_content import build_concept_fallback


class ConceptService:
    def __init__(self) -> None:
        self.gemini = GeminiService()

    async def simplify(self, payload: ConceptSimplifyRequest) -> ConceptSimplifyResponse:
        prompt = build_concept_prompt(payload.topic, payload.grade, payload.language)

        if not self.gemini.available:
            return build_concept_fallback(payload.topic, payload.grade, payload.language)

        try:
            return await self.gemini.generate_structured(prompt, ConceptSimplifyResponse)
        except GeminiServiceError:
            return build_concept_fallback(payload.topic, payload.grade, payload.language)
