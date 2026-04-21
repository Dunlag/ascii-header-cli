import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function saveHeaderToFile(
  rootDirectory: string,
  fileName: string,
  content: string,
): Promise<string> {
  const outputDirectory = path.join(rootDirectory, "output");
  const outputPath = path.join(outputDirectory, fileName);

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, `${content}\n`, "utf8");

  return outputPath;
}
