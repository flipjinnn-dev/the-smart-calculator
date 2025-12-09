import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for amortization-calculator
const amortizationcalculatorMeta = {
  en: {
    title: "Amortization Calculator – Loan Schedules Online | TheSmartCalculator",
    description: "Use the Amortization Calculator to generate detailed loan schedules with payments, interest, and balance. Accurate, free online tool for financial planning and debt management.",
    keywords: "amortization calculator, loan schedules, payment details, interest calculation, online amortization, debt tool, free loan calculator, balance tracker"
  },
  br: {
    title: "Calculadora de Amortização – Parcelas Juros | TheSmartCalculator",
    description: "Use a Calculadora de Amortização para calcular parcelas, juros e saldo devedor. Planeje seus financiamentos com precisão e facilidade online em detalhes completos.",
    keywords: "calculadora amortização, calcular parcelas, juros saldo, planejamento financiamentos, online amortização, precisa tool, detalhada calculadora"
  },
  pl: {
    title: "Kalkulator Amortyzacji – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora amortyzacji online, aby obliczyć koszt i wartość środka trwałego. Proste, dokładne i darmowe narzędzie finansowe dla firm i planowania.",
    keywords: "kalkulator amortyzacji, obliczyć koszt, wartość trwałego, narzędzie finansowe, firmy planowanie, darmowy kalkulator, dokładne obliczenia"
  },
  de: {
    title: "Tilgungsrechner – Darlehen Online Berechnen | TheSmartCalculator",
    description: "Berechnen Sie mit dem Tilgungsrechner Ihre monatliche Rate, Laufzeit und Restschuld. Planen Sie Ihre Rückzahlung transparent und effizient online mit Details.",
    keywords: "tilgungsrechner, darlehen berechnen, monatliche rate, laufzeit restsuld, online rückzahlung, transparent planung, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Amortización – Calcula Pagos Fácilmente",
    description: "Calcula tu amortización al instante y conoce tus pagos mensuales. ¡Planifica tu préstamo de forma sencilla y toma decisiones financieras inteligentes",
    keywords: "calculadora, amortización, calcula, pagos, fácilmente, instante, conoce, mensuales, planifica, préstamo, forma, sencilla, toma, decisiones, financieras"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && amortizationcalculatorMeta[langHeader as keyof typeof amortizationcalculatorMeta]
      ? langHeader
      : "en";

  const meta = amortizationcalculatorMeta[language as keyof typeof amortizationcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('amortization-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('amortization-calculator', 'en'),
        'es': getCanonicalUrl('amortization-calculator', 'es'),
        'pt-BR': getCanonicalUrl('amortization-calculator', 'br'),
        'pl': getCanonicalUrl('amortization-calculator', 'pl'),
        'de': getCanonicalUrl('amortization-calculator', 'de'),
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

export default async function AmortizationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
