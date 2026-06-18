import { useEffect, useState } from "react";

export function useSpeechSynthesis() {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!supported) {
      return undefined;
    }

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    const speechSynthesisApi = window.speechSynthesis;

    loadVoices();

    if (typeof speechSynthesisApi.addEventListener === "function") {
      speechSynthesisApi.addEventListener("voiceschanged", loadVoices);
    } else {
      speechSynthesisApi.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof speechSynthesisApi.removeEventListener === "function") {
        speechSynthesisApi.removeEventListener("voiceschanged", loadVoices);
      } else if (speechSynthesisApi.onvoiceschanged === loadVoices) {
        speechSynthesisApi.onvoiceschanged = null;
      }
    };
  }, [supported]);

  const speak = ({ text, lang = "en-IN", rate = 1 } = {}) => {
    if (!supported || !text) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    const matchedVoice = voices.find((voice) => voice.lang?.toLowerCase().startsWith(lang.toLowerCase()));

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) {
      return;
    }

    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speak, cancel, supported, speaking };
}
