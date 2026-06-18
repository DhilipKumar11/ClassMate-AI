export function VoiceStatusBadge({ supported, listening, error }) {
  const stateLabel = !supported
    ? "Voice unavailable"
    : listening
      ? "Listening..."
      : error
        ? "Voice error"
        : "Voice ready";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          listening ? "animate-pulse bg-emerald-400" : error ? "bg-rose-400" : "bg-[var(--accent)]"
        }`}
      />
      <span>{stateLabel}</span>
    </div>
  );
}

