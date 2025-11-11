import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for protein-calculator
const proteincalculatorMeta = {
  en: {
    title: "Protein Calculator – Daily Needs Online | TheSmartCalculator",
    description: "Use the Protein Calculator to estimate daily protein needs based on activity and goals. Accurate, free online tool for diet and muscle building.",
    keywords: "protein calculator, daily protein, activity tool, goals calculation, online protein, diet building, free protein tool, muscle planning"
  },
  br: {
    title: "Calculadora de Proteína – Calcule a Ingestão Diária Ideal",
    description: "Use a Calculadora de Proteína para saber quanto consumir por dia. Ajuste sua dieta e alcance seus objetivos de saúde e fitness com precisão.",
    keywords: "calculadora proteína, proteína diária, ferramenta atividade, cálculo metas, online proteína, construção dieta, gratuita ferramenta proteína, planejamento músculo"
  },
  pl: {
    title: "Kalkulator Białka – Oblicz Dzienne Spożycie Białka",
    description: "Użyj kalkulatora białka online, aby obliczyć dzienne zapotrzebowanie na białko w diecie. Proste, szybkie i dokładne narzędzie dla zdrowego stylu życia.",
    keywords: "kalkulator białka, białko dzienne, narzędzie aktywności, obliczenia celów, online białko, budowa diety, darmowe narzędzie białko, planowanie mięśni"
  },
  de: {
    title: "Proteinrechner – Täglichen Eiweißbedarf einfach berechnen",
    description: "Berechne mit dem Proteinrechner deinen täglichen Eiweißbedarf. Ideal für Muskelaufbau, Fitness & Ernährung – schnell, präzise und kostenlos online!",
    keywords: "proteinrechner, tägliches protein, aktivität tool, ziele berechnung, online protein, diät aufbau, kostenloser protein tool, muskel planung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && proteincalculatorMeta[langHeader as keyof typeof proteincalculatorMeta]
      ? langHeader
      : "en";

  const meta = proteincalculatorMeta[language as keyof typeof proteincalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('protein-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }protein-calculator`,
      languages: {
        'en': getCanonicalUrl('protein-calculator', 'en'),
        'pt-BR': getCanonicalUrl('protein-calculator', 'br'),
        'pl': getCanonicalUrl('protein-calculator', 'pl'),
        'de': getCanonicalUrl('protein-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }protein-calculator`,
    },
  };
}

export default async function ProteinCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
