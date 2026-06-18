import { Button } from "../common/Button";

export function AudioControls({ onListen, onStop, disabled, speaking }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" onClick={onListen} disabled={disabled || speaking}>
        Read Hindi Aloud
      </Button>
      <Button variant="ghost" onClick={onStop} disabled={!speaking}>
        Stop Audio
      </Button>
    </div>
  );
}

