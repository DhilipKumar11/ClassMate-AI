from pydantic import BaseModel, Field


class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=2, max_length=2000)
    source_language: str = Field(..., min_length=2, max_length=30)
    target_language: str = Field(..., min_length=2, max_length=30)


class TranslationResponse(BaseModel):
    original_text: str = Field(description="The original input text in the source language.")
    translated_text: str = Field(
        description="An accurate, student-friendly Hindi translation of the original text."
    )
    source: str = Field(
        default="gemini",
        description="Indicates whether the response came from Gemini or a local fallback.",
    )
