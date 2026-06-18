import { useMemo, useState } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { useLocalStorageCache } from "../hooks/useLocalStorageCache";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { CACHE_KEYS, TRANSLATION_PROMPTS } from "../utils/constants";
import { formatTimestamp } from "../utils/helpers";
import { translateText } from "../services/translationService";
import { TranslationForm } from "../components/translation/TranslationForm";
import { TranslationResult } from "../components/translation/TranslationResult";
import { AudioControls } from "../components/translation/AudioControls";
import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/common/Card";
import { Loader } from "../components/common/Loader";

export function TranslationPage() {
  const speech = useSpeechRecognition();
  const audio = useSpeechSynthesis();
  const { isOnline } = useNetworkStatus();
  const { items, addItem, clearItems } = useLocalStorageCache(CACHE_KEYS.translation, 12);

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [resultSource, setResultSource] = useState("live");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const offlinePreview = useMemo(
    () => (Array.isArray(items) ? items : []).slice(0, 4),
    [items],
  );

  const handleVoiceInput = () => {
    speech.startListening({
      lang: "en-IN",
      onResult: setText,
      onError: setError,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text.trim()) {
      setError("Enter educational text to translate.");
      return;
    }

    if (!isOnline) {
      setError("You are offline. Reconnect to create a new translation.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await translateText({
        text,
        source_language: "English",
        target_language: "Hindi",
      });

      const cacheEntry = {
        id: `${Date.now()}`,
        timestamp: Date.now(),
        source_language: "English",
        target_language: "Hindi",
        ...response,
      };

      setResult(cacheEntry);
      setResultSource("live");
      addItem(cacheEntry);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const speakTranslation = () => {
    if (!result?.translated_text) {
      return;
    }

    audio.speak({
      text: result.translated_text,
      lang: "hi-IN",
      rate: 0.94,
    });
  };

  return (
    <div className="section-shell space-y-12">
      <PageHeader
        eyebrow="Feature 02"
        title="Capture a sentence and present it in English and Hindi."
        description="The translation workflow is built for live dictation, side-by-side classroom display, and spoken Hindi playback."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card className="flex flex-wrap gap-3">
            {TRANSLATION_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setText(prompt);
                  setError("");
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
              >
                {prompt}
              </button>
            ))}
          </Card>

          <TranslationForm
            text={text}
            onTextChange={setText}
            onSubmit={handleSubmit}
            onListen={handleVoiceInput}
            loading={loading}
            speech={speech}
            offline={!isOnline}
          />

          {loading ? <Loader label="Translating content..." /> : null}
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        </div>

        <Card className="h-fit xl:sticky xl:top-28">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Recent Cache</p>
              <h2 className="mt-3 text-2xl font-semibold">Offline-ready translations</h2>
            </div>
            {items.length ? (
              <button type="button" onClick={clearItems} className="text-sm muted transition hover:text-[var(--text)]">
                Clear
              </button>
            ) : null}
          </div>

          <div className="mt-6 space-y-4">
            {offlinePreview.length ? (
              offlinePreview.map((entry) => (
                <button
                  type="button"
                  key={entry.id}
                  onClick={() => {
                    setResult(entry);
                    setResultSource("cache");
                  }}
                  className="w-full rounded-[22px] border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/8"
                >
                  <p className="text-sm font-semibold leading-6">{entry.original_text}</p>
                  <p className="mt-2 text-sm muted">
                    {entry.source_language || "English"} to {entry.target_language || "Hindi"} / {formatTimestamp(entry.timestamp)}
                  </p>
                </button>
              ))
            ) : (
              <p className="muted text-sm leading-7">
                Translation history will be cached here so teachers can reopen previous bilingual results while offline.
              </p>
            )}
          </div>
        </Card>

        {result ? (
          <div className="space-y-6 xl:col-span-2">
            <Card className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">{resultSource === "cache" ? "Cached Result" : "Live Result"}</p>
                <p className="mt-3 text-sm muted">
                  {result.source_language || "English"} to {result.target_language || "Hindi"} / {formatTimestamp(result.timestamp || Date.now())}
                </p>
              </div>
            </Card>
            <TranslationResult
              originalText={result.original_text}
              translatedText={result.translated_text}
            />
            <AudioControls
              onListen={speakTranslation}
              onStop={audio.cancel}
              disabled={!audio.supported || !result?.translated_text}
              speaking={audio.speaking}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
