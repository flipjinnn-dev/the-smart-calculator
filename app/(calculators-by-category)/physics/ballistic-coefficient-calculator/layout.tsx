import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for ballistic-coefficient-calculator
const ballisticcoefficientcalculatorMeta = {
  en: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Use the Ballistic Coefficient Calculator to compute coefficient for projectiles. Accurate, free online tool for ballistics analysis and shooting planning.",
    keywords: "ballistic coefficient calculator, projectile tool, coefficient calculation, online ballistic, shooting planner, free coefficient tool, analysis ballistics"
  },
  br: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Use a Calculadora Coeficiente Balístico para calcular coeficiente de projéteis. Ferramenta precisa e gratuita para análise balística e planejamento de tiro.",
    keywords: "calculadora coeficiente balístico, projétil tool, cálculo coeficiente, online balístico, planejamento tiro, gratuita tool, análise balística"
  },
  pl: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Użyj kalkulatora współczynnika balistycznego online, aby obliczyć współczynnik dla pocisków. Dokładne, darmowe narzędzie do analizy balistycznej i planowania.",
    keywords: "kalkulator współczynnika balistycznego, pocisk tool, obliczyć współczynnik, online balistyczny, planowanie strzelanie, darmowy tool, analiza balistyczna"
  },
  de: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Berechne mit dem Ballistischen Koeffizient Rechner den Koeffizienten für Projektile. Präzises, kostenloses Tool für Ballistik-Analyse und Schussplanung.",
    keywords: "ballistischer koeffizient rechner, projektil tool, koeffizient berechnen, online ballistik, schuss planung, kostenloser tool, analyse ballistik"
  }
,
  es: {
    title: "Calculadora Balística – Trayectoria y Alcance con Precisión",
    description: "Calcula trayectoria, caída y energía balística con precisión para uso seguro en deportes y estudios. Ingresa datos y obtén resultados al instante.",
    keywords: "calculadora, balística, trayectoria, alcance, precisión, calcula, caída, energía, seguro, deportes, estudios, ingresa, datos, obtén, resultados"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ballisticcoefficientcalculatorMeta[langHeader as keyof typeof ballisticcoefficientcalculatorMeta]
      ? langHeader
      : "en";

  const meta = ballisticcoefficientcalculatorMeta[language as keyof typeof ballisticcoefficientcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ballistic-coefficient-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('ballistic-coefficient-calculator', 'en'),
        'pt-BR': getCanonicalUrl('ballistic-coefficient-calculator', 'br'),
        'pl': getCanonicalUrl('ballistic-coefficient-calculator', 'pl'),
        'de': getCanonicalUrl('ballistic-coefficient-calculator', 'de'),
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

import Script from "next/script";

export default async function BallisticCoefficientCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ballistic Coefficient Calculator",
    "url": "https://www.thesmartcalculator.com/physics/ballistic-coefficient-calculator",
    "description": "Free online Ballistic Coefficient Calculator to measure projectile efficiency using mass, drag coefficient, and cross-sectional area. Ideal for students, engineers, and hobbyists.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Ballistic Coefficient Calculator",
        "applicationCategory": "PhysicsCalculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Calculate ballistic coefficient of projectiles",
          "Instant calculations",
          "Mobile-friendly interface",
          "Free and easy to use"
        ],
        "url": "https://www.thesmartcalculator.com/physics/ballistic-coefficient-calculator"
      },
      {
        "@type": "HowTo",
        "name": "Ballistic Coefficient Calculator",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Ballistic Coefficient Calculator",
            "text": "Input the mass of the projectile in kg or g."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Ballistic Coefficient Calculator",
            "text": "Provide the drag coefficient (Cd) of the projectile."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Ballistic Coefficient Calculator",
            "text": "Input the frontal area (A) in m²."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Ballistic Coefficient Calculator",
            "text": "Press calculate to get the ballistic coefficient instantly."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a ballistic coefficient?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It measures how efficiently a projectile overcomes air resistance."
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
            "name": "Can I use it on mobile?",
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
              "text": "Mass (m), drag coefficient (Cd), and cross-sectional area (A)."
            }
          },
          {
            "@type": "Question",
            "name": "How is BC calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Using the formula: BC = m / (Cd × A)."
            }
          },
          {
            "@type": "Question",
            "name": "Can it compare different projectiles?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, by calculating BC for each projectile, you can compare efficiency."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it helps students learn external ballistics and physics concepts."
            }
          },
          {
            "@type": "Question",
            "name": "Can engineers or hobbyists use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is useful for design experiments and projectile analysis."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides precise results for input values, but it is a simplified model."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="ballistic-coefficient-calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
