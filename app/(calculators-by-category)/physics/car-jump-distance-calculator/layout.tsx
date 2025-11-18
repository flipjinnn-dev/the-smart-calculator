import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for car-jump-distance-calculator
const carjumpdistancecalculatorMeta = {
  en: {
    title: "Car Jump Distance Calculator – Speed Angle Online | TheSmartCa",
    description: "Use the Car Jump Distance Calculator to compute jump distance based on speed and angle. Accurate, free online tool for physics simulations and fun calculations.",
    keywords: "car jump distance calculator, speed angle, jump tool, online distance, physics simulation, free jump calculator, car calculation, fun tool"
  },
  br: {
    title: "Car Jump Distance Calculator – Speed Angle Online | TheSmartCa",
    description: "Use a Calculadora Distância Salto Carro para calcular distância de salto com velocidade e ângulo. Ferramenta precisa para simulações de física e cálculos divertidos.",
    keywords: "calculadora distância salto, velocidade ângulo, salto tool, online distância, simulação física, gratuita calculadora, carro cálculo"
  },
  pl: {
    title: "Car Jump Distance Calculator – Speed Angle Online | TheSmartCa",
    description: "Użyj kalkulatora dystansu skoku samochodu online, aby obliczyć odległość skoku na podstawie prędkości i kąta. Dokładne narzędzie do symulacji fizyki.",
    keywords: "kalkulator dystansu skoku, prędkość kąt, skok tool, online dystans, symulacja fizyki, darmowy kalkulator, samochód obliczenia"
  },
  de: {
    title: "Entfernungsrechner – Strecke Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Entfernungsrechner die Strecke anhand von Zeit & Geschwindigkeit. Schnell, exakt & kostenlos – ideal für Physik & Reisen in Simulationen!",
    keywords: "entfernungsrechner, strecke berechnen, zeit geschwindigkeit, online tool, physik reisen, exakt kostenlos, ideal rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && carjumpdistancecalculatorMeta[langHeader as keyof typeof carjumpdistancecalculatorMeta]
      ? langHeader
      : "en";

  const meta = carjumpdistancecalculatorMeta[language as keyof typeof carjumpdistancecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('car-jump-distance-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('car-jump-distance-calculator', 'en'),
        'pt-BR': getCanonicalUrl('car-jump-distance-calculator', 'br'),
        'pl': getCanonicalUrl('car-jump-distance-calculator', 'pl'),
        'de': getCanonicalUrl('car-jump-distance-calculator', 'de'),
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

export default async function CarJumpDistanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
