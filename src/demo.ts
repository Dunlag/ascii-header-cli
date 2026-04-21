import chalk from "chalk";
import { LANGUAGES } from "./config/languages.js";
import { saveHeaderToFile } from "./services/fileWriter.js";
import { generateHeaderArtifact } from "./services/generateHeaderArtifact.js";

async function runDemo(): Promise<void> {
  const demoResult = await generateHeaderArtifact({
    fields: {
      title: "Mi Plugin",
      author: "Fernando",
      version: "1.0.0",
      description: "CLI de prueba",
      date: "2026-04-21",
      project: "Portfolio CLI",
      license: "MIT",
      website: "https://example.com",
    },
    font: "Standard",
    language: LANGUAGES.javascript,
    outputFileName: "mi-plugin-demo.txt",
  });
  const savedPath = await saveHeaderToFile(
    process.cwd(),
    "mi-plugin-demo.txt",
    demoResult.header,
  );

  console.log(chalk.green("Demo generated successfully.\n"));
  console.log(demoResult.header);
  console.log(chalk.cyan(`\nSaved to: ${savedPath}`));
}

runDemo().catch((error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Unexpected demo error";

  console.error(chalk.red(message));
  process.exit(1);
});
