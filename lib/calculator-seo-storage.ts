import "server-only";
import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import type { CalculatorSeoData } from "@/lib/calculator-seo-types";

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");
const UI_DIR = path.join(process.cwd(), "app", "content", "calculator-ui");
const GUIDE_HTML_DIR = path.join(process.cwd(), "app", "content", "calculator-guide-html");
const BLOB_SEO_PREFIX = "calculator-seo";
const BLOB_UI_PREFIX = "calculator-ui";
const BLOB_GUIDE_HTML_PREFIX = "calculator-guide-html";

export type SeoStorageBackend = "filesystem" | "blob";

export function isLocalDev(): boolean {
  return !process.env.VERCEL;
}

/** Vercel may expose the token under a store-specific env name. */
export function getBlobReadWriteToken(): string | undefined {
  const direct = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (direct) return direct;

  for (const [key, value] of Object.entries(process.env)) {
    if (
      key.includes("BLOB") &&
      key.includes("READ_WRITE") &&
      typeof value === "string" &&
      value.trim()
    ) {
      return value.trim();
    }
  }
  return undefined;
}

export function blobStorageEnabled(): boolean {
  return Boolean(getBlobReadWriteToken());
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

function guideHtmlFilePath(storageId: string, language: string): string {
  return path.join(GUIDE_HTML_DIR, storageId, `${language}.json`);
}

function guideHtmlBlobPath(storageId: string, language: string): string {
  return `${BLOB_GUIDE_HTML_PREFIX}/${storageId}/${language}.json`;
}

export function getLiveSaveSetupMessage(): string {
  return (
    "Live admin save needs Vercel Blob (one-time setup): " +
    "Vercel Dashboard → your project → Storage → Create Blob → Connect → Redeploy. " +
    "Until then, save on localhost (npm run dev) and git push app/content/calculator-seo/."
  );
}

async function readBlobJson(pathname: string): Promise<string | null> {
  const token = getBlobReadWriteToken();
  if (!token) return null;

  const { head, list } = await import("@vercel/blob");

  try {
    const meta = await head(pathname, { token });
    const res = await fetch(meta.url, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (res.ok) return res.text();
  } catch {
    // try list fallback
  }

  try {
    const prefix = pathname.includes("/")
      ? `${pathname.slice(0, pathname.lastIndexOf("/") + 1)}`
      : "";
    const { blobs } = await list({ prefix, token });
    const match = blobs.find((b) => b.pathname === pathname);
    if (match?.url) {
      const res = await fetch(match.url, {
        cache: "no-store",
        next: { revalidate: 0 },
      });
      if (res.ok) return res.text();
    }
  } catch {
    // ignore
  }

  return null;
}

async function writeBlobJson(pathname: string, body: string): Promise<void> {
  const token = getBlobReadWriteToken();
  if (!token) throw new Error(getLiveSaveSetupMessage());

  const { put } = await import("@vercel/blob");
  await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    token,
    allowOverwrite: true,
  });
}

/** On Vercel with Blob, bundled repo JSON is stale after admin saves — skip it. */
function shouldReadFilesystemFallback(): boolean {
  return isLocalDev() || !blobStorageEnabled();
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

  if (!shouldReadFilesystemFallback()) return null;

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
  let ui: Record<string, unknown> | null = null;

  const blobUi = await readBlobJson(uiBlobPath(storageId, language));
  if (blobUi) {
    try {
      ui = JSON.parse(blobUi) as Record<string, unknown>;
    } catch {
      return;
    }
  } else if (shouldReadFilesystemFallback()) {
    try {
      const raw = await readFile(uiFilePath(storageId, language), "utf-8");
      ui = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return;
    }
  }

  if (!ui) return;

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

export async function writeCalculatorGuideHtmlFile(
  storageId: string,
  language: string,
  html: string
): Promise<void> {
  const json = `${JSON.stringify({ html }, null, 2)}\n`;

  if (isLocalDev()) {
    const dir = path.join(GUIDE_HTML_DIR, storageId);
    await mkdir(dir, { recursive: true });
    await writeFile(guideHtmlFilePath(storageId, language), json, "utf-8");
    return;
  }

  if (blobStorageEnabled()) {
    await writeBlobJson(guideHtmlBlobPath(storageId, language), json);
  }
}

export async function readCalculatorGuideHtmlFile(
  storageId: string,
  language: string
): Promise<string | null> {
  const blobRaw = await readBlobJson(guideHtmlBlobPath(storageId, language));
  if (blobRaw) {
    try {
      const parsed = JSON.parse(blobRaw) as { html?: string };
      if (typeof parsed.html === "string" && parsed.html.trim()) {
        return parsed.html;
      }
    } catch {
      // fall through
    }
  }

  if (!shouldReadFilesystemFallback()) return null;

  try {
    const raw = await readFile(guideHtmlFilePath(storageId, language), "utf-8");
    const parsed = JSON.parse(raw) as { html?: string };
    return typeof parsed.html === "string" && parsed.html.trim() ? parsed.html : null;
  } catch {
    return null;
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

  if (!shouldReadFilesystemFallback()) return null;

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

  const token = getBlobReadWriteToken();
  if (token) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({
        prefix: `${BLOB_SEO_PREFIX}/`,
        token,
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
