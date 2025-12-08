import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gallons-per-square-foot-calculator
const gallonspersquarefootcalculatorMeta = {
  en: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Use the Gallons per Square Foot Calculator to estimate gallons needed per square foot for painting or flooring. Accurate, free online tool for construction and home improvement.",
    keywords: "gallons per square foot calculator, painting gallons, flooring estimator, online gallons tool, material needs, home improvement, construction tool, square foot estimate"
  },
  br: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Use a Calculadora Litros por Metro Quadrado para estimar litros para pintura ou piso. Ferramenta precisa para construção e melhorias em casa.",
    keywords: "calculadora litros metro, pintura litros, estimador piso, ferramenta online litros, necessidades material, melhoria casa, ferramenta construção, estimativa metro quadrado"
  },
  pl: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Użyj kalkulatora litrów na metr kwadratowy online, aby oszacować litry do malowania lub podłogi. Dokładne narzędzie do budowy i ulepszeń domowych.",
    keywords: "kalkulator litrów metr kwadratowy, litry malowanie, estymator podłogi, narzędzie online litry, potrzeby material, ulepszenie domu, narzędzie budowa, estymacja metr kwadratowy"
  },
  de: {
    title: "Gallonen pro Quadratfuß Rechner – Malen Online | TheSmartCalculator",
    description: "Nutzen Sie den gallons per square foot  – painting online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher.",
    keywords: "gallonen quadratfuß rechner, malen gallonen, boden estimator, online gallonen tool, materialbedarf, heimverbesserung, bau tool, quadratfuß schätzung"
  }
,
  es: {
    title: "Calculadora de Galones por Pie Cuadrado – Fácil y Rápida",
    description: "Calcula galones por pie cuadrado al instante con nuestra herramienta precisa. ¡Optimiza pintura, recubrimientos y proyectos de construcción ahora mismo!",
    keywords: "calculadora, galones, cuadrado, fácil, rápida, calcula, instante, nuestra, herramienta, precisa, optimiza, pintura, recubrimientos, proyectos, construcción"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gallonspersquarefootcalculatorMeta[langHeader as keyof typeof gallonspersquarefootcalculatorMeta]
      ? langHeader
      : "en";

  const meta = gallonspersquarefootcalculatorMeta[language as keyof typeof gallonspersquarefootcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gallons-per-square-foot-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('gallons-per-square-foot-calculator', 'en'),
        'pt-BR': getCanonicalUrl('gallons-per-square-foot-calculator', 'br'),
        'pl': getCanonicalUrl('gallons-per-square-foot-calculator', 'pl'),
        'de': getCanonicalUrl('gallons-per-square-foot-calculator', 'de'),
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

export default async function GallonsPerSquareFootCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Gallons per Square Foot Calculator – Online Liquid Volume Tool",
    "url": "https://www.thesmartcalculator.com/construction/gallons-per-square-foot-calculator",
    "description": "Free online Gallons per Square Foot Calculator to calculate liquid volume and cost per square foot for pools, tanks, landscaping, and coatings.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Gallons per Square Foot Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculates Gallons per Square Foot",
          "Supports Feet, Inches, and Yards",
          "Total Gallons Calculation",
          "Cost Estimation",
          "Mobile-Friendly and Easy-to-Use"
        ],
        "url": "https://www.thesmartcalculator.com/construction/gallons-per-square-foot-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Gallons per Square Foot Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Gallons per Square Foot Calculator",
            "text": "Input the length and width of the area."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Gallons per Square Foot Calculator",
            "text": "Specify the liquid depth in feet, inches, or yards."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Gallons per Square Foot Calculator",
            "text": "Add price per gallon to calculate total cost."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Gallons per Square Foot Calculator",
            "text": "Get gallons per square foot and total gallons instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a gallons per square foot calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates how many gallons of liquid are needed per square foot for a given depth."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use feet, inches, or yards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator supports all three units."
            }
          },
          {
            "@type": "Question",
            "name": "Does it calculate total gallons?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it outputs the total volume required for the area and depth."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by entering the price per gallon, it calculates total cost."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Does it work for pools and tanks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ideal for estimating liquid volume in pools, tanks, and containers."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it’s completely free and requires no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for uneven depth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it assumes a flat and uniform depth."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Contractors, landscapers, DIYers, pool owners, and students can benefit from it."
            }
          },
          {
            "@type": "Question",
            "name": "What liquids can I calculate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Water, paint, coatings, and other liquids where volume per area is needed."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="gallons-per-square-foot-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
