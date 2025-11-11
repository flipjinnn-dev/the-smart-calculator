import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for marriage-calculator
const marriagecalculatorMeta = {
  en: {
    title: "Marriage Calculator – Wedding Cost & Budget Planner | TheSmartCalculator",
    description: "Use the Marriage Calculator to estimate wedding costs, budget planning, and expenses. Accurate, free online tool for marriage planning and financial preparation.",
    keywords: "marriage calculator, wedding cost, budget planner, wedding expenses, marriage planning, financial preparation, online wedding tool, free marriage calculator"
  },
  br: {
    title: "Calculadora de Casamento – Planejamento Orçamento | TheSmartCalculator",
    description: "Use a Calculadora de Casamento para estimar custos de casamento, planejamento de orçamento e despesas. Ferramenta online gratuita para preparação financeira.",
    keywords: "calculadora casamento, custo casamento, planejamento orçamento, despesas casamento, planejamento casamento, preparação financeira, ferramenta online casamento"
  },
  pl: {
    title: "Kalkulator Ślubny – Planowanie Kosztów Wesela | TheSmartCalculator",
    description: "Użyj kalkulatora ślubnego, aby oszacować koszty ślubu, planowanie budżetu i wydatki. Darmowe narzędzie online do planowania ślubu i przygotowania finansowego.",
    keywords: "kalkulator ślubny, koszt ślubu, planowanie budżetu, wydatki ślubne, planowanie ślubu, przygotowanie finansowe, narzędzie online ślub"
  },
  de: {
    title: "Hochzeitsrechner – Kosten & Budget Planer | TheSmartCalculator",
    description: "Nutzen Sie den Hochzeitsrechner zur Schätzung der Hochzeitskosten, Budgetplanung und Ausgaben. Kostenloses Online-Tool für Hochzeitsplanung und finanzielle Vorbereitung.",
    keywords: "hochzeitsrechner, hochzeitskosten, budgetplanung, hochzeitsausgaben, hochzeitsplanung, finanzielle vorbereitung, online hochzeit tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && marriagecalculatorMeta[langHeader as keyof typeof marriagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = marriagecalculatorMeta[language as keyof typeof marriagecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('marriage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('marriage-calculator', 'en'),
        'pt-BR': getCanonicalUrl('marriage-calculator', 'br'),
        'pl': getCanonicalUrl('marriage-calculator', 'pl'),
        'de': getCanonicalUrl('marriage-calculator', 'de'),
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

export default async function MarriageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
