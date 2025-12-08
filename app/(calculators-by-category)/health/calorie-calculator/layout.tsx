import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for calorie-calculator
const caloriecalculatorMeta = {
  en: {
    title: "Calorie Calculator – Daily Needs Online | TheSmartCalculator",
    description: "Use the Calorie Calculator to estimate daily needs based on lifestyle and goals. Accurate, free online tool for diet, weight management, and health planning.",
    keywords: "calorie calculator, daily needs, lifestyle tool, goals calculation, online calorie, diet management, free calorie tool, health planning"
  },
  br: {
    title: "Calculadora de Calorias – Gasto Diário Online",
    description: "Use a Calculadora de Calorias para controlar seu consumo e gasto diário. Planeje sua dieta e alcance seus objetivos de saúde com precisão.",
    keywords: "calculadora de calorias, gasto diário, consumo controle, dieta planejamento, objetivos saúde, precisa tool, métricas calorias"
  },
  pl: {
    title: "Kalkulator Kalorii – Spożycie Online | TheSmartCalculator",
    description: "Użyj kalkulatora kalorii online, aby obliczyć dzienne spożycie kalorii i zbilansować dietę. Proste, dokładne i darmowe narzędzie zdrowotne do celów.",
    keywords: "kalkulator kalorii, spożycie dzienne, zbilansować dietę, narzędzie zdrowotne, online kalorii, dokładne obliczenia, darmowy tool"
  },
  de: {
    title: "Kalorienrechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kalorienrechner deinen täglichen Kalorienbedarf. Ideal für Abnehmen, Muskelaufbau & gesunde Ernährung – schnell & kostenlos!",
    keywords: "kalorienrechner, bedarf berechnen, täglichen kalorien, abnehmen muskelaufbau, gesunde ernährung, schnell tool, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Calorías – Calcula tu Ingesta Diaria Fácil",
    description: "Calcula tus calorías diarias al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y alcanza tus metas de nutrición y salud ahora mismo!",
    keywords: "calculadora, calorías, calcula, ingesta, diaria, fácil, diarias, instante, nuestra, herramienta, precisa, optimiza, dieta, alcanza, metas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && caloriecalculatorMeta[langHeader as keyof typeof caloriecalculatorMeta]
      ? langHeader
      : "en";

  const meta = caloriecalculatorMeta[language as keyof typeof caloriecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('calorie-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }calorie-calculator`,
      languages: {
        'en': getCanonicalUrl('calorie-calculator', 'en'),
        'pt-BR': getCanonicalUrl('calorie-calculator', 'br'),
        'pl': getCanonicalUrl('calorie-calculator', 'pl'),
        'de': getCanonicalUrl('calorie-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }calorie-calculator`,
    },
  };
}

export default async function CalorieCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calorie Calculator",
    "url": "https://www.thesmartcalculator.com/health/calorie-calculator",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "description": "Free online Calorie Calculator to estimate daily calorie needs for maintenance, weight loss, or weight gain based on age, gender, height, weight, and activity level.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/images/logo.png"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Daily Calorie Needs Calculator",
      "Weight Loss Calorie Estimation",
      "Weight Gain Calorie Estimation",
      "Activity Level Adjustments",
      "Basal Metabolic Rate (BMR) Calculation"
    ],
    "mainEntity": {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/calorie-calculator",
      "name": "Calorie Calculator",
      "isPartOf": {
        "@type": "WebSite",
        "url": "https://www.thesmartcalculator.com"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/health/calorie-calculator"
    },
    "faq": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Calorie Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A calorie calculator estimates how many calories your body needs daily based on age, gender, height, weight, and activity level."
          }
        },
        {
          "@type": "Question",
          "name": "How accurate is the Calorie Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator provides an estimate using standard BMR and activity formulas like Mifflin-St Jeor. Actual calorie needs may vary based on metabolism, health conditions, and lifestyle."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use the Calorie Calculator for weight loss?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The tool shows daily calories for weight maintenance, as well as reduced-calorie recommendations for weight loss."
          }
        }
      ]
    }
  }
  return <>
    {children}
    <Script
      id="calorie-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
