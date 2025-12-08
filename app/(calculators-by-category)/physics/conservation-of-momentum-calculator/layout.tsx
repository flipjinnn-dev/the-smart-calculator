import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for conservation-of-momentum-calculator
const conservationofmomentumcalculatorMeta = {
  en: {
    title: "Conservation of Momentum Calculator – Collisions Online | TheS",
    description: "Use the Conservation of Momentum Calculator to compute momentum in collisions. Accurate, free online tool for physics students and collision analysis.",
    keywords: "conservation of momentum calculator, collisions tool, momentum calculation, online conservation, physics analysis, free momentum tool, student calculator"
  },
  br: {
    title: "Conservation of Momentum Calculator – Collisions Online | TheS",
    description: "Use a Calculadora Conservação Momentum para calcular momentum em colisões. Ferramenta precisa e gratuita para estudantes de física e análise de impactos.",
    keywords: "calculadora conservação momentum, colisões tool, cálculo momentum, online conservação, análise física, gratuita tool, estudantes calculadora"
  },
  pl: {
    title: "Kalkulator Zachowania Pędu – Zderzenia Online | TheSmartCalculator",
    description: "Użyj kalkulatora zachowania pędu online, aby obliczyć pęd w zderzeniach. Dokładne, darmowe narzędzie dla studentów fizyki i analizy kolizji.",
    keywords: "kalkulator zachowania pędu, zderzenia tool, obliczyć pęd, online zachowania, analiza fizyki, darmowy tool, studenci kalkulator"
  },
  de: {
    title: "Conservation of Momentum Calculator – Collisions Online | TheS",
    description: "Berechne mit dem Erhaltung des Impulses Rechner Impuls in Kollisionen. Präzises, kostenloses Tool für Physikstudenten und Kollisionsanalyse.",
    keywords: "erhaltung impulses rechner, kollisionen tool, impuls berechnen, online erhaltung, physik analyse, kostenloser tool, studenten rechner"
  }
,
  es: {
    title: "Calculadora de Conservación del Momento – Física Fácil",
    description: "Calcula la conservación del momento lineal y angular al instante con nuestra herramienta precisa. ¡Resuelve problemas de física rápida y fácilmente!",
    keywords: "calculadora, conservación, momento, física, fácil, calcula, lineal, angular, instante, nuestra, herramienta, precisa, resuelve, problemas, rápida"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && conservationofmomentumcalculatorMeta[langHeader as keyof typeof conservationofmomentumcalculatorMeta]
      ? langHeader
      : "en";

  const meta = conservationofmomentumcalculatorMeta[language as keyof typeof conservationofmomentumcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('conservation-of-momentum-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('conservation-of-momentum-calculator', 'en'),
        'pt-BR': getCanonicalUrl('conservation-of-momentum-calculator', 'br'),
        'pl': getCanonicalUrl('conservation-of-momentum-calculator', 'pl'),
        'de': getCanonicalUrl('conservation-of-momentum-calculator', 'de'),
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

export default async function ConservationOfMomentumCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Conservation of Momentum Calculator",
    "url": "https://www.thesmartcalculator.com/physics/conservation-of-momentum-calculator",
    "description": "Free online Conservation of Momentum Calculator to calculate final velocities and momentum in collisions using mass, initial velocities, and collision type. Ideal for students, teachers, and physics enthusiasts.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Conservation of Momentum Calculator",
        "applicationCategory": "PhysicsCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate final velocities and unknown momentum variables",
          "Instant calculation",
          "Mobile-friendly interface",
          "Supports metric and imperial units",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/physics/conservation-of-momentum-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Conservation of Momentum Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Conservation of Momentum Calculator",
            "text": "Input the masses of the colliding objects (m1 and m2)."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Conservation of Momentum Calculator",
            "text": "Provide the velocities of the objects before the collision (u1 and u2)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Conservation of Momentum Calculator",
            "text": "Choose elastic, inelastic, or generic momentum conservation if available."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Conservation of Momentum Calculator",
            "text": "Leave the unknown variable blank for the calculator to solve it."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Conservation of Momentum Calculator",
            "text": "Press the calculate button to get the final velocities instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Conservation of Momentum Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It calculates final velocities or unknown momentum variables in collisions using the law of momentum conservation."
            }
          },
          {
            "@type": "Question",
            "name": "Is this calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is completely free online."
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
              "text": "Masses, initial velocities, collision type, and optionally one final velocity."
            }
          },
          {
            "@type": "Question",
            "name": "Which physics principles are used?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator uses the law of conservation of momentum for isolated systems."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ideal for learning physics, homework, and exams."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle different collision types?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it supports elastic, inelastic, and generic collisions."
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
              "text": "It provides approximate results for ideal physics situations; real-world collisions may differ due to external factors."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="conservation-of-momentum-calculator-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
