import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for car-jump-distance-calculator
const carjumpdistancecalculatorMeta = {
  en: {
    title: "Car Jump Distance Calculator – Speed Angle Online | TheSmartCa",
    description: "Use the Car Jump Distance Calculator to compute jump distance based on speed and angle. Accurate, free online tool for physics simulations and fun calculations.",
    keywords: "car jump distance calculator, speed angle, jump tool, online distance, physics simulation, free jump calculator, car calculation, fun tool"
  },
  br: {
    title: "Car Jump Distance Calculator – Speed Angle Online | TheSmartCa",
    description: "Use a Calculadora Distância Salto Carro para calcular distância de salto com velocidade e ângulo. Ferramenta precisa para simulações de física e cálculos divertidos.",
    keywords: "calculadora distância salto, velocidade ângulo, salto tool, online distância, simulação física, gratuita calculadora, carro cálculo"
  },
  pl: {
    title: "Car Jump Distance Calculator – Speed Angle Online | TheSmartCa",
    description: "Użyj kalkulatora dystansu skoku samochodu online, aby obliczyć odległość skoku na podstawie prędkości i kąta. Dokładne narzędzie do symulacji fizyki.",
    keywords: "kalkulator dystansu skoku, prędkość kąt, skok tool, online dystans, symulacja fizyki, darmowy kalkulator, samochód obliczenia"
  },
  de: {
    title: "Entfernungsrechner – Strecke Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Entfernungsrechner die Strecke anhand von Zeit & Geschwindigkeit. Schnell, exakt & kostenlos – ideal für Physik & Reisen in Simulationen!",
    keywords: "entfernungsrechner, strecke berechnen, zeit geschwindigkeit, online tool, physik reisen, exakt kostenlos, ideal rechner"
  }
,
  es: {
    title: "Calculadora de Distancia de Salto de Auto – Calcula Fácil",
    description: "Calcula la distancia de salto de tu auto al instante con nuestra herramienta precisa. ¡Optimiza tus maniobras y experimenta con seguridad ahora mismo!",
    keywords: "calculadora, distancia, salto, auto, calcula, fácil, instante, nuestra, herramienta, precisa, optimiza, maniobras, experimenta, seguridad, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && carjumpdistancecalculatorMeta[langHeader as keyof typeof carjumpdistancecalculatorMeta]
      ? langHeader
      : "en";

  const meta = carjumpdistancecalculatorMeta[language as keyof typeof carjumpdistancecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('car-jump-distance-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('car-jump-distance-calculator', 'en'),
        'es': getCanonicalUrl('car-jump-distance-calculator', 'es'),
        'pt-BR': getCanonicalUrl('car-jump-distance-calculator', 'br'),
        'pl': getCanonicalUrl('car-jump-distance-calculator', 'pl'),
        'de': getCanonicalUrl('car-jump-distance-calculator', 'de'),
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

export default async function CarJumpDistanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Car Jump Distance Calculator",
    "url": "https://www.thesmartcalculator.com/physics/car-jump-distance-calculator",
    "description": "Free online Car Jump Distance Calculator to estimate jump distance, time of flight, and maximum height using speed, ramp angle, and launch height. Ideal for students, hobbyists, and physics enthusiasts.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Car Jump Distance Calculator",
        "applicationCategory": "PhysicsCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Estimate jump distance, time of flight, and max height",
          "Instant calculation",
          "Mobile-friendly interface",
          "Supports metric and imperial units",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/physics/car-jump-distance-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Car Jump Distance Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Car Jump Distance Calculator",
            "text": "Input the car's speed at take-off in meters per second or km/h."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Car Jump Distance Calculator",
            "text": "Provide the angle of the ramp relative to the horizontal."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Car Jump Distance Calculator",
            "text": "Input the ramp or take-off height above the landing surface."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Car Jump Distance Calculator",
            "text": "Press the calculate button to view jump distance, time of flight, and maximum height instantly."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Car Jump Distance Calculator",
            "text": "Ensure all units are consistent for accurate results."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a car jump distance calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates how far a car will travel when launched from a ramp using physics formulas."
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
              "text": "Initial speed, ramp angle, launch height, and optionally landing height."
            }
          },
          {
            "@type": "Question",
            "name": "Which physics principles are used?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator uses ideal projectile motion equations under gravity."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, perfect for learning physics, projectile motion, and trajectory concepts."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for real-life stunts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, results are theoretical; real-world jumps involve complex factors like drag and aerodynamics."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle different units?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, both metric and imperial units are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It provides approximate results under ideal physics; real-world outcomes may differ."
            }
          }
        ]
      }
    ]
  }

  return <>
    {children}
    <Script
      id="car-jump-distance-calculator-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
