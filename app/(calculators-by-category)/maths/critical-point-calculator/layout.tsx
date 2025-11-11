import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for critical-point-calculator
const criticalpointcalculatorMeta = {
  en: {
    title: "Critical Point Calculator – Function Online | TheSmartCalculator",
    description: "Use the Critical Point Calculator to find critical points of functions. Accurate, free online tool for math analysis, extrema, and calculus problems.",
    keywords: "critical point calculator, function tool, extrema calculation, online critical, math analysis, calculus problems, free point tool, find points"
  },
  br: {
    title: "Calculadora Ponto Crítico – Função Online | TheSmartCalculator",
    description: "Use a Calculadora Ponto Crítico para encontrar pontos críticos de funções. Ferramenta precisa para análise matemática, extremos e problemas de cálculo.",
    keywords: "calculadora ponto crítico, função tool, extremos cálculo, online crítico, análise matemática, problemas cálculo, gratuita tool"
  },
  pl: {
    title: "Kalkulator Punktu Krytycznego – Funkcja Online | TheSmartCalculator",
    description: "Użyj kalkulatora punktu krytycznego online, aby znaleźć punkty krytyczne funkcji. Dokładne, darmowe narzędzie do analizy matematycznej i ekstremów.",
    keywords: "kalkulator punktu krytycznego, funkcja tool, ekstremy obliczenia, online krytyczny, analiza matematyczna, problemy kalkulus, darmowy tool"
  },
  de: {
    title: "Kritische Punkte Rechner – Extrema Berechnen | TheSmartCalculator",
    description: "Berechne mit dem Kritische Punkte Rechner Extrema & Wendepunkte von Funktionen. Schnell, exakt & kostenlos – ideal für Schule & Studium in Analysis!",
    keywords: "kritische punkte rechner, extrema berechnen, wendepunkte tool, funktionen online, schule studium, exakt kostenlos, ideal rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && criticalpointcalculatorMeta[langHeader as keyof typeof criticalpointcalculatorMeta]
      ? langHeader
      : "en";

  const meta = criticalpointcalculatorMeta[language as keyof typeof criticalpointcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('critical-point-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }critical-point-calculator`,
      languages: {
        'en': getCanonicalUrl('critical-point-calculator', 'en'),
        'pt-BR': getCanonicalUrl('critical-point-calculator', 'br'),
        'pl': getCanonicalUrl('critical-point-calculator', 'pl'),
        'de': getCanonicalUrl('critical-point-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }critical-point-calculator`,
    },
  };
}

export default async function CriticalPointCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
