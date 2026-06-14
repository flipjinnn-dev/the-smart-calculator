import { calculatorsMeta } from "@/meta/calculators";
import { getCanonicalUrl } from "@/lib/url-utils";
import { resolveCalculatorMetaKey } from "@/lib/calculator-meta-key";
import { localeFromPathname } from "@/lib/locale-path";

export const SITE_ORIGIN = "https://www.thesmartcalculator.com";

/** BCP-47 keys that match `app/layout.tsx` html lang (Portuguese → pt-BR). */
export type HreflangLocaleKey = "en" | "de" | "pl" | "pt-BR" | "es";

const CALCULATOR_LANG_TO_HREFLANG: Record<string, HreflangLocaleKey> = {
  en: "en",
  de: "de",
  pl: "pl",
  br: "pt-BR",
  es: "es",
};

/**
 * hreflang alternates for a calculator — only locales defined in `meta/calculators.ts`.
 * Keeps clusters reciprocal (no homepage /de links on English-only tools like Depop).
 */
export function getCalculatorAlternateLanguages(
  calculatorId: string
): Record<string, string> {
  const metaKey = resolveCalculatorMetaKey(calculatorId);
  const calculator = calculatorsMeta[metaKey];
  if (!calculator) {
    return {};
  }

  const out: Record<string, string> = {};

  for (const lang of Object.keys(CALCULATOR_LANG_TO_HREFLANG)) {
    if (!calculator[lang as keyof typeof calculator]) {
      continue;
    }
    const hreflangKey = CALCULATOR_LANG_TO_HREFLANG[lang];
    out[hreflangKey] = getCanonicalUrl(calculatorId, lang);
  }

  if (out.en) {
    out["x-default"] = out.en;
  }

  return out;
}

/**
 * Canonical URL for the current request path (middleware sets `x-pathname`).
 * Keys in `alternateLanguagesForEnglishPath` use BCP-47 codes that match
 * `app/layout.tsx` html `lang` values: en, de, pl, es, pt-BR (Portuguese uses `pt-BR` while URLs use `/br/`).
 */
export function canonicalFromRequestPathname(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/") return SITE_ORIGIN;
  return `${SITE_ORIGIN}${path}`;
}

/**
 * hreflang map: keys must match the document html `lang` (never use `br` — use `pt-BR`).
 * Values use locale URL prefixes that match `middleware.ts` (br, pl, de, es).
 * Locale homepages use no trailing slash (`/es` not `/es/`) so hreflang targets return 200.
 */
export function alternateLanguagesForEnglishPath(englishPath: string): Record<string, string> {
  const path = englishPath.startsWith("/") ? englishPath : `/${englishPath}`;
  const enUrl = path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
  const localeUrl = (locale: string) =>
    path === "/" ? `${SITE_ORIGIN}/${locale}` : `${SITE_ORIGIN}/${locale}${path}`;
  return {
    "x-default": enUrl,
    en: enUrl,
    de: localeUrl("de"),
    pl: localeUrl("pl"),
    "pt-BR": localeUrl("br"),
    es: localeUrl("es"),
  };
}

export function normalizePathname(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * Locale segment from URL path (middleware `x-pathname`). English has no prefix.
 */
export function hreflangKeyFromPathname(pathname: string): HreflangLocaleKey {
  const locale = localeFromPathname(pathname);
  if (locale === "br") return "pt-BR";
  if (locale === "en") return "en";
  return locale;
}

/**
 * Ensures hreflang self-reference: the current URL must appear under the correct
 * `hreflang` for this path (fixes "Not Self-Referencing" in audits).
 * `x-default` always points at the English URL when the cluster includes `en`.
 */
export function withSelfReferencingHreflang(
  languages: Record<string, string>,
  canonicalUrl: string,
  pathname: string
): Record<string, string> {
  const key = hreflangKeyFromPathname(pathname);
  const out = { ...languages };
  out[key] = canonicalUrl;
  if (out.en) {
    out["x-default"] = out.en;
  } else if (key === "en") {
    out["x-default"] = canonicalUrl;
  }
  return out;
}
