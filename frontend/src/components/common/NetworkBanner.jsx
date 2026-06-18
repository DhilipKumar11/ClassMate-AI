export function NetworkBanner({ isOnline }) {
  return (
    <div
      className={`sticky top-0 z-40 border-b px-4 py-3 text-sm backdrop-blur ${
        isOnline
          ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-100"
          : "border-amber-400/20 bg-amber-400/10 text-amber-50"
      }`}
    >
      <div className="section-shell flex items-center justify-between gap-3">
        <span>{isOnline ? "Online mode active." : "Offline mode active. Cached classroom results are still available."}</span>
        <span className="text-xs uppercase tracking-[0.24em] opacity-80">
          {isOnline ? "connected" : "offline"}
        </span>
      </div>
    </div>
  );
}

