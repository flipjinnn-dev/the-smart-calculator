import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for gallons-per-square-foot-calculator
const gallonspersquarefootcalculatorMeta = {
  en: {
    title: "Gallons Per Square Foot Calculator",
    description: "Calculate gallons per square foot instantly. Convert square feet to gallons, gallons to sq ft, and find water, paint, or rainfall volume fast.",
    keywords: "gallons per square foot calculator, painting gallons, flooring estimator, online gallons tool, material needs, home improvement, construction tool, square foot estimate"
  },
  br: {
    title: "Calculadora de Galões por Pé Quadrado",
    description: "Use a calculadora de tinta para medir a quantidade necessária por área. Planeje sua pintura e descubra o consumo de tinta agora mesmo!",
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
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('gallons-per-square-foot-calculator', 'en'),
        'en': getCanonicalUrl('gallons-per-square-foot-calculator', 'en'),
        'es': getCanonicalUrl('gallons-per-square-foot-calculator', 'es'),
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

export default async function GallonsPerSquareFootCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "The Smart Calculator",
        "description": "Instantly calculate gallons per square foot (gal per sq ft) for water, paint, or any liquid based on area and depth.",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "All",
        "softwareVersion": "3.2.1",
        "url": "https://www.thesmartcalculator.com/",
        "image": "https://cdn.sanity.io/images/f0wclefz/production/b34d2fb577af1f8bf9dafb230a8b42239f90a149-800x800.jpg",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "ratingCount": "4100",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "Hudson Hale"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How to calculate gallons per square foot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate gallons per square foot, you must include depth because square feet measure area and gallons measure volume. Formula: Gallons = Square Feet × Depth (in feet) × 7.48052. If depth is in inches, divide inches by 12 first. At 1 inch depth: 1 sq ft × (1 ÷ 12) × 7.48052 = 0.623 gallons."
            }
          },
          {
            "@type": "Question",
            "name": "How to calculate gallons of paint per square foot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most paint covers 250–400 square feet per gallon depending on surface type. Gallons per sq ft = 1 ÷ Coverage Rate. If 1 gallon covers 350 sq ft: 1 ÷ 350 = 0.00285 gallons per square foot. Add 10–15% extra for textured or porous surfaces."
            }
          },
          {
            "@type": "Question",
            "name": "How to calculate gallons of rainfall per square foot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "1 inch of rain over 1 square foot equals 0.623 gallons. Formula: Gallons = Sq Ft × Rainfall (in inches ÷ 12) × 7.48052. For 1,000 sq ft during 1 inch rainfall: 1,000 × 0.0833 × 7.48052 = 623 gallons."
            }
          },
          {
            "@type": "Question",
            "name": "How many gallons are in 1 square foot?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "There is no fixed number because gallons measure volume and square feet measure area. At 1 inch deep → 0.623 gallons. At 6 inches deep → 3.74 gallons. At 12 inches deep → 7.48 gallons."
            }
          },
          {
            "@type": "Question",
            "name": "How many gallons of water per square foot at 1 inch deep?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At exactly 1 inch depth: 1 square foot equals 0.623 gallons. This comes from 1 cubic foot = 7.48052 gallons and 1 inch = 1/12 foot."
            }
          },
          {
            "@type": "Question",
            "name": "How to convert gallons to square feet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Square Feet = Gallons ÷ (Depth × 7.48052). Example: 100 gallons at 2 inches depth (2 ÷ 12 = 0.167 feet): 100 ÷ (0.167 × 7.48052) = 80 square feet."
            }
          },
          {
            "@type": "Question",
            "name": "How many square feet does 5 gallons cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If 1 gallon covers 350 sq ft, then 5 gallons cover 5 × 350 = 1,750 square feet. Always check manufacturer coverage rates."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Square Feet to Gallons Calculator",
            "item": "https://www.thesmartcalculator.com/construction/gallons-per-square-foot-calculator"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Board Foot Calculator",
            "item": "https://www.thesmartcalculator.com/construction/board-foot-calculator"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Cubic Yard Calculator",
            "item": "https://www.thesmartcalculator.com/construction/cubic-yard-calculator"
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
