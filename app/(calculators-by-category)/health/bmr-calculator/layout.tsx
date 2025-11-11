import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for bmr-calculator
const bmrcalculatorMeta = {
  en: {
    title: "BMR Calculator – Metabolic Rate Online | TheSmartCalculator",
    description: "Use the BMR Calculator to estimate your Basal Metabolic Rate for calorie needs. Accurate, free online tool based on age, weight, height for diet planning.",
    keywords: "bmr calculator, metabolic rate, calorie needs, age weight tool, online bmr, diet planning, free bmr calculator, basal rate"
  },
  br: {
    title: "Calculadora TMB – Taxa Metabólica Online | TheSmartCalculator",
    description: "Use a Calculadora TMB para descobrir quantas calorias seu corpo gasta em repouso. Ajuste sua dieta e treino com resultados rápidos e precisos baseados em dados.",
    keywords: "calculadora tmb, taxa metabólica, calorias repouso, dieta treino, online tmb, resultados rápidos, precisa calculadora"
  },
  pl: {
    title: "Kalkulator BMR – Przemiana Materii Online | TheSmartCalculator",
    description: "Użyj kalkulatora BMR online, aby obliczyć dzienne zapotrzebowanie kaloryczne i podstawową przemianę materii. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator bmr, przemiana materii, zapotrzebowanie kaloryczne, narzędzie zdrowotne, online bmr, dokładne obliczenia, darmowy tool"
  },
  de: {
    title: "BMR Rechner – Stoffwechselrate Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem BMR Rechner deine Basale Stoffwechselrate für Kalorienbedarf. Präzises, kostenloses Tool basierend auf Alter, Gewicht, Größe für Diätplanung.",
    keywords: "bmr rechner, stoffwechselrate berechnen, kalorienbedarf tool, alter gewicht, online bmr, diätplanung, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bmrcalculatorMeta[langHeader as keyof typeof bmrcalculatorMeta]
      ? langHeader
      : "en";

  const meta = bmrcalculatorMeta[language as keyof typeof bmrcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('bmr-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('bmr-calculator', 'en'),
        'pt-BR': getCanonicalUrl('bmr-calculator', 'br'),
        'pl': getCanonicalUrl('bmr-calculator', 'pl'),
        'de': getCanonicalUrl('bmr-calculator', 'de'),
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

export default async function BmrCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
