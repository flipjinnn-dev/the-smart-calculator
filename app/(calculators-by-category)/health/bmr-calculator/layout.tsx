import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for bmr-calculator
const bmrcalculatorMeta = {
  en: {
    title: "BMR Calculator – Metabolic Rate Online | TheSmartCalculator",
    description: "Use the BMR Calculator to estimate your Basal Metabolic Rate for calorie needs. Accurate, free online tool based on age, weight, height for diet planning.",
    keywords: "bmr calculator, metabolic rate, calorie needs, age weight tool, online bmr, diet planning, free bmr calculator, basal rate"
  },
  br: {
    title: "Calculadora TMB – Taxa Metabólica Online | TheSmartCalculator",
    description: "Use a Calculadora TMB para descobrir quantas calorias seu corpo gasta em repouso. Ajuste sua dieta e treino com resultados rápidos e precisos baseados em dados.",
    keywords: "calculadora tmb, taxa metabólica, calorias repouso, dieta treino, online tmb, resultados rápidos, precisa calculadora"
  },
  pl: {
    title: "Kalkulator BMR – Przemiana Materii Online | TheSmartCalculator",
    description: "Użyj kalkulatora BMR online, aby obliczyć dzienne zapotrzebowanie kaloryczne i podstawową przemianę materii. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator bmr, przemiana materii, zapotrzebowanie kaloryczne, narzędzie zdrowotne, online bmr, dokładne obliczenia, darmowy tool"
  },
  de: {
    title: "BMR Rechner – Stoffwechselrate Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem BMR Rechner deine Basale Stoffwechselrate für Kalorienbedarf. Präzises, kostenloses Tool basierend auf Alter, Gewicht, Größe für Diätplanung.",
    keywords: "bmr rechner, stoffwechselrate berechnen, kalorienbedarf tool, alter gewicht, online bmr, diätplanung, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora del Metabolismo Basal – Calcula Fácil y Rápido",
    description: "Calcula tu metabolismo basal al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y entrenamiento para alcanzar tus metas ahora mismo!",
    keywords: "calculadora, metabolismo, basal, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, dieta, entrenamiento, alcanzar, metas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bmrcalculatorMeta[langHeader as keyof typeof bmrcalculatorMeta]
      ? langHeader
      : "en";

  const meta = bmrcalculatorMeta[language as keyof typeof bmrcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('bmr-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('bmr-calculator', 'en'),
        'pt-BR': getCanonicalUrl('bmr-calculator', 'br'),
        'pl': getCanonicalUrl('bmr-calculator', 'pl'),
        'de': getCanonicalUrl('bmr-calculator', 'de'),
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

export default async function BmrCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.thesmartcalculator.com/#organization",
        "name": "Smart Calculator",
        "url": "https://www.thesmartcalculator.com",
        "logo": "https://www.thesmartcalculator.com/logo.png"
      },
      {
        "@type": "WebSite",
        "@id": "https://www.thesmartcalculator.com/#website",
        "url": "https://www.thesmartcalculator.com",
        "name": "Smart Calculator",
        "publisher": {
          "@id": "https://www.thesmartcalculator.com/#organization"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.thesmartcalculator.com/health/bmr-calculator#breadcrumb",
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
            "name": "Health & Fitness",
            "item": "https://www.thesmartcalculator.com/health/"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "BMR Calculator",
            "item": "https://www.thesmartcalculator.com/health/bmr-calculator"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/health/bmr-calculator#webpage",
        "url": "https://www.thesmartcalculator.com/health/bmr-calculator",
        "name": "BMR Calculator",
        "isPartOf": { "@id": "https://www.thesmartcalculator.com/#website" },
        "breadcrumb": { "@id": "https://www.thesmartcalculator.com/health/bmr-calculator#breadcrumb" },
        "description": "Free BMR Calculator – calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.thesmartcalculator.com/health/bmr-calculator#software",
        "name": "BMR Calculator",
        "url": "https://www.thesmartcalculator.com/health/bmr-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "description": "Online Basal Metabolic Rate (BMR) calculator with activity multipliers and calorie needs estimation.",
        "offers": {
          "@type": "Offer",
          "price": 0,
          "priceCurrency": "USD"
        },
        "featureList": [
          "Mifflin-St Jeor formula",
          "Harris-Benedict formula",
          "Katch-McArdle formula",
          "TDEE with activity multipliers"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.thesmartcalculator.com/health/bmr-calculator#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is the BMR calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The BMR calculator provides an estimate using formulas like Mifflin–St Jeor. Actual metabolic rate may vary depending on individual factors."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between BMR and TDEE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BMR is the calories burned at rest, while TDEE is BMR multiplied by an activity factor to include exercise and daily movement."
            }
          },
          {
            "@type": "Question",
            "name": "Which BMR formula is best?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Mifflin–St Jeor equation is most widely recommended for adults. If you know body fat percentage, Katch–McArdle can be more precise."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="bmr-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
