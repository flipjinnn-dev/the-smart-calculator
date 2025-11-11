import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for retirement-calculator
const retirementcalculatorMeta = {
  en: {
    title: "Retirement Calculator – Savings Online | TheSmartCalculator",
    description: "Use the Retirement Calculator to plan savings and calculate required contributions. Accurate, free online tool for retirement goals and forecasting.",
    keywords: "retirement calculator, savings planning, contributions calculation, online retirement, goals tool, forecasting calculator, free retirement tool, retirement estimate"
  },
  br: {
    title: "Calculadora de Aposentadoria – Planeje Seu Futuro Financeiro",
    description: "Use a Calculadora de Aposentadoria para estimar quanto poupar e investir. Planeje sua renda futura com cálculos rápidos e resultados precisos.",
    keywords: "calculadora aposentadoria, planejamento poupança, cálculo contribuições, online aposentadoria, ferramenta metas, calculadora previsão, gratuita ferramenta aposentadoria, estimativa aposentadoria"
  },
  pl: {
    title: "Kalkulator Emerytalny – Oblicz Swoją Emeryturę Online",
    description: "Użyj kalkulatora emerytalnego online, aby obliczyć przyszłą emeryturę, składki i oszczędności. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator emerytalny, planowanie oszczędności, obliczenia wpłat, online emerytura, narzędzie cele, kalkulator prognozowania, darmowe narzędzie emerytura, estymacja emerytury"
  },
  de: {
    title: "Rentenrechner – Ihre zukünftige Rente berechnen",
    description: "Mit dem Rentenrechner ermitteln Sie Ihre voraussichtliche Altersrente, Rentenpunkte und Versorgungslücke. Nutzen Sie den Rentenrechner für fundierte Vorsorgeplanung.",
    keywords: "rentenrechner, sparplanung, beitrags berechnung, online rente, ziele tool, prognose rechner, kostenloser rente tool, rente schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && retirementcalculatorMeta[langHeader as keyof typeof retirementcalculatorMeta]
      ? langHeader
      : "en";

  const meta = retirementcalculatorMeta[language as keyof typeof retirementcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('retirement-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('retirement-calculator', 'en'),
        'pt-BR': getCanonicalUrl('retirement-calculator', 'br'),
        'pl': getCanonicalUrl('retirement-calculator', 'pl'),
        'de': getCanonicalUrl('retirement-calculator', 'de'),
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

export default async function RetirementCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
