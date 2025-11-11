import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for velocity-calculator
const velocitycalculatorMeta = {
  en: {
    title: "Velocity Calculator – Speed Acceleration Online | TheSmartCalculator",
    description: "Use the Velocity Calculator to calculate velocity, speed, and acceleration. Accurate, free online tool for physics and motion calculations.",
    keywords: "velocity calculator, speed acceleration, motion tool, online velocity, physics calculation, free velocity tool, acceleration estimator, velocity analysis"
  },
  br: {
    title: "Calculadora de Velocidade – Calcule Rapidez e Movimento",
    description: "Use a Calculadora de Velocidade para calcular a rapidez de objetos em movimento. Ferramenta online precisa para física, estudos e projetos.",
    keywords: "calculadora velocidade, aceleração velocidade, ferramenta movimento, online velocidade, cálculo física, gratuita ferramenta velocidade, estimador aceleração, análise velocidade"
  },
  pl: {
    title: "Kalkulator Prędkości – Oblicz Prędkość Online Szybko",
    description: "Użyj kalkulatora prędkości online, aby obliczyć prędkość ciała w ruchu. Proste, dokładne i darmowe narzędzie fizyczne dla uczniów i studentów.",
    keywords: "kalkulator prędkości, prędkość przyspieszenie, narzędzie ruchu, online prędkość, obliczenia fizyki, darmowe narzędzie prędkości, estymator przyspieszenia, analiza prędkości"
  },
  de: {
    title: "Geschwindigkeitsrechner – Geschwindigkeit einfach berechnen",
    description: "Berechne mit dem Geschwindigkeitsrechner die Geschwindigkeit aus Strecke & Zeit. Schnell, genau & kostenlos – ideal für Physik & Alltag!",
    keywords: "geschwindigkeitsrechner, geschwindigkeit beschleunigung, bewegungs tool, online geschwindigkeit, physik berechnung, kostenloser geschwindigkeit tool, beschleunigung schätzer, geschwindigkeit analyse"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && velocitycalculatorMeta[langHeader as keyof typeof velocitycalculatorMeta]
      ? langHeader
      : "en";

  const meta = velocitycalculatorMeta[language as keyof typeof velocitycalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('velocity-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }velocity-calculator`,
      languages: {
        'en': getCanonicalUrl('velocity-calculator', 'en'),
        'pt-BR': getCanonicalUrl('velocity-calculator', 'br'),
        'pl': getCanonicalUrl('velocity-calculator', 'pl'),
        'de': getCanonicalUrl('velocity-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }velocity-calculator`,
    },
  };
}

export default async function VelocityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
