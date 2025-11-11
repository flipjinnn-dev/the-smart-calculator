import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for piecewise-function-calculator-grapher
const piecewisefunctioncalculatorgrapherMeta = {
  en: {
    title: "Piecewise Function Calculator – Graph Online | TheSmartCalculator",
    description: "Use the Piecewise Function Calculator to evaluate and graph piecewise functions. Accurate, free online tool for math students to analyze domains and values.",
    keywords: "piecewise function calculator, graph piecewise, function tool, online grapher, math analysis, domain calculator, free piecewise tool, student math"
  },
  br: {
    title: "Calculadora de Função Pedaço – Gráfico Online | TheSmartCalculator",
    description: "Use a Calculadora de Função Pedaço para avaliar e graficar funções definidas por partes. Ferramenta precisa e gratuita online para análise matemática e domínios.",
    keywords: "calculadora função pedaço, gráfico função, ferramenta pedaço online, análise matemática, domínio calculadora, gratuita tool, matemática estudante"
  },
  pl: {
    title: "Kalkulator Funkcji Częściowej – Wykres Online | TheSmartCalculator",
    description: "Użyj kalkulatora funkcji częściowej online, aby ocenić i wykreślić funkcje piecewise. Dokładne, darmowe narzędzie do analizy matematycznej i domen.",
    keywords: "kalkulator funkcji częściowej, wykres piecewise, funkcja tool, online grapher, analiza matematyczna, domena kalkulator, darmowy tool"
  },
  de: {
    title: "Stückweise Funktion Rechner – Graph Berechnen | TheSmartCalculator",
    description: "Berechne mit dem Stückweise Funktion Rechner Werte und Graphen von stückweisen Funktionen. Präzises, kostenloses Online-Tool für Mathe-Analyse und Domänen.",
    keywords: "stückweise funktion rechner, graph berechnen, funktion tool, online grapher, mathe analyse, domäne rechner, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && piecewisefunctioncalculatorgrapherMeta[langHeader as keyof typeof piecewisefunctioncalculatorgrapherMeta]
      ? langHeader
      : "en";

  const meta = piecewisefunctioncalculatorgrapherMeta[language as keyof typeof piecewisefunctioncalculatorgrapherMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('piecewise-function-calculator-grapher', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('piecewise-function-calculator-grapher', 'en'),
        'pt-BR': getCanonicalUrl('piecewise-function-calculator-grapher', 'br'),
        'pl': getCanonicalUrl('piecewise-function-calculator-grapher', 'pl'),
        'de': getCanonicalUrl('piecewise-function-calculator-grapher', 'de'),
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

export default async function PiecewiseFunctionCalculatorGrapherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
