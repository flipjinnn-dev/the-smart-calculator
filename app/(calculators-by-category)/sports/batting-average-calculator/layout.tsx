import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for batting-average-calculator
const battingaveragecalculatorMeta = {
  en: {
    title: "Batting Average Calculator – Stats Online | TheSmartCalculator",
    description: "Use the Batting Average Calculator to compute average and related baseball statistics. Accurate, free online tool for players and fans in performance analysis.",
    keywords: "batting average calculator, baseball stats, average tool, online batting, performance analysis, free average calculator, player stats, fan tool"
  },
  br: {
    title: "Batting Average Calculator – Stats Online | TheSmartCalculator",
    description: "Use a Calculadora Média de Rebatidas para calcular média e estatísticas relacionadas ao beisebol. Ferramenta precisa para jogadores e fãs em análise de desempenho.",
    keywords: "calculadora média rebatidas, estatísticas beisebol, média tool, online rebatidas, análise desempenho, gratuita calculadora, jogadores stats"
  },
  pl: {
    title: "Kalkulator Średniej Uderzeń – Statystyki Online | TheSmartCalculator",
    description: "Użyj kalkulatora średniej uderzeń online, aby obliczyć średnią i powiązane statystyki baseballu. Dokładne narzędzie dla graczy i fanów do analizy.",
    keywords: "kalkulator średniej uderzeń, statystyki baseball, średnia tool, online uderzenia, analiza wydajności, darmowy kalkulator, gracze stats"
  },
  de: {
    title: "Batting Average Calculator – Stats Online | TheSmartCalculator",
    description: "Berechne mit dem Schlagdurchschnitt Rechner Durchschnitt und Baseball-Statistiken. Präzises Tool für Spieler und Fans zur Leistungsanalyse online.",
    keywords: "schlagdurchschnitt rechner, stats berechnen, baseball statistiken, online schlag, leistungsanalyse, kostenloser tool, spieler fans"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && battingaveragecalculatorMeta[langHeader as keyof typeof battingaveragecalculatorMeta]
      ? langHeader
      : "en";

  const meta = battingaveragecalculatorMeta[language as keyof typeof battingaveragecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('batting-average-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('batting-average-calculator', 'en'),
        'pt-BR': getCanonicalUrl('batting-average-calculator', 'br'),
        'pl': getCanonicalUrl('batting-average-calculator', 'pl'),
        'de': getCanonicalUrl('batting-average-calculator', 'de'),
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

export default async function BattingAverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
