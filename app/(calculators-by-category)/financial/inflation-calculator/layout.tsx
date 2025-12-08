import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for inflation-calculator
const inflationcalculatorMeta = {
  en: {
    title: "Inflation Calculator – Purchasing Power Online | TheSmartCalculator",
    description: "Use the Inflation Calculator to calculate the impact of inflation on purchasing power over time. Accurate, free online tool for economic planning and value adjustments.",
    keywords: "inflation calculator, purchasing power, inflation impact, online inflation, economic planning, value adjustment, free inflation tool, time value"
  },
  br: {
    title: "Calculadora de Inflação – Compare Preços e Poder de Compra",
    description: "Use a Calculadora de Inflação para ver a variação de preços e o impacto no seu dinheiro. Simule o poder de compra ao longo dos anos com precisão.",
    keywords: "calculadora inflação, poder compra, impacto inflação, online inflação, planejamento econômico, ajuste valor, gratuita ferramenta inflação, valor tempo"
  },
  pl: {
    title: "Kalkulator Inflacji – Oblicz Wartość Pieniądza Online",
    description: "Użyj kalkulatora inflacji online, aby sprawdzić spadek wartości pieniądza w czasie. Proste, szybkie i dokładne narzędzie finansowe.",
    keywords: "kalkulator inflacji, siła nabywcza, wpływ inflacji, online inflacja, planowanie ekonomiczne, dostosowanie wartości, darmowe narzędzie inflacja, wartość czasu"
  },
  de: {
    title: "Inflationsrechner – Kaufkraft & Preissteigerung online berechnen",
    description: "Mit dem Inflationsrechner ermitteln Sie Preissteigerung, Kaufkraftverlust und zukünftige Werte. Nutzen Sie den Inflationsrechner für Ihre Finanzplanung online.",
    keywords: "inflationsrechner, kaufkraft, inflations impact, online inflations, wirtschaftsplanung, wertanpassung, kostenloser inflations tool, zeitwert"
  }
,
  es: {
    title: "Calculadora de Inflación – Calcula el Valor Real y Poder Adquisitivo",
    description: "Utiliza nuestra calculadora de inflación para conocer el valor real de tu dinero, analizar el poder adquisitivo y planificar tus finanzas de manera precisa y sencilla.",
    keywords: "calculadora, inflación, calcula, valor, real, poder, adquisitivo, utiliza, nuestra, conocer, dinero, analizar, planificar, finanzas, manera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && inflationcalculatorMeta[langHeader as keyof typeof inflationcalculatorMeta]
      ? langHeader
      : "en";

  const meta = inflationcalculatorMeta[language as keyof typeof inflationcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('inflation-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('inflation-calculator', 'en'),
        'pt-BR': getCanonicalUrl('inflation-calculator', 'br'),
        'pl': getCanonicalUrl('inflation-calculator', 'pl'),
        'de': getCanonicalUrl('inflation-calculator', 'de'),
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

export default async function InflationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
