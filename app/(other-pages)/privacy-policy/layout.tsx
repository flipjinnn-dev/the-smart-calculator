import { headers } from "next/headers";
import type { Metadata } from "next";

type Language = "en" | "br" | "pl" | "de" | "es";

const privacyMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Privacy Policy – TheSmartCalculator",
    description: "Read TheSmartCalculator's privacy policy to understand how we collect and use data.",
    keywords: "privacy, policy, data, TheSmartCalculator"
  },
  br: {
    title: "Política de Privacidade – TheSmartCalculator",
    description: "Leia a política de privacidade do TheSmartCalculator para entender como coletamos e usamos dados.",
    keywords: "privacidade, política, dados, TheSmartCalculator"
  },
  pl: {
    title: "Polityka Prywatności – TheSmartCalculator",
    description: "Przeczytaj politykę prywatności TheSmartCalculator, aby dowiedzieć się, jak zbieramy i wykorzystujemy dane.",
    keywords: "prywatność, polityka, dane, TheSmartCalculator"
  },
  de: {
    title: "Datenschutzerklärung – TheSmartCalculator",
    description: "Lesen Sie die Datenschutzerklärung von TheSmartCalculator, um zu verstehen, wie wir Daten erheben und verwenden.",
    keywords: "datenschutz, richtlinie, daten, TheSmartCalculator"
  },
  es: {
    title: "Política de Privacidad – TheSmartCalculator",
    description: "Lee la política de privacidad de TheSmartCalculator para entender cómo recopilamos y usamos los datos.",
    keywords: "privacidad, política, datos, TheSmartCalculator"
  }
};

// Hardcoded canonical and hreflang URLs matching middleware/sitemap
const pageUrls: Record<Language, string> = {
  en: "https://www.thesmartcalculator.com/privacy-policy",
  br: "https://www.thesmartcalculator.com/br/politica-de-privacidade",
  pl: "https://www.thesmartcalculator.com/pl/polityka-prywatnosci",
  de: "https://www.thesmartcalculator.com/de/datenschutz",
  es: "https://www.thesmartcalculator.com/es/politica-de-privacidad"
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language: Language = langHeader && privacyMeta[langHeader as Language] ? (langHeader as Language) : 'en';

  const meta = privacyMeta[language];
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
        'es': pageUrls.es
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

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
