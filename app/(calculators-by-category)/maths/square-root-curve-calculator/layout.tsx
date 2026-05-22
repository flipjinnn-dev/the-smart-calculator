import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import { getCanonicalUrl } from "@/lib/url-utils";

const squareRootCurveMeta = {
  en: {
    title: "Square Root Curve Calculator – Instant Grade Curve",
    description: "Use our square root curve calculator to instantly curve any test score. Formula: √Score × 10. Includes chart, Excel method, and grade lookup table.",
    keywords: "square root curve calculator, grade curve calculator, test score curve, square root grading formula, curve grades, grade lookup table, excel grade curve"
  },
  br: {
    title: "Calculadora de Raiz Quadrada ",
    description: "Use a calculadora de raiz quadrada para resolver cálculos rapidamente. Descubra raízes facilmente e simule agora mesmo seus resultados!",
    keywords: "curva raiz quadrada, calculadora notas, curva teste, ferramenta educação"
  },
  pl: {
    title: "Kalkulator Krzywej Pierwiastka Kwadratowego",
    description: "Oblicz zakrzywione oceny za pomocą metody pierwiastka kwadratowego. Bezpłatne narzędzie online.",
    keywords: "krzywa pierwiastek, kalkulator ocen, krzywa test, narzędzie edukacja"
  },
  de: {
    title: "Quadratwurzel-Kurvenrechner",
    description: "Berechnen Sie gekrümmte Noten mit der Quadratwurzelmethode. Kostenloses Online-Tool.",
    keywords: "quadratwurzel kurve, notenrechner, test kurve, bildung tool"
  },
  es: {
    title: "Calculadora de Curva de Raíz Cuadrada",
    description: "Calcula calificaciones curvas usando el método de raíz cuadrada. Herramienta online gratuita.",
    keywords: "curva raíz cuadrada, calculadora calificaciones, curva prueba, herramienta educación"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && squareRootCurveMeta[langHeader as keyof typeof squareRootCurveMeta]
      ? langHeader
      : "en";

  const meta = squareRootCurveMeta[language as keyof typeof squareRootCurveMeta];
  const canonicalUrl = getCanonicalUrl('square-root-curve-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('square-root-curve-calculator', 'en'),
        'en': getCanonicalUrl('square-root-curve-calculator', 'en'),
        'es': getCanonicalUrl('square-root-curve-calculator', 'es'),
        'pt-BR': getCanonicalUrl('square-root-curve-calculator', 'br'),
        'pl': getCanonicalUrl('square-root-curve-calculator', 'pl'),
        'de': getCanonicalUrl('square-root-curve-calculator', 'de'),
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

export default async function SquareRootCurveCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Square Root Curve Calculator",
            item: "https://www.thesmartcalculator.com/maths/square-root-curve-calculator",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a square root curve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A square root curve is a grading method where the square root of a score is taken and multiplied by 10 to adjust grades, usually boosting lower scores more.",
            },
          },
          {
            "@type": "Question",
            name: "How do you calculate a square root curve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Take the square root of the original score and multiply it by 10. Example: √64 × 10 = 80.",
            },
          },
          {
            "@type": "Question",
            name: "What is the formula for a square root curve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Curved Score = √(Original Score) × 10",
            },
          },
          {
            "@type": "Question",
            name: "Does a square root curve always increase scores?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, most scores between 1 and 99 increase, while 0 and 100 remain unchanged.",
            },
          },
          {
            "@type": "Question",
            name: "What is 70 on a square root curve?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "√70 × 10 = 83.7 (approximately 84).",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="square-root-curve-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
