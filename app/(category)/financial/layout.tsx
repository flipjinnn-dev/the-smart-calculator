import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCategoryCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for financial
const financialMeta = {
  en: {
    title: "Best Free Online Financial Calculators 2026",
    description: "Use free online financial calculators to plan loans, investments and retirement. Smart financial calculator tools for accurate, fast results.",
    keywords: "financial calculator, free online financial calculator, best financial calculators 2026, smart financial calculator, financial calculators online, loan calculator, investment calculator, retirement planning, financial calculator free"
  },
  br: {
    title: "Calculadora Financeiro – Juros Investimentos | TheSmartCalculator",
    description: "Use a Calculadora Financeiro para simular juros, empréstimos e investimentos facilmente. Planeje suas finanças online com resultados rápidos, precisos e cenários detalhados.",
    keywords: "calculadora financeiro, simular juros, empréstimos calculadora, investimentos tool, planejamento finanças, calculadora online financeiro, resultados rápidos"
  },
  pl: {
    title: "Kalkulator Finansowy – Oblicz Finanse Online | TheSmartCalculator",
    description: "Skorzystaj z kalkulatora finansowego online, aby łatwo analizować dane finansowe. Proste narzędzie do szybkich i dokładnych obliczeń finansowych, symulacji i planowania.",
    keywords: "kalkulator finansowy, obliczyć finanse, dane finansowe, narzędzie finansowe, symulacja finansowa, dokładne obliczenia, darmowy kalkulator finansowy"
  },
  de: {
    title: "Finanziell Rechner – Budget Online Tool | TheSmartCalculator",
    description: "Nutzen Sie den financial  – loans & investments tool | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher Kont.",
    keywords: "finanziell rechner, budget berechnen, ersparnisse tool, investitionen kalkulator, online finanzplanung, schnelle berechnungen, kostenloser finanziell rechner"
  },
  es: {
    title: "Calculadora Financiera – Herramienta de Préstamos e Inversiones | TheSmartCalculator",
    description: "Usa la Calculadora Financiera para préstamos, inversiones, intereses y presupuestos. Herramienta online gratuita y precisa para simular escenarios y planificar tus finanzas.",
    keywords: "calculadora financiera, calculadora de préstamos, herramienta de inversión, cálculo de intereses, finanzas online, presupuesto"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && financialMeta[langHeader as keyof typeof financialMeta]
      ? langHeader
      : "en";

  const meta = financialMeta[language as keyof typeof financialMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCategoryCanonicalUrl('financial', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCategoryCanonicalUrl('financial', 'en'),
        'en': getCategoryCanonicalUrl('financial', 'en'),
        'pt-BR': getCategoryCanonicalUrl('financial', 'br'),
        'pl': getCategoryCanonicalUrl('financial', 'pl'),
        'de': getCategoryCanonicalUrl('financial', 'de'),
        'es': getCategoryCanonicalUrl('financial', 'es'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function FinancialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
