import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for payment-calculator
const paymentcalculatorMeta = {
  en: {
    title: "Payment Calculator Monthly Payment Planner",
    description: "Estimate monthly or total payments accurately using our Payment Calculator for better budgeting.",
    keywords: "payment calculator, loan payments, fixed terms, online payment, financial planning, free payment tool, term determination, payment calculation"
  },
  br: {
    title: "Calculadora de Pagamento – Simule Parcelas e Juros Online",
    description: "Use a Calculadora de Pagamento para calcular parcelas, prazos e juros. Organize suas finanças com resultados rápidos e precisos online.",
    keywords: "calculadora pagamento, pagamentos empréstimo, termos fixos, online pagamento, planejamento financeiro, gratuita ferramenta pagamento, determinação termo, cálculo pagamento"
  },
  pl: {
    title: "Kalkulator Płatności – Oblicz Swoje Płatności Online",
    description: "Użyj kalkulatora płatności online, aby obliczyć raty, koszty i terminy spłaty. Proste, szybkie i dokładne narzędzie finansowe dla każdego.",
    keywords: "kalkulator płatności, płatności kredytu, terminy stałe, online płatność, planowanie finansowe, darmowe narzędzie płatność, określenie terminu, obliczenia płatności"
  },
  de: {
    title: "Zahlungsrechner – Ihre Zahlungen online berechnen",
    description: "Mit dem Zahlungsrechner berechnen Sie Ihre geplanten Zahlungen, Raten und Laufzeiten exakt. Der Zahlungsrechner hilft bei Ihrer Finanz- und Budgetplanung online.",
    keywords: "zahlungsrechner, darlehen zahlungen, feste terme, online zahlung, finanzplanung, kostenloser zahlung tool, term bestimmung, zahlung berechnung"
  }
,
  es: {
    title: "Calculadora de Pago – Calcula tu Salario y Ahorros Rápido",
    description: "Usa nuestra calculadora de pago para conocer tu salario neto y ahorros fácilmente. ¡Calcula al instante y planifica tu dinero hoy mismo!",
    keywords: "calculadora, pago, calcula, salario, ahorros, rápido, nuestra, conocer, neto, fácilmente, instante, planifica, dinero, mismo"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && paymentcalculatorMeta[langHeader as keyof typeof paymentcalculatorMeta]
      ? langHeader
      : "en";

  const meta = paymentcalculatorMeta[language as keyof typeof paymentcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('payment-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('payment-calculator', 'en'),
        'es': getCanonicalUrl('payment-calculator', 'es'),
        'pt-BR': getCanonicalUrl('payment-calculator', 'br'),
        'pl': getCanonicalUrl('payment-calculator', 'pl'),
        'de': getCanonicalUrl('payment-calculator', 'de'),
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

export default async function PaymentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
