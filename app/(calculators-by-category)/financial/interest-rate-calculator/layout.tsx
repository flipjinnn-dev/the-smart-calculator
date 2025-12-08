import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for interest-rate-calculator
const interestratecalculatorMeta = {
  en: {
    title: "Interest Rate Calculator – Loans Investments Online | TheSmart",
    description: "Use the Interest Rate Calculator to calculate the impact of interest rates on loans and investments. Accurate, free online tool for financial comparisons.",
    keywords: "interest rate calculator, rates impact, loans investments, online rate, financial comparisons, free rate tool, rate calculation, investment planning"
  },
  br: {
    title: "Calculadora de Taxa de Juros – Calcule Juros Simples e Compostos",
    description: "Use a Calculadora de Taxa de Juros para simular juros simples e compostos. Descubra quanto vai pagar ou ganhar com resultados rápidos e precisos.",
    keywords: "calculadora taxa juros, impacto taxas, empréstimos investimentos, online taxa, comparações financeiras, gratuita ferramenta taxa, cálculo taxa, planejamento investimento"
  },
  pl: {
    title: "Kalkulator Stóp Procentowych – Oblicz Odsetki Online",
    description: "Użyj kalkulatora stóp procentowych online, aby obliczyć odsetki, oprocentowanie i zyski. Proste, szybkie i darmowe narzędzie finansowe.",
    keywords: "kalkulator stóp procentowych, wpływ stóp, kredyty inwestycje, online stopa, porównania finansowe, darmowe narzędzie stopa, obliczenia stopy, planowanie inwestycji"
  },
  de: {
    title: "Zinsrechner – Online Zinsen & Laufzeit exakt berechnen",
    description: "Mit dem Zinsrechner berechnen Sie Zinssatz, Laufzeit, Anfangs- oder Endkapital exakt. Nutzen Sie den Zinsrechner für Ihre Geldanlagen oder Kredite.",
    keywords: "zinsrechner, raten impact, darlehen investitionen, online rate, finanzvergleiche, kostenloser rate tool, rate berechnung, investitionsplanung"
  }
,
  es: {
    title: "Calculadora de Tasas de Interés – Calcula Fácil y Rápido",
    description: "Calcula tus tasas de interés al instante con nuestra herramienta fácil y precisa. ¡Ahorra tiempo y toma decisiones financieras inteligentes ahora!",
    keywords: "calculadora, tasas, interés, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, ahorra, tiempo, toma, decisiones, financieras"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && interestratecalculatorMeta[langHeader as keyof typeof interestratecalculatorMeta]
      ? langHeader
      : "en";

  const meta = interestratecalculatorMeta[language as keyof typeof interestratecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('interest-rate-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('interest-rate-calculator', 'en'),
        'pt-BR': getCanonicalUrl('interest-rate-calculator', 'br'),
        'pl': getCanonicalUrl('interest-rate-calculator', 'pl'),
        'de': getCanonicalUrl('interest-rate-calculator', 'de'),
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

export default async function InterestRateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
