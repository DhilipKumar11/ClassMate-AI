import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { GradeSelector } from "../common/GradeSelector";
import { LanguageSelector } from "../common/LanguageSelector";
import { VoiceStatusBadge } from "../common/VoiceStatusBadge";

export function ConceptForm({
  topic,
  onTopicChange,
  grade,
  onGradeChange,
  language,
  onLanguageChange,
  onSubmit,
  onListen,
  loading,
  speech,
  offline,
}) {
  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Feature 01</p>
          <h2 className="mt-3 font-display text-3xl">Live Concept Simplification</h2>
        </div>
        <VoiceStatusBadge supported={speech.supported} listening={speech.listening} error={speech.error} />
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Topic or classroom prompt</span>
          <textarea
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
            rows={5}
            placeholder='Try "Explain photosynthesis for Class 8 students"'
            className="w-full rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm outline-none transition focus:border-[var(--accent)]"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <GradeSelector value={grade} onChange={onGradeChange} />
          <LanguageSelector value={language} onChange={onLanguageChange} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={onListen} disabled={!speech.supported || speech.listening}>
            {speech.listening ? "Listening..." : "Use Voice Input"}
          </Button>
          <Button type="submit" disabled={loading || offline || !topic.trim()}>
            {loading ? "Generating..." : "Generate Explanation"}
          </Button>
          {offline ? <p className="text-sm text-amber-200">Reconnect to generate new AI output.</p> : null}
        </div>
      </form>
    </Card>
  );
}

