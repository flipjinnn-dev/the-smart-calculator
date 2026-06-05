/** URL locale codes (path prefix). Portuguese uses `br` in URLs, `pt-BR` in hreflang. */
export const LOCALE_CODES = ["br", "pl", "de", "es"] as const;
export type LocaleCode = (typeof LOCALE_CODES)[number];

/**
 * Parse `/de`, `/de/foo`, etc. Returns null for false positives like `/depop-fee-calculator`.
 */
export function parseLocalePathname(pathname: string): {
  locale: LocaleCode;
  restPath: string;
} | null {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  for (const locale of LOCALE_CODES) {
    const prefix = `/${locale}`;
    if (path === prefix) {
      return { locale, restPath: "/" };
    }
    if (path.startsWith(`${prefix}/`)) {
      return { locale, restPath: path.slice(prefix.length) || "/" };
    }
  }

  return null;
}

export function localeFromPathname(pathname: string): LocaleCode | "en" {
  return parseLocalePathname(pathname)?.locale ?? "en";
}

export function stripLocalePrefix(pathname: string): string {
  const parsed = parseLocalePathname(pathname);
  if (!parsed) {
    const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
    return path.replace(/\/+$/, "") || "/";
  }
  return parsed.restPath.replace(/\/+$/, "") || "/";
}
