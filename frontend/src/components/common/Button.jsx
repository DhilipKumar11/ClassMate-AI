import { cn } from "../../utils/helpers";

const variants = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[#225fc5]",
  secondary:
    "bg-white/80 text-[var(--text)] hover:bg-white border border-[var(--border)]",
  ghost:
    "bg-transparent text-[var(--text)] hover:bg-white/60 border border-[var(--border)]",
};

export function Button({
  as: Component = "button",
  className,
  variant = "primary",
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
