import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for income-tax-calculator
const incometaxcalculatorMeta = {
  en: {
    title: "Income Tax Calculator – Deductions Online | TheSmartCalculator",
    description: "Use the Income Tax Calculator to compute tax based on various deductions and exemptions. Accurate, free online tool for tax preparation and financial planning.",
    keywords: "income tax calculator, tax computation, deductions tool, exemptions, online tax, tax preparation, financial planning, free tax tool"
  },
  br: {
    title: "Calculadora de Imposto de Renda – Simule e Calcule Online",
    description: "Use a Calculadora de Imposto de Renda para simular valores e deduções. Descubra quanto pagar ou receber com cálculos rápidos e precisos online.",
    keywords: "calculadora imposto renda, computação imposto, ferramenta deduções, isenções, online imposto, preparação imposto, planejamento financeiro, gratuita ferramenta imposto"
  },
  pl: {
    title: "Kalkulator Podatku Dochodowego – Oblicz Podatek Online",
    description: "Użyj kalkulatora podatku dochodowego online, aby obliczyć należny podatek, ulgi i dochód netto. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator podatku dochodowego, obliczenia podatku, narzędzie ulgi, zwolnienia, online podatek, przygotowanie podatku, planowanie finansowe, darmowe narzędzie podatek"
  },
  de: {
    title: "Einkommensteuerrechner – Ihre Steuerbelastung online ermitteln",
    description: "Mit dem Einkommensteuerrechner berechnen Sie Ihre Einkommens- und Steuerlast genau. Nutzen Sie den Einkommensteuerrechner zur besseren Finanzplanung und Vorbereitung.",
    keywords: "einkommensteuerrechner, steuer berechnung, abzug tool, freistellungen, online steuer, steuervorbereitung, finanzplanung, kostenloser steuer tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && incometaxcalculatorMeta[langHeader as keyof typeof incometaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = incometaxcalculatorMeta[language as keyof typeof incometaxcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('income-tax-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('income-tax-calculator', 'en'),
        'pt-BR': getCanonicalUrl('income-tax-calculator', 'br'),
        'pl': getCanonicalUrl('income-tax-calculator', 'pl'),
        'de': getCanonicalUrl('income-tax-calculator', 'de'),
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

export default async function IncomeTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
