import { useMemo, useState } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { useLocalStorageCache } from "../hooks/useLocalStorageCache";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { CACHE_KEYS, CONCEPT_PROMPTS } from "../utils/constants";
import { formatTimestamp, languageToSpeechCode } from "../utils/helpers";
import { simplifyConcept } from "../services/conceptService";
import { ConceptForm } from "../components/concept/ConceptForm";
import { PageHeader } from "../components/common/PageHeader";
import { ExplanationCard } from "../components/concept/ExplanationCard";
import { ExampleCard } from "../components/concept/ExampleCard";
import { DiagramViewer } from "../components/concept/DiagramViewer";
import { ListenControls } from "../components/concept/ListenControls";
import { Card } from "../components/common/Card";
import { Loader } from "../components/common/Loader";

export function ConceptPage() {
  const { settings, setGrade, setLanguage } = useAppSettings();
  const speech = useSpeechRecognition();
  const audio = useSpeechSynthesis();
  const { isOnline } = useNetworkStatus();
  const { items, addItem, clearItems } = useLocalStorageCache(CACHE_KEYS.concept, 12);

  const [topic, setTopic] = useState("");
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
      lang: languageToSpeechCode(settings.language),
      onResult: setTopic,
      onError: setError,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!topic.trim()) {
      setError("Enter a topic or classroom prompt.");
      return;
    }

    if (!isOnline) {
      setError("You are offline. Reconnect to generate a new explanation.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await simplifyConcept({
        topic,
        grade: settings.grade,
        language: settings.language,
      });

      const cacheEntry = {
        id: `${response.topic}-${Date.now()}`,
        timestamp: Date.now(),
        grade: settings.grade,
        language: settings.language,
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

  const speakExplanation = () => {
    if (!result) {
      return;
    }

    audio.speak({
      text: `${result.topic}. ${result.explanation}. Example: ${result.example}`,
      lang: languageToSpeechCode(result.language || settings.language),
      rate: 0.95,
    });
  };

  return (
    <div className="section-shell space-y-12">
      <PageHeader
        eyebrow="Feature 01"
        title="Turn a spoken classroom prompt into a simple explanation."
        description="Class-level simplification, example generation, diagram rendering, and audio playback are handled in one teaching workflow."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card className="flex flex-wrap gap-3">
            {CONCEPT_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setTopic(prompt);
                  setError("");
                }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
              >
                {prompt}
              </button>
            ))}
          </Card>

          <ConceptForm
            topic={topic}
            onTopicChange={setTopic}
            grade={settings.grade}
            onGradeChange={setGrade}
            language={settings.language}
            onLanguageChange={setLanguage}
            onSubmit={handleSubmit}
            onListen={handleVoiceInput}
            loading={loading}
            speech={speech}
            offline={!isOnline}
          />

          {loading ? <Loader label="Generating explanation and diagram..." /> : null}
          {error ? <p className="text-sm text-rose-500">{error}</p> : null}
        </div>

        <Card className="h-fit xl:sticky xl:top-28">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Recent Cache</p>
              <h2 className="mt-3 text-2xl font-semibold">Offline-ready explanations</h2>
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
                  <p className="text-sm font-semibold">{entry.topic}</p>
                  <p className="mt-2 text-sm muted">
                    Class {entry.grade || settings.grade} / {entry.language || settings.language} / {formatTimestamp(entry.timestamp)}
                  </p>
                </button>
              ))
            ) : (
              <p className="muted text-sm leading-7">
                Generated concept explanations will appear here and remain available when the network is unavailable.
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
                  Class {result.grade || settings.grade} / {result.language || settings.language} / {formatTimestamp(result.timestamp || Date.now())}
                </p>
              </div>
            </Card>
            <div className="grid gap-6 xl:grid-cols-2">
              <ExplanationCard topic={result.topic} explanation={result.explanation} />
              <ExampleCard example={result.example} />
            </div>
            <ListenControls
              onListen={speakExplanation}
              onStop={audio.cancel}
              disabled={!audio.supported || !result}
              speaking={audio.speaking}
            />
            <DiagramViewer diagram={result.diagram} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
