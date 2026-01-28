import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for debt-payoff-calculator
const debtpayoffcalculatorMeta = {
  en: {
    title: "Debt Payoff Calculator Clear Debt Faster",
    description: "See how long it takes to clear debt, reduce interest, and plan payments effectively using our Debt Payoff Calculator.",
    keywords: "debt payoff calculator, debt free plan, time estimate, online debt, financial management, reduction tool, free payoff calculator, strategy planning"
  },
  br: {
    title: "Calculadora Quitação Dívida – Plano Online | TheSmartCalculator",
    description: "Use a Calculadora Quitação Dívida para criar plano e estimar tempo para ficar livre de dívidas. Ferramenta precisa para gestão financeira e estratégias de redução.",
    keywords: "calculadora quitação dívida, plano dívida, tempo estimar, online dívida, gestão financeira, estratégias redução, gratuita tool"
  },
  pl: {
    title: "Kalkulator Spłaty Długu – Plan Online | TheSmartCalculator",
    description: "Użyj kalkulatora spłaty długu online, aby stworzyć plan i oszacować czas na wolność od długów. Dokładne, darmowe narzędzie do zarządzania finansami.",
    keywords: "kalkulator spłaty długu, plan dług, czas oszacować, online dług, zarządzanie finansami, redukcja tool, darmowy kalkulator"
  },
  de: {
    title: "Hypothekenrechner – Online Baufinanzierung und Immobilienkredit",
    description: "Mit dem Hypothekenrechner ermitteln Sie Ihre Monatsrate, Zinssatz und Restschuld – ideal für Ihre Immobilienfinanzierung mit präzisen Online-Tools.",
    keywords: "hypothekenrechner, finanzierung berechnen, monatsrate zinssatz, restsuld tool, immobilien online, präzise tools, ideal rechner"
  }
,
  es: {
    title: "Calculadora de pago de deudas: Organiza tus finanzas hoy",
    description: "Calcula tus pagos de deudas fácilmente. Planifica amortizaciones, conoce intereses y organiza tus finanzas para lograr libertad financiera más rápido.",
    keywords: "calculadora, pago, deudas, organiza, finanzas, calcula, pagos, fácilmente, planifica, amortizaciones, conoce, intereses, lograr, libertad, financiera"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && debtpayoffcalculatorMeta[langHeader as keyof typeof debtpayoffcalculatorMeta]
      ? langHeader
      : "en";

  const meta = debtpayoffcalculatorMeta[language as keyof typeof debtpayoffcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('debt-payoff-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('debt-payoff-calculator', 'en'),
        'es': getCanonicalUrl('debt-payoff-calculator', 'es'),
        'pt-BR': getCanonicalUrl('debt-payoff-calculator', 'br'),
        'pl': getCanonicalUrl('debt-payoff-calculator', 'pl'),
        'de': getCanonicalUrl('debt-payoff-calculator', 'de'),
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

export default async function DebtPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
