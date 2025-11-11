import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for savings-calculator
const savingscalculatorMeta = {
  en: {
    title: "Savings Calculator – Growth Online | TheSmartCalculator",
    description: "Use the Savings Calculator to calculate savings growth over time with contributions. Accurate, free online tool for financial planning and goals.",
    keywords: "savings calculator, growth time, contributions tool, online savings, financial planning, goals calculator, free savings tool, growth estimate"
  },
  br: {
    title: "Calculadora de Poupança – Simule Juros e Rendimentos",
    description: "Use a Calculadora de Poupança para simular juros e ganhos mensais. Descubra quanto seu dinheiro pode render com cálculos rápidos e precisos.",
    keywords: "calculadora poupança, crescimento tempo, ferramenta contribuições, online poupança, planejamento financeiro, calculadora metas, gratuita ferramenta poupança, estimativa crescimento"
  },
  pl: {
    title: "Kalkulator Oszczędności – Oblicz Swoje Oszczędności Online",
    description: "Użyj kalkulatora oszczędności online, aby obliczyć zyski, odsetki i plan oszczędzania. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator oszczędności, wzrost czas, narzędzie wpłat, online oszczędności, planowanie finansowe, kalkulator celów, darmowe narzędzie oszczędności, estymacja wzrostu"
  },
  de: {
    title: "Sparrechner – Ihr Tool für regelmäßiges Sparen",
    description: "Mit dem Sparrechner berechnen Sie Ihre monatliche Sparrate, Laufzeit und das Endkapital – sparen Sie effektiv und erreichen Sie Ihre Ziele mit dem Sparrechner.",
    keywords: "sparrechner, wachstum zeit, beiträge tool, online sparen, finanzplanung, ziele rechner, kostenloser spar tool, wachstum schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && savingscalculatorMeta[langHeader as keyof typeof savingscalculatorMeta]
      ? langHeader
      : "en";

  const meta = savingscalculatorMeta[language as keyof typeof savingscalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('savings-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('savings-calculator', 'en'),
        'pt-BR': getCanonicalUrl('savings-calculator', 'br'),
        'pl': getCanonicalUrl('savings-calculator', 'pl'),
        'de': getCanonicalUrl('savings-calculator', 'de'),
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

export default async function SavingsCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
