import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for pace-calculator
const pacecalculatorMeta = {
  en: {
    title: "Pace Calculator – Running Speed Online | TheSmartCalculator",
    description: "Use the Pace Calculator to calculate your running pace and speed. Accurate, free online tool for training and performance tracking.",
    keywords: "pace calculator, running pace, speed calculation, online pace, training tool, performance tracking, free pace tool, running estimator"
  },
  br: {
    title: "Calculadora de Ritmo – Calcule o Ciclo Menstrual e Ovulação",
    description: "Use a Calculadora de Ritmo para identificar dias férteis e ovulação. Planeje ou evite a gravidez com precisão e acompanhamento fácil online.",
    keywords: "calculadora ritmo, ritmo corrida, cálculo velocidade, online ritmo, ferramenta treinamento, rastreamento desempenho, gratuita ferramenta ritmo, estimador corrida"
  },
  pl: {
    title: "Kalkulator Tempa – Oblicz Swoje Tempo Biegu Online",
    description: "Użyj kalkulatora tempa online, aby obliczyć swoje tempo biegu, czas i dystans. Proste, szybkie i dokładne narzędzie dla biegaczy i sportowców.",
    keywords: "kalkulator tempa, tempo biegu, obliczenia prędkości, online tempo, narzędzie treningowe, tracking wydajności, darmowe narzędzie tempo, estymator biegu"
  },
  de: {
    title: "Temporechner – Laufgeschwindigkeit & Pace online berechnen",
    description: "Berechnen Sie mit dem Temporechner Ihre Laufgeschwindigkeit, Pace (min/km) und benötigte Zeit für jede Strecke. Ideal für Läufer, Radfahrer und Sportler zur Trainingsplanung.",
    keywords: "temporechner, lauf tempo, geschwindigkeit berechnung, online tempo, training tool, leistungs tracking, kostenloser tempo tool, lauf schätzer"
  }
,
  es: {
    title: "Calculadora de Ritmos – Mide tu Tiempo y Distancia",
    description: "Utiliza nuestra calculadora de ritmos para calcular tus ritmos de ejercicio, medir el tiempo y la distancia recorrida, y mejorar tu rendimiento físico de manera sencilla.",
    keywords: "calculadora, ritmos, mide, tiempo, distancia, utiliza, nuestra, calcular, ejercicio, medir, recorrida, mejorar, rendimiento, físico, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pacecalculatorMeta[langHeader as keyof typeof pacecalculatorMeta]
      ? langHeader
      : "en";

  const meta = pacecalculatorMeta[language as keyof typeof pacecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pace-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('pace-calculator', 'en'),
        'es': getCanonicalUrl('pace-calculator', 'es'),
        'pt-BR': getCanonicalUrl('pace-calculator', 'br'),
        'pl': getCanonicalUrl('pace-calculator', 'pl'),
        'de': getCanonicalUrl('pace-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }pace-calculator`,
    },
  };
}

export default async function PaceCalculatorLayout({
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
        "@id": "https://www.thesmartcalculator.com/health/pace-calculator#webpage",
        "url": "https://www.thesmartcalculator.com/health/pace-calculator",
        "name": "Running Pace Calculator",
        "description": "Free Running Pace Calculator to calculate your pace per km, per mile, or speed in km/h & mph. Includes race presets (5K, 10K, Half Marathon, Marathon).",
        "inLanguage": "en-US",
        "isPartOf": { "@id": "https://www.thesmartcalculator.com/#website" },
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "Running Pace Calculator",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "All",
          "url": "https://www.thesmartcalculator.com/health/pace-calculator",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a pace calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A pace calculator helps runners calculate their pace per km, per mile, or overall speed by using time and distance inputs."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my running pace?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Divide the total time you took by the distance covered. For example, 25 minutes for 5 km = 5:00 min/km pace."
            }
          },
          {
            "@type": "Question",
            "name": "What is a good running pace for beginners?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For beginners, a good pace is between 7–9 minutes per km (11–14 minutes per mile)."
            }
          },
          {
            "@type": "Question",
            "name": "Can this calculator convert pace to speed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the pace calculator converts pace into speed (km/h or mph) and shows both values."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="pace-calculator-jsonld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
  </>;
}
