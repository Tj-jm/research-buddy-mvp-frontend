export function extractAbstractSection(rawText) {
  if (!rawText || typeof rawText !== "string") return null;

  // --- Normalize text before matching ---
  const text = rawText
    .replace(/\s+/g, " ")                           // collapse all whitespace
    .replace(/–|—/g, "-")                           // normalize dashes
    .replace(/\bI\s+NTRODUCTION\b/gi, "INTRODUCTION") // fix OCR-split "I NTRODUCTION"
    .replace(/\bI\s+N\s*TRODUCTION\b/gi, "INTRODUCTION") // handle extra noise
    .replace(/\f/g, " ");                            // remove form feed artifacts

  // --- Robust regex for Abstract section ---
  const regex =
    /abstract(?:\s*[—\-:.\s]*)?([\s\S]*?)(?=\b(?:[A-Z]?\s*\d*\s*[ivx]*\s*[.:;,-]*\s*[i\s]*ntroduction)\b)/i;

  const match = text.match(regex);
  if (match && match[1]) {
    return match[1].trim();
  }

  return null;
}
