import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for cubic-yard-calculator
const cubicyardcalculatorMeta = {
  en: {
    title: "Cubic Yard Calculator",
    description: "Estimate material volume easily using our Cubic Yard Calculator for construction, landscaping, and DIY projects.",
    keywords: "cubic yard calculator, volume tool, materials calculation, online cubic, construction estimator, landscaping calculator, free yard tool, concrete soil"
  },
  br: {
    title: "Calculadora Metros Cúbicos",
    description: "Use a Calculadora Metros Cúbicos para medir volumes de construção e materiais. Ferramenta rápida e precisa para obras e projetos online.",
    keywords: "calculadora metros cúbicos, volume construção, materiais medir, ferramenta obras online, projetos calculadora, precisa rápida, estimativas volume"
  },
  pl: {
    title: "Cubic Yard Calculator – Volume Materials Online | TheSmartCalc",
    description: "Użyj kalkulatora metrów sześciennych online, aby obliczyć objętości betonu, gleby i materiałów. Dokładne, darmowe narzędzie do budowy i krajobrazu.",
    keywords: "kalkulator metrów sześciennych, objętość tool, materiały obliczenia, online metry, budowa estymacja, krajobraz kalkulator, darmowy tool"
  },
  de: {
    title: "Kubikyard Rechner – Volumen Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kubikyard Rechner Kubikyards für Beton, Boden und Materialien. Präzises, kostenloses Tool für Bau und Landschaftsschätzungen.",
    keywords: "kubikyard rechner, volumen berechnen, beton boden, materialien tool, online kubik, bau landschaft, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Metros Cúbicos – Calcula Volumen Fácil",
    description: "Calcula metros cúbicos al instante con nuestra herramienta precisa. Ideal para líquidos, sólidos o construcción. ¡Ingresa medidas y obtén resultados ahora!",
    keywords: "calculadora, metros, cúbicos, calcula, volumen, fácil, instante, nuestra, herramienta, precisa, ideal, líquidos, sólidos, construcción, ingresa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cubicyardcalculatorMeta[langHeader as keyof typeof cubicyardcalculatorMeta]
      ? langHeader
      : "en";

  const meta = cubicyardcalculatorMeta[language as keyof typeof cubicyardcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cubic-yard-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('cubic-yard-calculator', 'en'),
        'en': getCanonicalUrl('cubic-yard-calculator', 'en'),
        'es': getCanonicalUrl('cubic-yard-calculator', 'es'),
        'pt-BR': getCanonicalUrl('cubic-yard-calculator', 'br'),
        'pl': getCanonicalUrl('cubic-yard-calculator', 'pl'),
        'de': getCanonicalUrl('cubic-yard-calculator', 'de'),
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

export default async function CubicYardCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cubic Yard Calculator",
    "url": "https://www.thesmartcalculator.com/construction/cubic-yard-calculator",
    "description": "Free online Cubic Yard Calculator to measure material volume in cubic yards, calculate total cost, and plan construction or landscaping projects accurately.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Cubic Yard Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Volume Calculation in Cubic Yards",
          "Supports Feet, Inches, or Yards",
          "Cost Estimation",
          "Mobile-Friendly Interface",
          "Multiple Material Support (Soil, Gravel, Concrete, Mulch)"
        ],
        "url": "https://www.thesmartcalculator.com/construction/cubic-yard-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Cubic Yard Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Enter Dimensions",
            "text": "Input the length, width, and depth of the area to calculate volume."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Units",
            "text": "Choose feet, inches, or yards depending on your measurements."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Optional: Enter Price",
            "text": "Add price per cubic yard to calculate total cost."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Click Calculate",
            "text": "Get instant volume in cubic yards and total cost."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Cubic Yard Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is an online tool that calculates the volume of materials in cubic yards quickly and accurately."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate cubic yards manually?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the formula: Volume (yd³) = (Length × Width × Depth) ÷ 27 (if dimensions are in feet)."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate multiple areas at once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can sum volumes of multiple areas to get total cubic yards."
            }
          },
          {
            "@type": "Question",
            "name": "Can I calculate material cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by entering price per cubic yard, the calculator gives total cost."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on all devices including smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for material wastage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it provides theoretical volume. Add extra for waste or compaction."
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
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Contractors, landscapers, DIYers, material buyers, and students can benefit."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it’s completely free and requires no downloads."
            }
          },
          {
            "@type": "Question",
            "name": "What materials can I calculate volume for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Soil, gravel, concrete, sand, mulch, and other bulk materials."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="cubic-yard-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
