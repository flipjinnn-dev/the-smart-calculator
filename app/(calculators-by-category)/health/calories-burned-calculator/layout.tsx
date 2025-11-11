import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for calories-burned-calculator
const caloriesburnedcalculatorMeta = {
  en: {
    title: "Calories Burned Calculator – Activity Online | TheSmartCalculator",
    description: "Use the Calories Burned Calculator to estimate calories during physical activities. Accurate, free online tool for fitness tracking, weight loss, and exercise planning.",
    keywords: "calories burned calculator, activity tool, estimate calories, online burned, fitness tracker, weight loss, free calories tool, exercise planning"
  },
  br: {
    title: "Calories Burned Calculator – Activity Online | TheSmartCalcula",
    description: "Use a Calculadora Calorias Queimadas para estimar calorias em atividades físicas. Ferramenta precisa para rastreamento de fitness, perda de peso e planejamento de exercícios.",
    keywords: "calculadora calorias queimadas, atividade tool, estimar calorias, online queimadas, fitness rastreador, perda peso, gratuita tool"
  },
  pl: {
    title: "Kalkulator Spalonych Kalorii – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora spalonych kalorii online, aby obliczyć ilość kalorii spalonych podczas ćwiczeń. Proste, szybkie i dokładne narzędzie zdrowotne do fitness.",
    keywords: "kalkulator spalonych kalorii, obliczyć kalorie, ćwiczenia tool, narzędzie zdrowotne, online spalone, szybkie dokładne, darmowy tool"
  },
  de: {
    title: "Kalorienverbrauch Rechner – Verbrauch Berechnen | TheSmartCalculator",
    description: "Nutzen Sie den calories burned  – activity online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kontext.",
    keywords: "kalorienverbrauch rechner, verbrauch berechnen, täglichen bedarf, energie aktivitäten, online rechner, gesundheit tool, nutzen rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && caloriesburnedcalculatorMeta[langHeader as keyof typeof caloriesburnedcalculatorMeta]
      ? langHeader
      : "en";

  const meta = caloriesburnedcalculatorMeta[language as keyof typeof caloriesburnedcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('calories-burned-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }calories-burned-calculator`,
      languages: {
        'en': getCanonicalUrl('calories-burned-calculator', 'en'),
        'pt-BR': getCanonicalUrl('calories-burned-calculator', 'br'),
        'pl': getCanonicalUrl('calories-burned-calculator', 'pl'),
        'de': getCanonicalUrl('calories-burned-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }calories-burned-calculator`,
    },
  };
}

export default async function CaloriesBurnedCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
