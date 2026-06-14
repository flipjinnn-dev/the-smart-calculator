import "server-only";
import { readFileSync, existsSync } from "fs";
import path from "path";
import type { CalculatorSeoData } from "@/lib/calculator-seo-types";
import {
  getCalculatorStorageId,
  resolveRegistryCalculatorId,
} from "@/lib/calculator-seo";

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");
const UI_DIR = path.join(process.cwd(), "app", "content", "calculator-ui");

type SavedMetaFields = Pick<
  CalculatorSeoData,
  "metaTitle" | "metaDescription" | "keywords" | "openGraph" | "twitter"
>;

function readJsonFileSync(filePath: string): Record<string, unknown> | null {
  if (!existsSync(filePath)) return null;
  try {
    return JSON.parse(readFileSync(filePath, "utf-8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Sync SEO read for `generateMetadata` only.
 * A second `await` in metadata (e.g. cached blob/fs load) streams tags into `<body>`.
 */
export function readSavedCalculatorSeoMetaSync(
  calculatorId: string,
  language: string = "en"
): SavedMetaFields | null {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  const storageId = getCalculatorStorageId(registryId);

  const seo = readJsonFileSync(
    path.join(SEO_DIR, storageId, `${language}.json`)
  );
  if (seo?.metaTitle || seo?.metaDescription) {
    return {
      metaTitle: String(seo.metaTitle ?? "").trim(),
      metaDescription: String(seo.metaDescription ?? "").trim(),
      keywords: String(seo.keywords ?? "").trim(),
      openGraph: seo.openGraph as CalculatorSeoData["openGraph"],
      twitter: seo.twitter as CalculatorSeoData["twitter"],
    };
  }

  const ui = readJsonFileSync(path.join(UI_DIR, storageId, `${language}.json`));
  if (ui?.metaTitle || ui?.metaDescription) {
    return {
      metaTitle: String(ui.metaTitle ?? "").trim(),
      metaDescription: String(ui.metaDescription ?? "").trim(),
      keywords: String(ui.keywords ?? "").trim(),
    };
  }

  return null;
}
