import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for healthy-weight-calculator
const healthyweightcalculatorMeta = {
  en: {
    title: "Healthy Weight Calculator – Range Online | TheSmartCalculator",
    description: "Use the Healthy Weight Calculator to determine range based on height and gender. Accurate, free online tool for health goals and weight management.",
    keywords: "healthy weight calculator, weight range, height gender, online healthy, health goals, weight management, free weight calculator, range determine"
  },
  br: {
    title: "Calculadora Peso Saudável – Faixa Online | TheSmartCalculator",
    description: "Use a Calculadora Peso Saudável para determinar faixa baseada em altura e gênero. Ferramenta precisa para metas de saúde e gerenciamento de peso.",
    keywords: "calculadora peso saudável, faixa peso, altura gênero, online saudável, metas saúde, gerenciamento peso, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Zdrowej Wagi – Zakres Online | TheSmartCalculator",
    description: "Użyj kalkulatora zdrowej wagi online, aby określić zakres na podstawie wzrostu i płci. Dokładne, darmowe narzędzie do celów zdrowotnych i zarządzania wagą.",
    keywords: "kalkulator zdrowej wagi, zakres waga, wzrost płeć, online zdrowy, cele zdrowotne, zarządzanie wagą, darmowy kalkulator"
  },
  de: {
    title: "Gesundes Gewicht Rechner – Bereich Online | TheSmartCalculator",
    description: "Berechne mit dem Gesundes Gewicht Rechner deinen idealen Gewichtsbereich basierend auf Größe und Geschlecht. Präzises Tool für Gesundheitsziele und Gewichtsmanagement.",
    keywords: "gesundes gewicht rechner, gewicht bereich, höhe geschlecht, online gesund, gesundheitsziele, gewicht management, kostenloser gewicht rechner, bereich bestimmen"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && healthyweightcalculatorMeta[langHeader as keyof typeof healthyweightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = healthyweightcalculatorMeta[language as keyof typeof healthyweightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('healthy-weight-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }healthy-weight-calculator`,
      languages: {
        'en': getCanonicalUrl('healthy-weight-calculator', 'en'),
        'pt-BR': getCanonicalUrl('healthy-weight-calculator', 'br'),
        'pl': getCanonicalUrl('healthy-weight-calculator', 'pl'),
        'de': getCanonicalUrl('healthy-weight-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }healthy-weight-calculator`,
    },
  };
}

export default async function HealthyWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
