import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for target-heart-rate-calculator
const targetheartratecalculatorMeta = {
  en: {
    title: "Target Heart Rate Calculator – Zone Online | TheSmartCalculator",
    description: "Use the Target Heart Rate Calculator to calculate target heart rate zone for exercise. Accurate, free online tool for fitness and cardio training.",
    keywords: "target heart rate calculator, heart rate zone, exercise tool, online target, fitness training, cardio calculator, free heart tool, rate zone"
  },
  br: {
    title: "Target Heart Rate Calculator – Zone Online | TheSmartCalculato",
    description: "Use a Calculadora Frequência Cardíaca Alvo para calcular zona de frequência cardíaca para exercício. Ferramenta precisa e gratuita para fitness e treinamento cardio.",
    keywords: "calculadora frequência cardíaca alvo, zona frequência cardíaca, ferramenta exercício, online alvo, treinamento fitness, calculadora cardio, gratuita ferramenta coração, zona taxa"
  },
  pl: {
    title: "Kalkulator Docelowego Tętna – Strefa Online | TheSmartCalculator",
    description: "Użyj kalkulatora docelowego tętna online, aby obliczyć strefę tętna do ćwiczeń. Dokładne, darmowe narzędzie do fitness i treningu cardio.",
    keywords: "kalkulator docelowego tętna, strefa tętna, narzędzie ćwiczenia, online cel, trening fitness, kalkulator cardio, darmowe narzędzie serce"
  },
  de: {
    title: "Herzfrequenz Rechner – Berechne deine ideale Pulsrate",
    description: "Finde mit dem Herzfrequenz Rechner deine optimale Pulsrate. Einfach online berechnen – für Training, Gesundheit & Fitness, schnell und kostenlos!",
    keywords: "herzfrequenz rechner, herzfrequenz zone, übung tool, online ziel, fitness training, cardio rechner, kostenloser herz tool, rate zone"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && targetheartratecalculatorMeta[langHeader as keyof typeof targetheartratecalculatorMeta]
      ? langHeader
      : "en";

  const meta = targetheartratecalculatorMeta[language as keyof typeof targetheartratecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('target-heart-rate-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }target-heart-rate-calculator`,
      languages: {
        'en': getCanonicalUrl('target-heart-rate-calculator', 'en'),
        'pt-BR': getCanonicalUrl('target-heart-rate-calculator', 'br'),
        'pl': getCanonicalUrl('target-heart-rate-calculator', 'pl'),
        'de': getCanonicalUrl('target-heart-rate-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }target-heart-rate-calculator`,
    },
  };
}

export default async function TargetHeartRateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
