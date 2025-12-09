import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for rent-calculator
const rentcalculatorMeta = {
  en: {
    title: "Rent Calculator – Monthly Payments Online | TheSmartCalculator",
    description: "Use the Rent Calculator to calculate monthly rent payments and affordability. Accurate, free online tool for housing planning and budgeting.",
    keywords: "rent calculator, monthly payments, affordability tool, online rent, housing planning, budgeting tool, free rent tool, rent estimate"
  },
  br: {
    title: "Calculadora de Aluguel – Simule Valor e Ajustes de Contrato",
    description: "Use a Calculadora de Aluguel para calcular reajustes, valores e custos mensais. Planeje seu orçamento e contratos com precisão e rapidez online.",
    keywords: "calculadora aluguel, pagamentos mensais, ferramenta acessibilidade, online aluguel, planejamento habitação, ferramenta orçamento, gratuita ferramenta aluguel, estimativa aluguel"
  },
  pl: {
    title: "Kalkulator Czynszu – Oblicz Wysokość Czynszu Online",
    description: "Użyj kalkulatora czynszu online, aby obliczyć miesięczne opłaty, koszty najmu i zaliczki. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator czynszu, płatności miesięczne, narzędzie dostępności, online czynsz, planowanie mieszkaniowe, narzędzie budżetowe, darmowe narzędzie czynsz, estymacja czynszu"
  },
  de: {
    title: "Mietrechner – Ihre Mietkosten online berechnen",
    description: "Mit dem Mietrechner berechnen Sie Ihre monatliche Miete, Gesamtkosten über den Mietzeitraum und Vergleichswerte. Der Mietrechner hilft bei der Wohnkosten-Planung.",
    keywords: "mietrechner, monatszahlungen, affordabilität tool, online miete, wohnplanung, budget tool, kostenloser miete tool, miete schätzung"
  }
,
  es: {
    title: "Calculadora de Alquiler – Calcula Renta y Costos de tu Vivienda",
    description: "Utiliza nuestra calculadora de alquiler para estimar la renta, planificar los costos de tu vivienda y gestionar tu presupuesto de manera fácil y precisa.",
    keywords: "calculadora, alquiler, calcula, renta, costos, vivienda, utiliza, nuestra, estimar, planificar, gestionar, presupuesto, manera, fácil, precisa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && rentcalculatorMeta[langHeader as keyof typeof rentcalculatorMeta]
      ? langHeader
      : "en";

  const meta = rentcalculatorMeta[language as keyof typeof rentcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('rent-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('rent-calculator', 'en'),
        'es': getCanonicalUrl('rent-calculator', 'es'),
        'pt-BR': getCanonicalUrl('rent-calculator', 'br'),
        'pl': getCanonicalUrl('rent-calculator', 'pl'),
        'de': getCanonicalUrl('rent-calculator', 'de'),
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

export default async function RentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
