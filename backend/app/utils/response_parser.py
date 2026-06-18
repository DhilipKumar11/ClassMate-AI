import json
import re

from app.utils.exceptions import ResponseParseError


def extract_json_object(text: str) -> dict:
    if not text:
        raise ResponseParseError("Empty Gemini response")

    fenced_match = re.search(r"```json\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fenced_match:
        candidate = fenced_match.group(1)
        return json.loads(candidate)

    object_match = re.search(r"(\{.*\})", text, re.DOTALL)
    if object_match:
        return json.loads(object_match.group(1))

    raise ResponseParseError("No JSON object found in Gemini response")
