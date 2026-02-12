import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for square-feet-to-cubic-yards-calculator
const squarefeettocubicyardscalculatorMeta = {
  en: {
    title: "Square Feet to Cubic Yards Calculator",
    description: "Convert square feet to cubic yards accurately using our Square Feet to Cubic Yards Calculator for projects.",
    keywords: "square feet to cubic yards calculator, area to volume, materials converter, online square, construction tool, landscaping calculator, free yards tool, material estimate"
  },
  br: {
    title: "Calculadora de pés quadrados para jardas cúbicas",
    description: "Use a calculadora de pés quadrados para jardas cúbicas e converta área em volume de forma rápida e precisa para projetos de construção.",
    keywords: "conversor metros quadrados cúbicos, área volume, conversor materiais, online quadrado, ferramenta construção, calculadora paisagismo, gratuita ferramenta metros, estimativa material"
  },
  pl: {
    title: "Square Feet to Cubic Yards Calculator – Materials Online | The",
    description: "Użyj square feet to cubic yards  – materials online | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kont.",
    keywords: "quadratfuß zu kubikyard rechner, fläche volumen, materials converter, online quadrat, bau tool, landschaft rechner, kostenloser yards tool, material schätzung"
  },
  de: {
    title: "Square Feet to Cubic Yards Calculator – Materials Online | The",
    description: "Berechne mit dem Quadratfuß zu Kubikyard Rechner Umwandlung für Materialien. Präzises, kostenloses Tool für Bau und Landschaft., quadratfuß zu kubikyard rechner",
    keywords: "square feet to cubic yards rechner, area to volume, materials converter, online square, construction tool, landscaping rechner, kostenlos yards tool, material estimate"
  }
,
  es: {
    title: "Calculadora de Yardas Cúbicas – Calcula Volumen Fácil",
    description: "Calcula yardas cúbicas al instante con nuestra herramienta precisa. Ideal para construcción, jardinería y proyectos. ¡Ingresa medidas y obtén resultados ya!",
    keywords: "calculadora, yardas, cúbicas, calcula, volumen, fácil, instante, nuestra, herramienta, precisa, ideal, construcción, jardinería, proyectos, ingresa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && squarefeettocubicyardscalculatorMeta[langHeader as keyof typeof squarefeettocubicyardscalculatorMeta]
      ? langHeader
      : "en";

  const meta = squarefeettocubicyardscalculatorMeta[language as keyof typeof squarefeettocubicyardscalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('square-feet-to-cubic-yards-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('square-feet-to-cubic-yards-calculator', 'en'),
        'en': getCanonicalUrl('square-feet-to-cubic-yards-calculator', 'en'),
        'es': getCanonicalUrl('square-feet-to-cubic-yards-calculator', 'es'),
        'pt-BR': getCanonicalUrl('square-feet-to-cubic-yards-calculator', 'br'),
        'pl': getCanonicalUrl('square-feet-to-cubic-yards-calculator', 'pl'),
        'de': getCanonicalUrl('square-feet-to-cubic-yards-calculator', 'de'),
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

export default async function SquareFeetToCubicYardsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Square Feet to Cubic Yards Calculator",
    "url": "https://www.thesmartcalculator.com/construction/square-feet-to-cubic-yards-calculator",
    "description": "Free online Square Feet to Cubic Yards Calculator to quickly convert area and depth into volume for soil, mulch, gravel, or concrete.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Square Feet to Cubic Yards Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Converts square feet + depth to cubic yards instantly",
          "Supports length × width or total area input",
          "Useful for soil, mulch, gravel, concrete, and sand",
          "Mobile-friendly and easy-to-use",
          "Accurate material estimation for projects"
        ],
        "url": "https://www.thesmartcalculator.com/construction/square-feet-to-cubic-yards-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Square Feet to Cubic Yards Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Square Feet to Cubic Yards Calculator",
            "text": "Provide total square feet or length × width to calculate area."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Square Feet to Cubic Yards Calculator",
            "text": "Specify the depth or thickness of the material in feet."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Square Feet to Cubic Yards Calculator",
            "text": "Get the volume in cubic yards instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does this calculator do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It converts square feet and material depth into cubic yards for volume estimation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I input area as length × width?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator can compute area automatically from length and width."
            }
          },
          {
            "@type": "Question",
            "name": "Which materials can I use this for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Soil, mulch, gravel, sand, and concrete."
            }
          },
          {
            "@type": "Question",
            "name": "Does it work for uneven surfaces?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use average depth for approximate volume calculations."
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
            "name": "Can it help with material cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, multiply the cubic yards volume by the cost per yard to estimate total cost."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is completely free and requires no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Contractors, landscapers, gardeners, and DIYers planning material purchases."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate small or large areas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works for any area size, from small garden beds to large construction sites."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for material compaction?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, this tool provides theoretical volume; add extra material if compaction or settling occurs."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="square-feet-to-cubic-yards-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
