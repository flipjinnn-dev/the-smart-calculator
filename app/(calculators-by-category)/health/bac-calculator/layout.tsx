import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for bac-calculator
const baccalculatorMeta = {
  en: {
    title: "BAC Calculator – Blood Alcohol Content Online | TheSmartCalculator",
    description: "Use the BAC Calculator to estimate blood alcohol content from drinks consumed. Accurate, free online tool for safety checks and legal limits awareness.",
    keywords: "bac calculator, blood alcohol, content estimate, drinks tool, online bac, safety calculator, free alcohol tool, legal limits"
  },
  br: {
    title: "Calculadora BAC – Nível Álcool Sangue Online | TheSmartCalculator",
    description: "Use a Calculadora BAC para estimar o nível de álcool no sangue após beber. Saiba se está dentro do limite seguro para dirigir com precisão.",
    keywords: "calculadora bac, nível álcool, sangue estimar, limite seguro, dirigir tool, online bac, precisa calculadora"
  },
  pl: {
    title: "Kalkulator Stężenia Alkoholu – BAC Online | TheSmartCalculator",
    description: "Użyj kalkulatora stężenia alkoholu we krwi online, aby obliczyć poziom alkoholu i bezpieczne granice. Proste, szybkie i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator stężenia alkoholu, obliczyć bac, poziom alkoholu, bezpieczne granice, narzędzie zdrowotne, proste szybkie, darmowy tool"
  },
  de: {
    title: "Blutalkohol Rechner – Promille Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Blutalkohol Rechner (Promillerechner) deinen Alkoholwert im Blut. Schnell, genau & kostenlos – ideal für sichere Entscheidungen und Grenzen!",
    keywords: "blutalkohol rechner, promille berechnen, alkoholwert blut, schnell tool, online promille, sichere entscheidungen, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && baccalculatorMeta[langHeader as keyof typeof baccalculatorMeta]
      ? langHeader
      : "en";

  const meta = baccalculatorMeta[language as keyof typeof baccalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('bac-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }bac-calculator`,
      languages: {
        'en': getCanonicalUrl('bac-calculator', 'en'),
        'pt-BR': getCanonicalUrl('bac-calculator', 'br'),
        'pl': getCanonicalUrl('bac-calculator', 'pl'),
        'de': getCanonicalUrl('bac-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }bac-calculator`,
    },
  };
}

export default async function BacCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "url": "https://www.thesmartcalculator.com/health/bac-calculator",
        "name": "BAC Calculator",
        "headline": "Blood Alcohol Content (BAC) Calculator — Watson & Widmark",
        "description": "Estimate Blood Alcohol Concentration (BAC) using drink inputs, weight, height, age and time. Offers both Watson TBW-derived distribution and classic Widmark estimation.",
        "inLanguage": "en-US",
        "datePublished": "2021-01-01",
        "dateModified": "2025-09-26",
        "author": {
          "@type": "Organization",
          "name": "The Smart Calculator",
          "url": "https://www.thesmartcalculator.com"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "BAC Calculator",
        "url": "https://www.thesmartcalculator.com/health/bac-calculator",
        "description": "Online BAC estimator converting drink volumes and ABV to grams and applying Widmark-style formula or Watson TBW-derived distribution ratio. Adjustable elimination rate and unit toggles.",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "softwareVersion": "1.0",
        "author": {
          "@type": "Organization",
          "name": "The Smart Calculator"
        },
        "featureList": [
          "Multiple drink rows (type, volume, ABV)",
          "Watson TBW-derived distribution ratio option",
          "Fixed Widmark distribution ratio option",
          "Adjustable elimination rate (beta)",
          "Unit toggles (ml/oz, kg/lb)"
        ],
        "potentialAction": {
          "@type": "CalculateAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.thesmartcalculator.com/health/bac-calculator?gender={gender}&weight_kg={weight_kg}&height_cm={height_cm}&drinks={drinks}&hours={hours}&mode={mode}"
          },
          "query-input": [
            "required name=gender",
            "required name=weight_kg",
            "required name=height_cm",
            "required name=drinks",
            "required name=hours",
            "optional name=mode"
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does this BAC calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator converts drink volumes and ABV to grams of ethanol (density 0.789 g/mL), then applies a Widmark-style formula. It can optionally compute TBW using Watson equations and derive a person-specific distribution ratio. An elimination rate (beta) is subtracted over time."
            }
          },
          {
            "@type": "Question",
            "name": "What is the default elimination rate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The default elimination rate is 0.017% per hour. Users can adjust this value; typical population averages range around 0.015%/hr but individual rates vary."
            }
          },
          {
            "@type": "Question",
            "name": "Is this legal or medical advice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. This is an estimate only and should not be used to determine fitness to drive or for legal purposes. Always follow local laws and official testing methods."
            }
          }
        ]
      },
      {
        "@type": "Organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com",
        "logo": "https://www.thesmartcalculator.com/logo.png"
      }
    ]
  }
  return <>
    {children}
    <Script
      id="bac-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
