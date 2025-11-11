import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for ideal-weight-calculator
const idealweightcalculatorMeta = {
  en: {
    title: "Ideal Weight Calculator – Range Online | TheSmartCalculator",
    description: "Use the Ideal Weight Calculator to determine body weight range based on height and gender. Accurate, free online tool for health and fitness goals.",
    keywords: "ideal weight calculator, body weight range, height gender, online ideal, health fitness, free weight tool, range based, determine weight"
  },
  br: {
    title: "Calculadora de Peso Ideal – Descubra Seu Peso Saudável",
    description: "Use a Calculadora de Peso Ideal para saber o peso adequado para sua altura e idade. Acompanhe sua saúde e forma física com precisão online.",
    keywords: "calculadora peso ideal, faixa peso corporal, altura gênero, online ideal, saúde fitness, gratuita ferramenta peso, baseado faixa, determinar peso"
  },
  pl: {
    title: "Kalkulator Idealnej Wagi – Oblicz Wagę Ciała Online",
    description: "Użyj kalkulatora idealnej wagi online, aby sprawdzić swoją wagę optymalną według wzrostu i płci. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator idealnej wagi, zakres wagi ciała, wzrost płeć, online idealna, zdrowie fitness, darmowe narzędzie waga, zakres bazowany, określić wagę"
  },
  de: {
    title: "Idealgewicht Rechner – Finde dein optimales Körpergewicht",
    description: "Berechne mit dem Idealgewicht Rechner dein optimales Körpergewicht. Schnell, genau & kostenlos – ideal für Gesundheit, Fitness und Wohlbefinden!",
    keywords: "idealgewicht rechner, körpergewicht bereich, höhe geschlecht, online ideal, gesundheit fitness, kostenloser gewicht tool, bereich basierend, gewicht bestimmen"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && idealweightcalculatorMeta[langHeader as keyof typeof idealweightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = idealweightcalculatorMeta[language as keyof typeof idealweightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ideal-weight-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }ideal-weight-calculator`,
      languages: {
        'en': getCanonicalUrl('ideal-weight-calculator', 'en'),
        'pt-BR': getCanonicalUrl('ideal-weight-calculator', 'br'),
        'pl': getCanonicalUrl('ideal-weight-calculator', 'pl'),
        'de': getCanonicalUrl('ideal-weight-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }ideal-weight-calculator`,
    },
  };
}

export default async function IdealWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
