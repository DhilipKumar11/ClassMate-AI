import { Card } from "../common/Card";

export function ExampleCard({ example }) {
  if (!example) {
    return null;
  }

  return (
    <Card className="h-full">
      <p className="eyebrow">Real-life Example</p>
      <p className="mt-4 text-lg leading-7">{example}</p>
    </Card>
  );
}

