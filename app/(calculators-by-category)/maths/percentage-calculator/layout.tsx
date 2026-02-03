import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for percentage-calculator
const percentagecalculatorMeta = {
  en: {
    title: "Percentage Calculator Percentage Finder",
    description: "Find percentages instantly using our Percentage Calculator to solve math problems quickly and accurately.",
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
    title: "Prozentrechner – Schnell & Einfach Berechnen",
    description: "Prozent Rechner für schnelle, einfache Berechnungen. Spare Zeit und erhalte sofort starke Ergebnisse online.",
    keywords: "prozentrechner, prozent rechner, prozentrechner online, rechner prozent, prozent berechnen, prozentrechnung online, prozent ausrechnen, prozent zurückrechnen"
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
        'x-default': getCanonicalUrl('percentage-calculator', 'en'),
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
          "name": "Percentage Calculator",
          "item": "https://www.thesmartcalculator.com/maths/percentage-calculator"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Percent Error Calculator",
          "item": "https://www.thesmartcalculator.com/maths/percent-error-calculator"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Scientific Calculator",
          "item": "https://www.thesmartcalculator.com/maths/scientific-calculator"
        }
      ]
    },

    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      "name": "Percentage Calculator",
      "alternateName": "Percentage Calculator",
      "url": "https://www.thesmartcalculator.com/maths/percentage-calculator",
      "logo": "https://www.thesmartcalculator.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 614-596-2581",
        "contactType": "technical support",
        "contactOption": "TollFree",
        "areaServed": ["US","GB","DE","ES","PL","PT"],
        "availableLanguage": ["en","es","German","Polish","Portuguese"]
      },
      "sameAs": [
        "https://x.com/SmartCalculat0r",
        "https://www.instagram.com/thesmartcalculators/",
        "https://www.youtube.com/@TheSmartCalculators",
        "https://www.linkedin.com/company/smart-calculator/",
        "https://www.pinterest.com/thesmartcalculators/_saved/",
        "https://www.thesmartcalculator.com/"
      ]
    },

    {
      "@type": "SoftwareApplication",
      "name": "Percentage Calculator",
      "operatingSystem": "All",
      "applicationCategory": "MathApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "bestRating": "5",
        "ratingCount": "2000"
      },
      "review": {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Felix Yacoub"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Simple and accurate Percentage Calculator. Great for students and professionals alike for quick calculations."
      }
    },

    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Percentage Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is an online tool that helps you perform all types of percentage calculations instantly and accurately."
          }
        },
        {
          "@type": "Question",
          "name": "Can I calculate percent increase with this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the calculator supports percentage increase mode for quick results."
          }
        },
        {
          "@type": "Question",
          "name": "Does it support percent decrease?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can calculate decrease percentages easily."
          }
        },
        {
          "@type": "Question",
          "name": "How do I calculate a percentage manually?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use the formula: Percentage = (Part ÷ Whole) × 100."
          }
        },
        {
          "@type": "Question",
          "name": "Can I convert percentages to numbers or numbers to percentages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the tool supports percentage conversion both ways."
          }
        },
        {
          "@type": "Question",
          "name": "Is it free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the percentage calculator is 100% free and works on all devices."
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
