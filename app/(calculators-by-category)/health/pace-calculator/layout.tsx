import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for pace-calculator
const pacecalculatorMeta = {
  en: {
    title: "Pace Calculator – Running Speed Online | TheSmartCalculator",
    description: "Use the Pace Calculator to calculate your running pace and speed. Accurate, free online tool for training and performance tracking.",
    keywords: "pace calculator, running pace, speed calculation, online pace, training tool, performance tracking, free pace tool, running estimator"
  },
  br: {
    title: "Calculadora de Ritmo – Calcule o Ciclo Menstrual e Ovulação",
    description: "Use a Calculadora de Ritmo para identificar dias férteis e ovulação. Planeje ou evite a gravidez com precisão e acompanhamento fácil online.",
    keywords: "calculadora ritmo, ritmo corrida, cálculo velocidade, online ritmo, ferramenta treinamento, rastreamento desempenho, gratuita ferramenta ritmo, estimador corrida"
  },
  pl: {
    title: "Kalkulator Tempa – Oblicz Swoje Tempo Biegu Online",
    description: "Użyj kalkulatora tempa online, aby obliczyć swoje tempo biegu, czas i dystans. Proste, szybkie i dokładne narzędzie dla biegaczy i sportowców.",
    keywords: "kalkulator tempa, tempo biegu, obliczenia prędkości, online tempo, narzędzie treningowe, tracking wydajności, darmowe narzędzie tempo, estymator biegu"
  },
  de: {
    title: "Temporechner – Laufgeschwindigkeit & Pace online berechnen",
    description: "Berechnen Sie mit dem Temporechner Ihre Laufgeschwindigkeit, Pace (min/km) und benötigte Zeit für jede Strecke. Ideal für Läufer, Radfahrer und Sportler zur Trainingsplanung.",
    keywords: "temporechner, lauf tempo, geschwindigkeit berechnung, online tempo, training tool, leistungs tracking, kostenloser tempo tool, lauf schätzer"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pacecalculatorMeta[langHeader as keyof typeof pacecalculatorMeta]
      ? langHeader
      : "en";

  const meta = pacecalculatorMeta[language as keyof typeof pacecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pace-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }pace-calculator`,
      languages: {
        'en': getCanonicalUrl('pace-calculator', 'en'),
        'pt-BR': getCanonicalUrl('pace-calculator', 'br'),
        'pl': getCanonicalUrl('pace-calculator', 'pl'),
        'de': getCanonicalUrl('pace-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }pace-calculator`,
    },
  };
}

export default async function PaceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
