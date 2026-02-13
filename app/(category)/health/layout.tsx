import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for health
const healthMeta = {
  en: {
    title: "Health and Fitness Calculators",
    description: "Use free health and fitness calculators online to track BMI, calories, heart rate, medical metrics and financial health for smarter wellness goals.",
    keywords: "health calculator, fitness calculator online, free fitness calculators, health fitness calculator, health calculator online, medical calculator online, medicine calculator online, BMI calculator, calorie calculator, body fat calculator"
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
  },
  es: {
    title: "Calculadora de Salud – BMI, Calorías y Más | TheSmartCalculator",
    description: "Usa la Calculadora de Salud para medir IMC, calorías, metabolismo y otras métricas. Herramienta online gratuita y precisa para seguimiento de salud, dieta y fitness.",
    keywords: "calculadora de salud, herramienta bmi, calculadora de calorías, seguimiento metabolismo, salud online"
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
        'x-default': getCategoryCanonicalUrl('health', 'en'),
        'en': getCategoryCanonicalUrl('health', 'en'),
        'pt-BR': getCategoryCanonicalUrl('health', 'br'),
        'pl': getCategoryCanonicalUrl('health', 'pl'),
        'de': getCategoryCanonicalUrl('health', 'de'),
        'es': getCategoryCanonicalUrl('health', 'es'),
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

export default async function HealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
