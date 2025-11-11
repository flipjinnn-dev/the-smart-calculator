import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for simpsons-rule-calculator
const simpsonsrulecalculatorMeta = {
  en: {
    title: "Simpson's Rule Calculator – Integrals Online | TheSmartCalculator",
    description: "Use the Simpson's Rule Calculator to calculate definite integrals using Simpson's Rule. Accurate, free online tool for math and engineering approximations.",
    keywords: "simpsons rule calculator, definite integrals, approximation tool, online simpson, math integrals, engineering approximation, free rule tool, integral calculation"
  },
  br: {
    title: "Calculadora Regra Simpson – Integrais Online | TheSmartCalculator",
    description: "Use a Calculadora Regra Simpson para calcular integrais definidas usando a Regra de Simpson. Ferramenta precisa e gratuita para matemática e engenharia.",
    keywords: "calculadora regra simpson, integrais definidas, ferramenta aproximação, online simpson, integrais matemática, aproximação engenharia, gratuita ferramenta regra, cálculo integral"
  },
  pl: {
    title: "Kalkulator Reguły Simpson – Całki Online | TheSmartCalculator",
    description: "Użyj kalkulatora reguły Simpson online, aby obliczyć całki oznaczone za pomocą Reguły Simpson. Dokładne, darmowe narzędzie do matematyki i inżynierii.",
    keywords: "kalkulator reguły simpson, całki oznaczone, narzędzie aproximacji, online simpson, całki matematyka, aproximacja inżynieria, darmowe narzędzie reguła, obliczenia całki"
  },
  de: {
    title: "Simpson's Rule Calculator – Integrals Online | TheSmartCalcula",
    description: "Berechne mit dem Simpsons Regel Rechner definite Integrale mit Simpsons Regel. Präzises, kostenloses Tool für Math und Ingenieur Approximationen.",
    keywords: "simpsons regel rechner, definite integrale, approximation tool, online simpson, math integrale, ingenieur approximation, kostenloser regel tool, integral berechnung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && simpsonsrulecalculatorMeta[langHeader as keyof typeof simpsonsrulecalculatorMeta]
      ? langHeader
      : "en";

  const meta = simpsonsrulecalculatorMeta[language as keyof typeof simpsonsrulecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('simpsons-rule-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }simpsons-rule-calculator`,
      languages: {
        'en': getCanonicalUrl('simpsons-rule-calculator', 'en'),
        'pt-BR': getCanonicalUrl('simpsons-rule-calculator', 'br'),
        'pl': getCanonicalUrl('simpsons-rule-calculator', 'pl'),
        'de': getCanonicalUrl('simpsons-rule-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }simpsons-rule-calculator`,
    },
  };
}

export default async function SimpsonsRuleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
