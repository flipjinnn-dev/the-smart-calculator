import { headers } from "next/headers";
import type { Metadata } from "next";
import { getStaticPageCanonicalUrl } from "@/lib/url-utils";

type Language = "en" | "br" | "pl" | "de" | "es";

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
  },
  es: {
    title: "Términos y Condiciones – TheSmartCalculator",
    description: "Revisa los términos y condiciones para usar los servicios y herramientas de TheSmartCalculator.",
    keywords: "términos, condiciones, legal, TheSmartCalculator"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language: Language = langHeader && termsMeta[langHeader as Language] ? (langHeader as Language) : 'en';

  const meta = termsMeta[language];
  const canonicalUrl = getStaticPageCanonicalUrl('terms-and-conditions', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getStaticPageCanonicalUrl('terms-and-conditions', 'en'),
        'pt-BR': getStaticPageCanonicalUrl('terms-and-conditions', 'br'),
        'pl': getStaticPageCanonicalUrl('terms-and-conditions', 'pl'),
        'de': getStaticPageCanonicalUrl('terms-and-conditions', 'de'),
        'es': getStaticPageCanonicalUrl('terms-and-conditions', 'es')
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
