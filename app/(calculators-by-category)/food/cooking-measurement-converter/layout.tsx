import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for cooking-measurement-converter
const cookingmeasurementconverterMeta = {
  en: {
    title: "Cooking Measurement Converter – Units Online | TheSmartCalculator",
    description: "Use the Cooking Measurement Converter to convert between units like cups, grams, and spoons. Accurate, free online tool for recipes and kitchen adjustments.",
    keywords: "cooking measurement converter, units tool, cups grams, spoons calculation, online converter, recipe adjustment, free cooking tool, kitchen calculator"
  },
  br: {
    title: "Conversor Medidas Culinárias – Ingredientes Fácil",
    description: "Use o Conversor de Medidas Culinárias para transformar gramas, litros e colheres. Cozinhe com precisão e pratique receitas sem erros de medida.",
    keywords: "conversor medidas culinárias, transformar gramas, litros colheres, precisão receitas, online conversor, sem erros, cozinha tool"
  },
  pl: {
    title: "Przelicznik Miar Kuchennych – Przeliczaj Online Szybko",
    description: "Użyj przelicznika miar kuchennych online, aby łatwo przeliczać gramy, mililitry i porcje. Proste, szybkie i darmowe narzędzie kulinarne.",
    keywords: "przelicznik miar kuchennych, przeliczać gramy, mililitry porcje, narzędzie kulinarne, online miary, szybkie darmowe, przepisy tool"
  },
  de: {
    title: "Kochmaße Umrechner – Einheiten einfach umrechnen online",
    description: "Umrechne mit dem Kochmaße Umrechner Einheiten wie Tassen, Gramm und Löffel. Präzises, kostenloses Online Tool für Alltag und Beruf.",
    keywords: "kochmaße umrechner, einheiten tool, tassen gramm, löffel berechnung, online umrechner, rezepte anpassung, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cookingmeasurementconverterMeta[langHeader as keyof typeof cookingmeasurementconverterMeta]
      ? langHeader
      : "en";

  const meta = cookingmeasurementconverterMeta[language as keyof typeof cookingmeasurementconverterMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cooking-measurement-converter', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }cooking-measurement-converter`,
      languages: {
        'en': getCanonicalUrl('cooking-measurement-converter', 'en'),
        'pt-BR': getCanonicalUrl('cooking-measurement-converter', 'br'),
        'pl': getCanonicalUrl('cooking-measurement-converter', 'pl'),
        'de': getCanonicalUrl('cooking-measurement-converter', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }cooking-measurement-converter`,
    },
  };
}

export default async function CookingMeasurementConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
