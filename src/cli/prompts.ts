import { confirm, input, select } from "@inquirer/prompts";
import { ASCII_FONTS } from "../config/fonts.js";
import { LANGUAGE_OPTIONS } from "../config/languages.js";
import type { Messages } from "../i18n/messages.js";
import type { HeaderFields, PromptResult } from "../types.js";
import { getCompatibleFonts, getFontCompatibilities } from "../services/asciiRenderer.js";
import { normalizeFileName } from "../utils/normalizeFileName.js";

export async function confirmSave(messages: Messages): Promise<boolean> {
  return confirm({
    message: messages.confirmSavePrompt,
    default: true,
  });
}

async function askOptionalField(message: string): Promise<string> {
  return input({
    message,
    validate: () => true,
  });
}

export async function collectPromptData(
  messages: Messages,
): Promise<PromptResult> {
  const terminalWidth = process.stdout.columns ?? 100;
  const title = await input({
    message: messages.titlePrompt,
    validate: (value) => {
      const trimmed = value.trim();

      if (!trimmed) {
        return messages.titleValidationRequired;
      }

      if (trimmed.length > 30) {
        return messages.titleValidationLength;
      }

      if (getCompatibleFonts(trimmed, terminalWidth).length === 0) {
        return messages.titleValidationFit;
      }

      return true;
    },
  });

  const compatibleFonts = getCompatibleFonts(title.trim(), terminalWidth);
  const fontCompatibilities = getFontCompatibilities(title.trim(), terminalWidth);
  const recommendedFont =
    fontCompatibilities
      .filter((entry) => compatibleFonts.includes(entry.font))
      .sort((left, right) => left.metrics.maxWidth - right.metrics.maxWidth)[0]?.font ??
    compatibleFonts[0] ??
    "Standard";

  const selectedFont = await select({
    message: messages.fontPrompt,
    choices: ASCII_FONTS.map((font) => {
      const fits = compatibleFonts.includes(font);
      const metrics = fontCompatibilities.find((entry) => entry.font === font)?.metrics;
      const isRecommended = font === recommendedFont;
      const widthLabel = metrics ? `${metrics.maxWidth} cols` : "? cols";

      return {
        name: fits
          ? `${font}${isRecommended ? "  recommended" : ""}  ${widthLabel}`
          : `${font}  too wide  ${widthLabel}`,
        value: font,
        disabled: fits ? false : "Not recommended for the current terminal width",
      };
    }),
    default: recommendedFont,
  });

  const selectedLanguage = await select({
    message: messages.languagePrompt,
    choices: LANGUAGE_OPTIONS.map((language) => ({
      name: `${language.label} (.${language.extension})`,
      value: language,
    })),
  });

  const fields: HeaderFields = {
    title: title.trim(),
    author: await askOptionalField(messages.authorPrompt),
    version: await askOptionalField(messages.versionPrompt),
    description: await askOptionalField(messages.descriptionPrompt),
    date: await askOptionalField(messages.datePrompt),
    project: await askOptionalField(messages.projectPrompt),
    license: await askOptionalField(messages.licensePrompt),
    website: await askOptionalField(messages.websitePrompt),
  };

  const outputFileNameInput = await input({
    message: `${messages.fileNamePrompt} (.txt)`,
    default: `${fields.title.toLowerCase().replace(/\s+/g, "-")}-header`,
    validate: (value) =>
      value.trim() ? true : messages.fileNameValidation,
  });

  return {
    fields,
    selectedFont,
    selectedLanguage,
    outputFileName: normalizeFileName(outputFileNameInput),
  };
}
