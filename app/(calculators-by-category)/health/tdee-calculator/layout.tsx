import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for tdee-calculator
const tdeecalculatorMeta = {
  en: {
    title: "TDEE Calculator – Energy Expenditure Online | TheSmartCalculator",
    description: "Use the TDEE Calculator to calculate Total Daily Energy Expenditure based on activity. Accurate, free online tool for calorie needs and weight management.",
    keywords: "tdee calculator, energy expenditure, activity level, online tdee, calorie needs, weight management, free tdee tool, daily energy"
  },
  br: {
    title: "Calculadora TDEE – Gasto Energético Online | TheSmartCalculator",
    description: "Use a Calculadora TDEE para calcular gasto energético diário total baseado em atividade. Ferramenta precisa e gratuita para necessidades de calorias e gerenciamento de peso.",
    keywords: "calculadora tdee, gasto energético, nível atividade, online tdee, necessidades calorias, gerenciamento peso, gratuita ferramenta tdee, energia diária"
  },
  pl: {
    title: "TDEE Calculator – Energy Expenditure Online | TheSmartCalculat",
    description: "Użyj kalkulatora TDEE online, aby obliczyć całkowite dzienne zapotrzebowanie kaloryczne na podstawie aktywności. Proste, dokładne i darmowe narzędzie do potrzeb kalorycznych.",
    keywords: "kalkulator tdee, wydatki energetyczne, poziom aktywności, online tdee, zapotrzebowanie kaloryczne, zarządzanie wagą, darmowe narzędzie tdee, energia dzienna"
  },
  de: {
    title: "TDEE Rechner – Täglichen Kalorienverbrauch berechnen",
    description: "Berechne mit dem TDEE Rechner deinen täglichen Kalorienverbrauch. Ideal für Abnehmen, Muskelaufbau & Fitness – schnell, genau und kostenlos online!",
    keywords: "tdee rechner, energie verbrauch, aktivität level, online tdee, kalorien bedarf, gewicht management, kostenloser tdee tool, tägliche energie"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && tdeecalculatorMeta[langHeader as keyof typeof tdeecalculatorMeta]
      ? langHeader
      : "en";

  const meta = tdeecalculatorMeta[language as keyof typeof tdeecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('tdee-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }tdee-calculator`,
      languages: {
        'en': getCanonicalUrl('tdee-calculator', 'en'),
        'pt-BR': getCanonicalUrl('tdee-calculator', 'br'),
        'pl': getCanonicalUrl('tdee-calculator', 'pl'),
        'de': getCanonicalUrl('tdee-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }tdee-calculator`,
    },
  };
}

export default async function TdeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
