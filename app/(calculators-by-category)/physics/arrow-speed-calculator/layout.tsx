import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for arrow-speed-calculator
const arrowspeedcalculatorMeta = {
  en: {
    title: "Arrow Speed Calculator – Momentum Online | TheSmartCalculator",
    description: "Use the Arrow Speed Calculator to compute speed, momentum, and kinetic energy from IBO ratings. Accurate, free online tool for archery and physics analysis.",
    keywords: "arrow speed calculator, momentum tool, kinetic energy, ibo ratings, online arrow, archery calculator, free speed tool, physics arrow"
  },
  br: {
    title: "Calculadora Velocidade Flecha – Momentum Online | TheSmartCalculator",
    description: "Use a Calculadora Velocidade Flecha para calcular velocidade, momentum e energia cinética de classificações IBO. Ferramenta precisa para arco e flecha e física.",
    keywords: "calculadora velocidade flecha, momentum tool, energia cinética, ibo classificações, online flecha, arco calculadora, gratuita tool"
  },
  pl: {
    title: "Kalkulator Prędkości Strzały – Momentum Online | TheSmartCalculator",
    description: "Użyj kalkulatora prędkości strzały online, aby obliczyć prędkość, momentum i energię kinetyczną z ocen IBO. Dokładne narzędzie do łucznictwa i fizyki.",
    keywords: "kalkulator prędkości strzały, momentum tool, energia kinetyczna, ibo oceny, online strzała, łucznictwo kalkulator, darmowy tool"
  },
  de: {
    title: "Arrow Speed Calculator – Momentum Online | TheSmartCalculator",
    description: "Berechne mit dem Pfeilgeschwindigkeit Rechner Geschwindigkeit, Momentum und kinetische Energie aus IBO-Werten. Präzises Tool für Bogenschießen und Physik.",
    keywords: "pfeilgeschwindigkeit rechner, momentum berechnen, kinetische energie, ibo werte, online pfeil, bogenschießen tool, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && arrowspeedcalculatorMeta[langHeader as keyof typeof arrowspeedcalculatorMeta]
      ? langHeader
      : "en";

  const meta = arrowspeedcalculatorMeta[language as keyof typeof arrowspeedcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('arrow-speed-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('arrow-speed-calculator', 'en'),
        'pt-BR': getCanonicalUrl('arrow-speed-calculator', 'br'),
        'pl': getCanonicalUrl('arrow-speed-calculator', 'pl'),
        'de': getCanonicalUrl('arrow-speed-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
  };
}

export default async function ArrowSpeedCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
