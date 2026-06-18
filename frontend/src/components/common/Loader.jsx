export function Loader({ label = "Processing..." }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--accent)]" />
      <span className="muted">{label}</span>
    </div>
  );
}

