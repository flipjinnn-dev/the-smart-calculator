import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for ideal-weight-calculator
const idealweightcalculatorMeta = {
  en: {
    title: "Ideal Weight Calculator – Range Online | TheSmartCalculator",
    description: "Use the Ideal Weight Calculator to determine body weight range based on height and gender. Accurate, free online tool for health and fitness goals.",
    keywords: "ideal weight calculator, body weight range, height gender, online ideal, health fitness, free weight tool, range based, determine weight"
  },
  br: {
    title: "Calculadora de Peso Ideal – Descubra Seu Peso Saudável",
    description: "Use a Calculadora de Peso Ideal para saber o peso adequado para sua altura e idade. Acompanhe sua saúde e forma física com precisão online.",
    keywords: "calculadora peso ideal, faixa peso corporal, altura gênero, online ideal, saúde fitness, gratuita ferramenta peso, baseado faixa, determinar peso"
  },
  pl: {
    title: "Kalkulator Idealnej Wagi – Oblicz Wagę Ciała Online",
    description: "Użyj kalkulatora idealnej wagi online, aby sprawdzić swoją wagę optymalną według wzrostu i płci. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator idealnej wagi, zakres wagi ciała, wzrost płeć, online idealna, zdrowie fitness, darmowe narzędzie waga, zakres bazowany, określić wagę"
  },
  de: {
    title: "Idealgewicht Rechner – Finde dein optimales Körpergewicht",
    description: "Berechne mit dem Idealgewicht Rechner dein optimales Körpergewicht. Schnell, genau & kostenlos – ideal für Gesundheit, Fitness und Wohlbefinden!",
    keywords: "idealgewicht rechner, körpergewicht bereich, höhe geschlecht, online ideal, gesundheit fitness, kostenloser gewicht tool, bereich basierend, gewicht bestimmen"
  }
,
  es: {
    title: "Calculadora de Peso Ideal – Determina tu Peso según Altura e IMC",
    description: "Utiliza nuestra calculadora de peso ideal para conocer tu peso recomendado, analizar tu altura y calcular tu IMC de manera sencilla y precisa.",
    keywords: "calculadora, peso, ideal, determina, según, altura, utiliza, nuestra, conocer, recomendado, analizar, calcular, manera, sencilla, precisa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && idealweightcalculatorMeta[langHeader as keyof typeof idealweightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = idealweightcalculatorMeta[language as keyof typeof idealweightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ideal-weight-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }ideal-weight-calculator`,
      languages: {
        'en': getCanonicalUrl('ideal-weight-calculator', 'en'),
        'pt-BR': getCanonicalUrl('ideal-weight-calculator', 'br'),
        'pl': getCanonicalUrl('ideal-weight-calculator', 'pl'),
        'de': getCanonicalUrl('ideal-weight-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }ideal-weight-calculator`,
    },
  };
}

export default async function IdealWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ideal Weight Calculator",
    "url": "https://www.thesmartcalculator.com/health/ideal-weight-calculator",
    "description": "Free online Ideal Weight Calculator using Hamwi, Devine, Robinson & Miller formulas, plus BMI ranges. Estimate your healthy weight quickly.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is the Ideal Weight Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It provides estimates using trusted formulas, but factors like muscle mass and body fat distribution may affect accuracy."
          }
        },
        {
          "@type": "Question",
          "name": "Which formulas are used for calculating ideal weight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator uses Hamwi, Devine, Robinson, and Miller formulas along with BMI ranges to estimate ideal weight."
          }
        },
        {
          "@type": "Question",
          "name": "Is the Ideal Weight Calculator suitable for everyone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator is designed for people between 2 and 80 years old. For personalized medical advice, consult a healthcare professional."
          }
        }
      ]
    }
  }
  return <>
    {children}
    <Script
      id="ideal-weight-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
