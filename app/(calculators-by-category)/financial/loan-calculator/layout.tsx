import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for loan-calculator
const loancalculatorMeta = {
  en: {
    title: "Loan Calculator Monthly Payment Estimator",
    description: "Estimate monthly loan payments and total interest easily using our Loan Calculator for smart borrowing.",
    keywords: "loan calculator, payments rates, payoff schedules, online loan, planning tool, budgeting calculator, free loan tool, interest calculation"
  },
  br: {
    title: "Calculadora de Empréstimo – Simule Parcelas e Juros Online",
    description: "Use a Calculadora de Empréstimo para simular parcelas, taxas e prazos. Planeje seu crédito pessoal com cálculos rápidos e resultados precisos.",
    keywords: "calculadora empréstimo, taxas parcelas, cronogramas quitação, online empréstimo, ferramenta planejamento, calculadora orçamento, gratuita ferramenta empréstimo, cálculo juros"
  },
  pl: {
    title: "Kalkulator Kredytowy – Oblicz Ratę Kredytu Online",
    description: "Użyj kalkulatora kredytowego online, aby obliczyć raty, odsetki i całkowity koszt kredytu. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator kredytowy, raty odsetki, harmonogramy spłaty, online kredyt, narzędzie planowania, kalkulator budżetu, darmowe narzędzie kredyt, obliczenia odsetek"
  },
  de: {
    title: "Kreditrechner – Ihre Online-Kreditberechnung | TheSmartCalculator",
    description: "Mit dem Kreditrechner berechnen Sie Zinsen, Laufzeit und Monatsrate für Darlehen. Nutzen Sie den Kreditrechner für transparente Kreditentscheidungen online.",
    keywords: "kreditrechner, raten zinsen, tilgungspläne, online kredit, planungstool, budgetrechner, kostenloser kredit tool, zinsberechnung"
  }
,
  es: {
    title: "Calculadora de Préstamos – Calcula tu Crédito y Amortización",
    description: "Utiliza nuestra calculadora de préstamos para planificar tu crédito, calcular la amortización y gestionar tus finanzas de manera rápida y eficiente.",
    keywords: "calculadora, préstamos, calcula, crédito, amortización, utiliza, nuestra, planificar, calcular, gestionar, finanzas, manera, rápida, eficiente"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && loancalculatorMeta[langHeader as keyof typeof loancalculatorMeta]
      ? langHeader
      : "en";

  const meta = loancalculatorMeta[language as keyof typeof loancalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('loan-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('loan-calculator', 'en'),
        'es': getCanonicalUrl('loan-calculator', 'es'),
        'pt-BR': getCanonicalUrl('loan-calculator', 'br'),
        'pl': getCanonicalUrl('loan-calculator', 'pl'),
        'de': getCanonicalUrl('loan-calculator', 'de'),
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

export default async function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
