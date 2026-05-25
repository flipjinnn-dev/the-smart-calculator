import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { calculatorsMeta } from "@/meta/calculators";
import { getCanonicalUrl } from "@/lib/url-utils";
import type { CalculatorGuideData } from "@/components/calculator-guide";
import {
  getCalculatorStorageId,
  loadCalculatorSeo,
  loadOrBuildCalculatorSeo,
  buildMetadataFromSeo,
} from "@/lib/calculator-seo";
import { readCalculatorUiFile } from "@/lib/calculator-seo-storage";
import {
  getCalculatorAlternateLanguages,
  withSelfReferencingHreflang,
} from "@/lib/seo-hreflang";

/** Use blob + fresh reads on every request (admin saves show without redeploy). */
export async function generateCalculatorMetadata(
  calculatorId: string
): Promise<Metadata> {
  noStore();

  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const pathname =
    headersList.get("x-pathname") || getCanonicalUrl(calculatorId, language);
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (language === "en") {
    const saved = await loadCalculatorSeo(calculatorId, "en");
    const seo = saved ?? (await loadOrBuildCalculatorSeo(calculatorId, "en"));
    if (seo?.metaTitle?.trim()) {
      const base = buildMetadataFromSeo(calculatorId, language, seo);
      const canonicalUrl =
        seo.canonical?.trim() || getCanonicalUrl(calculatorId, language);
      return {
        ...base,
        alternates: {
          canonical: canonicalUrl,
          languages: withSelfReferencingHreflang(
            getCalculatorAlternateLanguages(calculatorId),
            canonicalUrl,
            path
          ),
        },
      };
    }
  }

  const canonicalUrl = getCanonicalUrl(calculatorId, language);
  const meta =
    calculatorsMeta[calculatorId]?.[language] ||
    calculatorsMeta[calculatorId]?.en;

  return {
    metadataBase: new URL("https://www.thesmartcalculator.com"),
    title: meta?.title ? { absolute: meta.title } : undefined,
    description: meta?.description,
    keywords: meta?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: withSelfReferencingHreflang(
        getCalculatorAlternateLanguages(calculatorId),
        canonicalUrl,
        path
      ),
    },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta?.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title,
      description: meta?.description,
      images: ["/og-image.png"],
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
  const storageId = getCalculatorStorageId(calculatorId);
  const fallback: CalculatorGuideData = { color: "blue", sections: [], faq: [] };
  try {
    return (
      await import(
        `@/app/content/calculator-guide/${storageId}/${language}.json`
      )
    ).default as CalculatorGuideData;
  } catch {
    try {
      return (
        await import(`@/app/content/calculator-guide/${storageId}/en.json`)
      ).default as CalculatorGuideData;
    } catch {
      return fallback;
    }
  }
}
