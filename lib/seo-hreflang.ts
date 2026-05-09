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
