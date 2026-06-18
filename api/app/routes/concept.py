from fastapi import APIRouter

from app.models.concept import ConceptSimplifyRequest, ConceptSimplifyResponse
from app.services.concept_service import ConceptService

router = APIRouter(prefix="/api", tags=["concept"])
service = ConceptService()


@router.post("/concept-simplify", response_model=ConceptSimplifyResponse)
async def concept_simplify(
    payload: ConceptSimplifyRequest,
) -> ConceptSimplifyResponse:
    return await service.simplify(payload)

