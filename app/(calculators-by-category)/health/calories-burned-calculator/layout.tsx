import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for calories-burned-calculator
const caloriesburnedcalculatorMeta = {
  en: {
    title: "Calories Burned Calculator",
    description: "Estimate calories burned during workouts using our Calories Burned Calculator for fitness tracking.",
    keywords: "calories burned calculator, activity tool, estimate calories, online burned, fitness tracker, weight loss, free calories tool, exercise planning"
  },
  br: {
    title: "Calculadora de Calorias Queimadas",
    description: "Use a calculadora de calorias queimadas para calcular seu gasto energético. Planeje seus treinos e veja calorias queimadas agora mesmo!",
    keywords: "calculadora de calorias queimadas, atividade tool, estimar calorias, online queimadas, fitness rastreador, perda peso, gratuita tool"
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
,
  es: {
    title: "Calculadora de Calorías Quemadas – Calcula Fácil y Rápido",
    description: "Calcula las calorías quemadas al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y alcanza tus metas fitness ahora mismo",
    keywords: "calculadora, calorías, quemadas, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, alcanza, metas, fitness"
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
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('calories-burned-calculator', 'en'),
        'en': getCanonicalUrl('calories-burned-calculator', 'en'),
        'es': getCanonicalUrl('calories-burned-calculator', 'es'),
        'pt-BR': getCanonicalUrl('calories-burned-calculator', 'br'),
        'pl': getCanonicalUrl('calories-burned-calculator', 'pl'),
        'de': getCanonicalUrl('calories-burned-calculator', 'de'),
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

export default async function CaloriesBurnedCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.thesmartcalculator.com/health/calories-burned-calculator",
    "name": "Calories Burned Calculator - Estimate Calories Burned by Activity",
    "description": "Use the Calories Burned Calculator to estimate how many calories you burn during different activities based on MET values, your weight, and duration.",
    "inLanguage": "en",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Calories Burned Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "url": "https://www.thesmartcalculator.com/health/calories-burned-calculator",
      "about": {
        "@type": "Thing",
        "name": "Calories Burned",
        "description": "Estimation of calories burned using MET values, activity type, body weight, and duration of exercise."
      },
      "featureList": [
        "Select activity type (walking, running, cycling, swimming, etc.)",
        "Enter duration in minutes",
        "Enter body weight in kg/lbs",
        "Calculate estimated calories burned instantly"
      ]
    },
    "faq": [
      {
        "@type": "Question",
        "name": "How is calorie burn calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calories are estimated using the formula: Calories = Time(min) × MET × Weight(kg) × 0.0175."
        }
      },
      {
        "@type": "Question",
        "name": "What are MET values?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MET (Metabolic Equivalent of Task) represents the energy cost of physical activities. 1 MET equals resting energy expenditure."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This calculator provides approximate estimates. Actual calorie burn can vary based on age, sex, fitness level, and other factors."
        }
      }
    ]
  }
  return <>
    {children}
    <Script
      id="calories-burned-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
