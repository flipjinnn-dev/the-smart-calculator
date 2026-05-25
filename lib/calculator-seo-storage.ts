import "server-only";
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import type { CalculatorSeoData } from "@/lib/calculator-seo-types";

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");
const UI_DIR = path.join(process.cwd(), "app", "content", "calculator-ui");
const BLOB_SEO_PREFIX = "calculator-seo";
const BLOB_UI_PREFIX = "calculator-ui";

export type SeoStorageBackend = "filesystem" | "blob";

export function isLocalDev(): boolean {
  return !process.env.VERCEL;
}

export function blobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function seoFilePath(storageId: string, language: string): string {
  return path.join(SEO_DIR, storageId, `${language}.json`);
}

function uiFilePath(storageId: string, language: string): string {
  return path.join(UI_DIR, storageId, `${language}.json`);
}

function seoBlobPath(storageId: string, language: string): string {
  return `${BLOB_SEO_PREFIX}/${storageId}/${language}.json`;
}

function uiBlobPath(storageId: string, language: string): string {
  return `${BLOB_UI_PREFIX}/${storageId}/${language}.json`;
}

export function getLiveSaveSetupMessage(): string {
  return (
    "Live admin save needs Vercel Blob (one-time setup): " +
    "Vercel Dashboard → your project → Storage → Create Blob → Connect → Redeploy. " +
    "Until then, save on localhost (npm run dev) and git push app/content/calculator-seo/."
  );
}

async function readBlobJson(pathname: string): Promise<string | null> {
  if (!blobStorageEnabled()) return null;
  const { head } = await import("@vercel/blob");
  try {
    const meta = await head(pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

async function writeBlobJson(pathname: string, body: string): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true,
  });
}

export async function readCalculatorSeoFile(
  storageId: string,
  language: string
): Promise<CalculatorSeoData | null> {
  const blobRaw = await readBlobJson(seoBlobPath(storageId, language));
  if (blobRaw) {
    try {
      return JSON.parse(blobRaw) as CalculatorSeoData;
    } catch {
      // fall through
    }
  }

  try {
    const raw = await readFile(seoFilePath(storageId, language), "utf-8");
    return JSON.parse(raw) as CalculatorSeoData;
  } catch {
    return null;
  }
}

export async function writeCalculatorSeoFile(
  storageId: string,
  language: string,
  data: CalculatorSeoData
): Promise<SeoStorageBackend> {
  const json = `${JSON.stringify(data, null, 2)}\n`;

  if (isLocalDev()) {
    const dir = path.join(SEO_DIR, storageId);
    await mkdir(dir, { recursive: true });
    await writeFile(seoFilePath(storageId, language), json, "utf-8");
    return "filesystem";
  }

  if (blobStorageEnabled()) {
    await writeBlobJson(seoBlobPath(storageId, language), json);
    return "blob";
  }

  throw new Error(getLiveSaveSetupMessage());
}

/** Update calculator-ui JSON (local file or blob on production). */
export async function writeCalculatorUiFile(
  storageId: string,
  language: string,
  pageTitle: string,
  pageDescription: string
): Promise<void> {
  let ui: Record<string, unknown>;
  const blobUi = await readBlobJson(uiBlobPath(storageId, language));
  if (blobUi) {
    try {
      ui = JSON.parse(blobUi) as Record<string, unknown>;
    } catch {
      return;
    }
  } else {
    try {
      const raw = await readFile(uiFilePath(storageId, language), "utf-8");
      ui = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return;
    }
  }

  if ("pageTitle" in ui) {
    ui.pageTitle = pageTitle;
    ui.pageDescription = pageDescription;
  } else {
    ui.title = pageTitle;
    ui.description = pageDescription;
  }

  const json = `${JSON.stringify(ui, null, 2)}\n`;

  if (isLocalDev()) {
    await writeFile(uiFilePath(storageId, language), json, "utf-8");
    return;
  }

  if (blobStorageEnabled()) {
    await writeBlobJson(uiBlobPath(storageId, language), json);
  }
}

export async function readCalculatorUiFile(
  storageId: string,
  language: string
): Promise<Record<string, unknown> | null> {
  const blobRaw = await readBlobJson(uiBlobPath(storageId, language));
  if (blobRaw) {
    try {
      return JSON.parse(blobRaw) as Record<string, unknown>;
    } catch {
      // fall through
    }
  }

  try {
    const raw = await readFile(uiFilePath(storageId, language), "utf-8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
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
    // ignore
  }

  if (blobStorageEnabled()) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({
        prefix: `${BLOB_SEO_PREFIX}/`,
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
