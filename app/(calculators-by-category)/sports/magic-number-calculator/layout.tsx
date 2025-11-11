import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for magic-number-calculator
const magicnumbercalculatorMeta = {
  en: {
    title: "Magic Number Calculator – Playoff Sports Online | TheSmartCalculator",
    description: "Use the Magic Number Calculator to calculate the magic number for playoff contention in sports. Accurate, free online tool for fans and team analysis.",
    keywords: "magic number calculator, playoff contention, sports calculator, online magic, team analysis, fan tool, free magic tool, contention calculation"
  },
  br: {
    title: "Magic Number Calculator – Playoff Sports Online | TheSmartCalc",
    description: "Use a Calculadora Número Mágico para calcular número para disputa de playoff em esportes. Ferramenta precisa para fãs e análise de equipes.",
    keywords: "calculadora número mágico, disputa playoff, calculadora esportes, online mágico, análise equipe, ferramenta fã, gratuita ferramenta mágico, cálculo contention"
  },
  pl: {
    title: "Kalkulator Liczby Magicznej – Playoff Online | TheSmartCalculator",
    description: "Użyj kalkulatora liczby magicznej online, aby obliczyć liczbę do rywalizacji playoff w sporcie. Dokładne narzędzie dla fanów i analizy zespołów.",
    keywords: "kalkulator liczby magicznej, rywalizacja playoff, kalkulator sport, online magiczna, analiza zespołu, narzędzie fan, darmowe narzędzie magiczna, obliczenia contention"
  },
  de: {
    title: "Magic Number Calculator – Playoff Sports Online | TheSmartCalc",
    description: "Berechne mit dem Magische Zahl Rechner die Zahl für Playoff-Kontention in Sport. Präzises Tool für Fans und Team-Analyse kostenlos.",
    keywords: "magische zahl rechner, playoff contention, sport rechner, online magisch, team analyse, fan tool, kostenloser magisch tool, contention berechnung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && magicnumbercalculatorMeta[langHeader as keyof typeof magicnumbercalculatorMeta]
      ? langHeader
      : "en";

  const meta = magicnumbercalculatorMeta[language as keyof typeof magicnumbercalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('magic-number-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('magic-number-calculator', 'en'),
        'pt-BR': getCanonicalUrl('magic-number-calculator', 'br'),
        'pl': getCanonicalUrl('magic-number-calculator', 'pl'),
        'de': getCanonicalUrl('magic-number-calculator', 'de'),
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

export default async function MagicNumberCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
