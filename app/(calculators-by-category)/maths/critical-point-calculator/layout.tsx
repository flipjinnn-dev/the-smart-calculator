import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for critical-point-calculator
const criticalpointcalculatorMeta = {
  en: {
    title: "Critical Point Calculator – Function Online | TheSmartCalculator",
    description: "Use the Critical Point Calculator to find critical points of functions. Accurate, free online tool for math analysis, extrema, and calculus problems.",
    keywords: "critical point calculator, function tool, extrema calculation, online critical, math analysis, calculus problems, free point tool, find points"
  },
  br: {
    title: "Calculadora Ponto Crítico – Função Online | TheSmartCalculator",
    description: "Use a Calculadora Ponto Crítico para encontrar pontos críticos de funções. Ferramenta precisa para análise matemática, extremos e problemas de cálculo.",
    keywords: "calculadora ponto crítico, função tool, extremos cálculo, online crítico, análise matemática, problemas cálculo, gratuita tool"
  },
  pl: {
    title: "Kalkulator Punktu Krytycznego – Funkcja Online | TheSmartCalculator",
    description: "Użyj kalkulatora punktu krytycznego online, aby znaleźć punkty krytyczne funkcji. Dokładne, darmowe narzędzie do analizy matematycznej i ekstremów.",
    keywords: "kalkulator punktu krytycznego, funkcja tool, ekstremy obliczenia, online krytyczny, analiza matematyczna, problemy kalkulus, darmowy tool"
  },
  de: {
    title: "Kritische Punkte Rechner – Extrema Berechnen | TheSmartCalculator",
    description: "Berechne mit dem Kritische Punkte Rechner Extrema & Wendepunkte von Funktionen. Schnell, exakt & kostenlos – ideal für Schule & Studium in Analysis!",
    keywords: "kritische punkte rechner, extrema berechnen, wendepunkte tool, funktionen online, schule studium, exakt kostenlos, ideal rechner"
  }
,
  es: {
    title: "Calculadora de Puntos Críticos – Encuentra Máximos y Mínimos",
    description: "Calcula puntos críticos de funciones rápidamente. Ideal para matemáticas, análisis y cálculo. ¡Ingresa tu función y obtén resultados al instante!",
    keywords: "calculadora, puntos, críticos, encuentra, máximos, mínimos, calcula, funciones, rápidamente, ideal, matemáticas, análisis, cálculo, ingresa, función"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && criticalpointcalculatorMeta[langHeader as keyof typeof criticalpointcalculatorMeta]
      ? langHeader
      : "en";

  const meta = criticalpointcalculatorMeta[language as keyof typeof criticalpointcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('critical-point-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }critical-point-calculator`,
      languages: {
        'en': getCanonicalUrl('critical-point-calculator', 'en'),
        'pt-BR': getCanonicalUrl('critical-point-calculator', 'br'),
        'pl': getCanonicalUrl('critical-point-calculator', 'pl'),
        'de': getCanonicalUrl('critical-point-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${language !== "en" ? `${language}/` : ""
        }critical-point-calculator`,
    },
  };
}

export default async function CriticalPointCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Critical Point Calculator - Step-by-Step Guide",
    "url": "https://www.thesmartcalculator.com/maths/critical-point-calculator",
    "description": "Learn how to use the Critical Point Calculator to find critical points, critical values, and analyze functions. Includes examples, key features, and FAQs.",
    "publisher": {
      "@type": "Organization",
      "name": "The Smart Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thesmartcalculator.com/logo.png"
      }
    },
    "mainEntity": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a critical point?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A critical point is where a function’s derivative is zero or undefined, often indicating a local maximum, minimum, or inflection point."
            }
          },
          {
            "@type": "Question",
            "name": "How does the Critical Value Calculator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It automatically differentiates the function, solves for zeros or undefined points, and calculates the corresponding function values."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for any function?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it works for polynomial, trigonometric, exponential, and logarithmic functions."
            }
          },
          {
            "@type": "Question",
            "name": "Is it accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, but for complex or piecewise functions, manual verification is recommended."
            }
          },
          {
            "@type": "Question",
            "name": "Does it provide step-by-step solutions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most calculators offer step-by-step solutions for learning purposes."
            }
          },
          {
            "@type": "Question",
            "name": "Can I graph the function?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, graphical visualization is available in many calculators to see critical points clearly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I find global extrema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Critical points help locate local extrema. To find global extrema, analyze endpoints along with critical points."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to know calculus?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basic understanding helps, but the calculator simplifies derivative and critical value calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Is it free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many online calculators are free, though some may have premium features."
            }
          },
          {
            "@type": "Question",
            "name": "Why is it useful for students and professionals?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It saves time, reduces errors, and provides clear visualization for function analysis."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="critical-point-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
