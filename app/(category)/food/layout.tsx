import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for food
const foodMeta = {
  en: {
    title: "Food Calculator – Calories & Nutrition Tool | TheSmartCalculator",
    description: "Use the Food Calculator to count calories, proteins, and nutrients in meals. Accurate, free online tool for diet tracking, health planning, and nutritional analysis.",
    keywords: "food calculator, calorie counter, nutrition tool, protein calculator, online food tracker, diet calculator, nutrient analysis, free food tool"
  },
  br: {
    title: "Calculadora de Alimento – Calorias Nutrição | TheSmartCalculator",
    description: "Use a Calculadora de Alimento para contar calorias, proteínas e nutrientes. Ferramenta online fácil e precisa para sua dieta, saúde e análise nutricional diária.",
    keywords: "calculadora de alimento, contar calorias, proteínas tool, nutrientes calculadora, dieta online, saúde alimentar, análise nutricional"
  },
  pl: {
    title: "Kalkulator Żywność – Kalorie Wartości Online | TheSmartCalculator",
    description: "Użyj kalkulatora żywność online, aby obliczyć kalorie, białko, tłuszcze i węglowodany. Proste, szybkie i dokładne narzędzie do analizy żywności i planowania diety.",
    keywords: "kalkulator żywność, obliczyć kalorie, białko tool, tłuszcze węglowodany, analiza żywności, dieta kalkulator, darmowe narzędzie żywność"
  },
  de: {
    title: "Essen Rechner – Ernährung Online Tools | TheSmartCalculator",
    description: "Essen online berechnen: Nutzen Sie Tools zur Analyse von Ernährung, Kalorien und Makronährstoffen. Planen Sie Essen und gesundes Leben mit präzisen Online-Berechnungen.",
    keywords: "essen rechner, ernährung tools, kalorien analyse, makronährstoffe kalkulator, online essen planung, gesundes leben, kostenlose berechnungen"
  },
  es: {
    title: "Calculadora de Alimentos – Calorías y Nutrición | TheSmartCalculator",
    description: "Cuenta las calorías, proteínas y nutrientes de tus comidas. Herramienta online gratuita y precisa para seguimiento de dieta, salud y análisis nutricional.",
    keywords: "calculadora de alimentos, contador de calorías, herramienta de nutrición, calculadora de proteínas, seguimiento de dieta"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && foodMeta[langHeader as keyof typeof foodMeta]
      ? langHeader
      : "en";

  const meta = foodMeta[language as keyof typeof foodMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('food', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCategoryCanonicalUrl('food', 'en'),
        'pt-BR': getCategoryCanonicalUrl('food', 'br'),
        'pl': getCategoryCanonicalUrl('food', 'pl'),
        'de': getCategoryCanonicalUrl('food', 'de'),
        'es': getCategoryCanonicalUrl('food', 'es'),
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

export default async function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
