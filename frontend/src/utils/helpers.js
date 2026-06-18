export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

export function languageToSpeechCode(language) {
  if (language === "Hindi") {
    return "hi-IN";
  }

  return "en-IN";
}

export function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

