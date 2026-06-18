import { Card } from "../common/Card";

export function ExplanationCard({ topic, explanation }) {
  if (!explanation) {
    return null;
  }

  return (
    <Card className="h-full">
      <p className="eyebrow">Simplified Explanation</p>
      <h3 className="mt-3 text-xl font-semibold">{topic}</h3>
      <p className="muted mt-4 whitespace-pre-line leading-7">{explanation}</p>
    </Card>
  );
}

