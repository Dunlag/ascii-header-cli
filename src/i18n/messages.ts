import type { Locale } from "../types.js";

export interface Messages {
  appTitle: string;
  appSubtitle: string;
  intro: string;
  titleHint: string;
  titlePrompt: string;
  titleValidationRequired: string;
  titleValidationLength: string;
  titleValidationFit: string;
  fontPrompt: string;
  languagePrompt: string;
  authorPrompt: string;
  versionPrompt: string;
  descriptionPrompt: string;
  datePrompt: string;
  projectPrompt: string;
  licensePrompt: string;
  websitePrompt: string;
  fileNamePrompt: string;
  fileNameValidation: string;
  generating: string;
  previewTitle: string;
  summaryTitle: string;
  summaryLabels: {
    language: string;
    font: string;
    file: string;
    width: string;
  };
  confirmSavePrompt: string;
  cancelledMessage: string;
  savedMessage: (path: string) => string;
  tipMessage: string;
}

const es: Messages = {
  appTitle: "ASCII Header CLI",
  appSubtitle: "Genera cabeceras de codigo con arte ASCII",
  intro:
    "Crea una cabecera visual reutilizable para tus archivos con un flujo guiado en terminal.",
  titleHint: "Consejo: usa titulos cortos para que el ASCII respire mejor en terminal.",
  titlePrompt: "Titulo principal",
  titleValidationRequired: "El titulo es obligatorio.",
  titleValidationLength: "El titulo no puede superar los 30 caracteres.",
  titleValidationFit:
    "Ese titulo no cabe bien en esta terminal con las fuentes disponibles. Acortalo un poco.",
  fontPrompt: "Elige una fuente ASCII",
  languagePrompt: "Elige el lenguaje objetivo",
  authorPrompt: "Autor",
  versionPrompt: "Version",
  descriptionPrompt: "Descripcion",
  datePrompt: "Fecha",
  projectPrompt: "Proyecto",
  licensePrompt: "Licencia",
  websitePrompt: "Website",
  fileNamePrompt: "Nombre del archivo de salida",
  fileNameValidation: "El nombre del archivo no puede estar vacio.",
  generating: "Generando cabecera...",
  previewTitle: "Vista previa",
  summaryTitle: "Resumen",
  summaryLabels: {
    language: "Lenguaje",
    font: "Fuente",
    file: "Archivo",
    width: "Ancho ASCII",
  },
  confirmSavePrompt: "¿Quieres guardar esta cabecera en disco?",
  cancelledMessage: "Guardado cancelado. La vista previa sigue siendo valida.",
  savedMessage: (path: string) => `Archivo guardado en: ${path}`,
  tipMessage:
    "Los campos vacios no se muestran. El archivo se guarda como texto para copiarlo donde quieras.",
};

const en: Messages = {
  appTitle: "ASCII Header CLI",
  appSubtitle: "Generate code headers with ASCII art",
  intro:
    "Build a reusable visual header for your files with a guided terminal workflow.",
  titleHint: "Tip: shorter titles usually render better as ASCII inside the terminal.",
  titlePrompt: "Main title",
  titleValidationRequired: "The title is required.",
  titleValidationLength: "The title cannot exceed 30 characters.",
  titleValidationFit:
    "That title does not fit this terminal well with the available fonts. Try a shorter one.",
  fontPrompt: "Choose an ASCII font",
  languagePrompt: "Choose the target language",
  authorPrompt: "Author",
  versionPrompt: "Version",
  descriptionPrompt: "Description",
  datePrompt: "Date",
  projectPrompt: "Project",
  licensePrompt: "License",
  websitePrompt: "Website",
  fileNamePrompt: "Output file name",
  fileNameValidation: "The file name cannot be empty.",
  generating: "Generating header...",
  previewTitle: "Preview",
  summaryTitle: "Summary",
  summaryLabels: {
    language: "Language",
    font: "Font",
    file: "File",
    width: "ASCII width",
  },
  confirmSavePrompt: "Do you want to save this header to disk?",
  cancelledMessage: "Save cancelled. The preview is still valid.",
  savedMessage: (path: string) => `File saved to: ${path}`,
  tipMessage:
    "Empty fields are omitted. The file is saved as plain text so you can paste it anywhere.",
};

export function getMessages(locale: Locale): Messages {
  return locale === "es" ? es : en;
}
