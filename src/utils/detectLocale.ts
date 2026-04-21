import type { Locale } from "../types.js";

export function detectLocale(): Locale {
  const localeCandidates = [
    Intl.DateTimeFormat().resolvedOptions().locale,
    process.env.LC_ALL,
    process.env.LC_MESSAGES,
    process.env.LANG,
    process.env.LANGUAGE,
  ].filter(Boolean) as string[];

  const normalized = localeCandidates.join(" ").toLowerCase();

  return normalized.includes("es") ? "es" : "en";
}
