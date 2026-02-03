import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for volume-calculator
const volumecalculatorMeta = {
  en: {
    title: "Volume Calculator Shape Volume Finder",
    description: "Find the volume of shapes instantly using our Volume Calculator for math and engineering.",
    keywords: "volume calculator, shapes volume, math tool, online volume, engineering calculator, free volume tool, shape calculation, volume estimate"
  },
  br: {
    title: "Calculadora de Volume – Calcule Espaços e Capacidades",
    description: "Use a Calculadora de Volume para calcular o espaço de sólidos e recipientes. Ferramenta rápida e precisa para estudos, engenharia e projetos.",
    keywords: "calculadora volume, volume formas, ferramenta matemática, online volume, calculadora engenharia, gratuita ferramenta volume, cálculo forma, estimativa volume"
  },
  pl: {
    title: "Kalkulator Objętości – Oblicz Objętość Online Szybko",
    description: "Użyj kalkulatora objętości online, aby obliczyć objętość różnych brył i pojemników. Proste, dokładne i darmowe narzędzie matematyczne.",
    keywords: "kalkulator objętości, objętość kształtów, narzędzie matematyczne, online objętość, kalkulator inżynieria, darmowe narzędzie objętość, obliczenia kształtu, estymacja objętości"
  },
  de: {
    title: "Volumenrechner – Volumen von Körpern einfach berechnen",
    description: "Berechne mit dem Volumenrechner das Volumen von Würfeln, Kugeln & Zylindern. Schnell, genau & kostenlos – ideal für Schule, Studium & Alltag!",
    keywords: "volumenrechner, körper volumen, math tool, online volumen, ingenieur rechner, kostenloser volumen tool, körper berechnung, volumen schätzung"
  }
,
  es: {
    title: "Calculadora de Volumen – Obtén Resultados al Instante",
    description: "Calcula el volumen de cubos, cilindros, prismas y más en segundos. Ingresa las medidas y obtén resultados exactos fácilmente. ¡Prueba la herramienta ahora!",
    keywords: "calculadora, volumen, obtén, resultados, instante, calcula, cubos, cilindros, prismas, segundos, ingresa, medidas, exactos, fácilmente, prueba"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && volumecalculatorMeta[langHeader as keyof typeof volumecalculatorMeta]
      ? langHeader
      : "en";

  const meta = volumecalculatorMeta[language as keyof typeof volumecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('volume-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('volume-calculator', 'en'),
        'en': getCanonicalUrl('volume-calculator', 'en'),
        'es': getCanonicalUrl('volume-calculator', 'es'),
        'pt-BR': getCanonicalUrl('volume-calculator', 'br'),
        'pl': getCanonicalUrl('volume-calculator', 'pl'),
        'de': getCanonicalUrl('volume-calculator', 'de'),
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

export default async function VolumeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Volume Calculator",
    "url": "https://www.thesmartcalculator.com/maths/volume-calculator",
    "description": "Free online Volume Calculator to calculate the space occupied by 3D shapes like cubes, cuboids, cylinders, spheres, cones, and pyramids. Ideal for students, engineers, and everyday use.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Volume Calculator",
        "applicationCategory": "MathCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate volume of cubes, cuboids, cylinders, spheres, cones, and pyramids",
          "Instant calculations",
          "Mobile-friendly interface",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/maths/volume-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Volume Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Volume Calculator",
            "text": "Choose the 3D shape you want to calculate the volume for."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Volume Calculator",
            "text": "Input required measurements like length, width, height, or radius."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Volume Calculator",
            "text": "Press the calculate button to get the volume instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a volume calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates the space occupied by 3D objects like cubes, cuboids, cylinders, spheres, cones, and pyramids."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is completely free to use online."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to install software?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in your browser."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is fully mobile-friendly and responsive."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support multiple shapes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, including cubes, cuboids, cylinders, spheres, cones, and pyramids."
            }
          },
          {
            "@type": "Question",
            "name": "How do I enter dimensions correctly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter all measurements in consistent units, such as cm or m."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get results in cubic meters or cm³?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the output matches your input units."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, perfect for homework, projects, and exams."
            }
          },
          {
            "@type": "Question",
            "name": "Can engineers or architects use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is useful for construction, material calculations, and design projects."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides precise results for all supported 3D shapes."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="volume-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
