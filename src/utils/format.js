/** 1 → "01" (matches the [01] numbering used across the design). */
export function formatIndex(number, length = 2) {
  return String(number).padStart(length, '0');
}
