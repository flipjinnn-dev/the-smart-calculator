import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for carbohydrate-calculator
const carbohydratecalculatorMeta = {
  en: {
    title: "Carbohydrate Calculator - Daily Carb Intake",
    description: "Track daily carb intake using our Carbohydrate Calculator for balanced nutrition planning.",
    keywords: "carbohydrate calculator, daily needs, activity tool, goals calculation, online carb, diet balancing, free carb tool, nutrition planning"
  },
  br: {
    title: "Calculadora Carboidratos – Ingestão Diária Ideal",
    description: "Use a Calculadora de Carboidratos para saber quantos consumir por dia. Equilibre sua dieta e mantenha energia e saúde com precisão online.",
    keywords: "calculadora carboidratos, ingestão diária, consumir dia, dieta equilíbrio, energia saúde, precisa online, metas calculadora"
  },
  pl: {
    title: "Kalkulator Węglowodanów – Spożycie Online | TheSmartCalculator",
    description: "Użyj kalkulatora węglowodanów online, aby obliczyć dzienne spożycie węglowodanów i kalorie. Proste, dokładne i darmowe narzędzie dietetyczne do planowania.",
    keywords: "kalkulator węglowodanów, spożycie dzienne, obliczyć kalorie, narzędzie dietetyczne, online węglowodany, dokładne darmowe, planowanie diety"
  },
  de: {
    title: "Kohlenhydrate Rechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kohlenhydrate Rechner deinen täglichen Bedarf. Ideal für Diät, Fitness & gesunde Ernährung – schnell, präzise und kostenlos online!",
    keywords: "kohlenhydrate rechner, bedarf berechnen, täglichen bedarf, diät fitness, gesunde ernährung, schnell präzise, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Carbohidratos – Controla tu Dieta Fácil",
    description: "Calcula tu ingesta diaria de carbohidratos al instante con nuestra herramienta precisa. ¡Optimiza tu alimentación y mejora tu salud ahora mismo",
    keywords: "calculadora, carbohidratos, controla, dieta, fácil, calcula, ingesta, diaria, instante, nuestra, herramienta, precisa, optimiza, alimentación, mejora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && carbohydratecalculatorMeta[langHeader as keyof typeof carbohydratecalculatorMeta]
      ? langHeader
      : "en";

  const meta = carbohydratecalculatorMeta[language as keyof typeof carbohydratecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('carbohydrate-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('carbohydrate-calculator', 'en'),
        'en': getCanonicalUrl('carbohydrate-calculator', 'en'),
        'es': getCanonicalUrl('carbohydrate-calculator', 'es'),
        'pt-BR': getCanonicalUrl('carbohydrate-calculator', 'br'),
        'pl': getCanonicalUrl('carbohydrate-calculator', 'pl'),
        'de': getCanonicalUrl('carbohydrate-calculator', 'de'),
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

export default async function CarbohydrateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.thesmartcalculator.com/#website",
        "url": "https://www.thesmartcalculator.com/",
        "name": "Smart Calculator",
        "publisher": {
          "@type": "Organization",
          "name": "Smart Calculator",
          "url": "https://www.thesmartcalculator.com/"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/health/carbohydrate-calculator#webpage",
        "url": "https://www.thesmartcalculator.com/health/carbohydrate-calculator",
        "name": "Carbohydrate Calculator",
        "isPartOf": { "@id": "https://www.thesmartcalculator.com/#website" },
        "description": "Free Carbohydrate Calculator that estimates daily carb needs using Mifflin-St Jeor or Katch-McArdle BMR formulas, activity level, and g/kg bodyweight recommendations.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.thesmartcalculator.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Health Calculators",
              "item": "https://www.thesmartcalculator.com/health/"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Carbohydrate Calculator",
              "item": "https://www.thesmartcalculator.com/health/carbohydrate-calculator"
            }
          ]
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "Carbohydrate Calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web",
          "url": "https://www.thesmartcalculator.com/health/carbohydrate-calculator",
          "description": "Calculate your daily carbohydrate needs based on your BMR, gender, age, weight, height, and activity level."
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the carbohydrate calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates your Basal Metabolic Rate (BMR) using either the Mifflin-St Jeor or Katch-McArdle formula, applies an activity multiplier to find your Total Daily Energy Expenditure (TDEE), and then converts a percentage of calories into grams of carbohydrates."
            }
          },
          {
            "@type": "Question",
            "name": "Which BMR formula should I use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mifflin-St Jeor is recommended for most people. If you know your body fat percentage, the Katch-McArdle formula provides a more accurate estimate of your calorie and carb needs."
            }
          },
          {
            "@type": "Question",
            "name": "How many carbs do I need per day?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "General guidelines recommend 45–65% of daily calories from carbohydrates. Athletes and active individuals may require 6–12 g/kg of bodyweight, while sedentary people may need closer to 3–5 g/kg."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="carbohydrate-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
