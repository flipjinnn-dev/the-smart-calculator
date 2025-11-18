import { headers } from "next/headers";
import type { Metadata } from "next";

type Language = "en" | "br" | "pl" | "de";

const aboutMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "About Us – TheSmartCalculator",
    description: "Learn about TheSmartCalculator: our mission, team, and how we build useful online calculators.",
    keywords: "about, team, mission, TheSmartCalculator"
  },
  br: {
    title: "Sobre Nós – TheSmartCalculator",
    description: "Conheça o TheSmartCalculator: nossa missão, equipe e como criamos calculadoras online úteis.",
    keywords: "sobre, equipe, missão, TheSmartCalculator"
  },
  pl: {
    title: "O nas – TheSmartCalculator",
    description: "Dowiedz się więcej o TheSmartCalculator: nasza misja, zespół i tworzenie przydatnych kalkulatorów online.",
    keywords: "o nas, zespół, misja, TheSmartCalculator"
  },
  de: {
    title: "Über Uns – TheSmartCalculator",
    description: "Erfahren Sie mehr über TheSmartCalculator: unsere Mission, das Team und wie wir nützliche Online-Rechner entwickeln.",
    keywords: "über uns, team, mission, TheSmartCalculator"
  }
};

// Hardcoded canonical and hreflang URLs matching middleware/sitemap
const pageUrls: Record<Language, string> = {
  en: "https://www.thesmartcalculator.com/about-us",
  br: "https://www.thesmartcalculator.com/br/sobre-nos",
  pl: "https://www.thesmartcalculator.com/pl/o-nas",
  de: "https://www.thesmartcalculator.com/de/uber-uns"
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get("x-language");
  const language: Language = langHeader && aboutMeta[langHeader as Language] ? (langHeader as Language) : "en";

  const meta = aboutMeta[language];
  const canonicalUrl = pageUrls[language];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: pageUrls.en,
        "pt-BR": pageUrls.br,
        pl: pageUrls.pl,
        de: pageUrls.de
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl
    }
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
