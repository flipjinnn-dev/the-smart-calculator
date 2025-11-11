import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for pension-calculator
const pensioncalculatorMeta = {
  en: {
    title: "Pension Calculator – Benefits Salary Online | TheSmartCalculator",
    description: "Use the Pension Calculator to estimate benefits based on salary and years of service. Accurate, free online tool for retirement planning.",
    keywords: "pension calculator, benefits estimate, salary years, online pension, retirement planning, free pension tool, service calculation, pension projection"
  },
  br: {
    title: "Calculadora de Pensão Online – Calcule o Valor Correto",
    description: "Use a Calculadora de Pensão para estimar valores de pensão alimentícia com base em renda e despesas. Ferramenta rápida, fácil e precisa online.",
    keywords: "calculadora pensão, estimativa benefícios, salário anos, online pensão, planejamento aposentadoria, gratuita ferramenta pensão, cálculo serviço, projeção pensão"
  },
  pl: {
    title: "Kalkulator Emerytury – Oblicz Wysokość Emerytury Online",
    description: "Użyj kalkulatora emerytury online, aby obliczyć przyszłą emeryturę, składki i okres pracy. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator emerytury, estymacja korzyści, pensja lata, online emerytura, planowanie emerytury, darmowe narzędzie emerytura, obliczenia usługi, projekcja emerytury"
  },
  de: {
    title: "Rentenrechner – Ihre Rentenplanung online berechnen",
    description: "Mit dem Rentenrechner berechnen Sie Ihre monatliche Rente, Vorsorgebedarf und Ersparnisse. Nutzen Sie den Pensionsrechner für Ihre Altersplanung.",
    keywords: "rentenrechner, leistungen schätzung, gehalt jahre, online pension, rentenplanung, kostenloser pension tool, dienst berechnung, pension prognose"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && pensioncalculatorMeta[langHeader as keyof typeof pensioncalculatorMeta]
      ? langHeader
      : "en";

  const meta = pensioncalculatorMeta[language as keyof typeof pensioncalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('pension-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('pension-calculator', 'en'),
        'pt-BR': getCanonicalUrl('pension-calculator', 'br'),
        'pl': getCanonicalUrl('pension-calculator', 'pl'),
        'de': getCanonicalUrl('pension-calculator', 'de'),
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

export default async function PensionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
