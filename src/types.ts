export type Locale = "en" | "es";

export type SupportedLanguageKey =
  | "javascript"
  | "typescript"
  | "python"
  | "php"
  | "java"
  | "c"
  | "cpp"
  | "shell"
  | "html"
  | "css";

export interface HeaderFields {
  title: string;
  author: string;
  version: string;
  description: string;
  date: string;
  project: string;
  license: string;
  website: string;
}

export interface LanguageConfig {
  key: SupportedLanguageKey;
  label: string;
  extension: string;
  commentStyle: "line" | "block" | "html";
  linePrefix?: string;
  blockStart?: string;
  blockLinePrefix?: string;
  blockEnd?: string;
}

export interface PromptResult {
  fields: HeaderFields;
  selectedLanguage: LanguageConfig;
  selectedFont: string;
  outputFileName: string;
}
