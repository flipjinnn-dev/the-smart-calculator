import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for conservation-of-momentum-calculator
const conservationofmomentumcalculatorMeta = {
  en: {
    title: "Conservation of Momentum Calculator – Collisions Online | TheS",
    description: "Use the Conservation of Momentum Calculator to compute momentum in collisions. Accurate, free online tool for physics students and collision analysis.",
    keywords: "conservation of momentum calculator, collisions tool, momentum calculation, online conservation, physics analysis, free momentum tool, student calculator"
  },
  br: {
    title: "Conservation of Momentum Calculator – Collisions Online | TheS",
    description: "Use a Calculadora Conservação Momentum para calcular momentum em colisões. Ferramenta precisa e gratuita para estudantes de física e análise de impactos.",
    keywords: "calculadora conservação momentum, colisões tool, cálculo momentum, online conservação, análise física, gratuita tool, estudantes calculadora"
  },
  pl: {
    title: "Kalkulator Zachowania Pędu – Zderzenia Online | TheSmartCalculator",
    description: "Użyj kalkulatora zachowania pędu online, aby obliczyć pęd w zderzeniach. Dokładne, darmowe narzędzie dla studentów fizyki i analizy kolizji.",
    keywords: "kalkulator zachowania pędu, zderzenia tool, obliczyć pęd, online zachowania, analiza fizyki, darmowy tool, studenci kalkulator"
  },
  de: {
    title: "Conservation of Momentum Calculator – Collisions Online | TheS",
    description: "Berechne mit dem Erhaltung des Impulses Rechner Impuls in Kollisionen. Präzises, kostenloses Tool für Physikstudenten und Kollisionsanalyse.",
    keywords: "erhaltung impulses rechner, kollisionen tool, impuls berechnen, online erhaltung, physik analyse, kostenloser tool, studenten rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && conservationofmomentumcalculatorMeta[langHeader as keyof typeof conservationofmomentumcalculatorMeta]
      ? langHeader
      : "en";

  const meta = conservationofmomentumcalculatorMeta[language as keyof typeof conservationofmomentumcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('conservation-of-momentum-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('conservation-of-momentum-calculator', 'en'),
        'pt-BR': getCanonicalUrl('conservation-of-momentum-calculator', 'br'),
        'pl': getCanonicalUrl('conservation-of-momentum-calculator', 'pl'),
        'de': getCanonicalUrl('conservation-of-momentum-calculator', 'de'),
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

export default async function ConservationOfMomentumCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
