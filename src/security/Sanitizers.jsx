// Dependencies
import DOMPurify from "dompurify";

// 1. BSF (Basic Sanitization Function) - Uses basic Senitization Techniques (e.g. Trimming & Escaping).
export function BSF(string) {
  function escapeInput(string) {
    return string.replace(
      /[&<>'"]/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        }[char])
    );
  }

  let str = string;
  str = escapeInput(str); // Escaping Special Characters
  str = str.trim(); // Trimming White Spaces
  return str;
}

// 2. BRTSF (Basic Rich Text Sanitization Function) - Uses basic Senitization Techniques (e.g. Escape & Trim) for Rich Text.
export function BRTSF(content) {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: [], // No attributes allowed
  }).trim();
}
