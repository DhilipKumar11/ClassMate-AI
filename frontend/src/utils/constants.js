export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Concept Simplifier", to: "/concept" },
  { label: "Translation", to: "/translation" },
];

export const LANGUAGE_OPTIONS = ["English", "Hindi", "Hinglish"];

export const GRADE_OPTIONS = ["6", "7", "8", "9", "10"];

export const CACHE_KEYS = {
  concept: "classmate:concept-history",
  translation: "classmate:translation-history",
  theme: "classmate:theme",
  settings: "classmate:settings",
};

export const FEATURE_SPOTLIGHTS = [
  {
    title: "Live Concept Simplification",
    description:
      "Convert live teacher prompts into class-level explanations, real-life examples, and visual diagrams in seconds.",
  },
  {
    title: "Bilingual Dictation & Translation",
    description:
      "Capture spoken educational content, show English and Hindi side by side, and read the translation aloud.",
  },
  {
    title: "Offline Resilience",
    description:
      "Keep the interface stable when the internet drops and reopen recent classroom outputs from local cache.",
  },
];

export const CONCEPT_PROMPTS = [
  "Explain photosynthesis for Class 8 students",
  "Explain the water cycle in simple Hindi",
  "Teach fractions with a real-life example",
];

export const TRANSLATION_PROMPTS = [
  "Photosynthesis is the process by which green plants prepare food.",
  "Water evaporates because of heat from the sun.",
  "A fraction represents a part of a whole.",
];
