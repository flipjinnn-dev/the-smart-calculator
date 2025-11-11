import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for calorie-calculator
const caloriecalculatorMeta = {
  en: {
    title: "Calorie Calculator – Daily Needs Online | TheSmartCalculator",
    description: "Use the Calorie Calculator to estimate daily needs based on lifestyle and goals. Accurate, free online tool for diet, weight management, and health planning.",
    keywords: "calorie calculator, daily needs, lifestyle tool, goals calculation, online calorie, diet management, free calorie tool, health planning"
  },
  br: {
    title: "Calculadora de Calorias – Gasto Diário Online",
    description: "Use a Calculadora de Calorias para controlar seu consumo e gasto diário. Planeje sua dieta e alcance seus objetivos de saúde com precisão.",
    keywords: "calculadora de calorias, gasto diário, consumo controle, dieta planejamento, objetivos saúde, precisa tool, métricas calorias"
  },
  pl: {
    title: "Kalkulator Kalorii – Spożycie Online | TheSmartCalculator",
    description: "Użyj kalkulatora kalorii online, aby obliczyć dzienne spożycie kalorii i zbilansować dietę. Proste, dokładne i darmowe narzędzie zdrowotne do celów.",
    keywords: "kalkulator kalorii, spożycie dzienne, zbilansować dietę, narzędzie zdrowotne, online kalorii, dokładne obliczenia, darmowy tool"
  },
  de: {
    title: "Kalorienrechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kalorienrechner deinen täglichen Kalorienbedarf. Ideal für Abnehmen, Muskelaufbau & gesunde Ernährung – schnell & kostenlos!",
    keywords: "kalorienrechner, bedarf berechnen, täglichen kalorien, abnehmen muskelaufbau, gesunde ernährung, schnell tool, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && caloriecalculatorMeta[langHeader as keyof typeof caloriecalculatorMeta]
      ? langHeader
      : "en";

  const meta = caloriecalculatorMeta[language as keyof typeof caloriecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('calorie-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }calorie-calculator`,
      languages: {
        'en': getCanonicalUrl('calorie-calculator', 'en'),
        'pt-BR': getCanonicalUrl('calorie-calculator', 'br'),
        'pl': getCanonicalUrl('calorie-calculator', 'pl'),
        'de': getCanonicalUrl('calorie-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }calorie-calculator`,
    },
  };
}

export default async function CalorieCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
