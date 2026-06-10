import { readFile } from "fs/promises";
import path from "path";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import { resolveCalculatorMetaKey } from "@/lib/calculator-meta-key";
import { calculatorsMeta } from "@/meta/calculators";
import {
  calculators,
  getCalculatorFileName,
  CATEGORY_DISPLAY_NAMES,
} from "@/lib/calculator-data";
import {
  readCalculatorSeoFile,
  readCalculatorUiFile,
  writeCalculatorSeoFile,
  writeCalculatorUiFile,
  writeCalculatorGuideHtmlFile,
  readCalculatorGuideHtmlFile,
  listSavedSeoStorageIds,
  type SeoStorageBackend,
} from "@/lib/calculator-seo-storage";
import { resolveGuideHtmlFromJson } from "@/lib/load-calculator-guide";
import {
  firstMeaningfulGuideHtml,
  isMeaningfulGuideHtml,
} from "@/lib/calculator-guide-html-utils";

export type { CalculatorSeoData, CalculatorSeoListItem } from "@/lib/calculator-seo-types";
import type { CalculatorSeoData, CalculatorSeoListItem } from "@/lib/calculator-seo-types";

const SEO_DIR = path.join(process.cwd(), "app", "content", "calculator-seo");
const UI_DIR = path.join(process.cwd(), "app", "content", "calculator-ui");

export function getCalculatorStorageId(calculatorId: string): string {
  return getCalculatorFileName(calculatorId);
}

export function isAdminCalculatorId(calculatorId: string): boolean {
  return calculators.some((c) => c.id === calculatorId);
}

/** Map layout/meta ids (e.g. `age-calculator`) to admin registry ids (e.g. `age`). */
export function resolveRegistryCalculatorId(calculatorId: string): string {
  if (isAdminCalculatorId(calculatorId)) {
    return calculatorId;
  }
  const byStorage = calculators.find(
    (c) => getCalculatorFileName(c.id) === calculatorId
  );
  return byStorage?.id ?? calculatorId;
}

export function getCalculatorById(calculatorId: string) {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  return calculators.find((c) => c.id === registryId);
}

export function getCalculatorAdminCategories(): { id: string; label: string }[] {
  const ids = [...new Set(calculators.map((c) => c.category))].sort();
  return ids.map((id) => ({
    id,
    label: CATEGORY_DISPLAY_NAMES[id] ?? id,
  }));
}

export async function getCalculatorSeoListItems(): Promise<CalculatorSeoListItem[]> {
  const savedIds = await listSavedSeoStorageIds();

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

function escapeHtmlText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function firstNonEmpty(...values: (string | undefined | null)[]): string {
  for (const value of values) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

function heroFromUiRecord(
  ui: Record<string, unknown> | null
): { pageTitle: string; pageDescription: string } | null {
  if (!ui) return null;
  const pageTitle = firstNonEmpty(
    String(ui.pageTitle ?? ""),
    String(ui.title ?? ""),
    String(ui.calculatorTitle ?? ""),
    String(ui.heroTitle ?? "")
  );
  const pageDescription = firstNonEmpty(
    String(ui.pageDescription ?? ""),
    String(ui.description ?? ""),
    String(ui.calculatorDescription ?? ""),
    String(ui.heroDescription ?? "")
  );
  if (!pageTitle && !pageDescription) return null;
  return { pageTitle, pageDescription };
}

async function readUiHero(
  storageId: string
): Promise<{ pageTitle: string; pageDescription: string } | null> {
  const fromStorage = heroFromUiRecord(await readCalculatorUiFile(storageId, "en"));
  if (fromStorage) return fromStorage;

  try {
    const ui = (
      await import(`@/app/content/calculator-ui/${storageId}/en.json`)
    ).default as Record<string, unknown>;
    return heroFromUiRecord(ui);
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

  const meta = calculatorsMeta[resolveCalculatorMetaKey(calculatorId)]?.en;
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
  const registryId = resolveRegistryCalculatorId(calculatorId);
  if (!isAdminCalculatorId(registryId)) {
    return null;
  }
  const storageId = getCalculatorStorageId(registryId);
  const saved = await readCalculatorSeoFile(storageId, language);
  const guideHtml = firstMeaningfulGuideHtml(
    saved?.guideHtml,
    await readCalculatorGuideHtmlFile(storageId, language)
  );

  if (saved) {
    return guideHtml ? { ...saved, guideHtml } : saved;
  }

  if (guideHtml) {
    const defaults = buildDefaultCalculatorSeo(registryId);
    return defaults ? { ...defaults, guideHtml } : null;
  }

  return null;
}

/** Load saved SEO file, or build defaults from meta + calculator-ui + registry. */
export async function loadOrBuildCalculatorSeo(
  calculatorId: string,
  language: string = "en"
): Promise<CalculatorSeoData | null> {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  const saved = await loadCalculatorSeo(registryId, language);
  const storageId = getCalculatorStorageId(registryId);

  let guideHtml = firstMeaningfulGuideHtml(
    saved?.guideHtml,
    await loadSavedCalculatorGuideHtml(registryId, language)
  );
  if (!isMeaningfulGuideHtml(guideHtml) && language === "en") {
    guideHtml = await resolveGuideHtmlFromJson(registryId, language);
  }

  const defaults = buildDefaultCalculatorSeo(registryId);

  if (saved) {
    const uiHero = await readUiHero(storageId);
    return {
      ...saved,
      metaTitle: firstNonEmpty(saved.metaTitle, defaults?.metaTitle),
      metaDescription: firstNonEmpty(saved.metaDescription, defaults?.metaDescription),
      keywords: firstNonEmpty(saved.keywords, defaults?.keywords),
      pageTitle: firstNonEmpty(saved.pageTitle, uiHero?.pageTitle, defaults?.pageTitle),
      pageDescription: firstNonEmpty(
        saved.pageDescription,
        uiHero?.pageDescription,
        defaults?.pageDescription
      ),
      guideHtml: firstMeaningfulGuideHtml(
        saved.guideHtml,
        guideHtml,
        defaults?.metaDescription
          ? `<p>${escapeHtmlText(defaults.metaDescription)}</p>`
          : ""
      ),
    };
  }

  if (!defaults) return null;

  const uiHero = await readUiHero(storageId);
  const fallbackGuideHtml = firstMeaningfulGuideHtml(
    guideHtml,
    defaults.metaDescription
      ? `<p>${escapeHtmlText(defaults.metaDescription)}</p>`
      : ""
  );

  return {
    ...defaults,
    guideHtml: fallbackGuideHtml,
    pageTitle: firstNonEmpty(uiHero?.pageTitle, defaults.pageTitle),
    pageDescription: firstNonEmpty(uiHero?.pageDescription, defaults.pageDescription),
  };
}

export async function saveCalculatorSeo(
  calculatorId: string,
  language: string,
  data: CalculatorSeoData
): Promise<SeoStorageBackend> {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  if (!isAdminCalculatorId(registryId)) {
    throw new Error("Unknown calculator");
  }
  const storageId = getCalculatorStorageId(registryId);
  return writeCalculatorSeoFile(storageId, language, data);
}

/** Persist guide HTML to dedicated storage (local file or Vercel Blob). */
export async function syncCalculatorGuideHtml(
  calculatorId: string,
  guideHtml: string
): Promise<void> {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  const storageId = getCalculatorStorageId(registryId);
  try {
    await writeCalculatorGuideHtmlFile(storageId, "en", guideHtml);
  } catch (e) {
    console.error("syncCalculatorGuideHtml:", e);
  }
}

/** Resolve saved guide HTML from SEO file or guide-html storage. */
export async function loadSavedCalculatorGuideHtml(
  calculatorId: string,
  language: string = "en"
): Promise<string | null> {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  if (!isAdminCalculatorId(registryId)) return null;
  const storageId = getCalculatorStorageId(registryId);

  const seo = await readCalculatorSeoFile(storageId, language);
  if (isMeaningfulGuideHtml(seo?.guideHtml)) {
    return seo!.guideHtml!.trim();
  }

  const fromGuideFile = await readCalculatorGuideHtmlFile(storageId, language);
  return isMeaningfulGuideHtml(fromGuideFile) ? fromGuideFile : null;
}

/** Sync on-page hero fields into calculator-ui JSON (English). */
export async function syncCalculatorUiFromSeo(
  calculatorId: string,
  pageTitle: string,
  pageDescription: string
): Promise<void> {
  const registryId = resolveRegistryCalculatorId(calculatorId);
  const storageId = getCalculatorStorageId(registryId);
  try {
    await writeCalculatorUiFile(storageId, "en", pageTitle, pageDescription);
  } catch (e) {
    console.error("syncCalculatorUiFromSeo:", e);
  }
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
