import asyncio
import json
from typing import TypeVar

from app.core.config import get_settings
from app.utils.exceptions import GeminiServiceError, GeminiUnavailableError
from pydantic import BaseModel

try:
    from google import genai
except ImportError:  # pragma: no cover
    genai = None

SchemaT = TypeVar("SchemaT", bound=BaseModel)


class GeminiService:
    def __init__(self) -> None:
        settings = get_settings()
        self.model = settings.gemini_model
        self.fallback_models = settings.gemini_fallback_models
        self.retry_attempts = max(settings.gemini_retry_attempts, 1)
        self.api_key = settings.gemini_api_key
        self.client = genai.Client(api_key=self.api_key) if self.api_key and genai else None

    @property
    def available(self) -> bool:
        return self.client is not None

    async def generate_structured(self, prompt: str, schema: type[SchemaT]) -> SchemaT:
        if not self.available:
            raise GeminiUnavailableError("Gemini client is not configured")

        models = [self.model, *[model for model in self.fallback_models if model != self.model]]
        last_error: Exception | None = None
        last_retryable = False

        for model in models:
            for attempt in range(self.retry_attempts):
                try:
                    response = await asyncio.to_thread(
                        self.client.models.generate_content,
                        model=model,
                        contents=prompt,
                        config={
                            "response_mime_type": "application/json",
                            "response_schema": schema,
                        },
                    )
                    text = getattr(response, "text", "") or ""
                    try:
                        return schema.model_validate_json(text)
                    except Exception:
                        return schema.model_validate(json.loads(text))
                except Exception as exc:
                    message = str(exc)
                    upper_message = message.upper()
                    retryable = any(
                        token in upper_message
                        for token in ("503", "429", "UNAVAILABLE", "RESOURCE_EXHAUSTED")
                    )
                    last_error = exc
                    last_retryable = retryable

                    if retryable and attempt < self.retry_attempts - 1:
                        await asyncio.sleep(0.7 * (attempt + 1))
                        continue
                    break

        message = str(last_error) if last_error else "Gemini request failed."
        raise GeminiServiceError(message, retryable=last_retryable)
