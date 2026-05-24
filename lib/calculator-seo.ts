import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import { calculatorsMeta } from "@/meta/calculators";
import {
  calculators,
  getCalculatorFileName,
  CATEGORY_DISPLAY_NAMES,
} from "@/lib/calculator-data";

export type CalculatorSeoData = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  pageTitle: string;
  pageDescription: string;
  canonical?: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    siteName?: string;
  };
  twitter: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
  schema: Record<string, unknown>;
};

export type CalculatorSeoListItem = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  publicPath: string;
  hasSeoFile: boolean;
};

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");
const UI_DIR = path.join(process.cwd(), "app", "content", "calculator-ui");

export function getCalculatorStorageId(calculatorId: string): string {
  return getCalculatorFileName(calculatorId);
}

export function isAdminCalculatorId(calculatorId: string): boolean {
  return calculators.some((c) => c.id === calculatorId);
}

export function getCalculatorById(calculatorId: string) {
  return calculators.find((c) => c.id === calculatorId);
}

export function getCalculatorAdminCategories(): { id: string; label: string }[] {
  const ids = [...new Set(calculators.map((c) => c.category))].sort();
  return ids.map((id) => ({
    id,
    label: CATEGORY_DISPLAY_NAMES[id] ?? id,
  }));
}

function seoFilePath(storageId: string, language: string): string {
  return path.join(SEO_DIR, storageId, `${language}.json`);
}

async function getSavedSeoStorageIds(): Promise<Set<string>> {
  try {
    const entries = await readdir(SEO_DIR, { withFileTypes: true });
    return new Set(
      entries.filter((e) => e.isDirectory()).map((e) => e.name)
    );
  } catch {
    return new Set();
  }
}

export async function getCalculatorSeoListItems(): Promise<CalculatorSeoListItem[]> {
  const savedIds = await getSavedSeoStorageIds();

  return calculators
    .map((calc) => {
      const storageId = getCalculatorStorageId(calc.id);
      return {
        id: calc.id,
        name: calc.name,
        category: calc.category,
        categoryLabel: CATEGORY_DISPLAY_NAMES[calc.category] ?? calc.category,
        publicPath: getCanonicalUrl(calc.id, "en"),
        hasSeoFile: savedIds.has(storageId),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function readUiHero(
  storageId: string
): Promise<{ pageTitle: string; pageDescription: string } | null> {
  try {
    const raw = await readFile(path.join(UI_DIR, storageId, "en.json"), "utf-8");
    const ui = JSON.parse(raw) as Record<string, string>;
    const pageTitle = ui.pageTitle ?? ui.title ?? "";
    const pageDescription = ui.pageDescription ?? ui.description ?? "";
    if (!pageTitle && !pageDescription) return null;
    return { pageTitle, pageDescription };
  } catch {
    return null;
  }
}

function buildDefaultSchema(
  calculatorId: string,
  pageTitle: string,
  canonicalUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        name: pageTitle,
        url: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: pageTitle,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}

export function buildDefaultCalculatorSeo(
  calculatorId: string
): CalculatorSeoData | null {
  const calc = getCalculatorById(calculatorId);
  if (!calc) return null;

  const meta = calculatorsMeta[calculatorId]?.en;
  const canonicalUrl = getCanonicalUrl(calculatorId, "en");
  const metaTitle = meta?.title?.trim() || calc.name;
  const metaDescription =
    meta?.description?.trim() || calc.description || metaTitle;
  const keywords = meta?.keywords?.trim() || "";

  return {
    metaTitle,
    metaDescription,
    keywords,
    pageTitle: calc.name,
    pageDescription: calc.description || metaDescription,
    canonical: canonicalUrl,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      image: "/og-image.png",
      siteName: "Smart Calculator",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      image: "/og-image.png",
    },
    schema: buildDefaultSchema(calculatorId, calc.name, canonicalUrl),
  };
}

export async function loadCalculatorSeo(
  calculatorId: string,
  language: string = "en"
): Promise<CalculatorSeoData | null> {
  if (!isAdminCalculatorId(calculatorId)) {
    return null;
  }
  const storageId = getCalculatorStorageId(calculatorId);
  try {
    const raw = await readFile(seoFilePath(storageId, language), "utf-8");
    return JSON.parse(raw) as CalculatorSeoData;
  } catch {
    return null;
  }
}

/** Load saved SEO file, or build defaults from meta + calculator-ui + registry. */
export async function loadOrBuildCalculatorSeo(
  calculatorId: string,
  language: string = "en"
): Promise<CalculatorSeoData | null> {
  const saved = await loadCalculatorSeo(calculatorId, language);
  if (saved) {
    const storageId = getCalculatorStorageId(calculatorId);
    const uiHero = await readUiHero(storageId);
    if (uiHero) {
      return {
        ...saved,
        pageTitle: saved.pageTitle || uiHero.pageTitle,
        pageDescription: saved.pageDescription || uiHero.pageDescription,
      };
    }
    return saved;
  }

  const defaults = buildDefaultCalculatorSeo(calculatorId);
  if (!defaults) return null;

  const storageId = getCalculatorStorageId(calculatorId);
  const uiHero = await readUiHero(storageId);
  if (uiHero) {
    return {
      ...defaults,
      pageTitle: uiHero.pageTitle || defaults.pageTitle,
      pageDescription: uiHero.pageDescription || defaults.pageDescription,
    };
  }
  return defaults;
}

export async function saveCalculatorSeo(
  calculatorId: string,
  language: string,
  data: CalculatorSeoData
): Promise<void> {
  if (!isAdminCalculatorId(calculatorId)) {
    throw new Error("Unknown calculator");
  }
  const storageId = getCalculatorStorageId(calculatorId);
  const dir = path.join(SEO_DIR, storageId);
  await mkdir(dir, { recursive: true });
  await writeFile(
    seoFilePath(storageId, language),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf-8"
  );
}

/** Sync on-page hero fields into calculator-ui JSON (English). */
export async function syncCalculatorUiFromSeo(
  calculatorId: string,
  pageTitle: string,
  pageDescription: string
): Promise<void> {
  const storageId = getCalculatorStorageId(calculatorId);
  const uiPath = path.join(UI_DIR, storageId, "en.json");
  let ui: Record<string, unknown>;
  try {
    const raw = await readFile(uiPath, "utf-8");
    ui = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return;
  }

  if ("pageTitle" in ui) {
    ui.pageTitle = pageTitle;
    ui.pageDescription = pageDescription;
  } else {
    ui.title = pageTitle;
    ui.description = pageDescription;
  }

  await writeFile(uiPath, `${JSON.stringify(ui, null, 2)}\n`, "utf-8");
}

export function buildMetadataFromSeo(
  calculatorId: string,
  language: string,
  seo: CalculatorSeoData
): Metadata {
  const canonicalUrl =
    seo.canonical?.trim() || getCanonicalUrl(calculatorId, language);

  const ogImage = seo.openGraph.image || "/og-image.png";

  return {
    metadataBase: new URL("https://www.thesmartcalculator.com"),
    title: { absolute: seo.metaTitle },
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": getCanonicalUrl(calculatorId, "en"),
        en: getCanonicalUrl(calculatorId, "en"),
        es: getCanonicalUrl(calculatorId, "es"),
        "pt-BR": getCanonicalUrl(calculatorId, "br"),
        pl: getCanonicalUrl(calculatorId, "pl"),
        de: getCanonicalUrl(calculatorId, "de"),
      },
    },
    openGraph: {
      title: seo.openGraph.title || seo.metaTitle,
      description: seo.openGraph.description || seo.metaDescription,
      type: "website",
      url: canonicalUrl,
      siteName: seo.openGraph.siteName || "Smart Calculator",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.openGraph.title || seo.metaTitle,
        },
      ],
    },
    twitter: {
      card: seo.twitter.card || "summary_large_image",
      title: seo.twitter.title || seo.metaTitle,
      description: seo.twitter.description || seo.metaDescription,
      images: [seo.twitter.image || ogImage],
    },
  };
}
