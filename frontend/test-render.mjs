import { renderMermaid } from "./src/utils/mermaid.js";

const fallbackDiagram = `flowchart LR
A[Whole Object] --> B[Equal Parts]
B --> C[Numerator]
B --> D[Denominator]
C --> E[Fraction]
D --> E[Fraction]`;

async function test() {
  try {
    const svg = await renderMermaid("test-123", fallbackDiagram);
    console.log("Success!");
    console.log(svg.substring(0, 100));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
