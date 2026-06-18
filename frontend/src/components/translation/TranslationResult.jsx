import { Card } from "../common/Card";

export function TranslationResult({ originalText, translatedText }) {
  if (!originalText && !translatedText) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="h-full">
        <p className="eyebrow">Original Text</p>
        <p className="mt-4 whitespace-pre-line text-lg leading-8">{originalText}</p>
      </Card>
      <Card className="h-full">
        <p className="eyebrow">Hindi Translation</p>
        <p className="mt-4 whitespace-pre-line text-lg leading-8">{translatedText}</p>
      </Card>
    </div>
  );
}

