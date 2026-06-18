from pydantic import BaseModel, Field


class ConceptSimplifyRequest(BaseModel):
    topic: str = Field(..., min_length=2, max_length=300)
    grade: str = Field(..., min_length=1, max_length=10)
    language: str = Field(..., min_length=2, max_length=30)


class ConceptSimplifyResponse(BaseModel):
    topic: str = Field(description="The requested topic or corrected concept name.")
    explanation: str = Field(
        description="A concise, student-friendly explanation adapted to the selected class level."
    )
    example: str = Field(
        description="A simple real-life example that helps students understand the concept."
    )
    diagram: str = Field(
        description="A valid Mermaid flowchart string suitable for classroom display."
    )
    source: str = Field(
        default="gemini",
        description="Indicates whether the response came from Gemini or a local fallback.",
    )
