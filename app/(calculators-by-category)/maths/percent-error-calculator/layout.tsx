import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for percent-error-calculator
const percenterrorcalculatorMeta = {
  en: {
    title: "Percent Error Calculator – Value Online | TheSmartCalculator",
    description: "Use the Percentage Error Calculator to calculate the percentage error between an estimated value and the actual value. Accurate, free online tool for scientific and math analysis.",
    keywords: "percent error calculator, error calculation, estimated actual, online error, scientific tool, math analysis, free error tool, percentage error"
  },
  br: {
    title: "Calculadora de Erro Percentual – Calcule Precisamente",
    description: "Use a Calculadora de Erro Percentual para medir diferenças entre valores esperados e reais. Ferramenta rápida e precisa para análises e estudos.",
    keywords: "calculadora erro percentual, cálculo erro, estimado atual, online erro, ferramenta científica, análise matemática, gratuita ferramenta erro, erro porcentagem"
  },
  pl: {
    title: "Kalkulator Błędu Procentowego – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora błędu procentowego, aby obliczyć błąd procentowy między szacunkową a rzeczywistą wartością. Dokładne, darmowe narzędzie do analizy naukowej i matematycznej.",
    keywords: "kalkulator błędu procentowego, obliczenia błędu, szacunkowa rzeczywista, online błąd, narzędzie naukowe, analiza matematyczna, darmowe narzędzie błąd, błąd procentowy"
  },
  de: {
    title: "Prozentfehler Rechner – Fehler Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Prozentfehler Rechner den Prozentfehler zwischen geschätztem und tatsächlichem Wert. Präzises, kostenloses Tool für wissenschaftliche und math Analyse.",
    keywords: "prozentfehler rechner, fehler berechnung, geschätzt tatsächlich, online fehler, wissenschaftliches tool, math analyse, kostenloser fehler tool, prozent fehler"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && percenterrorcalculatorMeta[langHeader as keyof typeof percenterrorcalculatorMeta]
      ? langHeader
      : "en";

  const meta = percenterrorcalculatorMeta[language as keyof typeof percenterrorcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('percent-error-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }percent-error-calculator`,
      languages: {
        'en': getCanonicalUrl('percent-error-calculator', 'en'),
        'pt-BR': getCanonicalUrl('percent-error-calculator', 'br'),
        'pl': getCanonicalUrl('percent-error-calculator', 'pl'),
        'de': getCanonicalUrl('percent-error-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }percent-error-calculator`,
    },
  };
}

export default async function PercentErrorCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
