import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for percentage-calculator
const percentagecalculatorMeta = {
  en: {
    title: "Percentage Calculator – Ratios Changes Online | TheSmartCalculator",
    description: "Use the Percentage Calculator to calculate percentages, ratios, and percentage changes easily. Accurate, free online tool for math and finance calculations.",
    keywords: "percentage calculator, percentages ratios, change calculation, online percentage, math finance, free percentage tool, ratio tool, change estimator"
  },
  br: {
    title: "Calculadora de Porcentagem – Calcule Descontos e Aumentos",
    description: "Use a Calculadora de Porcentagem para calcular descontos, acréscimos e porcentagens em geral. Ferramenta rápida e precisa para seus cálculos diários.",
    keywords: "calculadora porcentagem, porcentagens razões, cálculo mudança, online porcentagem, matemática finanças, gratuita ferramenta porcentagem, ferramenta razão, estimador mudança"
  },
  pl: {
    title: "Kalkulator Procentowy – Oblicz Procent Online Szybko",
    description: "Użyj kalkulatora procentowego online, aby szybko obliczyć procenty, wartości i różnice. Proste, dokładne i darmowe narzędzie matematyczne.",
    keywords: "kalkulator procentowy, procenty stosunki, obliczenia zmiany, online procent, matematyka finanse, darmowe narzędzie procentowe, narzędzie stosunek, estymator zmiany"
  },
  de: {
    title: "Prozentrechner – Prozent einfach & schnell online berechnen",
    description: "Berechne mit dem Prozentrechner Prozente, Prozentwerte & Veränderungen. Schnell, genau & kostenlos – ideal für Schule, Beruf & Alltag!",
    keywords: "prozentrechner, prozente verhältnisse, ändern berechnung, online prozent, math finanz, kostenloser prozent tool, verhältnis tool, ändern schätzer"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && percentagecalculatorMeta[langHeader as keyof typeof percentagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = percentagecalculatorMeta[language as keyof typeof percentagecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('percentage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('percentage-calculator', 'en'),
        'pt-BR': getCanonicalUrl('percentage-calculator', 'br'),
        'pl': getCanonicalUrl('percentage-calculator', 'pl'),
        'de': getCanonicalUrl('percentage-calculator', 'de'),
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

export default async function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
