import { useEffect, useRef, useState } from "react";

export function useSpeechRecognition() {
  const recognitionRef = useRef(null);
  const callbacksRef = useRef({ onResult: null, onError: null });
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const supported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (!supported) {
      return undefined;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      const nextError = event.error || "Speech recognition failed";
      setError(nextError);
      callbacksRef.current.onError?.(nextError);
    };

    recognition.onresult = (event) => {
      const nextTranscript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();

      setTranscript(nextTranscript);
      callbacksRef.current.onResult?.(nextTranscript);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [supported]);

  const startListening = ({ lang = "en-IN", onResult, onError } = {}) => {
    if (!recognitionRef.current) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    callbacksRef.current = { onResult, onError };
    recognitionRef.current.lang = lang;
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    listening,
    error,
    supported,
    startListening,
    stopListening,
  };
}

