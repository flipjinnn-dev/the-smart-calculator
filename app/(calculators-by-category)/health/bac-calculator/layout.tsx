import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for bac-calculator
const baccalculatorMeta = {
  en: {
    title: "BAC Calculator – Blood Alcohol Content Online | TheSmartCalculator",
    description: "Use the BAC Calculator to estimate blood alcohol content from drinks consumed. Accurate, free online tool for safety checks and legal limits awareness.",
    keywords: "bac calculator, blood alcohol, content estimate, drinks tool, online bac, safety calculator, free alcohol tool, legal limits"
  },
  br: {
    title: "Calculadora BAC – Nível Álcool Sangue Online | TheSmartCalculator",
    description: "Use a Calculadora BAC para estimar o nível de álcool no sangue após beber. Saiba se está dentro do limite seguro para dirigir com precisão.",
    keywords: "calculadora bac, nível álcool, sangue estimar, limite seguro, dirigir tool, online bac, precisa calculadora"
  },
  pl: {
    title: "Kalkulator Stężenia Alkoholu – BAC Online | TheSmartCalculator",
    description: "Użyj kalkulatora stężenia alkoholu we krwi online, aby obliczyć poziom alkoholu i bezpieczne granice. Proste, szybkie i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator stężenia alkoholu, obliczyć bac, poziom alkoholu, bezpieczne granice, narzędzie zdrowotne, proste szybkie, darmowy tool"
  },
  de: {
    title: "Blutalkohol Rechner – Promille Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Blutalkohol Rechner (Promillerechner) deinen Alkoholwert im Blut. Schnell, genau & kostenlos – ideal für sichere Entscheidungen und Grenzen!",
    keywords: "blutalkohol rechner, promille berechnen, alkoholwert blut, schnell tool, online promille, sichere entscheidungen, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && baccalculatorMeta[langHeader as keyof typeof baccalculatorMeta]
      ? langHeader
      : "en";

  const meta = baccalculatorMeta[language as keyof typeof baccalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('bac-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }bac-calculator`,
      languages: {
        'en': getCanonicalUrl('bac-calculator', 'en'),
        'pt-BR': getCanonicalUrl('bac-calculator', 'br'),
        'pl': getCanonicalUrl('bac-calculator', 'pl'),
        'de': getCanonicalUrl('bac-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }bac-calculator`,
    },
  };
}

export default async function BacCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
