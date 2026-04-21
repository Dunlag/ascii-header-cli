import figlet from "figlet";
import { ASCII_FONTS } from "../config/fonts.js";

export interface AsciiMetrics {
  lineCount: number;
  maxWidth: number;
}

export interface FontCompatibility {
  font: string;
  metrics: AsciiMetrics;
}

export function renderAsciiTitle(title: string, font: string): string {
  return figlet.textSync(title, {
    font,
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
  });
}

export function getAsciiMetrics(asciiText: string): AsciiMetrics {
  const lines = asciiText.split("\n").filter(Boolean);
  const maxWidth = lines.reduce((currentMax, line) => {
    return Math.max(currentMax, line.length);
  }, 0);

  return {
    lineCount: lines.length,
    maxWidth,
  };
}

export function getCompatibleFonts(
  title: string,
  terminalWidth: number,
): string[] {
  const safeWidth = Math.max(terminalWidth - 10, 40);

  return ASCII_FONTS.filter((font) => {
    const ascii = renderAsciiTitle(title, font);
    const metrics = getAsciiMetrics(ascii);

    return metrics.maxWidth <= safeWidth;
  });
}

export function getFontCompatibilities(
  title: string,
  terminalWidth: number,
): FontCompatibility[] {
  return ASCII_FONTS.map((font) => {
    const ascii = renderAsciiTitle(title, font);
    const metrics = getAsciiMetrics(ascii);

    return {
      font,
      metrics,
    };
  });
}
