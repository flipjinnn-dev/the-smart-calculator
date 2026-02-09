import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

const orthogonalProjectionMeta = {
  en: {
    title: "Orthogonal Projection Calculator Vector Projection",
    description: "Project vectors accurately using our Orthogonal Projection Calculator for math and physics solutions.",
    keywords: "orthogonal projection, vector projection, linear algebra calculator, dot product, physics calculator"
  },
  br: {
    title: "Calculadora de Projeção Ortogonal",
    description: "Use a Calculadora de Projeção Ortogonal para calcular projeções de vetores com precisão. Ideal para estudantes e profissionais de física. Teste grátis agora!",
    keywords: "Calculadora de Projeção Ortogonal, projeção vetor, calculadora álgebra linear, produto escalar"
  },
  pl: {
    title: "Kalkulator Rzutu Ortogonalnego",
    description: "Oblicz rzuty ortogonalne wektorów. Bezpłatne narzędzie online do algebry liniowej i fizyki.",
    keywords: "rzut ortogonalny, rzut wektor, kalkulator algebra liniowa, iloczyn skalarny"
  },
  de: {
    title: "Orthogonale Projektionsrechner",
    description: "Berechnen Sie orthogonale Projektionen von Vektoren. Kostenloses Online-Tool für lineare Algebra und Physik.",
    keywords: "orthogonale projektion, vektor projektion, lineare algebra rechner, skalarprodukt"
  },
  es: {
    title: "Calculadora de Proyección Ortogonal",
    description: "Calcula proyecciones ortogonales de vectores. Herramienta online gratuita para álgebra lineal y física.",
    keywords: "proyección ortogonal, proyección vector, calculadora álgebra lineal, producto escalar"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && orthogonalProjectionMeta[langHeader as keyof typeof orthogonalProjectionMeta]
      ? langHeader
      : "en";

  const meta = orthogonalProjectionMeta[language as keyof typeof orthogonalProjectionMeta];
  const canonicalUrl = getCanonicalUrl('orthogonal-projection-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('orthogonal-projection-calculator', 'en'),
        'en': getCanonicalUrl('orthogonal-projection-calculator', 'en'),
        'es': getCanonicalUrl('orthogonal-projection-calculator', 'es'),
        'pt-BR': getCanonicalUrl('orthogonal-projection-calculator', 'br'),
        'pl': getCanonicalUrl('orthogonal-projection-calculator', 'pl'),
        'de': getCanonicalUrl('orthogonal-projection-calculator', 'de'),
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

export default async function OrthogonalProjectionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
