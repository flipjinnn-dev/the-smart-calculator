import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for inflation-calculator
const inflationcalculatorMeta = {
  en: {
    title: "Inflation Calculator Value of Money Over Time",
    description: "See how inflation affects purchasing power and savings using our Inflation Calculator for better financial decisions.",
    keywords: "inflation calculator, purchasing power, inflation impact, online inflation, economic planning, value adjustment, free inflation tool, time value"
  },
  br: {
    title: "Calculadora de inflação online gratuita ",
    description: "Use a calculadora de inflação para calcular reajustes e perdas de poder de compra. Planeje suas finanças e simule agora mesmo!",
    keywords: "calculadora inflação, poder compra, impacto inflação, online inflação, planejamento econômico, ajuste valor, gratuita ferramenta inflação, valor tempo"
  },
  pl: {
    title: "Kalkulator inflacji – Niezbędne obliczenia",
    description: "Sprawdź wskaźnik inflacji i poznaj prognozę inflacji. Niezawodne dane, które pomagają podejmować pewne decyzje.",
    keywords: "kalkulator inflacji, siła nabywcza, wpływ inflacji, online inflacja, planowanie ekonomiczne, dostosowanie wartości, darmowe narzędzie inflacja, wartość czasu"
  },
  de: {
    title: "Inflationsrechner – Kaufkraft & Preissteigerung online berechnen",
    description: "Mit dem Inflationsrechner ermitteln Sie Preissteigerung, Kaufkraftverlust und zukünftige Werte. Nutzen Sie den Inflationsrechner für Ihre Finanzplanung online.",
    keywords: "inflationsrechner, kaufkraft, inflations impact, online inflations, wirtschaftsplanung, wertanpassung, kostenloser inflations tool, zeitwert"
  }
,
  es: {
    title: "Calculadora de Inflación – Calcula el Valor Real y Poder Adquisitivo",
    description: "Utiliza nuestra calculadora de inflación para conocer el valor real de tu dinero, analizar el poder adquisitivo y planificar tus finanzas de manera precisa y sencilla.",
    keywords: "calculadora, inflación, calcula, valor, real, poder, adquisitivo, utiliza, nuestra, conocer, dinero, analizar, planificar, finanzas, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && inflationcalculatorMeta[langHeader as keyof typeof inflationcalculatorMeta]
      ? langHeader
      : "en";

  const meta = inflationcalculatorMeta[language as keyof typeof inflationcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('inflation-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('inflation-calculator', 'en'),
        'en': getCanonicalUrl('inflation-calculator', 'en'),
        'es': getCanonicalUrl('inflation-calculator', 'es'),
        'pt-BR': getCanonicalUrl('inflation-calculator', 'br'),
        'pl': getCanonicalUrl('inflation-calculator', 'pl'),
        'de': getCanonicalUrl('inflation-calculator', 'de'),
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

export default async function InflationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inflation Calculator",
          "item": "https://www.thesmartcalculator.com/financial/inflation-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Interest Calculator",
          "item": "https://www.thesmartcalculator.com/financial/interest-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Salary Calculator",
          "item": "https://www.thesmartcalculator.com/financial/salary-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Inflation Calculator",
      "alternateName": "Inflation Calculator",
      "url": "https://www.thesmartcalculator.com/financial/inflation-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","PL","PT","DE","ES"],
        "availableLanguage": ["en","es","German","Polish","Portuguese"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/_saved/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Inflation Calculator",
      "operatingSystem": "All",
      "applicationCategory": "FinancialApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "2800"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Neo Nicholas"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Accurate and easy-to-use Inflation Calculator. Perfect for tracking price changes and financial planning."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is inflation in simple terms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Inflation means the prices of goods and services increase over time, reducing the purchasing power of money."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate inflation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the formula: (CPI current year - CPI previous year) / CPI previous year × 100. Our inflation calculator does this for you automatically."
          }
        },
        {
          "@type": "Question",
          "name": "What causes inflation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common causes include demand-pull inflation, cost-push inflation, and built-in inflation driven by wage-price cycles."
          }
        },
        {
          "@type": "Question",
          "name": "Is inflation always bad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not necessarily. Moderate inflation is normal and can indicate a growing economy. However, high inflation or hyperinflation can be damaging."
          }
        },
        {
          "@type": "Question",
          "name": "What is deflation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Deflation is the opposite of inflation, where prices fall over time. While it seems positive, it can slow economic growth and lead to unemployment."
          }
        }
      ]
    }

  ]
}
  return <>
  <Script
  id="inflation-calculator-schema"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
  strategy="afterInteractive"
  />
  {children}
  </>;
}
