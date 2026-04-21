export function normalizeFileName(input: string): string {
  const trimmed = input.trim();
  const withoutTxt = trimmed.replace(/\.txt$/i, "");

  return `${withoutTxt || "header"}.txt`;
}
