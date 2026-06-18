from app.prompts.concept_prompt import CONCEPT_SYSTEM_PROMPT
from app.prompts.translation_prompt import TRANSLATION_SYSTEM_PROMPT


def build_concept_prompt(topic: str, grade: str, language: str) -> str:
    return f"""
{CONCEPT_SYSTEM_PROMPT}

Generate a response for:
- Topic: {topic}
- Grade: {grade}
- Language Style: {language}

Diagram rules:
- The diagram must be a Mermaid flowchart only.
- Start the diagram with exactly `flowchart TD` or `flowchart LR`.
- Do not wrap the diagram in markdown code fences.
- Do not include explanations before or after the diagram.
- Keep node IDs simple like A, B, C, D.
- Use short text labels inside square brackets.
- Avoid special characters that can break Mermaid parsing.
- Prefer 4 to 6 nodes only.

Explanation rules:
- Put the explanation in 3 to 5 short lines separated by `\n`.
- Do not return one large paragraph.
- Use labels like `Definition:`, `Key point:`, `Types:`, `Example:` only when helpful.
- Keep total explanation length concise enough for a smart-board card.

Example rules:
- Keep the real-life example to 2 or 3 short sentences maximum.

Return JSON with exactly these keys:
{{
  "topic": "string",
  "explanation": "string",
  "example": "string",
  "diagram": "valid Mermaid flowchart string"
}}
"""


def build_translation_prompt(text: str, source_language: str, target_language: str) -> str:
    return f"""
{TRANSLATION_SYSTEM_PROMPT}

Translate this educational content:
- Source language: {source_language}
- Target language: {target_language}
- Text: {text}

Return JSON with exactly these keys:
{{
  "original_text": "string",
  "translated_text": "string"
}}
"""
