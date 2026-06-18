import { Button } from "../common/Button";

export function ListenControls({ onListen, onStop, disabled, speaking }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" onClick={onListen} disabled={disabled || speaking}>
        Listen to Explanation
      </Button>
      <Button variant="ghost" onClick={onStop} disabled={!speaking}>
        Stop Audio
      </Button>
    </div>
  );
}

