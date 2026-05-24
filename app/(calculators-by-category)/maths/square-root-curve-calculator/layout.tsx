import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import {
  loadCalculatorSeo,
  buildMetadataFromSeo,
} from "@/lib/calculator-seo";
import { getCanonicalUrl } from "@/lib/url-utils";

const CALCULATOR_ID = "square-root-curve-calculator";

const fallbackMeta = {
  en: {
    title: "Square Root Curve Calculator – Instant Grade Curve",
    description:
      "Use our square root curve calculator to instantly curve any test score. Formula: √Score × 10. Includes chart, Excel method, and grade lookup table.",
    keywords:
      "square root curve calculator, grade curve calculator, test score curve, square root grading formula, curve grades, grade lookup table, excel grade curve",
  },
  br: {
    title: "Calculadora de Raiz Quadrada ",
    description:
      "Use a calculadora de raiz quadrada para resolver cálculos rapidamente. Descubra raízes facilmente e simule agora mesmo seus resultados!",
    keywords:
      "curva raiz quadrada, calculadora notas, curva teste, ferramenta educação",
  },
  pl: {
    title: "Kalkulator Krzywej Pierwiastka Kwadratowego",
    description:
      "Oblicz zakrzywione oceny za pomocą metody pierwiastka kwadratowego. Bezpłatne narzędzie online.",
    keywords:
      "krzywa pierwiastek, kalkulator ocen, krzywa test, narzędzie edukacja",
  },
  de: {
    title: "Quadratwurzel-Kurvenrechner",
    description:
      "Berechnen Sie gekrümmte Noten mit der Quadratwurzelmethode. Kostenloses Online-Tool.",
    keywords:
      "quadratwurzel kurve, notenrechner, test kurve, bildung tool",
  },
  es: {
    title: "Calculadora de Curva de Raíz Cuadrada",
    description:
      "Calcula calificaciones curvas usando el método de raíz cuadrada. Herramienta online gratuita.",
    keywords:
      "curva raíz cuadrada, calculadora calificaciones, curva prueba, herramienta educación",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get("x-language");
  const language =
    langHeader && fallbackMeta[langHeader as keyof typeof fallbackMeta]
      ? langHeader
      : "en";

  if (language === "en") {
    const seo = await loadCalculatorSeo(CALCULATOR_ID, "en");
    if (seo) {
      return buildMetadataFromSeo(CALCULATOR_ID, language, seo);
    }
  }

  const meta = fallbackMeta[language as keyof typeof fallbackMeta];
  const canonicalUrl = getCanonicalUrl(CALCULATOR_ID, language);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": getCanonicalUrl(CALCULATOR_ID, "en"),
        en: getCanonicalUrl(CALCULATOR_ID, "en"),
        es: getCanonicalUrl(CALCULATOR_ID, "es"),
        "pt-BR": getCanonicalUrl(CALCULATOR_ID, "br"),
        pl: getCanonicalUrl(CALCULATOR_ID, "pl"),
        de: getCanonicalUrl(CALCULATOR_ID, "de"),
      },
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
  const seo = await loadCalculatorSeo(CALCULATOR_ID, "en");
  const jsonLdSchema = seo?.schema ?? null;

  return (
    <>
      {jsonLdSchema ? (
        <Script
          id="square-root-curve-calculator-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          strategy="afterInteractive"
        />
      ) : null}
      {children}
    </>
  );
}
