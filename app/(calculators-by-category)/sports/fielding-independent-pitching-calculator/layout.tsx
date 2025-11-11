import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for fielding-independent-pitching-calculator
const fieldingindependentpitchingcalculatorMeta = {
  en: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Use the Fielding Independent Pitching  – FIP Online | TheSmartCalculator calculator to get instant, accurate results. Fast inputs, clear outputs, and helpful co.",
    keywords: "calculadora arremesso independente, fip tool, jogadores beisebol, estatísticas cálculo, online fip, avaliação arremessadores, gratuita calculadora"
  },
  br: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Użyj kalkulatora niezależnego miotania pola online, aby obliczyć FIP dla graczy baseballu. Dokładne narzędzie do analizy statystyk i oceny miotaczy.",
    keywords: "kalkulator niezależnego miotania, fip tool, gracze baseball, statystyki obliczenia, online fip, ocena miotaczy, darmowy tool"
  },
  pl: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Berechne mit dem Feldunabhängiger Pitching Rechner FIP für Baseballspieler. Präzises Tool für Stats-Analyse und Pitcher-Bewertung kostenlos.",
    keywords: "feldunabhängiger pitching rechner, fip berechnen, baseballspieler tool, stats analyse, online fip, pitcher bewertung, kostenloser rechner"
  },
  de: {
    title: "Fielding Independent Pitching Calculator – FIP Online | TheSma",
    description: "Berechne mit dem Feldunabhängiger Pitching Rechner FIP für Baseballspieler. Präzises Tool für Stats-Analyse und Pitcher-Bewertung kostenlos., feldunabhängiger pitching rechner",
    keywords: "calculadora arremesso independente, fip tool, jogadores beisebol, estatísticas cálculo, online fip, avaliação arremessadores, gratuita calculadora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && fieldingindependentpitchingcalculatorMeta[langHeader as keyof typeof fieldingindependentpitchingcalculatorMeta]
      ? langHeader
      : "en";

  const meta = fieldingindependentpitchingcalculatorMeta[language as keyof typeof fieldingindependentpitchingcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('fielding-independent-pitching-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('fielding-independent-pitching-calculator', 'en'),
        'pt-BR': getCanonicalUrl('fielding-independent-pitching-calculator', 'br'),
        'pl': getCanonicalUrl('fielding-independent-pitching-calculator', 'pl'),
        'de': getCanonicalUrl('fielding-independent-pitching-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export default async function FieldingIndependentPitchingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
