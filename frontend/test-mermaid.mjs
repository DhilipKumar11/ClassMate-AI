import { normalizeMermaidDefinition } from "./src/utils/mermaid.js";

const fallbackDiagram = `flowchart LR
A[Whole Object] --> B[Equal Parts]
B --> C[Numerator]
B --> D[Denominator]
C --> E[Fraction]
D --> E[Fraction]`;

console.log(normalizeMermaidDefinition(fallbackDiagram));