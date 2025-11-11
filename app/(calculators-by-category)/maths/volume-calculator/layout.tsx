import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for volume-calculator
const volumecalculatorMeta = {
  en: {
    title: "Volume Calculator – Shapes Online | TheSmartCalculator",
    description: "Use the Volume Calculator to calculate the volume of various shapes. Accurate, free online tool for math, engineering, and daily use.",
    keywords: "volume calculator, shapes volume, math tool, online volume, engineering calculator, free volume tool, shape calculation, volume estimate"
  },
  br: {
    title: "Calculadora de Volume – Calcule Espaços e Capacidades",
    description: "Use a Calculadora de Volume para calcular o espaço de sólidos e recipientes. Ferramenta rápida e precisa para estudos, engenharia e projetos.",
    keywords: "calculadora volume, volume formas, ferramenta matemática, online volume, calculadora engenharia, gratuita ferramenta volume, cálculo forma, estimativa volume"
  },
  pl: {
    title: "Kalkulator Objętości – Oblicz Objętość Online Szybko",
    description: "Użyj kalkulatora objętości online, aby obliczyć objętość różnych brył i pojemników. Proste, dokładne i darmowe narzędzie matematyczne.",
    keywords: "kalkulator objętości, objętość kształtów, narzędzie matematyczne, online objętość, kalkulator inżynieria, darmowe narzędzie objętość, obliczenia kształtu, estymacja objętości"
  },
  de: {
    title: "Volumenrechner – Volumen von Körpern einfach berechnen",
    description: "Berechne mit dem Volumenrechner das Volumen von Würfeln, Kugeln & Zylindern. Schnell, genau & kostenlos – ideal für Schule, Studium & Alltag!",
    keywords: "volumenrechner, körper volumen, math tool, online volumen, ingenieur rechner, kostenloser volumen tool, körper berechnung, volumen schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && volumecalculatorMeta[langHeader as keyof typeof volumecalculatorMeta]
      ? langHeader
      : "en";

  const meta = volumecalculatorMeta[language as keyof typeof volumecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('volume-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }volume-calculator`,
      languages: {
        'en': getCanonicalUrl('volume-calculator', 'en'),
        'pt-BR': getCanonicalUrl('volume-calculator', 'br'),
        'pl': getCanonicalUrl('volume-calculator', 'pl'),
        'de': getCanonicalUrl('volume-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }volume-calculator`,
    },
  };
}

export default async function VolumeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
