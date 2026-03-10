import type { Metadata } from "next";

const BASE_URL = "https://www.thesmartcalculator.com";
const DEFAULT_OG_IMAGE = "/og-image.png";

interface MetadataParams {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  languageUrls: {
    en: string;
    'pt-BR': string;
    pl: string;
    de: string;
    es: string;
  };
  ogImage?: string;
  locale?: string;
}

/**
 * Generate complete metadata with all required SEO properties
 * Ensures no missing OG tags, proper canonical, hreflang with x-default
 */
export function generateCompleteMetadata(params: MetadataParams): Metadata {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    languageUrls,
    ogImage = DEFAULT_OG_IMAGE,
    locale = "en_US"
  } = params;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': languageUrls.en, // Fix Issue #3: Add x-default
        'en': languageUrls.en,
        'pt-BR': languageUrls['pt-BR'],
        'pl': languageUrls.pl,
        'de': languageUrls.de,
        'es': languageUrls.es,
      }
    },
    openGraph: {
      title,
      description,
      type: "website", // Fix Issue #1: Add og:type
      url: canonicalUrl, // Fix Issue #2: Use canonicalUrl (not hardcoded)
      siteName: "Smart Calculator", // Fix Issue #1: Add og:site_name
      locale,
      images: [
        {
          url: ogImage, // Fix Issue #1: Add og:image
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
      images: [ogImage],
    },
  };
}

/**
 * Helper to get locale code from language
 */
export function getLocaleFromLanguage(language: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en_US',
    'br': 'pt_BR',
    'pl': 'pl_PL',
    'de': 'de_DE',
    'es': 'es_ES',
  };
  return localeMap[language] || 'en_US';
}

interface EnglishOnlyMetadataParams {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
}

/**
 * Generate metadata for English-only pages (no hreflang language alternatives)
 * Use this for pages that are only available in English like:
 * - English-only calculators
 * - Blog pages
 * - Games pages
 */
export function generateEnglishOnlyMetadata(params: EnglishOnlyMetadataParams): Metadata {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = DEFAULT_OG_IMAGE,
  } = params;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en': canonicalUrl,
      }
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      locale: "en_US",
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}
