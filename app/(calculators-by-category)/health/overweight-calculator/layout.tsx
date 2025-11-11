import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for overweight-calculator
const overweightcalculatorMeta = {
  en: {
    title: "Overweight Calculator – BMI Online | TheSmartCalculator",
    description: "Use the Overweight Calculator to calculate BMI for overweight individuals. Accurate, free online tool for health assessment and weight management.",
    keywords: "overweight calculator, bmi overweight, health assessment, online overweight, weight management, free overweight tool, bmi calculation, overweight analysis"
  },
  br: {
    title: "Calculadora de Sobrepeso – Verifique Seu IMC e Saúde Ideal",
    description: "Use a Calculadora de Sobrepeso para descobrir seu IMC e avaliar se está acima do peso. Acompanhe sua saúde e metas com resultados rápidos.",
    keywords: "calculadora sobrepeso, imc sobrepeso, avaliação saúde, online sobrepeso, gerenciamento peso, gratuita ferramenta sobrepeso, cálculo imc, análise sobrepeso"
  },
  pl: {
    title: "Kalkulator Nadwagi – Sprawdź Swoją Masę Ciała",
    description: "Użyj kalkulatora nadwagi online, aby obliczyć, czy masz prawidłową masę ciała. Proste, dokładne i darmowe narzędzie zdrowotne dla każdego.",
    keywords: "kalkulator nadwagi, bmi nadwaga, ocena zdrowia, online nadwaga, zarządzanie wagą, darmowe narzędzie nadwaga, obliczenia bmi, analiza nadwagi"
  },
  de: {
    title: "Übergewicht Rechner – BMI Berechnen Online | TheSmartCalculator",
    description: "Nutzen Sie den overweight  – bmi online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kontext — kostenl.",
    keywords: "übergewicht rechner, bmi übergewicht, gesundheitsbewertung, online übergewicht, gewicht management, kostenloser übergewicht tool, bmi berechnung, übergewicht analyse"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && overweightcalculatorMeta[langHeader as keyof typeof overweightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = overweightcalculatorMeta[language as keyof typeof overweightcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('overweight-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }overweight-calculator`,
      languages: {
        'en': getCanonicalUrl('overweight-calculator', 'en'),
        'pt-BR': getCanonicalUrl('overweight-calculator', 'br'),
        'pl': getCanonicalUrl('overweight-calculator', 'pl'),
        'de': getCanonicalUrl('overweight-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }overweight-calculator`,
    },
  };
}

export default async function OverweightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
