import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for financial
const financialMeta = {
  en: {
    title: "Financial Calculator – Loans & Investments Tool | TheSmartCalculator",
    description: "Use the Financial Calculator for loans, investments, interest, and budgeting. Accurate, free online tool to simulate scenarios, calculate payments, and plan finances effectively.",
    keywords: "financial calculator, loan calculator, investment tool, interest calculation, online finance, budgeting tool, payment simulator, free financial tool"
  },
  br: {
    title: "Calculadora Financeiro – Juros Investimentos | TheSmartCalculator",
    description: "Use a Calculadora Financeiro para simular juros, empréstimos e investimentos facilmente. Planeje suas finanças online com resultados rápidos, precisos e cenários detalhados.",
    keywords: "calculadora financeiro, simular juros, empréstimos calculadora, investimentos tool, planejamento finanças, calculadora online financeiro, resultados rápidos"
  },
  pl: {
    title: "Kalkulator Finansowy – Oblicz Finanse Online | TheSmartCalculator",
    description: "Skorzystaj z kalkulatora finansowego online, aby łatwo analizować dane finansowe. Proste narzędzie do szybkich i dokładnych obliczeń finansowych, symulacji i planowania.",
    keywords: "kalkulator finansowy, obliczyć finanse, dane finansowe, narzędzie finansowe, symulacja finansowa, dokładne obliczenia, darmowy kalkulator finansowy"
  },
  de: {
    title: "Finanziell Rechner – Budget Online Tool | TheSmartCalculator",
    description: "Nutzen Sie den financial  – loans & investments tool | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kont.",
    keywords: "finanziell rechner, budget berechnen, ersparnisse tool, investitionen kalkulator, online finanzplanung, schnelle berechnungen, kostenloser finanziell rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && financialMeta[langHeader as keyof typeof financialMeta]
      ? langHeader
      : "en";

  const meta = financialMeta[language as keyof typeof financialMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('financial', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCategoryCanonicalUrl('financial', 'en'),
        'pt-BR': getCategoryCanonicalUrl('financial', 'br'),
        'pl': getCategoryCanonicalUrl('financial', 'pl'),
        'de': getCategoryCanonicalUrl('financial', 'de'),
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

export default async function FinancialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
