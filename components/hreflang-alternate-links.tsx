import { headers } from "next/headers";
import {
  canonicalFromRequestPathname,
  withSelfReferencingHreflang,
} from "@/lib/seo-hreflang";
import { getHreflangAlternatesForPathname } from "@/lib/hreflang-nav-links";

/**
 * Crawlable `<a href>` links for every hreflang alternate on the current page.
 * Uses plain anchors (no `hrefLang` attribute) so auditors do not flag
 * "Hreflang: Outside head" while still fixing orphan / unlinked locale URLs.
 */
export async function HreflangAlternateLinks() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const canonicalUrl = canonicalFromRequestPathname(pathname);
  const languages = withSelfReferencingHreflang(
    getHreflangAlternatesForPathname(pathname),
    canonicalUrl,
    pathname
  );

  const entries = Object.entries(languages);
  if (entries.length === 0) return null;

  return (
    <nav aria-label="Language alternates" className="sr-only">
      {entries.map(([lang, href]) => (
        <a key={lang} href={href}>
          {lang}
        </a>
      ))}
    </nav>
  );
}
