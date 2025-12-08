import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for credit-card-payoff-calculator
const creditcardpayoffcalculatorMeta = {
  en: {
    title: "Credit Card Payoff Calculator – Debt Timeline Online | TheSmar",
    description: "Use the Credit Card Payoff Calculator to find payoff time and interest savings. Accurate, free online tool for debt reduction and financial planning.",
    keywords: "credit card payoff calculator, debt timeline, interest savings, online payoff, debt reduction, financial planning, free payoff tool, time calculation"
  },
  br: {
    title: "Simulador de Cartão de Crédito – Calcule Juros e Parcelas",
    description: "Use o Simulador de Cartão de Crédito para calcular juros, parcelas e saldo devedor. Planeje suas finanças com rapidez e precisão online.",
    keywords: "simulador cartão crédito, calcular juros, parcelas saldo, planejamento finanças, online simulador, rapidez precisão, redução dívida"
  },
  pl: {
    title: "Kalkulator Spłaty Karty Kredytowej – Oblicz Online",
    description: "Użyj kalkulatora spłaty karty kredytowej online, aby obliczyć raty, odsetki i czas spłaty. Proste, szybkie i dokładne narzędzie finansowe.",
    keywords: "kalkulator spłaty karty, obliczyć raty, odsetki czas, narzędzie finansowe, online spłata, szybkie dokładne, darmowy tool"
  },
  de: {
    title: "Tilgungsrechner – Rückzahlungs­berechnung online",
    description: "Der Tilgungsrechner berechnet Ihre Darlehens­rückzahlung, Laufzeit und Restschuld präzise. Nutzen Sie den Tilgungsrechner für Ihre Baufinanzierung.",
    keywords: "tilgungsrechner, rückzahlung berechnen, laufzeit restsuld, darlehen tool, online rechner, präzise nutzen, baufinanzierung"
  }
,
  es: {
    title: "Calculadora de pago de tarjeta: Reduce tu deuda rápido",
    description: "Calcula tus pagos de tarjeta de crédito y planifica la forma más rápida de reducir tu deuda. Toma el control de tus finanzas hoy mismo.",
    keywords: "calculadora, pago, tarjeta, reduce, deuda, rápido, calcula, pagos, crédito, planifica, forma, rápida, reducir, toma, control"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && creditcardpayoffcalculatorMeta[langHeader as keyof typeof creditcardpayoffcalculatorMeta]
      ? langHeader
      : "en";

  const meta = creditcardpayoffcalculatorMeta[language as keyof typeof creditcardpayoffcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('credit-card-payoff-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('credit-card-payoff-calculator', 'en'),
        'pt-BR': getCanonicalUrl('credit-card-payoff-calculator', 'br'),
        'pl': getCanonicalUrl('credit-card-payoff-calculator', 'pl'),
        'de': getCanonicalUrl('credit-card-payoff-calculator', 'de'),
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

export default async function CreditCardPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
