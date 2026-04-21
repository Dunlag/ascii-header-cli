#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";
import path from "node:path";
import process from "node:process";
import { collectPromptData, confirmSave } from "./cli/prompts.js";
import { renderBanner, renderPreview, renderSummary } from "./cli/ui.js";
import { getMessages } from "./i18n/messages.js";
import { saveHeaderToFile } from "./services/fileWriter.js";
import { generateHeaderArtifact } from "./services/generateHeaderArtifact.js";
import { getAsciiMetrics } from "./services/asciiRenderer.js";
import { detectLocale } from "./utils/detectLocale.js";

async function main(): Promise<void> {
  const locale = detectLocale();
  const messages = getMessages(locale);

  console.clear();
  console.log(renderBanner(messages));

  const promptResult = await collectPromptData(messages);
  const spinner = ora({
    text: messages.generating,
    color: "yellow",
  }).start();

  const artifact = await generateHeaderArtifact({
    fields: promptResult.fields,
    font: promptResult.selectedFont,
    language: promptResult.selectedLanguage,
    outputFileName: promptResult.outputFileName,
  });
  const metrics = getAsciiMetrics(artifact.asciiTitle);

  spinner.stop();
  console.log(renderPreview(messages.previewTitle, artifact.header));
  console.log(
    renderSummary(messages.summaryTitle, [
      {
        label: messages.summaryLabels.language,
        value: `${promptResult.selectedLanguage.label} (.${promptResult.selectedLanguage.extension})`,
      },
      {
        label: messages.summaryLabels.font,
        value: promptResult.selectedFont,
      },
      {
        label: messages.summaryLabels.file,
        value: promptResult.outputFileName,
      },
      {
        label: messages.summaryLabels.width,
        value: `${metrics.maxWidth} cols`,
      },
    ]),
  );

  const shouldSave = await confirmSave(messages);

  if (!shouldSave) {
    console.log(chalk.yellow(messages.cancelledMessage));
    return;
  }

  const savedPath = await saveHeaderToFile(
    process.cwd(),
    promptResult.outputFileName,
    artifact.header,
  );

  console.log(chalk.green(messages.savedMessage(savedPath)));
  console.log(chalk.cyan(`Output: ${path.basename(savedPath)}`));
}

main().catch((error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Unexpected CLI error";

  console.error(chalk.red(message));
  process.exit(1);
});
