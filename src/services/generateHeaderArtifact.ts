import process from "node:process";
import type { HeaderFields, LanguageConfig } from "../types.js";
import { renderAsciiTitle } from "./asciiRenderer.js";
import { buildHeader } from "./headerBuilder.js";

export interface GenerateHeaderArtifactInput {
  fields: HeaderFields;
  font: string;
  language: LanguageConfig;
  outputFileName: string;
}

export interface GenerateHeaderArtifactResult {
  asciiTitle: string;
  header: string;
}

export async function generateHeaderArtifact(
  input: GenerateHeaderArtifactInput,
): Promise<GenerateHeaderArtifactResult> {
  const asciiTitle = renderAsciiTitle(input.fields.title, input.font);
  const header = buildHeader(input.fields, asciiTitle, input.language);

  return {
    asciiTitle,
    header,
  };
}
