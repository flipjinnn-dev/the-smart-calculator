import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for weight-watchers-points-calculator
const weightwatcherspointscalculatorMeta = {
  en: {
    title: "Weight Watchers Points Calculator – Food Online | TheSmartCalculator",
    description: "Use the Weight Watchers Points Calculator to calculate points based on food items. Accurate, free online tool for diet and points tracking.",
    keywords: "weight watchers points calculator, points calculation, food items, online points, diet tracking, free points tool, nutrition points, weight watchers"
  },
  br: {
    title: "Weight Watchers Points Calculator – Food Online | TheSmartCalc",
    description: "Use a Calculadora Pontos Weight Watchers para calcular pontos baseado em itens de comida. Ferramenta precisa e gratuita para dieta e rastreamento de pontos.",
    keywords: "calculadora pontos weight watchers, cálculo pontos, itens comida, online pontos, rastreamento dieta, gratuita ferramenta pontos, pontos nutrição, weight watchers"
  },
  pl: {
    title: "Weight Watchers Points Calculator – Food Online | TheSmartCalc",
    description: "Użyj kalkulatora punktów Weight Watchers, aby obliczyć punkty na podstawie pozycji żywności. Dokładne, darmowe narzędzie do diety i tracking punktów.",
    keywords: "kalkulator punktów weight watchers, obliczenia punktów, pozycje żywności, online punkty, tracking diety, darmowe narzędzie punkty, punkty odżywianie, weight watchers"
  },
  de: {
    title: "Weight Watchers Punkte Rechner – Punkte berechnen",
    description: "Berechne mit dem Weight Watchers Punkte Rechner deine täglichen Punkte. Ideal zum Abnehmen – schnell, genau und kostenlos online!",
    keywords: "weight watchers punkte rechner, punkte berechnung, lebensmittel items, online punkte, diät tracking, kostenloser punkte tool, ernährung punkte, weight watchers"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && weightwatcherspointscalculatorMeta[langHeader as keyof typeof weightwatcherspointscalculatorMeta]
      ? langHeader
      : "en";

  const meta = weightwatcherspointscalculatorMeta[language as keyof typeof weightwatcherspointscalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('weight-watchers-points-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }weight-watchers-points-calculator`,
      languages: {
        'en': getCanonicalUrl('weight-watchers-points-calculator', 'en'),
        'pt-BR': getCanonicalUrl('weight-watchers-points-calculator', 'br'),
        'pl': getCanonicalUrl('weight-watchers-points-calculator', 'pl'),
        'de': getCanonicalUrl('weight-watchers-points-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }weight-watchers-points-calculator`,
    },
  };
}

export default async function WeightWatchersPointsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
