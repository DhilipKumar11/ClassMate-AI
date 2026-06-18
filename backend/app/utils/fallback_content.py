from app.models.concept import ConceptSimplifyResponse
from app.models.translation import TranslationResponse


def build_concept_fallback(topic: str, grade: str, language: str) -> ConceptSimplifyResponse:
    clean_topic = topic.strip() or "This topic"
    explanation = (
        f"Definition: {clean_topic} is an important idea for Class {grade} students.\n"
        "Key point: Start with the basic meaning, then connect it to daily life.\n"
        f"Classroom style: Explain it in simple {language} with short sentences.\n"
        "Remember: One clear example helps students understand faster."
    )
    example = (
        "Think of sharing a pizza with friends. When students can see the idea in real life, "
        "the textbook meaning becomes easier to remember."
    )
    diagram = (
        "flowchart LR\n"
        "A[Topic] --> B[Simple Meaning]\n"
        "B --> C[Key Point]\n"
        "C --> D[Real Life Example]\n"
        "D --> E[Student Understanding]"
    )
    return ConceptSimplifyResponse(
        topic=clean_topic,
        explanation=explanation,
        example=example,
        diagram=diagram,
        source="fallback",
    )


def build_translation_fallback(text: str) -> TranslationResponse:
    sample_map = {
        "Photosynthesis is the process by which green plants prepare food.": "प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे अपना भोजन बनाते हैं।",
        "Water evaporates because of heat from the sun.": "सूर्य की गर्मी के कारण पानी वाष्पित हो जाता है।",
        "A fraction represents a part of a whole.": "भिन्न किसी पूर्ण वस्तु के एक भाग को दर्शाता है।",
    }

    translated_text = sample_map.get(
        text.strip(),
        "Gemini API key is not configured yet. Add it in the backend environment to enable live Hindi translation.",
    )

    return TranslationResponse(
        original_text=text.strip(),
        translated_text=translated_text,
        source="fallback",
    )
