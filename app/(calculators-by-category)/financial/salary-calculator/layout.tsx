import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for salary-calculator
const salarycalculatorMeta = {
  en: {
    title: "Salary Calculator – Take-Home Pay Online | TheSmartCalculator",
    description: "Use the Salary Calculator to calculate take-home pay after taxes and deductions. Accurate, free online tool for payroll and income planning.",
    keywords: "salary calculator, take home pay, taxes deductions, online salary, payroll tool, income planning, free salary tool, net pay"
  },
  br: {
    title: "Calculadora de Salário – Calcule Salário Líquido e Bruto",
    description: "Use a Calculadora de Salário para calcular salário líquido, descontos e benefícios. Descubra quanto vai receber com precisão e rapidez online.",
    keywords: "calculadora salário, pagamento líquido, impostos deduções, online salário, ferramenta folha pagamento, planejamento renda, gratuita ferramenta salário, pagamento neto"
  },
  pl: {
    title: "Kalkulator Wynagrodzeń – Oblicz Pensję Netto i Brutto",
    description: "Użyj kalkulatora wynagrodzeń online, aby obliczyć pensję netto, brutto i składki ZUS. Proste, szybkie i dokładne narzędzie finansowe dla pracowników.",
    keywords: "kalkulator wynagrodzeń, wynagrodzenie netto, podatki odliczenia, online wynagrodzenie, narzędzie listy płac, planowanie dochodu, darmowe narzędzie wynagrodzenie, pensja netto"
  },
  de: {
    title: "Gehaltsrechner – Ihr Brutto-Netto-Tool online",
    description: "Mit dem Gehaltsrechner ermitteln Sie schnell Brutto- und Nettogehalt, Steuerklasse, Sozialabgaben sowie monatliches verfügbares Einkommen – einfach online berechnen.",
    keywords: "gehaltsrechner, netto gehalts, steuern abzüge, online gehalts, lohn tool, einkommensplanung, kostenloser gehalts tool, netto lohn"
  }
,
  es: {
    title: "Calculadora de Salario – Calcula tu Sueldo e Ingreso",
    description: "Utiliza nuestra calculadora de salario para estimar tu sueldo, controlar tus ingresos y planificar tus finanzas de manera rápida y sencilla.",
    keywords: "calculadora, salario, calcula, sueldo, ingreso, utiliza, nuestra, estimar, controlar, ingresos, planificar, finanzas, manera, rápida, sencilla"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && salarycalculatorMeta[langHeader as keyof typeof salarycalculatorMeta]
      ? langHeader
      : "en";

  const meta = salarycalculatorMeta[language as keyof typeof salarycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('salary-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('salary-calculator', 'en'),
        'pt-BR': getCanonicalUrl('salary-calculator', 'br'),
        'pl': getCanonicalUrl('salary-calculator', 'pl'),
        'de': getCanonicalUrl('salary-calculator', 'de'),
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

export default async function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
