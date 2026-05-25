import "server-only";
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import type { CalculatorSeoData } from "@/lib/calculator-seo-types";

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");

function seoFilePath(storageId: string, language: string): string {
  return path.join(SEO_DIR, storageId, `${language}.json`);
}

export async function readCalculatorSeoFile(
  storageId: string,
  language: string
): Promise<CalculatorSeoData | null> {
  try {
    const raw = await readFile(seoFilePath(storageId, language), "utf-8");
    return JSON.parse(raw) as CalculatorSeoData;
  } catch {
    return null;
  }
}

/** Write SEO JSON directly under app/content/calculator-seo/ */
export async function writeCalculatorSeoFile(
  storageId: string,
  language: string,
  data: CalculatorSeoData
): Promise<void> {
  const dir = path.join(SEO_DIR, storageId);
  try {
    await mkdir(dir, { recursive: true });
    await writeFile(
      seoFilePath(storageId, language),
      `${JSON.stringify(data, null, 2)}\n`,
      "utf-8"
    );
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT" || err.code === "EROFS" || process.env.VERCEL) {
      throw new Error(
        "Cannot write files on the live server (read-only disk). " +
          "Save from localhost: npm run dev → admin → Save → git commit app/content/calculator-seo/ → deploy."
      );
    }
    throw e;
  }
}

export async function listSavedSeoStorageIds(): Promise<Set<string>> {
  const ids = new Set<string>();
  try {
    const entries = await readdir(SEO_DIR, { withFileTypes: true });
    for (const e of entries.filter((d) => d.isDirectory())) {
      ids.add(e.name);
    }
  } catch {
    // directory may not exist yet
  }
  return ids;
}
