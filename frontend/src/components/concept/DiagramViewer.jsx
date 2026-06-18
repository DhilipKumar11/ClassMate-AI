import { useEffect, useState } from "react";
import { Card } from "../common/Card";
import { renderMermaid } from "../../utils/mermaid";

const fallbackDiagram = `flowchart LR
A[Whole Object] --> B[Equal Parts]
B --> C[Numerator]
B --> D[Denominator]
C --> E[Fraction]
D --> E[Fraction]`;

export function DiagramViewer({ diagram }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const uniqueId = `diagram-${Math.random().toString(36).substring(2, 9)}`;

    async function draw() {
      if (!diagram) {
        setSvg("");
        setError("");
        return;
      }

      try {
        const rendered = await renderMermaid(uniqueId, diagram);
        if (active) {
          setSvg(rendered);
          setError("");
        }
      } catch (err) {
        try {
          const renderedFallback = await renderMermaid(
            `${uniqueId}-fallback`,
            fallbackDiagram,
          );

          if (active) {
            setSvg(renderedFallback);
            setError("Generated diagram could not be rendered, so a fallback classroom diagram is being shown.");
          }
        } catch (err) {
          console.error("Fallback diagram error:", err);
          if (active) {
            setSvg("");
            setError(`Diagram rendering failed: ${err.message}`);
          }
        }
      }
    }

    draw();

    return () => {
      active = false;
    };
  }, [diagram]);

  if (!diagram) {
    return null;
  }

  return (
    <Card>
      <p className="eyebrow">Visual Diagram</p>
      {error ? <p className="mt-4 text-sm text-rose-500">{error}</p> : null}
      {svg ? (
        <div
          className="mermaid mt-6 overflow-x-auto rounded-[20px] bg-[#eef5ff] p-4"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : null}
    </Card>
  );
}
