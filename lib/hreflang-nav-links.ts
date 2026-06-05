import "server-only";
import categoriesMeta from "@/meta/categories";
import { calculatorsMeta } from "@/meta/calculators";
import { getCalculatorAlternateLanguages, alternateLanguagesForEnglishPath } from "@/lib/seo-hreflang";
import { getCategoryCanonicalUrl, getCanonicalUrl } from "@/lib/url-utils";
import { resolveCalculatorMetaKey } from "@/lib/calculator-meta-key";
import { parseLocalePathname, stripLocalePrefix } from "@/lib/locale-path";
import { getStaticPageHreflangAlternates } from "@/lib/static-page-seo";

const CATEGORY_IDS = Object.keys(categoriesMeta) as string[];

function normalizePathname(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return path.replace(/\/+$/, "") || "/";
}

function stripLocalePrefixFromPath(pathname: string): string {
  const path = normalizePathname(pathname);
  if (path === "/de" || path === "/br" || path === "/pl" || path === "/es") {
    return "/";
  }
  return stripLocalePrefix(path);
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

  const staticAlternates = getStaticPageHreflangAlternates(path);
  if (staticAlternates) return staticAlternates;

  const community = communityPostAlternates(path);
  if (community) return community;

  if (path.startsWith("/profile/")) {
    return alternateLanguagesForEnglishPath(path);
  }

  const localePath = parseLocalePathname(path);
  if (localePath?.restPath.startsWith("/profile/")) {
    return alternateLanguagesForEnglishPath(localePath.restPath);
  }

  if (path === "/auth/signin" || stripLocalePrefixFromPath(path) === "/auth/signin") {
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

  const englishPath = stripLocalePrefixFromPath(path);
  if (englishPath !== path) {
    return alternateLanguagesForEnglishPath(englishPath);
  }

  return alternateLanguagesForEnglishPath(path);
}
