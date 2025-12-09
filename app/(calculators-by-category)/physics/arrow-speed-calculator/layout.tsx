import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for arrow-speed-calculator
const arrowspeedcalculatorMeta = {
  en: {
    title: "Arrow Speed Calculator – Momentum Online | TheSmartCalculator",
    description: "Use the Arrow Speed Calculator to compute speed, momentum, and kinetic energy from IBO ratings. Accurate, free online tool for archery and physics analysis.",
    keywords: "arrow speed calculator, momentum tool, kinetic energy, ibo ratings, online arrow, archery calculator, free speed tool, physics arrow"
  },
  br: {
    title: "Calculadora Velocidade Flecha – Momentum Online | TheSmartCalculator",
    description: "Use a Calculadora Velocidade Flecha para calcular velocidade, momentum e energia cinética de classificações IBO. Ferramenta precisa para arco e flecha e física.",
    keywords: "calculadora velocidade flecha, momentum tool, energia cinética, ibo classificações, online flecha, arco calculadora, gratuita tool"
  },
  pl: {
    title: "Kalkulator Prędkości Strzały – Momentum Online | TheSmartCalculator",
    description: "Użyj kalkulatora prędkości strzały online, aby obliczyć prędkość, momentum i energię kinetyczną z ocen IBO. Dokładne narzędzie do łucznictwa i fizyki.",
    keywords: "kalkulator prędkości strzały, momentum tool, energia kinetyczna, ibo oceny, online strzała, łucznictwo kalkulator, darmowy tool"
  },
  de: {
    title: "Arrow Speed Calculator – Momentum Online | TheSmartCalculator",
    description: "Berechne mit dem Pfeilgeschwindigkeit Rechner Geschwindigkeit, Momentum und kinetische Energie aus IBO-Werten. Präzises Tool für Bogenschießen und Physik.",
    keywords: "pfeilgeschwindigkeit rechner, momentum berechnen, kinetische energie, ibo werte, online pfeil, bogenschießen tool, kostenloser rechner"
  }
,
  es: {
    title: "Calculadora de Velocidad de Flecha – Precisión al Instante",
    description: "Calcula la velocidad de tu flecha al instante con nuestra herramienta precisa. ¡Optimiza tu tiro con arco y mejora tu puntería ahora mismo!",
    keywords: "calculadora, velocidad, flecha, precisión, instante, calcula, nuestra, herramienta, precisa, optimiza, tiro, arco, mejora, puntería, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && arrowspeedcalculatorMeta[langHeader as keyof typeof arrowspeedcalculatorMeta]
      ? langHeader
      : "en";

  const meta = arrowspeedcalculatorMeta[language as keyof typeof arrowspeedcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('arrow-speed-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('arrow-speed-calculator', 'en'),
        'es': getCanonicalUrl('arrow-speed-calculator', 'es'),
        'pt-BR': getCanonicalUrl('arrow-speed-calculator', 'br'),
        'pl': getCanonicalUrl('arrow-speed-calculator', 'pl'),
        'de': getCanonicalUrl('arrow-speed-calculator', 'de'),
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

export default async function ArrowSpeedCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonldSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Arrow Speed Calculator",
    "url": "https://www.thesmartcalculator.com/physics/arrow-speed-calculator",
    "description": "Free online Arrow Speed Calculator to estimate arrow speed, kinetic energy, and momentum using draw weight, draw length, and arrow weight. Ideal for archers, hobbyists, and students.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Arrow Speed Calculator",
        "applicationCategory": "PhysicsCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate arrow speed, kinetic energy, and momentum",
          "Instant calculation",
          "Mobile-friendly interface",
          "Supports metric and imperial units",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/physics/arrow-speed-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Arrow Speed Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Arrow Speed Calculator",
            "text": "Input the bow's draw weight in pounds (lbs)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Arrow Speed Calculator",
            "text": "Input the bow's draw length in inches."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Arrow Speed Calculator",
            "text": "Input the full arrow weight in grains."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Arrow Speed Calculator",
            "text": "Press the calculate button to get arrow speed instantly."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Arrow Speed Calculator",
            "text": "Ensure all units are consistent for accurate results."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an arrow speed calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It estimates the speed, kinetic energy, and momentum of an arrow using bow and arrow specifications."
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
              "text": "Draw weight, draw length, and arrow weight (grains)."
            }
          },
          {
            "@type": "Question",
            "name": "Can it calculate kinetic energy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, most calculators also provide kinetic energy and momentum along with speed."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ideal for learning physics and projectile motion concepts."
            }
          },
          {
            "@type": "Question",
            "name": "Can archers use it for real-world shooting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, as an estimate, but real-world speed may vary depending on equipment and technique."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle different units?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, metric and imperial units are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It provides approximate results based on inputs; real-world arrow speed may vary slightly."
            }
          }
        ]
      }
    ]
  }

  return <>
    {children}
    <Script
      id="arrow-speed-calculator-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonldSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
