import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for piecewise-function-calculator-grapher
const piecewisefunctioncalculatorgrapherMeta = {
  en: {
    title: "Piecewise Function Calculator Solve & Graph",
    description: "Solve and graph piecewise functions quickly using our Piecewise Function Calculator.",
    keywords: "piecewise function calculator, graph piecewise, function tool, online grapher, math analysis, domain calculator, free piecewise tool, student math"
  },
  br: {
    title: "Calculadora de Função Pedaço – Gráfico Online | TheSmartCalculator",
    description: "Use a Calculadora de Função Pedaço para avaliar e graficar funções definidas por partes. Ferramenta precisa e gratuita online para análise matemática e domínios.",
    keywords: "calculadora função pedaço, gráfico função, ferramenta pedaço online, análise matemática, domínio calculadora, gratuita tool, matemática estudante"
  },
  pl: {
    title: "Kalkulator Funkcji Częściowej – Wykres Online | TheSmartCalculator",
    description: "Użyj kalkulatora funkcji częściowej online, aby ocenić i wykreślić funkcje piecewise. Dokładne, darmowe narzędzie do analizy matematycznej i domen.",
    keywords: "kalkulator funkcji częściowej, wykres piecewise, funkcja tool, online grapher, analiza matematyczna, domena kalkulator, darmowy tool"
  },
  de: {
    title: "Stückweise Funktion Rechner – Graph Berechnen | TheSmartCalculator",
    description: "Berechne mit dem St\u00fcckweise Funktion Rechner Werte und Graphen von stückweisen Funktionen. Präzises, kostenloses Online-Tool für Mathe-Analyse und Domänen.",
    keywords: "stückweise funktion rechner, graph berechnen, funktion tool, online grapher, mathe analyse, domäne rechner, kostenloser tool"
  },
  es: {
    title: "Calculadora de Funciones por Tramos – Calcula Fácil y Rápido",
    description: "Resuelve funciones por tramos al instante con nuestra calculadora precisa. ¡Simplifica tus ejercicios y aprende matemáticas de manera eficiente ahora!",
    keywords: "calculadora, funciones, tramos, calcula, fácil, rápido, resuelve, instante, nuestra, precisa, simplifica, ejercicios, aprende, matemáticas, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && piecewisefunctioncalculatorgrapherMeta[langHeader as keyof typeof piecewisefunctioncalculatorgrapherMeta]
      ? langHeader
      : "en";

  const meta = piecewisefunctioncalculatorgrapherMeta[language as keyof typeof piecewisefunctioncalculatorgrapherMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('piecewise-function-calculator-grapher', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('piecewise-function-calculator-grapher', 'en'),
        'en': getCanonicalUrl('piecewise-function-calculator-grapher', 'en'),
        'es': getCanonicalUrl('piecewise-function-calculator-grapher', 'es'),
        'pt-BR': getCanonicalUrl('piecewise-function-calculator-grapher', 'br'),
        'pl': getCanonicalUrl('piecewise-function-calculator-grapher', 'pl'),
        'de': getCanonicalUrl('piecewise-function-calculator-grapher', 'de'),
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

export default async function PiecewiseFunctionCalculatorGrapherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Piecewise Function Calculator & Grapher",
    "url": "https://www.thesmartcalculator.com/piecewise-function-calculator-grapher",
    "description": "Free online Piecewise Function Calculator & Grapher to define, evaluate, and graph piecewise functions. Ideal for students, teachers, and math enthusiasts.",
    "mainEntity": [
      {
        "@type": "SoftwareApplication",
        "name": "Piecewise Function Calculator & Grapher",
        "applicationCategory": "Calculator",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Define multiple function pieces with different intervals",
          "Instant evaluation of f(x) at any x-value",
          "Graph piecewise functions with correct discontinuities",
          "Supports polynomials, trig, exponentials, and absolute values",
          "Mobile-friendly and free to use"
        ],
        "url": "https://www.thesmartcalculator.com/piecewise-function-calculator-grapher"
      },
      {
        "@type": "HowTo",
        "name": "Piecewise Function Definition",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Piecewise Function Definition",
            "text": "Enter each expression and its valid interval, e.g., x < 0, 0 ≤ x < 2, x ≥ 2."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Piecewise Function Definition",
            "text": "Specify the points where you want to evaluate the function."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Piecewise Function Definition",
            "text": "Set the graph range if needed and click Calculate/Graph to view values and the graph."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Piecewise Function Calculator & Grapher?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It allows you to define, evaluate, and graph functions composed of multiple pieces, each with a specific interval."
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
              "text": "No, it works directly in any web browser."
            }
          },
          {
            "@type": "Question",
            "name": "Can I graph my piecewise functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the tool generates accurate graphs showing each piece and any discontinuities."
            }
          },
          {
            "@type": "Question",
            "name": "Can I define multiple pieces?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can add as many sub-functions with different intervals as needed."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support trig, exponential, or absolute value functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it handles polynomials, trigonometric, exponential, and absolute value functions."
            }
          },
          {
            "@type": "Question",
            "name": "Is it suitable for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is ideal for learning, homework, and classroom demonstrations."
            }
          },
          {
            "@type": "Question",
            "name": "Can it handle discontinuities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, jumps and endpoint conditions are accurately represented in the graph."
            }
          },
          {
            "@type": "Question",
            "name": "Can I evaluate the function at any point?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, enter x-values and the calculator will compute the corresponding f(x)."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides precise evaluations and graphing for all standard piecewise functions."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="piecewise-function-calculator-grapher-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
