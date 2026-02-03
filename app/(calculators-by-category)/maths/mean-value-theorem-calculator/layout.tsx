import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for mean-value-theorem-calculator
const meanvaluetheoremcalculatorMeta = {
  en: {
    title: "Mean Value Theorem Calculator MVT Solver",
    description: "Solve Mean Value Theorem problems easily using our Mean Value Theorem Calculator for fast results.",
    keywords: "mean value theorem calculator, curve points, theorem tool, online mean, calculus analysis, math curve, free theorem tool, point finder"
  },
  br: {
    title: "Calculadora Teorema Valor Médio – Curva Online | TheSmartCalculator",
    description: "Use a Calculadora Teorema Valor Médio para encontrar pontos em uma curva. Ferramenta precisa para cálculo e análise matemática.",
    keywords: "calculadora teorema valor médio, pontos curva, ferramenta teorema, online médio, análise cálculo, curva matemática, gratuita ferramenta teorema, buscador ponto"
  },
  pl: {
    title: "Mean Value Theorem Calculator – Curve Points Online | TheSmart",
    description: "Użyj mean value theorem  – curve points online | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kontekst.",
    keywords: "durchschnittsrechner, kurvenpunkte, theorem tool, online durchschnitt, kalkül analyse, math kurve, kostenloser theorem tool, punkt finder"
  },
  de: {
    title: "Mean Value Theorem Calculator – Curve Points Online | TheSmart",
    description: "Berechne mit dem Durchschnittsrechner den Mittelwert deiner Zahlen. Schnell, genau & kostenlos – ideal für Schule, Statistik & Alltag!",
    keywords: "mean value theorem rechner, curve points, theorem tool, online mean, calculus analysis, math curve, kostenlos theorem tool, point finder"
  }
,
  es: {
    title: "Calculadora Teorema del Valor Medio – Resultados al Instante",
    description: "Aplica el Teorema del Valor Medio en segundos con nuestra calculadora online. Ingresa tu función y obtén el punto c y el valor exacto al instante.",
    keywords: "calculadora, teorema, valor, medio, resultados, instante, aplica, segundos, nuestra, online, ingresa, función, obtén, punto, exacto"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && meanvaluetheoremcalculatorMeta[langHeader as keyof typeof meanvaluetheoremcalculatorMeta]
      ? langHeader
      : "en";

  const meta = meanvaluetheoremcalculatorMeta[language as keyof typeof meanvaluetheoremcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('mean-value-theorem-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('mean-value-theorem-calculator', 'en'),
        'en': getCanonicalUrl('mean-value-theorem-calculator', 'en'),
        'es': getCanonicalUrl('mean-value-theorem-calculator', 'es'),
        'pt-BR': getCanonicalUrl('mean-value-theorem-calculator', 'br'),
        'pl': getCanonicalUrl('mean-value-theorem-calculator', 'pl'),
        'de': getCanonicalUrl('mean-value-theorem-calculator', 'de'),
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

export default async function MeanValueTheoremCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mean Value Theorem Calculator",
    "url": "https://www.thesmartcalculator.com/maths/mean-value-theorem-calculator",
    "description": "Use the free online Mean Value Theorem Calculator to find the value(s) of c where the instantaneous rate of change equals the average rate of change over a given interval. Perfect for students, educators, and professionals.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "url": "https://www.thesmartcalculator.com"
    },
    "mainEntity": [
      {
        "@type": "HowTo",
        "name": "How to Use the Mean Value Theorem Calculator",
        "description": "Step-by-step guide to using the free online Mean Value Theorem Calculator.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Enter the Function",
            "text": "Input the function f(x) you want to analyze, such as f(x) = x^2 + 3x + 2."
          },
          {
            "@type": "HowToStep",
            "name": "Enter the Interval",
            "text": "Provide the starting point a and ending point b of the interval."
          },
          {
            "@type": "HowToStep",
            "name": "Click Calculate",
            "text": "The calculator instantly finds the value(s) of c where the slope of the tangent equals the slope of the secant line."
          },
          {
            "@type": "HowToStep",
            "name": "Review Results",
            "text": "The output will show the exact value(s) of c for verification."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Mean Value Theorem Calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is an online tool that finds the point c where the instantaneous rate of change equals the average rate of change over an interval."
            }
          },
          {
            "@type": "Question",
            "name": "Is the calculator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it is a free online Mean Value Theorem calculator."
            }
          },
          {
            "@type": "Question",
            "name": "Which functions are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Polynomials, trigonometric, exponential, logarithmic, and other differentiable functions are supported."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to register to use it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No registration or installation is required."
            }
          },
          {
            "@type": "Question",
            "name": "Can it find multiple values of c?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, if multiple solutions exist within the interval, the calculator shows all possible c values."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate for complex functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator uses symbolic computation for precise results, but very complex or piecewise functions may require manual verification."
            }
          },
          {
            "@type": "Question",
            "name": "Can students use it for homework?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely — it’s perfect for learning, practice, and solving assignments efficiently."
            }
          },
          {
            "@type": "Question",
            "name": "Does it explain the steps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most calculators provide the derivative and slope calculation along with the result."
            }
          },
          {
            "@type": "Question",
            "name": "Can it replace manual calculations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It can assist, but understanding the MVT concept manually is recommended for full comprehension."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I access it?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can access it online via any web browser without downloading any software."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="mean-value-theorem-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
