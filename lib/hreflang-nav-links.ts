import "server-only";
import categoriesMeta from "@/meta/categories";
import { calculatorsMeta } from "@/meta/calculators";
import { getCalculatorAlternateLanguages, alternateLanguagesForEnglishPath } from "@/lib/seo-hreflang";
import { getCategoryCanonicalUrl, getCanonicalUrl } from "@/lib/url-utils";
import { resolveCalculatorMetaKey } from "@/lib/calculator-meta-key";

const CATEGORY_IDS = Object.keys(categoriesMeta) as string[];
const LOCALE_PREFIX = /^\/(br|pl|de|es)(\/|$)/;

function normalizePathname(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path.replace(/\/+$/, "") || "/";
}

function stripLocalePrefix(pathname: string): string {
  const path = normalizePathname(pathname);
  if (path === "/de" || path === "/br" || path === "/pl" || path === "/es") {
    return "/";
  }
  return path.replace(LOCALE_PREFIX, "/") || "/";
}

function findCalculatorIdByPathname(pathname: string): string | null {
  const path = normalizePathname(pathname);

  for (const [metaKey, calculator] of Object.entries(calculatorsMeta)) {
    for (const lang of Object.keys(calculator) as Array<keyof typeof calculator>) {
      const slug = calculator[lang]?.slug;
      if (!slug) continue;
      const normalizedSlug = normalizePathname(slug);
      if (normalizedSlug === path) {
        return resolveCalculatorMetaKey(metaKey);
      }
    }
  }

  return null;
}

function findCategoryIdByPathname(pathname: string): string | null {
  const path = normalizePathname(pathname);
  const withoutLocale = stripLocalePrefix(path);
  if (withoutLocale === "/") return null;

  const segment = withoutLocale.replace(/^\//, "").split("/")[0];
  if (!segment || withoutLocale.split("/").filter(Boolean).length !== 1) {
    return null;
  }

  for (const categoryId of CATEGORY_IDS) {
    const category = categoriesMeta[categoryId as keyof typeof categoriesMeta];
    for (const lang of Object.keys(category) as Array<keyof typeof category>) {
      if (category[lang]?.slug === segment) {
        return categoryId;
      }
    }
  }

  return null;
}

function categoryAlternateLanguages(categoryId: string): Record<string, string> {
  return {
    "x-default": getCategoryCanonicalUrl(categoryId, "en"),
    en: getCategoryCanonicalUrl(categoryId, "en"),
    de: getCategoryCanonicalUrl(categoryId, "de"),
    pl: getCategoryCanonicalUrl(categoryId, "pl"),
    "pt-BR": getCategoryCanonicalUrl(categoryId, "br"),
    es: getCategoryCanonicalUrl(categoryId, "es"),
  };
}

function communityPostAlternates(pathname: string): Record<string, string> | null {
  const match = pathname.match(
    /^(?:\/(?:br|pl|de|es))?\/community\/post\/([^/]+)\/?$/
  );
  if (!match) return null;

  const slug = match[1];
  return alternateLanguagesForEnglishPath(`/community/post/${slug}`);
}

/**
 * Resolve the same hreflang cluster used in page metadata so crawlers can
 * discover alternates via internal `<a href>` links (fixes "Unlinked hreflang URLs").
 */
export function getHreflangAlternatesForPathname(
  pathname: string
): Record<string, string> {
  const path = normalizePathname(pathname);

  if (path === "/" || path === "/de" || path === "/br" || path === "/pl" || path === "/es") {
    return alternateLanguagesForEnglishPath("/");
  }

  const community = communityPostAlternates(path);
  if (community) return community;

  if (path.startsWith("/profile/") || path.match(/^\/(br|pl|de|es)\/profile\//)) {
    return alternateLanguagesForEnglishPath(stripLocalePrefix(path));
  }

  if (path === "/auth/signin" || path.match(/^\/(br|pl|de|es)\/auth\/signin$/)) {
    return alternateLanguagesForEnglishPath("/auth/signin");
  }

  const calculatorId = findCalculatorIdByPathname(path);
  if (calculatorId) {
    const languages = getCalculatorAlternateLanguages(calculatorId);
    if (Object.keys(languages).length > 0) {
      return languages;
    }
    const enUrl = getCanonicalUrl(calculatorId, "en");
    return { "x-default": enUrl, en: enUrl };
  }

  const categoryId = findCategoryIdByPathname(path);
  if (categoryId) {
    return categoryAlternateLanguages(categoryId);
  }

  const englishPath = stripLocalePrefix(path);
  if (englishPath !== path) {
    return alternateLanguagesForEnglishPath(englishPath);
  }

  return alternateLanguagesForEnglishPath(path);
}
