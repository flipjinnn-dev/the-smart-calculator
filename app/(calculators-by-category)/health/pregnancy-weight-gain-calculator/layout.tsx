import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for pregnancy-weight-gain-calculator
const pregnancyweightgaincalculatorMeta = {
  en: {
    title: "Pregnancy Weight Gain Calculator – Recommended Online | TheSma",
    description: "Use the Pregnancy Weight Gain Calculator to calculate recommended weight gain during pregnancy. Accurate, free online tool for maternal health tracking.",
    keywords: "pregnancy weight gain calculator, recommended gain, pregnancy weight, online gain tool, maternal health, tracking calculator, free weight tool, gain estimate"
  },
  br: {
    title: "Calculadora Ganho de Peso na Gravidez – Veja o Ideal",
    description: "Use a Calculadora de Ganho de Peso na Gravidez para saber o peso ideal para cada fase. Acompanhe sua gestação com segurança e precisão online.",
    keywords: "calculadora ganho peso gravidez, ganho recomendado, peso gravidez, ferramenta online ganho, saúde materna, calculadora tracking, gratuita ferramenta peso, estimativa ganho"
  },
  pl: {
    title: "Pregnancy Weight Gain Calculator – Recommended Online | TheSma",
    description: "Użyj kalkulatora przyrostu wagi w ciąży, aby obliczyć zalecany przyrost wagi podczas ciąży. Dokładne, darmowe narzędzie do śledzenia zdrowia matki.",
    keywords: "kalkulator przyrostu wagi ciąża, zalecany przyrost, waga ciąża, narzędzie online przyrost, zdrowie matki, kalkulator tracking, darmowe narzędzie waga, estymacja przyrostu"
  },
  de: {
    title: "Schwangerschaft Gewichtszunahme – Rechner online nutzen",
    description: "Berechnen Sie Ihre gesunde Gewichtszunahme in der Schwangerschaft mit unserem Tool. Der Schwangerschaft Gewichtszunahme Rechner zeigt Ihnen Grenzwerte & Trends.",
    keywords: "schwangerschaft gewichtszunahme, empfohlene zunahme, schwangerschaftsgewicht, online zunahme tool, mütterliche gesundheit, tracking rechner, kostenloser gewicht tool, zunahme schätzung"
  }
,
  es: {
    title: "Calculadora de Aumento de Peso en Embarazo – Fácil y Rápido",
    description: "Calcula tu aumento de peso durante el embarazo al instante y lleva un control saludable. ¡Descubre si estás en el rango ideal ahora mismo!",
    keywords: "calculadora, aumento, peso, embarazo, fácil, rápido, calcula, durante, instante, lleva, control, saludable, descubre, estás, rango"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pregnancyweightgaincalculatorMeta[langHeader as keyof typeof pregnancyweightgaincalculatorMeta]
      ? langHeader
      : "en";

  const meta = pregnancyweightgaincalculatorMeta[language as keyof typeof pregnancyweightgaincalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pregnancy-weight-gain-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('pregnancy-weight-gain-calculator', 'en'),
        'es': getCanonicalUrl('pregnancy-weight-gain-calculator', 'es'),
        'pt-BR': getCanonicalUrl('pregnancy-weight-gain-calculator', 'br'),
        'pl': getCanonicalUrl('pregnancy-weight-gain-calculator', 'pl'),
        'de': getCanonicalUrl('pregnancy-weight-gain-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }pregnancy-weight-gain-calculator`,
    },
  };
}

export default async function PregnancyWeightGainCalculatorLayout({
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
        "name": "The Smart Calculator",
        "publisher": {
          "@id": "https://www.thesmartcalculator.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.thesmartcalculator.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.thesmartcalculator.com/#organization",
        "name": "The Smart Calculator",
        "url": "https://www.thesmartcalculator.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.thesmartcalculator.com/images/logo.png"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.thesmartcalculator.com/health/pregnancy-weight-gain-calculator#webpage",
        "url": "https://www.thesmartcalculator.com/health/pregnancy-weight-gain-calculator",
        "inLanguage": "en-US",
        "name": "Pregnancy Weight Gain Calculator",
        "description": "Pregnancy Weight Gain Calculator — estimate recommended total and weekly weight gain during pregnancy based on pre-pregnancy BMI (IOM guidelines).",
        "isPartOf": {
          "@id": "https://www.thesmartcalculator.com/#website"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://www.thesmartcalculator.com/health/pregnancy-weight-gain-calculator/thumbnail.jpg"
        },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "@id": "https://www.thesmartcalculator.com/health/pregnancy-weight-gain-calculator#software",
          "name": "Pregnancy Weight Gain Calculator",
          "url": "https://www.thesmartcalculator.com/health/pregnancy-weight-gain-calculator",
          "description": "Interactive calculator that estimates recommended pregnancy weight gain ranges using Institute of Medicine (IOM) guidelines. Accepts pre-pregnancy weight, height, current weight and gestational week.",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "featureList": "Pre-pregnancy BMI classification; recommended total weight gain range; weekly gain guidance; progress tracking by gestational week",
          "provider": {
            "@id": "https://www.thesmartcalculator.com/#organization"
          }
        }
      }
    ]
  }
  return <>
    {children}
    <Script
      id="pregnancy-weight-gain-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
