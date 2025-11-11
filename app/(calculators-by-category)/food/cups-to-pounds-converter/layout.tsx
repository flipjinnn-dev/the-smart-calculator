import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for cups-to-pounds-converter
const cupstopoundsconverterMeta = {
  en: {
    title: "Cups to Pounds Converter – Ingredients Online | TheSmartCalculator",
    description: "Use the Cups to Pounds Converter to convert cups to pounds for various ingredients. Accurate, free online tool for cooking, baking, and recipe adjustments.",
    keywords: "cups to pounds converter, ingredients tool, measurements calculation, online converter, cooking baking, recipe adjustment, free cups tool, pounds estimate"
  },
  br: {
    title: "Conversor Xícaras Libras – Ingredientes Online | TheSmartCalculator",
    description: "Use o Conversor de Xícaras para Libras para converter medidas de vários ingredientes. Ferramenta precisa e gratuita para cozinhar, assar e ajustes de receitas.",
    keywords: "conversor xícaras libras, ingredientes tool, medidas cálculo, online conversor, cozinhar assar, ajustes receitas, gratuita tool"
  },
  pl: {
    title: "Przelicznik Filiżanek Funty – Składniki Online | TheSmartCalculator",
    description: "Użyj przelicznika filiżanek na funty online, aby przeliczać miary różnych składników. Dokładne, darmowe narzędzie do gotowania, pieczenia i przepisów.",
    keywords: "przelicznik filiżanek funty, składniki tool, miary obliczenia, online przelicznik, gotowanie pieczenie, przepisy dostosowanie, darmowy tool"
  },
  de: {
    title: "Tassen zu Pfund Umrechner – Zutaten Online | TheSmartCalculator",
    description: "Umrechne mit dem Tassen zu Pfund Umrechner Maße für verschiedene Zutaten. Präzises, kostenloses Tool für Kochen, Backen und Rezeptanpassungen.",
    keywords: "tassen pfund umrechner, zutaten tool, maße berechnung, online umrechner, kochen backen, rezept anpassung, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cupstopoundsconverterMeta[langHeader as keyof typeof cupstopoundsconverterMeta]
      ? langHeader
      : "en";

  const meta = cupstopoundsconverterMeta[language as keyof typeof cupstopoundsconverterMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cups-to-pounds-converter', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }cups-to-pounds-converter`,
      languages: {
        'en': getCanonicalUrl('cups-to-pounds-converter', 'en'),
        'pt-BR': getCanonicalUrl('cups-to-pounds-converter', 'br'),
        'pl': getCanonicalUrl('cups-to-pounds-converter', 'pl'),
        'de': getCanonicalUrl('cups-to-pounds-converter', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }cups-to-pounds-converter`,
    },
  };
}

export default async function CupsToPoundsConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
