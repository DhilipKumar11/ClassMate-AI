import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { VoiceStatusBadge } from "../common/VoiceStatusBadge";

export function TranslationForm({
  text,
  onTextChange,
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
          <p className="eyebrow">Feature 02</p>
          <h2 className="mt-3 font-display text-3xl">Bilingual Dictation & Translation</h2>
        </div>
        <VoiceStatusBadge supported={speech.supported} listening={speech.listening} error={speech.error} />
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Spoken or typed educational content</span>
          <textarea
            value={text}
            onChange={(event) => onTextChange(event.target.value)}
            rows={5}
            placeholder="Photosynthesis is the process by which green plants prepare food."
            className="w-full rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm outline-none transition focus:border-[var(--accent)]"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={onListen} disabled={!speech.supported || speech.listening}>
            {speech.listening ? "Listening..." : "Use Voice Input"}
          </Button>
          <Button type="submit" disabled={loading || offline || !text.trim()}>
            {loading ? "Translating..." : "Translate to Hindi"}
          </Button>
          {offline ? <p className="text-sm text-amber-200">Reconnect to create new translations.</p> : null}
        </div>
      </form>
    </Card>
  );
}

