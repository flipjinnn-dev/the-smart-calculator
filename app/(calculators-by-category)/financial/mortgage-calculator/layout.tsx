import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for mortgage-calculator
const mortgagecalculatorMeta = {
  en: {
    title: "Mortgage Calculator – Payments Interest Online | TheSmartCalculator",
    description: "Use the Mortgage Calculator to calculate monthly payments, total interest, and amortization schedule. Accurate, free online tool for home financing.",
    keywords: "mortgage calculator, monthly payments, total interest, amortization schedule, online mortgage, home financing, free mortgage tool, interest calculation"
  },
  br: {
    title: "Simulador de Hipoteca Online – Cálculo de Financiamento",
    description: "Use o Simulador de Hipoteca para calcular parcelas, juros e prazos. Planeje seu financiamento imobiliário com precisão e resultados rápidos.",
    keywords: "simulador hipoteca, pagamentos mensais, interesse total, cronograma amortização, online hipoteca, financiamento casa, gratuita ferramenta hipoteca, cálculo interesse"
  },
  pl: {
    title: "Kalkulator Kredytu Hipotecznego – Oblicz Ratę Online",
    description: "Użyj kalkulatora kredytu hipotecznego online, aby obliczyć raty, odsetki i całkowity koszt kredytu. Szybkie, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator kredytu hipotecznego, raty miesięczne, całkowite odsetki, harmonogram amortyzacji, online hipoteczny, finansowanie domu, darmowe narzędzie hipoteczne, obliczenia odsetek"
  },
  de: {
    title: "Hypothekenrechner – Online Baufinanzierung und Immobilienkredit",
    description: "Mit dem Hypothekenrechner ermitteln Sie Ihre Monatsrate, Zinssatz und Restschuld – ideal für Ihre Immobilienfinanzierung mit präzisen Online-Tools.",
    keywords: "hypothekenrechner, monatliche zahlungen, gesamt zinsen, amortisationsplan, online hypothek, hausfinanzierung, kostenloser hypothek tool, zins berechnung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && mortgagecalculatorMeta[langHeader as keyof typeof mortgagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = mortgagecalculatorMeta[language as keyof typeof mortgagecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('mortgage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('mortgage-calculator', 'en'),
        'pt-BR': getCanonicalUrl('mortgage-calculator', 'br'),
        'pl': getCanonicalUrl('mortgage-calculator', 'pl'),
        'de': getCanonicalUrl('mortgage-calculator', 'de'),
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

export default async function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
