import "server-only";
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import type { CalculatorSeoData } from "@/lib/calculator-seo-types";

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");
const BLOB_PREFIX = "calculator-seo";

export function blobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

/** Local dev: write JSON into repo. Vercel: read-only except Blob. */
export function filesystemWritesEnabled(): boolean {
  return !process.env.VERCEL;
}

function seoFilePath(storageId: string, language: string): string {
  return path.join(SEO_DIR, storageId, `${language}.json`);
}

function blobPathname(storageId: string, language: string): string {
  return `${BLOB_PREFIX}/${storageId}/${language}.json`;
}

export function getProductionSaveErrorMessage(): string {
  return (
    "Cannot save on production without Vercel Blob. " +
    "Vercel → Storage → Create Blob → connect to this project → redeploy. " +
    "Or save locally (npm run dev), commit app/content/calculator-seo/, and deploy."
  );
}

async function readFromFilesystem(
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

async function readFromBlob(
  storageId: string,
  language: string
): Promise<CalculatorSeoData | null> {
  if (!blobStorageEnabled()) return null;

  const { head } = await import("@vercel/blob");
  try {
    const meta = await head(blobPathname(storageId, language), {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(meta.url);
    if (!res.ok) return null;
    return JSON.parse(await res.text()) as CalculatorSeoData;
  } catch {
    return null;
  }
}

/** Production overrides: Blob, then committed repo files. */
export async function readCalculatorSeoFile(
  storageId: string,
  language: string
): Promise<CalculatorSeoData | null> {
  const fromBlob = await readFromBlob(storageId, language);
  if (fromBlob) return fromBlob;
  return readFromFilesystem(storageId, language);
}

async function writeToFilesystem(
  storageId: string,
  language: string,
  data: CalculatorSeoData
): Promise<void> {
  const dir = path.join(SEO_DIR, storageId);
  await mkdir(dir, { recursive: true });
  await writeFile(
    seoFilePath(storageId, language),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf-8"
  );
}

async function writeToBlob(
  storageId: string,
  language: string,
  data: CalculatorSeoData
): Promise<void> {
  if (!blobStorageEnabled()) {
    throw new Error("Blob token missing");
  }

  const { put } = await import("@vercel/blob");
  await put(blobPathname(storageId, language), JSON.stringify(data, null, 2) + "\n", {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true,
  });
}

export async function writeCalculatorSeoFile(
  storageId: string,
  language: string,
  data: CalculatorSeoData
): Promise<"filesystem" | "blob"> {
  if (filesystemWritesEnabled()) {
    await writeToFilesystem(storageId, language, data);
    return "filesystem";
  }

  if (blobStorageEnabled()) {
    await writeToBlob(storageId, language, data);
    return "blob";
  }

  throw new Error(getProductionSaveErrorMessage());
}

export async function listSavedSeoStorageIds(): Promise<Set<string>> {
  const ids = new Set<string>();

  try {
    const entries = await readdir(SEO_DIR, { withFileTypes: true });
    for (const e of entries.filter((d) => d.isDirectory())) {
      ids.add(e.name);
    }
  } catch {
    // no committed SEO dir
  }

  if (blobStorageEnabled()) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({
        prefix: `${BLOB_PREFIX}/`,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      for (const blob of blobs) {
        const match = blob.pathname.match(
          /^calculator-seo\/([^/]+)\/[^/]+\.json$/
        );
        if (match?.[1]) ids.add(match[1]);
      }
    } catch {
      // ignore
    }
  }

  return ids;
}
