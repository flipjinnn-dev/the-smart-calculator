import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl, getCalculatorUrl } from "@/lib/url-utils";
import type { CalculatorGuideData } from "@/components/calculator-guide";
import {
  getCalculatorStorageId,
  loadCalculatorSeo,
  buildDefaultCalculatorSeo,
  getCalculatorById,
} from "@/lib/calculator-seo";
import { getCalculatorMetaEntry, resolveCalculatorMetaKey } from "@/lib/calculator-meta-key";
import { readCalculatorUiFile } from "@/lib/calculator-seo-storage";
import {
  getCalculatorAlternateLanguages,
  withSelfReferencingHreflang,
  SITE_ORIGIN,
} from "@/lib/seo-hreflang";
import { getLocaleFromLanguage } from "@/lib/metadata-utils";

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function resolveCalculatorDescription(
  calculatorId: string,
  language: string
): string | undefined {
  const localized = getCalculatorMetaEntry(calculatorId, language)?.description?.trim();
  if (localized) return localized;

  const english = getCalculatorMetaEntry(calculatorId, "en")?.description?.trim();
  if (english) return english;

  const defaults = buildDefaultCalculatorSeo(calculatorId);
  if (defaults?.metaDescription?.trim()) return defaults.metaDescription.trim();

  return getCalculatorById(calculatorId)?.description?.trim();
}

function resolveCalculatorTitle(
  calculatorId: string,
  language: string
): string | undefined {
  const localized = getCalculatorMetaEntry(calculatorId, language)?.title?.trim();
  if (localized) return localized;

  const english = getCalculatorMetaEntry(calculatorId, "en")?.title?.trim();
  if (english) return english;

  return buildDefaultCalculatorSeo(calculatorId)?.metaTitle?.trim();
}

/** Metadata for `<head>` — sync sources only so tags stay in head (no dynamic streaming). */
export async function generateCalculatorMetadata(
  calculatorId: string
): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const pathname =
    headersList.get("x-pathname") || getCalculatorUrl(calculatorId, language);
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  const canonicalUrl = getCanonicalUrl(calculatorId, language);
  const meta = getCalculatorMetaEntry(calculatorId, language);
  const title =
    resolveCalculatorTitle(calculatorId, language) ||
    "Smart Calculator | Free Online Calculators";
  const description =
    resolveCalculatorDescription(calculatorId, language) ||
    "Free online calculator tools for finance, health, math, physics, and more.";
  const keywords =
    meta?.keywords?.trim() ||
    getCalculatorMetaEntry(calculatorId, "en")?.keywords?.trim();

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: withSelfReferencingHreflang(
        getCalculatorAlternateLanguages(calculatorId),
        canonicalUrl,
        path
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      locale: getLocaleFromLanguage(language),
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

function applySeoHeroToUi(
  ui: Record<string, unknown>,
  seo: { pageTitle?: string; pageDescription?: string }
): Record<string, unknown> {
  const pageTitle = seo.pageTitle?.trim();
  const pageDescription = seo.pageDescription?.trim();
  if (!pageTitle && !pageDescription) return ui;

  const next = { ...ui };
  if ("pageTitle" in next || pageTitle) {
    if (pageTitle) next.pageTitle = pageTitle;
    if (pageDescription) next.pageDescription = pageDescription;
  } else {
    if (pageTitle) next.title = pageTitle;
    if (pageDescription) next.description = pageDescription;
  }
  return next;
}

export async function loadCalculatorUiContent(
  calculatorId: string,
  language: string
): Promise<Record<string, unknown>> {
  noStore();
  const storageId = getCalculatorStorageId(calculatorId);

  let ui: Record<string, unknown> | null =
    await readCalculatorUiFile(storageId, language);

  if (!ui) {
    try {
      ui = (
        await import(
          `@/app/content/calculator-ui/${storageId}/${language}.json`
        )
      ).default as Record<string, unknown>;
    } catch {
      try {
        ui = (
          await import(`@/app/content/calculator-ui/${storageId}/en.json`)
        ).default as Record<string, unknown>;
      } catch {
        ui = {};
      }
    }
  }

  if (language === "en") {
    const seo = await loadCalculatorSeo(calculatorId, "en");
    if (seo) {
      ui = applySeoHeroToUi(ui, seo);
    }
  }

  return ui;
}

type RawFaqItem = {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
};

/** Guide JSON may use `q`/`a` or `question`/`answer`; component expects the latter. */
function normalizeGuideData(
  raw: CalculatorGuideData & { faq?: RawFaqItem[] }
): CalculatorGuideData {
  return {
    ...raw,
    faq: (raw.faq ?? []).map((item) => ({
      question: item.question ?? item.q ?? "",
      answer: item.answer ?? item.a ?? "",
    })),
  };
}

export async function loadCalculatorGuideContent(
  calculatorId: string,
  language: string
): Promise<CalculatorGuideData> {
  const storageId = getCalculatorStorageId(calculatorId);
  const fallback: CalculatorGuideData = { color: "blue", sections: [], faq: [] };
  try {
    const raw = (
      await import(
        `@/app/content/calculator-guide/${storageId}/${language}.json`
      )
    ).default as CalculatorGuideData & { faq?: RawFaqItem[] };
    return normalizeGuideData(raw);
  } catch {
    try {
      const raw = (
        await import(`@/app/content/calculator-guide/${storageId}/en.json`)
      ).default as CalculatorGuideData & { faq?: RawFaqItem[] };
      return normalizeGuideData(raw);
    } catch {
      return fallback;
    }
  }
}
