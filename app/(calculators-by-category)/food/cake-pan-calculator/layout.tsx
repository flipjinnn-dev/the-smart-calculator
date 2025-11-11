import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for cake-pan-calculator
const cakepancalculatorMeta = {
  en: {
    title: "Cake Pan Calculator – Sizes Equivalent Online | TheSmartCalculator",
    description: "Use the Cake Pan Calculator to find equivalent sizes for round, square, and rectangular pans. Accurate, free online tool for baking adjustments and recipes.",
    keywords: "cake pan calculator, sizes equivalent, round square, rectangular tool, online pan, baking calculator, free size tool, recipe adjustment"
  },
  br: {
    title: "Cake Pan Calculator – Sizes Equivalent Online | TheSmartCalcul",
    description: "Use a Calculadora Forma Bolo para calcular tamanhos equivalentes de formas redondas, quadradas e retangulares. Ferramenta precisa para ajustes em receitas de bolo.",
    keywords: "calculadora forma bolo, tamanhos equivalentes, redondas quadradas, retangulares tool, online forma, ajustes receitas, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Formy Ciasta – Rozmiary Online | TheSmartCalculator",
    description: "Użyj kalkulatora formy ciasta online, aby obliczyć równoważne rozmiary form okrągłych, kwadratowych i prostokątnych. Dokładne narzędzie do pieczenia.",
    keywords: "kalkulator formy ciasta, rozmiary równoważne, okrągłe kwadratowe, prostokątne tool, online forma, pieczenie przepisy, darmowy tool"
  },
  de: {
    title: "Kuchenform Rechner – Mengen Umrechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kuchenform Rechner die richtige Zutatenmenge für jede Backform. Schnell, praktisch & kostenlos – ideal fürs Backen zu Hause!",
    keywords: "kuchenform rechner, mengen umrechnen, zutatenmenge tool, backform online, schnell praktisch, backen hause, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cakepancalculatorMeta[langHeader as keyof typeof cakepancalculatorMeta]
      ? langHeader
      : "en";

  const meta = cakepancalculatorMeta[language as keyof typeof cakepancalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cake-pan-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }cake-pan-calculator`,
      languages: {
        'en': getCanonicalUrl('cake-pan-calculator', 'en'),
        'pt-BR': getCanonicalUrl('cake-pan-calculator', 'br'),
        'pl': getCanonicalUrl('cake-pan-calculator', 'pl'),
        'de': getCanonicalUrl('cake-pan-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }cake-pan-calculator`,
    },
  };
}

export default async function CakePanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
