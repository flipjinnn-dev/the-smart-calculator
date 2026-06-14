import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl, getCalculatorUrl } from "@/lib/url-utils";
import type { CalculatorGuideData } from "@/components/calculator-guide";
import {
  loadCalculatorSeo,
  getCachedCalculatorSeo,
  buildDefaultCalculatorSeo,
  getCalculatorById,
  getCalculatorStorageId,
  loadSavedCalculatorGuideHtml,
} from "@/lib/calculator-seo";
import { loadRawCalculatorGuideContent } from "@/lib/load-calculator-guide";
import { getCalculatorMetaEntry } from "@/lib/calculator-meta-key";
import { readCalculatorUiFile } from "@/lib/calculator-seo-storage";
import {
  getCalculatorAlternateLanguages,
  withSelfReferencingHreflang,
  SITE_ORIGIN,
  canonicalFromRequestPathname,
  normalizePathname,
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

/** Metadata for `<head>`. Admin SEO file (en) overrides meta/calculators.ts when saved. */
export async function generateCalculatorMetadata(
  calculatorId: string
): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const pathname =
    headersList.get("x-pathname") || getCalculatorUrl(calculatorId, language);
  const path = normalizePathname(pathname);

  const slugPath = normalizePathname(getCalculatorUrl(calculatorId, language));
  const canonicalUrl =
    path === slugPath
      ? canonicalFromRequestPathname(path)
      : getCanonicalUrl(calculatorId, language);
  const meta = getCalculatorMetaEntry(calculatorId, language);
  const savedSeo =
    language === "en" ? await getCachedCalculatorSeo(calculatorId, "en") : null;

  const title =
    savedSeo?.metaTitle?.trim() ||
    resolveCalculatorTitle(calculatorId, language) ||
    "Smart Calculator | Free Online Calculators";
  const description =
    savedSeo?.metaDescription?.trim() ||
    resolveCalculatorDescription(calculatorId, language) ||
    "Free online calculator tools for finance, health, math, physics, and more.";
  const keywords =
    savedSeo?.keywords?.trim() ||
    meta?.keywords?.trim() ||
    getCalculatorMetaEntry(calculatorId, "en")?.keywords?.trim();

  const ogTitle = savedSeo?.openGraph?.title?.trim() || title;
  const ogDescription = savedSeo?.openGraph?.description?.trim() || description;
  const ogImagePath = savedSeo?.openGraph?.image?.trim() || "/og-image.png";
  const ogImage = ogImagePath.startsWith("http")
    ? ogImagePath
    : `${SITE_ORIGIN}${ogImagePath.startsWith("/") ? ogImagePath : `/${ogImagePath}`}`;

  const twitterTitle = savedSeo?.twitter?.title?.trim() || ogTitle;
  const twitterDescription =
    savedSeo?.twitter?.description?.trim() || ogDescription;
  const twitterImagePath = savedSeo?.twitter?.image?.trim() || ogImagePath;
  const twitterImage = twitterImagePath.startsWith("http")
    ? twitterImagePath
    : `${SITE_ORIGIN}${twitterImagePath.startsWith("/") ? twitterImagePath : `/${twitterImagePath}`}`;

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
      title: ogTitle,
      description: ogDescription,
      type: "website",
      url: canonicalUrl,
      siteName: savedSeo?.openGraph?.siteName?.trim() || "Smart Calculator",
      locale: getLocaleFromLanguage(language),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: savedSeo?.twitter?.card === "summary" ? "summary" : "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
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

export async function loadCalculatorGuideContent(
  calculatorId: string,
  language: string
): Promise<CalculatorGuideData> {
  noStore();
  const guide = await loadRawCalculatorGuideContent(calculatorId, language);

  if (language === "en") {
    const html = (await loadSavedCalculatorGuideHtml(calculatorId, "en"))?.trim();
    if (html) {
      return {
        ...guide,
        htmlContent: html,
        sections: [],
        sectionsAfterFaq: [],
        faq: [],
      };
    }
  }

  return guide;
}
