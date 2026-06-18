import { cn } from "../../utils/helpers";

export function Card({ className, children }) {
  return (
    <div className={cn("glass-panel rounded-[28px] p-6 shadow-panel", className)}>
      {children}
    </div>
  );
}

