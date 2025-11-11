import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for earned-run-average-calculator
const earnedrunaveragecalculatorMeta = {
  en: {
    title: "Earned Run Average Calculator – ERA Online | TheSmartCalculator",
    description: "Use the Earned Run Average Calculator to compute ERA for pitchers in baseball. Accurate, free online tool for stats analysis and performance tracking.",
    keywords: "earned run average calculator, era tool, pitchers calculation, online earned, baseball stats, performance tracker, free era calculator, run average"
  },
  br: {
    title: "Earned Run Average Calculator – ERA Online | TheSmartCalculato",
    description: "Use a Calculadora ERA para calcular média de corridas ganhas para arremessadores no beisebol. Ferramenta precisa para análise de estatísticas e desempenho.",
    keywords: "calculadora era, corridas ganhas, arremessadores tool, online era, estatísticas beisebol, desempenho tracker, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Średniej Zdobytej Biegów – ERA Online",
    description: "Użyj kalkulatora średniej zdobytej biegów online, aby obliczyć ERA dla miotaczy w baseballu. Dokładne narzędzie do analizy statystyk i wydajności.",
    keywords: "kalkulator średniej biegów, era tool, miotacze obliczenia, online zdobyte, statystyki baseball, wydajność tracker, darmowy kalkulator"
  },
  de: {
    title: "Earned Run Average Calculator – ERA Online | TheSmartCalculato",
    description: "Berechne mit dem Earned Run Average Rechner ERA für Pitcher im Baseball. Präzises Tool für Stats-Analyse und Leistungsverfolgung kostenlos.",
    keywords: "earned run average rechner, era berechnen, pitcher tool, online earned, baseball stats, leistungs tracker, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && earnedrunaveragecalculatorMeta[langHeader as keyof typeof earnedrunaveragecalculatorMeta]
      ? langHeader
      : "en";

  const meta = earnedrunaveragecalculatorMeta[language as keyof typeof earnedrunaveragecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('earned-run-average-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('earned-run-average-calculator', 'en'),
        'pt-BR': getCanonicalUrl('earned-run-average-calculator', 'br'),
        'pl': getCanonicalUrl('earned-run-average-calculator', 'pl'),
        'de': getCanonicalUrl('earned-run-average-calculator', 'de'),
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

export default async function EarnedRunAverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
