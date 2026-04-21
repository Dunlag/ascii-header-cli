import type { HeaderFields, LanguageConfig } from "../types.js";

const LABEL_ORDER: Array<keyof Omit<HeaderFields, "title">> = [
  "author",
  "version",
  "description",
  "date",
  "project",
  "license",
  "website",
];

const LABELS: Record<typeof LABEL_ORDER[number], string> = {
  author: "Author",
  version: "Version",
  description: "Description",
  date: "Date",
  project: "Project",
  license: "License",
  website: "Website",
};

function buildMetadataLines(fields: HeaderFields): string[] {
  return LABEL_ORDER.flatMap((key) => {
    const value = fields[key].trim();

    return value ? [`${LABELS[key]}: ${value}`] : [];
  });
}

function padLine(line: string, width: number): string {
  return line.padEnd(width, " ");
}

function centerLine(line: string, width: number): string {
  if (line.length >= width) {
    return line;
  }

  const totalPadding = width - line.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;

  return `${" ".repeat(leftPadding)}${line}${" ".repeat(rightPadding)}`;
}

function buildFramedBody(asciiTitle: string, metadataLines: string[]): string[] {
  const asciiLines = asciiTitle.split("\n").filter(Boolean);
  const titleTag = "[ ASCII HEADER ]";
  const contentWidth = Math.max(
    titleTag.length,
    ...asciiLines.map((line) => line.length),
    ...metadataLines.map((line) => line.length),
    24,
  );

  const topBorder = `+${"-".repeat(contentWidth + 2)}+`;
  const titleRow = `| ${centerLine(titleTag, contentWidth)} |`;
  const separator = `| ${"-".repeat(contentWidth)} |`;
  const blankRow = `| ${" ".repeat(contentWidth)} |`;

  const asciiRows = asciiLines.map((line) => `| ${padLine(line, contentWidth)} |`);
  const metadataRows = metadataLines.map(
    (line) => `| ${padLine(line, contentWidth)} |`,
  );

  return [
    topBorder,
    titleRow,
    separator,
    ...asciiRows,
    blankRow,
    ...metadataRows,
    topBorder,
  ];
}

function buildLineCommentHeader(
  asciiTitle: string,
  metadataLines: string[],
  linePrefix: string,
): string {
  const framedBody = buildFramedBody(asciiTitle, metadataLines);

  return framedBody.map((line) => `${linePrefix} ${line}`).join("\n");
}

function buildBlockCommentHeader(
  asciiTitle: string,
  metadataLines: string[],
  config: LanguageConfig,
): string {
  const framedBody = buildFramedBody(asciiTitle, metadataLines);
  const linePrefix = config.blockLinePrefix ?? " *";

  const body = framedBody.map((line) => `${linePrefix} ${line}`);

  return [config.blockStart, ...body, config.blockEnd].join("\n");
}

export function buildHeader(
  fields: HeaderFields,
  asciiTitle: string,
  language: LanguageConfig,
): string {
  const metadataLines = buildMetadataLines(fields);

  if (language.commentStyle === "line" && language.linePrefix) {
    return buildLineCommentHeader(asciiTitle, metadataLines, language.linePrefix);
  }

  return buildBlockCommentHeader(asciiTitle, metadataLines, language);
}
