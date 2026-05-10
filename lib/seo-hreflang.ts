export const SITE_ORIGIN = "https://www.thesmartcalculator.com";

/**
 * Canonical URL for the current request path (middleware sets `x-pathname`).
 * Keys in `alternateLanguagesForEnglishPath` use BCP-47 codes that match
 * `app/layout.tsx` html `lang` values: en, de, pl, es, pt-BR (Portuguese uses `pt-BR` while URLs use `/br/`).
 */
export function canonicalFromRequestPathname(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_ORIGIN}${path}`;
}

/**
 * hreflang map: keys must match the document html `lang` (never use `br` — use `pt-BR`).
 * Values use locale URL prefixes that match `middleware.ts` (br, pl, de, es).
 */
export function alternateLanguagesForEnglishPath(englishPath: string): Record<string, string> {
  const path = englishPath.startsWith("/") ? englishPath : `/${englishPath}`;
  const enUrl = `${SITE_ORIGIN}${path}`;
  return {
    "x-default": enUrl,
    en: enUrl,
    de: `${SITE_ORIGIN}/de${path}`,
    pl: `${SITE_ORIGIN}/pl${path}`,
    "pt-BR": `${SITE_ORIGIN}/br${path}`,
    es: `${SITE_ORIGIN}/es${path}`,
  };
}

/** BCP-47 keys that match `app/layout.tsx` html lang (Portuguese → pt-BR). */
export type HreflangLocaleKey = "en" | "de" | "pl" | "pt-BR" | "es";

export function normalizePathname(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * Locale segment from URL path (middleware `x-pathname`). English has no prefix.
 */
export function hreflangKeyFromPathname(pathname: string): HreflangLocaleKey {
  const p = normalizePathname(pathname);
  if (p === "/de" || p.startsWith("/de/")) return "de";
  if (p === "/pl" || p.startsWith("/pl/")) return "pl";
  if (p === "/br" || p.startsWith("/br/")) return "pt-BR";
  if (p === "/es" || p.startsWith("/es/")) return "es";
  return "en";
}

/**
 * Ensures hreflang self-reference: the current URL must appear under the correct
 * `hreflang` for this path (fixes "Not Self-Referencing" in audits).
 * For English pages, also sets `x-default` to the canonical URL.
 */
export function withSelfReferencingHreflang(
  languages: Record<string, string>,
  canonicalUrl: string,
  pathname: string
): Record<string, string> {
  const key = hreflangKeyFromPathname(pathname);
  const out = { ...languages };
  out[key] = canonicalUrl;
  if (key === "en") {
    out["x-default"] = canonicalUrl;
  }
  return out;
}
