import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for butter-calculator
const buttercalculatorMeta = {
  en: {
    title: "Butter Calculator – Measurements Converter Online | TheSmartCa",
    description: "Use the Butter Calculator to convert measurements between sticks, cups, tablespoons, teaspoons, and grams. Accurate, free online tool for cooking and baking.",
    keywords: "butter calculator, measurements converter, sticks cups, tablespoons tool, online butter, cooking calculator, free converter, baking tool"
  },
  br: {
    title: "Calculadora Manteiga – Conversor Medidas Online | TheSmartCalculator",
    description: "Use a Calculadora Manteiga para converter medidas entre barras, xícaras, colheres e gramas. Ferramenta precisa e gratuita para cozinhar e assar receitas.",
    keywords: "calculadora manteiga, conversor medidas, barras xícaras, colheres gramas, online manteiga, cozinhar tool, gratuita conversor"
  },
  pl: {
    title: "Kalkulator Masło – Przelicznik Medidas Online | TheSmartCalculator",
    description: "Użyj kalkulatora masło online, aby przeliczać miary między patykami, kubkami, łyżkami i gramami. Dokładne, darmowe narzędzie do gotowania i pieczenia.",
    keywords: "kalkulator masło, przelicznik miary, patyki kubki, łyżki gramy, online masło, gotowanie tool, darmowy przelicznik"
  },
  de: {
    title: "Butter Rechner – Maße Umrechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Butter Rechner Umrechnungen zwischen Sticks, Tassen, Löffeln und Gramm. Präzises, kostenloses Tool für Kochen und Backen.",
    keywords: "butter rechner, maße umrechnen, sticks tassen, löffel gramm, online butter, kochen backen, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && buttercalculatorMeta[langHeader as keyof typeof buttercalculatorMeta]
      ? langHeader
      : "en";

  const meta = buttercalculatorMeta[language as keyof typeof buttercalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('butter-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }butter-calculator`,
      languages: {
        'en': getCanonicalUrl('butter-calculator', 'en'),
        'pt-BR': getCanonicalUrl('butter-calculator', 'br'),
        'pl': getCanonicalUrl('butter-calculator', 'pl'),
        'de': getCanonicalUrl('butter-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }butter-calculator`,
    },
  };
}

export default async function ButterCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
