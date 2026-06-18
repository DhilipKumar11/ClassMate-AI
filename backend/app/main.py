from fastapi import FastAPI

from app.core.config import get_settings
from app.core.cors import configure_cors
from app.routes.concept import router as concept_router
from app.routes.health import router as health_router
from app.routes.translate import router as translate_router

settings = get_settings()

app = FastAPI(
    title="ClassMate AI API",
    version="0.1.0",
    description="Backend API for concept simplification and bilingual translation.",
)

configure_cors(app, settings)
app.include_router(health_router)
app.include_router(concept_router)
app.include_router(translate_router)

