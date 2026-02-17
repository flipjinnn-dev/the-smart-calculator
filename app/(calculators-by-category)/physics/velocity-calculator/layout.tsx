import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for velocity-calculator
const velocitycalculatorMeta = {
  en: {
    title: "Velocity Calculator",
    description: "Find speed and motion values instantly using our Velocity Calculator for physics and engineering problems.",
    keywords: "velocity calculator, speed acceleration, motion tool, online velocity, physics calculation, free velocity tool, acceleration estimator, velocity analysis"
  },
  br: {
    title: "Calculadora de Velocidade",
    description: "Use a calculadora de velocidade para medir rapidez de objetos. Planeje seus cálculos e simule velocidades com precisão agora mesmo!",
    keywords: "calculadora velocidade, aceleração velocidade, ferramenta movimento, online velocidade, cálculo física, gratuita ferramenta velocidade, estimador aceleração, análise velocidade"
  },
  pl: {
    title: "Kalkulator Prędkości – Oblicz Prędkość Online Szybko",
    description: "Użyj kalkulatora prędkości online, aby obliczyć prędkość ciała w ruchu. Proste, dokładne i darmowe narzędzie fizyczne dla uczniów i studentów.",
    keywords: "kalkulator prędkości, prędkość przyspieszenie, narzędzie ruchu, online prędkość, obliczenia fizyki, darmowe narzędzie prędkości, estymator przyspieszenia, analiza prędkości"
  },
  de: {
    title: "Geschwindigkeitsrechner – Geschwindigkeit einfach berechnen",
    description: "Berechne mit dem Geschwindigkeitsrechner die Geschwindigkeit aus Strecke & Zeit. Schnell, genau & kostenlos – ideal für Physik & Alltag!",
    keywords: "geschwindigkeitsrechner, geschwindigkeit beschleunigung, bewegungs tool, online geschwindigkeit, physik berechnung, kostenloser geschwindigkeit tool, beschleunigung schätzer, geschwindigkeit analyse"
  }
  ,
  es: {
    title: "Calculadora de Velocidad – Calcula Rápido y Fácil",
    description: "Calcula velocidad al instante con nuestra herramienta precisa. Ideal para física, deportes o transporte. ¡Ingresa distancia y tiempo y obtén el resultado ya!",
    keywords: "calculadora, velocidad, calcula, rápido, fácil, instante, nuestra, herramienta, precisa, ideal, física, deportes, transporte, ingresa, distancia"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && velocitycalculatorMeta[langHeader as keyof typeof velocitycalculatorMeta]
      ? langHeader
      : "en";

  const meta = velocitycalculatorMeta[language as keyof typeof velocitycalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('velocity-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('velocity-calculator', 'en'),
        'en': getCanonicalUrl('velocity-calculator', 'en'),
        'es': getCanonicalUrl('velocity-calculator', 'es'),
        'pt-BR': getCanonicalUrl('velocity-calculator', 'br'),
        'pl': getCanonicalUrl('velocity-calculator', 'pl'),
        'de': getCanonicalUrl('velocity-calculator', 'de'),
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

export default async function VelocityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Velocity Calculator",
    "url": "https://www.thesmartcalculator.com/physics/velocity-calculator",
    "description": "Free online Velocity Calculator to calculate speed or velocity using distance, time, initial velocity, and acceleration. Ideal for students, engineers, and hobbyists.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Velocity Calculator",
        "applicationCategory": "PhysicsCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate velocity for constant and accelerated motion",
          "Instant calculations",
          "Mobile-friendly interface",
          "Supports metric and imperial units",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/physics/velocity-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Velocity Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Velocity Calculator",
            "text": "Choose between constant velocity (distance/time) or accelerated motion (v = u + a × t)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Velocity Calculator",
            "text": "Input distance, time, initial velocity, and acceleration as required."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Velocity Calculator",
            "text": "Press the calculate button to get the velocity instantly."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Velocity Calculator",
            "text": "Ensure units are consistent for accurate results."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a velocity calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates the speed or velocity of an object using distance, time, initial velocity, and acceleration."
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
            "name": "Do I need software or installation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, it works directly in your browser."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it on mobile devices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is fully mobile-friendly."
            }
          },
          {
            "@type": "Question",
            "name": "What inputs are required?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Distance, time, initial velocity, and acceleration depending on the calculation type."
            }
          },
          {
            "@type": "Question",
            "name": "Which formulas are used?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simple velocity: v = distance ÷ time. Accelerated motion: v = u + a × t."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle different units?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports metric and imperial units."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is perfect for learning physics and motion concepts."
            }
          },
          {
            "@type": "Question",
            "name": "Can engineers or hobbyists use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is useful for experiments, projects, and motion analysis."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides precise results assuming consistent units and proper input values."
            }
          }
        ]
      }
    ]
  }


  return <>
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
    />
    {children}
  </>;
}
