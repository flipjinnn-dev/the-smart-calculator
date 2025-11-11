import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for fielding-percentage-calculator
const fieldingpercentagecalculatorMeta = {
  en: {
    title: "Fielding Percentage Calculator – Baseball Online | TheSmartCal",
    description: "Use the Fielding Percentage Calculator to compute percentage for baseball players. Accurate, free online tool for stats tracking and performance analysis.",
    keywords: "fielding percentage calculator, baseball tool, percentage calculation, online fielding, stats tracking, performance analysis, free percentage calculator, player tool"
  },
  br: {
    title: "Calculadora Porcentagem Campo – Beisebol Online | TheSmartCalculator",
    description: "Use a Calculadora Porcentagem Campo para calcular porcentagem para jogadores de beisebol. Ferramenta precisa para rastreamento de estatísticas e análise de desempenho.",
    keywords: "calculadora porcentagem campo, beisebol tool, cálculo porcentagem, online campo, estatísticas rastreamento, análise desempenho, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Procentu Pola – Baseball Online | TheSmartCalculator",
    description: "Użyj kalkulatora procentu pola online, aby obliczyć procent dla graczy baseballu. Dokładne narzędzie do śledzenia statystyk i analizy wydajności.",
    keywords: "kalkulator procentu pola, baseball tool, obliczyć procent, online pole, statystyki śledzenie, analiza wydajności, darmowy tool"
  },
  de: {
    title: "Feldprozentsatz Rechner – Baseball Berechnen | TheSmartCalculator",
    description: "Berechne mit dem Feldprozentsatz Rechner Prozentsatz für Baseballspieler. Präzises Tool für Stats-Tracking und Leistungsanalyse kostenlos.",
    keywords: "feldprozentsatz rechner, baseball berechnen, prozentsatz tool, online feld, stats tracking, leistungsanalyse, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && fieldingpercentagecalculatorMeta[langHeader as keyof typeof fieldingpercentagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = fieldingpercentagecalculatorMeta[language as keyof typeof fieldingpercentagecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('fielding-percentage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('fielding-percentage-calculator', 'en'),
        'pt-BR': getCanonicalUrl('fielding-percentage-calculator', 'br'),
        'pl': getCanonicalUrl('fielding-percentage-calculator', 'pl'),
        'de': getCanonicalUrl('fielding-percentage-calculator', 'de'),
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

export default async function FieldingPercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
