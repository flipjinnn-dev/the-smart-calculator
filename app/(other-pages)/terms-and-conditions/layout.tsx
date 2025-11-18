import { headers } from "next/headers";
import type { Metadata } from "next";

type Language = "en" | "br" | "pl" | "de";

const termsMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Terms and Conditions – TheSmartCalculator",
    description: "Review the terms and conditions for using TheSmartCalculator services and tools.",
    keywords: "terms, conditions, legal, TheSmartCalculator"
  },
  br: {
    title: "Termos e Condições – TheSmartCalculator",
    description: "Leia os termos e condições para usar os serviços e ferramentas do TheSmartCalculator.",
    keywords: "termos, condições, legal, TheSmartCalculator"
  },
  pl: {
    title: "Regulamin – TheSmartCalculator",
    description: "Przeczytaj regulamin korzystania z usług i narzędzi TheSmartCalculator.",
    keywords: "regulamin, warunki, prawne, TheSmartCalculator"
  },
  de: {
    title: "Nutzungsbedingungen – TheSmartCalculator",
    description: "Lesen Sie die Nutzungsbedingungen für die Nutzung der Dienste und Tools von TheSmartCalculator.",
    keywords: "bedingungen, rechtliches, TheSmartCalculator"
  }
};

// Hardcoded canonical and hreflang URLs matching middleware/sitemap
const pageUrls: Record<Language, string> = {
  en: "https://www.thesmartcalculator.com/terms-and-conditions",
  br: "https://www.thesmartcalculator.com/br/termos-e-condicoes",
  pl: "https://www.thesmartcalculator.com/pl/warunki",
  de: "https://www.thesmartcalculator.com/de/nutzungsbedingungen"
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language: Language = langHeader && termsMeta[langHeader as Language] ? (langHeader as Language) : 'en';

  const meta = termsMeta[language];
  const canonicalUrl = pageUrls[language];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': pageUrls.en,
        'pt-BR': pageUrls.br,
        'pl': pageUrls.pl,
        'de': pageUrls.de,
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: canonicalUrl,
    }
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
