import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for size-to-weight-rectangular-cuboid-calculator
const sizetoweightrectangularcuboidcalculatorMeta = {
  en: {
    title: "Size to Weight Calculator",
    description: "Convert dimensions into weight instantly using our Size to Weight Calculator for construction and engineering.",
    keywords: "size to weight calculator, rectangular cuboid, dimension weight, online size, density calculation, materials tool, engineering weight, weight estimate"
  },
  br: {
    title: "Calculadora de Tamanho para Peso",
    description: "Use a calculadora de tamanho para peso para converter dimensões em peso com precisão. Planeje seus projetos e simule agora mesmo!",
    keywords: "calculadora tamanho peso, cuboide retangular, peso dimensão, online tamanho, cálculo densidade, ferramenta materiais, peso engenharia, estimativa peso"
  },
  pl: {
    title: "Size to Weight Rectangular Cuboid Calculator – Online | TheSma",
    description: "Użyj kalkulatora rozmiaru do wagi prostopadłościanu do obliczenia wagi na podstawie wymiarów i gęstości. Dokładne, darmowe narzędzie do materiałów i inżynierii.",
    keywords: "kalkulator rozmiaru wagi, prostopadłościan retangularny, waga wymiar, online rozmiar, obliczenia gęstości, narzędzie materiałów, waga inżynieria, estymacja wagi"
  },
  de: {
    title: "Size to Weight Rectangular Cuboid Calculator – Online | TheSma",
    description: "Berechne mit dem Größe zu Gewicht Rechteckiger Kuboid Rechner Gewicht basierend auf Abmessungen und Dichte. Präzises, kostenloses Tool für Materialien und Ingenieur.",
    keywords: "größe zu gewicht rechner, rechteckiger kuboid, dimension gewicht, online größe, densität berechnung, materials tool, ingenieur gewicht, gewicht schätzung"
  }
,
  es: {
    title: "Calcula Peso de Tubo Rectangular – Rápido y Preciso",
    description: "Calcula el peso de tubos rectangulares al instante con nuestra herramienta precisa. ¡Optimiza tus proyectos y toma decisiones de construcción ahora mismo!",
    keywords: "calcula, peso, tubo, rectangular, rápido, preciso, tubos, rectangulares, instante, nuestra, herramienta, precisa, optimiza, proyectos, toma"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && sizetoweightrectangularcuboidcalculatorMeta[langHeader as keyof typeof sizetoweightrectangularcuboidcalculatorMeta]
      ? langHeader
      : "en";

  const meta = sizetoweightrectangularcuboidcalculatorMeta[language as keyof typeof sizetoweightrectangularcuboidcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'en'),
        'en': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'en'),
        'es': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'es'),
        'pt-BR': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'br'),
        'pl': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'pl'),
        'de': getCanonicalUrl('size-to-weight-rectangular-cuboid-calculator', 'de'),
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

export default async function SizeToWeightRectangularCuboidCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Size to Weight Calculator",
    "url": "https://www.thesmartcalculator.com/construction/size-to-weight-rectangular-cuboid-calculator",
    "description": "Free online Size to Weight Calculator to estimate the weight of any rectangular cuboid using dimensions and material density.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Size to Weight Calculator",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculates cuboid weight instantly",
          "Supports cm, m, mm, inches, and feet",
          "Preset and custom material density",
          "Results in kilograms and pounds",
          "Mobile-friendly and easy-to-use"
        ],
        "url": "https://www.thesmartcalculator.com/construction/size-to-weight-rectangular-cuboid-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Size to Weight Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Size to Weight Calculator",
            "text": "Input the length, width, and height of the cuboid."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Size to Weight Calculator",
            "text": "Choose a preset material or enter a custom density."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Size to Weight Calculator",
            "text": "Ensure consistent units: cm, m, mm, inches, or feet."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Size to Weight Calculator",
            "text": "Get the weight in kilograms and pounds instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Size to Weight Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates the weight of a rectangular cuboid using its dimensions and material density."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use different units?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the calculator supports cm, m, mm, inches, and feet."
            }
          },
          {
            "@type": "Question",
            "name": "Does it include common materials?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, preset materials include steel, wood, concrete, and aluminum."
            }
          },
          {
            "@type": "Question",
            "name": "Can I enter custom density?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can enter any density for accurate weight calculation."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for DIY projects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ideal for furniture, enclosures, and custom objects."
            }
          },
          {
            "@type": "Question",
            "name": "Does it calculate weight in kg and lb?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, results are displayed in both kilograms and pounds."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works on smartphones, tablets, and desktops."
            }
          },
          {
            "@type": "Question",
            "name": "Who should use this calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Engineers, builders, DIYers, students, and logistics planners."
            }
          },
          {
            "@type": "Question",
            "name": "Does it account for hollow or irregular objects?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it assumes a solid cuboid of uniform density."
            }
          },
          {
            "@type": "Question",
            "name": "Is this tool free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it’s completely free and requires no downloads."
            }
          }
        ]
      }
    ]
  }

  return <>
    {children}
    <Script
      id="size-to-weight-rectangular-cuboid-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
