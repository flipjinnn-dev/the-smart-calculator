import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";

// Multilingual SEO metadata for relative-extrema-calculator
const relativeextremacalculatorMeta = {
  en: {
    title: "Relative Extrema Calculator",
    description: "Identify maxima and minima in functions using our Relative Extrema Calculator for quick solutions.",
    keywords: "relative extrema calculator, local maxima, local minima, critical points, derivatives, second derivative test, first derivative test, calculus calculator, extrema finder, free calculator, step-by-step solutions, interactive graphs, optimization, mathematical modeling"
  },
  br: {
    title: "máximos e mínimos relativos",
    description: "Use nossa Calculadora de Extremos Relativos para calcular máximos e mínimos de funções de forma rápida e fácil. Ideal para estudantes e professores de matemática.",
    keywords: "calculadora de extremos relativos, máximos locais, mínimos locais, pontos críticos, derivadas, teste da segunda derivada, teste da primeira derivada, calculadora de cálculo, localizador de extremos, calculadora gratuita, soluções passo a passo, gráficos interativos, otimização, modelagem matemática"
  },
  pl: {
    title: "Kalkulator Ekstremów Względnych – Darmowy Kalkulator Maksimum i Minimum z Krokami i Wykresami",
    description: "Skorzystaj z naszego Kalkulatora Ekstremów Względnych, aby natychmiast znaleźć lokalne maksimum i minimum dowolnej funkcji. Zawiera pochodne krok po kroku, punkty krytyczne, interaktywne wykresy i wzory. 100% darmowy, przyjazny dla urządzeń mobilnych, idealny dla studentów, inżynierów i pasjonatów rachunku różniczkowego.",
    keywords: "kalkulator ekstremów względnych, lokalne maksimum, lokalne minimum, punkty krytyczne, pochodne, test drugiej pochodnej, test pierwszej pochodnej, kalkulator rachunku różniczkowego, wyszukiwarka ekstremów, darmowy kalkulator, rozwiązania krok po kroku, interaktywne wykresy, optymalizacja, modelowanie matematyczne"
  },
  de: {
    title: "Relative Extrema Rechner – Kostenloser Max- & Min-Rechner mit Schritten & Grafiken",
    description: "Verwenden Sie unseren Relative Extrema Rechner, um sofort lokale Maxima und Minima jeder Funktion zu finden. Schritt-für-Schritt-Ableitungen, kritische Punkte, interaktive Grafiken und Formeln inklusive. 100% kostenlos, mobilfreundlich, perfekt für Studenten, Ingenieure und Kalkül-Enthusiasten.",
    keywords: "relative extrema rechner, lokale maxima, lokale minima, kritische punkte, ableitungen, zweite ableitung test, erste ableitung test, kalkül rechner, extrema finder, kostenloser rechner, schritt-für-schritt lösungen, interaktive grafiken, optimierung, mathematische modellierung"
  },
  es: {
    title: "Calculadora de Extremos Relativos – Calculadora Gratuita de Máximos y Mínimos con Pasos y Gráficos",
    description: "Usa nuestra Calculadora de Extremos Relativos para encontrar instantáneamente máximos y mínimos locales de cualquier función. Derivadas paso a paso, puntos críticos, gráficos interactivos y fórmulas incluidas. 100% gratuita, compatible con móviles, perfecta para estudiantes, ingenieros y entusiastas del cálculo.",
    keywords: "calculadora de extremos relativos, máximos locales, mínimos locales, puntos críticos, derivadas, prueba de la segunda derivada, prueba de la primera derivada, calculadora de cálculo, buscador de extremos, calculadora gratuita, soluciones paso a paso, gráficos interactivos, optimización, modelado matemático"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && relativeextremacalculatorMeta[langHeader as keyof typeof relativeextremacalculatorMeta]
      ? langHeader
      : "en";

  const meta = relativeextremacalculatorMeta[language as keyof typeof relativeextremacalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('relative-extrema-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('relative-extrema-calculator', 'en'),
        'en': getCanonicalUrl('relative-extrema-calculator', 'en'),
        'es': getCanonicalUrl('relative-extrema-calculator', 'es'),
        'pt-BR': getCanonicalUrl('relative-extrema-calculator', 'br'),
        'pl': getCanonicalUrl('relative-extrema-calculator', 'pl'),
        'de': getCanonicalUrl('relative-extrema-calculator', 'de'),
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

export default async function RelativeExtremaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "thesmartcalculator",
        "description": "Use our Relative Extrema Calculator to instantly find local maxima and minima of any function. Step-by-step derivatives, critical points, interactive graphs, and formulas included. 100% free, mobile-friendly, perfect for students, engineers, and calculus enthusiasts.",
        "operatingSystem": "web",
        "applicationCategory": "maths",
        "offers": {
          "@type": "Offer",
          "price": "Free",
          "priceCurrency": "USD"
        },
        "downloadUrl": "https://www.thesmartcalculator.com/maths/relative-extrema-calculator",
        "author": {
          "@type": "Person",
          "name": ""
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does this calculator compute?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It finds local maxima and minima using derivatives, critical points, and classification tests."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between relative and absolute extrema?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Relative extrema are local peaks or valleys; absolute extrema are the highest or lowest values over the entire function."
            }
          },
          {
            "@type": "Question",
            "name": "How does it find critical points?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It solves f'(x) = 0 symbolically for polynomials or numerically for trigonometric and exponential functions."
            }
          },
          {
            "@type": "Question",
            "name": "What if the second derivative equals zero?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The calculator automatically uses the first derivative test (sign change) to classify the point."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support trigonometric functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, including sin(x), cos(x), tan(x) with periodic extrema detection."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for multivariable functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Basic support is provided using partial derivatives, solving fx = fy = 0."
            }
          },
          {
            "@type": "Question",
            "name": "Can I input piecewise functions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, using standard notation like if(x<0, x^2, -x)."
            }
          },
          {
            "@type": "Question",
            "name": "Are graphs included?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, interactive and zoomable plots mark maxima (🔴) and minima (🔵)."
            }
          },
          {
            "@type": "Question",
            "name": "Is it better than Wolfram Alpha or Symbolab?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, it provides unlimited free step-by-step solutions with interactive graphs, no premium required."
            }
          },
          {
            "@type": "Question",
            "name": "Is it mobile-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fully responsive on iPhone, Android, tablets, and desktop worldwide."
            }
          }
        ]
      }
    ]
  }
  return <>
    {children}
    <Script
      id="relative-extrema-calculator-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      strategy="afterInteractive"
    />
  </>;
}
