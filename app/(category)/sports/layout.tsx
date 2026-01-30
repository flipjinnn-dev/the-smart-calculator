import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for sports
const sportsMeta = {
  en: {
    title: "Sports Calculator – Performance & Calories Tool | TheSmartCalculator",
    description: "Use the Sports Calculator to measure performance, calories burned, and training goals. Accurate, free online tool for athletes and enthusiasts in sports analysis.",
    keywords: "sports calculator, performance tool, calories burned, training goals, online sports, athlete calculator, free sports tool, enthusiasm analysis"
  },
  br: {
    title: "Calculadora de Esportes – Desempenho Online | TheSmartCalculator",
    description: "Use a Calculadora de Esportes para medir desempenho, calorias e metas de treino. Ferramenta online rápida e precisa para atletas e entusiastas em análise.",
    keywords: "calculadora de esportes, medir desempenho, calorias metas, ferramenta esportes online, atletas calculadora, análise treino, precisa esportes"
  },
  pl: {
    title: "Kalkulator Lekkoatletyka – Wyniki Sportowe | TheSmartCalculator",
    description: "Użyj kalkulatora lekkoatletyka online, aby łatwo obliczyć wyniki, tempo i dystans. Proste, szybkie i dokładne narzędzie dla fanów lekkoatletyki i sportu.",
    keywords: "kalkulator lekkoatletyka, obliczyć wyniki, tempo dystans, narzędzie sportowe online, fani lekkoatletyki, dokładne obliczenia, darmowy kalkulator"
  },
  de: {
    title: "Sport Rechner – Fitness Leistung Online | TheSmartCalculator",
    description: "Sport online berechnen: Finden Sie Tools für Training, Fitness und Leistung. Analysieren Sie Sport und Fortschritte mit präzisen Online-Berechnungen für Athleten.",
    keywords: "sport rechner, fitness tools, leistung berechnen, training analyser, online sport, fortschritte tool, kostenloser rechner"
  },
  es: {
    title: "Calculadora de Deportes – Rendimiento y Calorías | TheSmartCalculator",
    description: "Mide tu rendimiento deportivo, calorías quemadas y objetivos de entrenamiento. Herramienta online gratuita y precisa para atletas y entusiastas del deporte.",
    keywords: "calculadora de deportes, herramienta de rendimiento, calorías quemadas, objetivos de entrenamiento"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && sportsMeta[langHeader as keyof typeof sportsMeta]
      ? langHeader
      : "en";

  const meta = sportsMeta[language as keyof typeof sportsMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('sports', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('sports', 'en'),
        'en': getCategoryCanonicalUrl('sports', 'en'),
        'pt-BR': getCategoryCanonicalUrl('sports', 'br'),
        'pl': getCategoryCanonicalUrl('sports', 'pl'),
        'de': getCategoryCanonicalUrl('sports', 'de'),
        'es': getCategoryCanonicalUrl('sports', 'es'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
