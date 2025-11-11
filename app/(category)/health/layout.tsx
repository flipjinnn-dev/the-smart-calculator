import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for health
const healthMeta = {
  en: {
    title: "Health Calculator – BMI Calories & More Tool | TheSmartCalculator",
    description: "Use the Health Calculator to measure BMI, calories, metabolism, and other metrics. Accurate, free online tool for tracking health, diet, and fitness progress.",
    keywords: "health calculator, bmi tool, calorie calculator, metabolism tracker, online health, diet metrics, fitness tool, free health calculator"
  },
  br: {
    title: "Calculadora de Saúde – IMC Calorias Online | TheSmartCalculator",
    description: "Use a Calculadora de Saúde para medir IMC, calorias e metabolismo. Acompanhe sua saúde online com resultados rápidos, precisos e métricas para dieta e fitness.",
    keywords: "calculadora de saúde, medir imc, calorias metabolismo, ferramenta saúde online, dieta resultados, fitness calculadora, saúde diária"
  },
  pl: {
    title: "Kalkulator Zdrowie – Oblicz Wskaźniki Online | TheSmartCalculator",
    description: "Użyj kalkulatora zdrowie online, aby łatwo obliczyć BMI, kalorie i inne wskaźniki zdrowia. Proste, szybkie i dokładne narzędzie dla Twojego zdrowia i diety.",
    keywords: "kalkulator zdrowie, obliczyć bmi, kalorie wskaźniki, narzędzie zdrowie online, dieta kalorie, dokładne obliczenia, darmowy kalkulator zdrowie"
  },
  de: {
    title: "Gesundheitsrechner – BMI Kalorien Online | TheSmartCalculator",
    description: "Unser Gesundheitsrechner hilft Ihnen, BMI, Kalorien und Blutdruck zu berechnen. Verwenden Sie den Gesundheitsrechner, um Ihre Gesundheit zu verbessern mit präzisen Metriken.",
    keywords: "gesundheitsrechner, bmi kalorien, blutdruck berechnen, gesundheit tool, online rechner, verbessern gesundheit, kostenloser gesundheits tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && healthMeta[langHeader as keyof typeof healthMeta]
      ? langHeader
      : "en";

  const meta = healthMeta[language as keyof typeof healthMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('health', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCategoryCanonicalUrl('health', 'en'),
        'pt-BR': getCategoryCanonicalUrl('health', 'br'),
        'pl': getCategoryCanonicalUrl('health', 'pl'),
        'de': getCategoryCanonicalUrl('health', 'de'),
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

export default async function HealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
