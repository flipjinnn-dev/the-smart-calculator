import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for mortgage-payoff-calculator
const mortgagepayoffcalculatorMeta = {
  en: {
    title: "Mortgage Payoff Calculator – Date Savings Online | TheSmartCal",
    description: "Use the Mortgage Payoff Calculator to estimate payoff date and interest savings. Accurate, free online tool for early repayment planning.",
    keywords: "mortgage payoff calculator, payoff date, interest savings, online payoff, early repayment, free payoff tool, savings calculation, mortgage planning"
  },
  br: {
    title: "Calculadora de Spłaty Kredytu Hipotecznego – Oblicz Ratę",
    description: "Użyj kalkulatora spłaty kredytu hipotecznego online, aby obliczyć raty, odsetki i całkowity koszt. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "calculadora spłata hipoteki, data spłaty, oszczędności odsetek, online spłata, wczesna spłata, gratuita ferramenta spłata, cálculo oszczędności, planejamento hipoteca"
  },
  pl: {
    title: "Kalkulator Spłaty Kredytu Hipotecznego – Oblicz Online",
    description: "Użyj kalkulatora spłaty kredytu hipotecznego online, aby obliczyć datę spłaty i oszczędności odsetek. Dokładne, darmowe narzędzie do planowania wczesnej spłaty.",
    keywords: "kalkulator spłaty kredytu hipotecznego, data spłaty, oszczędności odsetek, online spłata, wczesna spłata, darmowe narzędzie spłata, obliczenia oszczędności, planowanie hipoteki"
  },
  de: {
    title: "Mortgage Payoff Calculator – Date Savings Online | TheSmartCal",
    description: "Nutzen Sie den mortgage payoff  – date savings online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kon.",
    keywords: "hypotheken tilgungsrechner, tilgungs datum, zins ersparnis, online tilgung, frühe repayment, kostenloser tilgung tool, sparen berechnung, hypothek planung"
  }
,
  es: {
    title: "Calculadora de Liquidación de Hipotecas – Calcula Fácil",
    description: "Calcula la liquidación de tu hipoteca al instante y conoce tus pagos finales. ¡Ahorra tiempo y planifica tu deuda de manera inteligente ahora!",
    keywords: "calculadora, liquidación, hipotecas, calcula, fácil, hipoteca, instante, conoce, pagos, finales, ahorra, tiempo, planifica, deuda, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && mortgagepayoffcalculatorMeta[langHeader as keyof typeof mortgagepayoffcalculatorMeta]
      ? langHeader
      : "en";

  const meta = mortgagepayoffcalculatorMeta[language as keyof typeof mortgagepayoffcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('mortgage-payoff-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('mortgage-payoff-calculator', 'en'),
        'pt-BR': getCanonicalUrl('mortgage-payoff-calculator', 'br'),
        'pl': getCanonicalUrl('mortgage-payoff-calculator', 'pl'),
        'de': getCanonicalUrl('mortgage-payoff-calculator', 'de'),
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

export default async function MortgagePayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
