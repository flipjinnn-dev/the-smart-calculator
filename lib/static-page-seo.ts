import type { Metadata } from "next";
import { getStaticPageCanonicalUrl } from "@/lib/url-utils";
import {
  withSelfReferencingHreflang,
} from "@/lib/seo-hreflang";
import { parseLocalePathname, stripLocalePrefix } from "@/lib/locale-path";

export type StaticPageId =
  | "about-us"
  | "contact-us"
  | "privacy-policy"
  | "terms-and-conditions"
  | "editorial-policy-mission-statement"
  | "sitemap";

type Language = "en" | "br" | "pl" | "de" | "es";

const ENGLISH_SLUG_TO_PAGE: Record<string, StaticPageId> = {
  "about-us": "about-us",
  "contact-us": "contact-us",
  "privacy-policy": "privacy-policy",
  "terms-and-conditions": "terms-and-conditions",
  "editorial-policy-mission-statement": "editorial-policy-mission-statement",
  sitemap: "sitemap",
};

/** Localized first path segment → English page id (matches middleware rewrites). */
const LOCALIZED_SLUG_TO_PAGE: Record<string, StaticPageId> = {
  "sobre-nos": "about-us",
  "contate-nos": "contact-us",
  contato: "contact-us",
  "o-nas": "about-us",
  "uber-uns": "about-us",
  "acerca-de-nosotros": "about-us",
  "sobre-nosotros": "about-us",
  kontakt: "contact-us",
  contactanos: "contact-us",
  contacto: "contact-us",
  "politica-de-privacidade": "privacy-policy",
  "polityka-prywatnosci": "privacy-policy",
  datenschutz: "privacy-policy",
  "politica-de-privacidad": "privacy-policy",
  "termos-e-condicoes": "terms-and-conditions",
  regulamin: "terms-and-conditions",
  warunki: "terms-and-conditions",
  nutzungsbedingungen: "terms-and-conditions",
  "allgemeine-geschaftsbedingungen": "terms-and-conditions",
  "terminos-y-condiciones": "terms-and-conditions",
  "politica-editorial-declaracao-missao": "editorial-policy-mission-statement",
  "polityka-redakcyjna-deklaracja-misji": "editorial-policy-mission-statement",
  "redaktionelle-richtlinien-leitbild": "editorial-policy-mission-statement",
  "politica-editorial-declaracion-mision": "editorial-policy-mission-statement",
  "mapa-do-site": "sitemap",
  "mapa-strony": "sitemap",
  "mapa-del-sitio": "sitemap",
};

export function resolveStaticPageId(pathname: string): StaticPageId | null {
  const path = stripLocalePrefix(pathname).replace(/^\//, "");
  const slug = path.split("/").filter(Boolean)[0];
  if (!slug) return null;
  return ENGLISH_SLUG_TO_PAGE[slug] ?? LOCALIZED_SLUG_TO_PAGE[slug] ?? null;
}

export function getStaticPageAlternateLanguages(
  pageId: StaticPageId
): Record<string, string> {
  return {
    "x-default": getStaticPageCanonicalUrl(pageId, "en"),
    en: getStaticPageCanonicalUrl(pageId, "en"),
    "pt-BR": getStaticPageCanonicalUrl(pageId, "br"),
    pl: getStaticPageCanonicalUrl(pageId, "pl"),
    de: getStaticPageCanonicalUrl(pageId, "de"),
    es: getStaticPageCanonicalUrl(pageId, "es"),
  };
}

interface StaticPageMetaEntry {
  title: string;
  description: string;
  keywords: string;
}

export function generateStaticPageMetadata(
  pageId: StaticPageId,
  metaByLanguage: Record<Language, StaticPageMetaEntry>,
  pathname: string,
  language: Language
): Metadata {
  const meta = metaByLanguage[language] ?? metaByLanguage.en;
  const canonicalUrl = getStaticPageCanonicalUrl(pageId, language);
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: withSelfReferencingHreflang(
        getStaticPageAlternateLanguages(pageId),
        canonicalUrl,
        path
      ),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export function languageFromStaticPathname(pathname: string): Language {
  const parsed = parseLocalePathname(pathname);
  if (!parsed) return "en";
  return parsed.locale as Language;
}

/** For hreflang nav: pathname may be localized (`/de/uber-uns`) or English (`/about-us`). */
export function getStaticPageHreflangAlternates(
  pathname: string
): Record<string, string> | null {
  const pageId = resolveStaticPageId(pathname);
  if (!pageId) return null;
  return getStaticPageAlternateLanguages(pageId);
}
