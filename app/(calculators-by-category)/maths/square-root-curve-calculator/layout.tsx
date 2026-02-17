import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

const squareRootCurveMeta = {
  en: {
    title: "Square Root Curve Calculator",
    description: "Plot square root curves and calculate values quickly using our Square Root Curve Calculator.",
    keywords: "square root curve, grade curve calculator, test score curve, grading calculator, curve grades, education tool"
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
  return <>{children}</>;
}
