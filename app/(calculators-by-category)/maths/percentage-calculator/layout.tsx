import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for percentage-calculator
const percentagecalculatorMeta = {
  en: {
    title: "Percentage Calculator – Ratios Changes Online | TheSmartCalculator",
    description: "Use the Percentage Calculator to calculate percentages, ratios, and percentage changes easily. Accurate, free online tool for math and finance calculations.",
    keywords: "percentage calculator, percentages ratios, change calculation, online percentage, math finance, free percentage tool, ratio tool, change estimator"
  },
  br: {
    title: "Calculadora de Porcentagem – Calcule Descontos e Aumentos",
    description: "Use a Calculadora de Porcentagem para calcular descontos, acréscimos e porcentagens em geral. Ferramenta rápida e precisa para seus cálculos diários.",
    keywords: "calculadora porcentagem, porcentagens razões, cálculo mudança, online porcentagem, matemática finanças, gratuita ferramenta porcentagem, ferramenta razão, estimador mudança"
  },
  pl: {
    title: "Kalkulator Procentowy – Oblicz Procent Online Szybko",
    description: "Użyj kalkulatora procentowego online, aby szybko obliczyć procenty, wartości i różnice. Proste, dokładne i darmowe narzędzie matematyczne.",
    keywords: "kalkulator procentowy, procenty stosunki, obliczenia zmiany, online procent, matematyka finanse, darmowe narzędzie procentowe, narzędzie stosunek, estymator zmiany"
  },
  de: {
    title: "Prozentrechner – Prozent einfach & schnell online berechnen",
    description: "Berechne mit dem Prozentrechner Prozente, Prozentwerte & Veränderungen. Schnell, genau & kostenlos – ideal für Schule, Beruf & Alltag!",
    keywords: "prozentrechner, prozente verhältnisse, ändern berechnung, online prozent, math finanz, kostenloser prozent tool, verhältnis tool, ändern schätzer"
  }
,
  es: {
    title: "Calculadora de Porcentajes – Obtén Resultados al Instante",
    description: "Calcula porcentajes fácil y rápido con nuestra calculadora online. Ideal para tareas, finanzas y negocios. ¡Ingresa los valores y obtén el resultado ahora!",
    keywords: "calculadora, porcentajes, obtén, resultados, instante, calcula, fácil, rápido, nuestra, online, ideal, tareas, finanzas, negocios, ingresa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && percentagecalculatorMeta[langHeader as keyof typeof percentagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = percentagecalculatorMeta[language as keyof typeof percentagecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('percentage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('percentage-calculator', 'en'),
        'es': getCanonicalUrl('percentage-calculator', 'es'),
        'pt-BR': getCanonicalUrl('percentage-calculator', 'br'),
        'pl': getCanonicalUrl('percentage-calculator', 'pl'),
        'de': getCanonicalUrl('percentage-calculator', 'de'),
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

export default async function PercentageCalculatorLayout({
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
          "name": "Prozentrechner",
          "item": "https://www.thesmartcalculator.com/de/mathe/prozentrechner"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Rechner für prozentuale Fehler",
          "item": "https://www.thesmartcalculator.com/de/mathe/prozent-fehler-rechner"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Prozentrechner",
      "alternateName": "prozentrechner online",
      "url": "https://www.thesmartcalculator.com/de/mathe/prozentrechner",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+4955279784001",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": "DE",
        "availableLanguage": "German"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.thesmartcalculator.com/de/mathe/prozentrechner#software",
      "name": "Prozentrechner",
      "description": "Berechnen Sie ganz einfach Prozentsätze, Verhältnisse und prozentuale Änderungen mit unserem umfassenden Prozentrechner.",
      "operatingSystem": "Web",
      "applicationCategory": "EducationalApplication",
      "url": "https://www.thesmartcalculator.com/de/mathe/prozentrechner",
      "author": {
        "@type": "Person",
        "name": "Felix Yacoub"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "2000"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/de/mathe/prozentrechner#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Wie kann ich Prozente berechnen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mit unserem kostenlosen Online Prozentrechner geben Sie einfach Grundwert und Prozentsatz ein – das Ergebnis wird automatisch berechnet."
          }
        },
        {
          "@type": "Question",
          "name": "Kann ich Werte in Prozent umrechnen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, der integrierte Umrechner ermöglicht es, Zahlen in Prozent umzurechnen oder eine komplette Prozentumrechnung durchzuführen."
          }
        },
        {
          "@type": "Question",
          "name": "Ist dieser Prozentrechner besser als der Prozentrechner von Google?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, unser Online Prozentrechner bietet mehr Funktionen als der Google Prozentrechner, einschließlich Rückrechnung und Prozentwert-Berechnung."
          }
        },
        {
          "@type": "Question",
          "name": "Ist der Rechner wirklich kostenlos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, es handelt sich um einen kostenlosen Prozentrechner ohne Anmeldung oder Einschränkungen."
          }
        },
        {
          "@type": "Question",
          "name": "Kann ich diesen Rechner auch mobil nutzen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, der Prozentrechner ist vollständig mobil-optimiert und auf allen Geräten nutzbar."
          }
        }
      ]
    }
  ]
}
  return <>
    {children}
    <Script
      id="percentage-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
