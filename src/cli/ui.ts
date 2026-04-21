import boxen from "boxen";
import chalk from "chalk";
import type { Messages } from "../i18n/messages.js";
import { getCompatibleFonts, renderAsciiTitle } from "../services/asciiRenderer.js";

function pickBannerFont(title: string, width: number): string | null {
  const preferredFonts = ["Small", "Standard"];
  const compatibleFonts = getCompatibleFonts(title, width);

  return preferredFonts.find((font) => compatibleFonts.includes(font)) ?? null;
}

function renderAsciiBannerTitle(title: string): string {
  const terminalWidth = process.stdout.columns ?? 100;
  const bannerFont = pickBannerFont(title, terminalWidth);

  if (!bannerFont) {
    return chalk.bold.hex("#7CFFB2")(title);
  }

  const asciiTitle = renderAsciiTitle(title, bannerFont);
  const palette = ["#7CFFB2", "#7BDFF2", "#B2F7EF", "#FFD166"];

  return asciiTitle
    .split("\n")
    .filter(Boolean)
    .map((line, index) => chalk.hex(palette[index % palette.length])(line))
    .join("\n");
}

export function renderBanner(messages: Messages): string {
  const asciiTitle = renderAsciiBannerTitle("ASCII HEADER");
  const subtitle = chalk.bold.hex("#FFD166")(
    `${messages.appTitle}  ${messages.appSubtitle}`,
  );
  const intro = chalk.hex("#E0E0E0")(messages.intro);
  const titleHint = chalk.hex("#FF9F1C")(messages.titleHint);
  const tip = chalk.hex("#7BDFF2")(messages.tipMessage);
  const divider = chalk.hex("#2EC4B6")("=".repeat(Math.min((process.stdout.columns ?? 80) - 12, 56)));

  return boxen(
    `${asciiTitle}\n${subtitle}\n${divider}\n\n${intro}\n${titleHint}\n\n${tip}`,
    {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "cyan",
    },
  );
}

export function renderPreview(title: string, content: string): string {
  return boxen(chalk.white(content), {
    title: chalk.bold.hex("#FF9F1C")(` ${title} `),
    titleAlignment: "center",
    padding: 1,
    borderStyle: "double",
    borderColor: "yellow",
  });
}

export function renderSummary(
  title: string,
  rows: Array<{ label: string; value: string }>,
): string {
  const content = rows
    .map((row) => `${chalk.hex("#7BDFF2")(row.label)}: ${chalk.white(row.value)}`)
    .join("\n");

  return boxen(content, {
    title: chalk.bold.hex("#7CFFB2")(` ${title} `),
    titleAlignment: "center",
    padding: 1,
    borderStyle: "round",
    borderColor: "green",
  });
}
