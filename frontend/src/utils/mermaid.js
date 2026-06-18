let initialized = false;
let mermaidModule = null;

function isMermaidErrorOutput(svg) {
  if (!svg || typeof svg !== "string") {
    return false;
  }

  const normalized = svg.toLowerCase();
  return (
    normalized.includes("syntax error in text") ||
    normalized.includes("parse error") ||
    normalized.includes('class="error-icon"') ||
    normalized.includes('class="error-text"')
  );
}

export function normalizeMermaidDefinition(definition) {
  if (!definition || typeof definition !== "string") {
    return "";
  }

  let normalized = definition.trim();

  normalized = normalized
    .replace(/^```mermaid\s*/i, "")
    .replace(/^```/i, "")
    .replace(/```$/i, "")
    .trim();

  const startMatch = normalized.match(/(?:flowchart|graph)\s+(?:TD|LR|RL|BT)/i);
  if (startMatch && startMatch.index > 0) {
    normalized = normalized.slice(startMatch.index);
  }

  normalized = normalized
    .replace(/^graph\s+/i, "flowchart ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\t/g, "  ")
    .replace(/\r\n/g, "\n");

  normalized = normalized
    .replace(/\s+->\s+/g, " --> ")
    .replace(/\s+-->\s+/g, " --> ");

  normalized = normalized.replace(/(])\s+([A-Za-z][A-Za-z0-9_]*)\s+-->/g, "$1\n$2 -->");
  normalized = normalized.replace(
    /(\b[A-Za-z][A-Za-z0-9_]*\])\s+([A-Za-z][A-Za-z0-9_]*\s*&\s*[A-Za-z][A-Za-z0-9_]*\s+-->)/g,
    "$1\n$2",
  );
  normalized = normalized.replace(
    /(\b[A-Za-z][A-Za-z0-9_]*\])\s+([A-Za-z][A-Za-z0-9_]*\s+-->)/g,
    "$1\n$2",
  );

  const headerMatch = normalized.match(/^(flowchart\s+(?:TD|LR|RL|BT))/i);
  if (headerMatch) {
    const header = headerMatch[1];
    const body = normalized.slice(header.length).trim();
    normalized = `${header}\n${body}`;
  }

  return normalized;
}

async function getMermaid() {
  if (!mermaidModule) {
    const module = await import("mermaid");
    mermaidModule = module.default;
  }

  return mermaidModule;
}

export async function initMermaid() {
  if (initialized) {
    return;
  }

  const mermaid = await getMermaid();
  mermaid.initialize({
    startOnLoad: false,
    suppressErrorRendering: true,
    theme: "base",
    themeVariables: {
      primaryColor: "#10243d",
      primaryTextColor: "#f7f4ee",
      primaryBorderColor: "#f68a4b",
      lineColor: "#efd790",
      secondaryColor: "#0f3b36",
      tertiaryColor: "#173451",
      fontFamily: "Manrope, sans-serif",
      textColor: "#f7f4ee",
    },
    securityLevel: "loose",
    flowchart: {
      curve: "basis",
      htmlLabels: true,
    },
  });

  initialized = true;
}

export async function renderMermaid(id, definition) {
  await initMermaid();
  const mermaid = await getMermaid();
  const normalized = normalizeMermaidDefinition(definition);
  const { svg } = await mermaid.render(id, normalized);

  if (isMermaidErrorOutput(svg)) {
    throw new Error("Mermaid returned an error SVG instead of a valid diagram.");
  }

  return svg;
}
