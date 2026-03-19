import { headers } from "next/headers";
import type { Metadata } from "next";
import { getStaticPageCanonicalUrl } from "@/lib/url-utils";

type Language = "en" | "br" | "pl" | "de" | "es";

const sitemapMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Sitemap - TheSmartCalculator",
    description: "Browse all available calculators and pages on Smart Calculator. Find the perfect calculation tool for your needs.",
    keywords: "sitemap, calculators, all calculators, calculator list, financial calculators, health calculators, math calculators"
  },
  br: {
    title: "Mapa do Site - TheSmartCalculator",
    description: "Navegue por todas as calculadoras e páginas disponíveis no Smart Calculator. Encontre a ferramenta de cálculo perfeita para suas necessidades.",
    keywords: "mapa do site, calculadoras, todas calculadoras, lista de calculadoras, calculadoras financeiras, calculadoras de saúde"
  },
  pl: {
    title: "Mapa Strony - TheSmartCalculator",
    description: "Przeglądaj wszystkie dostępne kalkulatory i strony w Smart Calculator. Znajdź idealne narzędzie obliczeniowe dla swoich potrzeb.",
    keywords: "mapa strony, kalkulatory, wszystkie kalkulatory, lista kalkulatorów, kalkulatory finansowe, kalkulatory zdrowia"
  },
  de: {
    title: "Sitemap - TheSmartCalculator",
    description: "Durchsuchen Sie alle verfügbaren Rechner und Seiten auf Smart Calculator. Finden Sie das perfekte Berechnungstool für Ihre Bedürfnisse.",
    keywords: "sitemap, rechner, alle rechner, rechnerliste, finanzrechner, gesundheitsrechner, mathematikrechner"
  },
  es: {
    title: "Mapa del Sitio - TheSmartCalculator",
    description: "Explore todas las calculadoras y páginas disponibles en Smart Calculator. Encuentre la herramienta de cálculo perfecta para sus necesidades.",
    keywords: "mapa del sitio, calculadoras, todas las calculadoras, lista de calculadoras, calculadoras financieras, calculadoras de salud"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  // Always use English-only metadata (no multilingual support)
  const meta = sitemapMeta.en;
  const canonicalUrl = 'https://www.thesmartcalculator.com/sitemap';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en': canonicalUrl,
      }
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
    }
  };
}

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
