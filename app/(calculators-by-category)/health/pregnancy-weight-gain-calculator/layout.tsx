import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for pregnancy-weight-gain-calculator
const pregnancyweightgaincalculatorMeta = {
  en: {
    title: "Pregnancy Weight Gain Calculator – Recommended Online | TheSma",
    description: "Use the Pregnancy Weight Gain Calculator to calculate recommended weight gain during pregnancy. Accurate, free online tool for maternal health tracking.",
    keywords: "pregnancy weight gain calculator, recommended gain, pregnancy weight, online gain tool, maternal health, tracking calculator, free weight tool, gain estimate"
  },
  br: {
    title: "Calculadora Ganho de Peso na Gravidez – Veja o Ideal",
    description: "Use a Calculadora de Ganho de Peso na Gravidez para saber o peso ideal para cada fase. Acompanhe sua gestação com segurança e precisão online.",
    keywords: "calculadora ganho peso gravidez, ganho recomendado, peso gravidez, ferramenta online ganho, saúde materna, calculadora tracking, gratuita ferramenta peso, estimativa ganho"
  },
  pl: {
    title: "Pregnancy Weight Gain Calculator – Recommended Online | TheSma",
    description: "Użyj kalkulatora przyrostu wagi w ciąży, aby obliczyć zalecany przyrost wagi podczas ciąży. Dokładne, darmowe narzędzie do śledzenia zdrowia matki.",
    keywords: "kalkulator przyrostu wagi ciąża, zalecany przyrost, waga ciąża, narzędzie online przyrost, zdrowie matki, kalkulator tracking, darmowe narzędzie waga, estymacja przyrostu"
  },
  de: {
    title: "Schwangerschaft Gewichtszunahme – Rechner online nutzen",
    description: "Berechnen Sie Ihre gesunde Gewichtszunahme in der Schwangerschaft mit unserem Tool. Der Schwangerschaft Gewichtszunahme Rechner zeigt Ihnen Grenzwerte & Trends.",
    keywords: "schwangerschaft gewichtszunahme, empfohlene zunahme, schwangerschaftsgewicht, online zunahme tool, mütterliche gesundheit, tracking rechner, kostenloser gewicht tool, zunahme schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pregnancyweightgaincalculatorMeta[langHeader as keyof typeof pregnancyweightgaincalculatorMeta]
      ? langHeader
      : "en";

  const meta = pregnancyweightgaincalculatorMeta[language as keyof typeof pregnancyweightgaincalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pregnancy-weight-gain-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }pregnancy-weight-gain-calculator`,
      languages: {
        'en': getCanonicalUrl('pregnancy-weight-gain-calculator', 'en'),
        'pt-BR': getCanonicalUrl('pregnancy-weight-gain-calculator', 'br'),
        'pl': getCanonicalUrl('pregnancy-weight-gain-calculator', 'pl'),
        'de': getCanonicalUrl('pregnancy-weight-gain-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }pregnancy-weight-gain-calculator`,
    },
  };
}

export default async function PregnancyWeightGainCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
