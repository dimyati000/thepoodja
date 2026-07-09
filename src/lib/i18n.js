export function localize(field, language, fallback = "") {
  if (!field) return fallback;
  if (typeof field === "string") return field; // fallback kompatibel data lama
  const lang = language?.toLowerCase() === "id" ? "id" : "en";
  return field[lang] || field.en || fallback;
}
