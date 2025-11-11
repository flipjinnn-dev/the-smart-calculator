import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for annuity-payout-calculator
const annuitypayoutcalculatorMeta = {
  en: {
    title: "Annuity Payout Calculator – Amount Online | TheSmartCalculator",
    description: "Use the Annuity Payout Calculator to determine payout amounts based on factors like principal and rates. Accurate, free online tool for annuity planning and income estimation.",
    keywords: "annuity payout calculator, payout amount, principal tool, rates calculation, online payout, annuity planning, free payout tool, income estimator"
  },
  br: {
    title: "Annuity Payout Calculator – Amount Online | TheSmartCalculator",
    description: "Use a Calculadora de Pagamento Anuidade para calcular valores de pagamento com base em fatores. Ferramenta precisa e gratuita para planejamento de anuidades e renda.",
    keywords: "calculadora pagamento anuidade, valor pagamento, fatores tool, online anuidade, planejamento renda, gratuita calculadora, estimativa pagamento"
  },
  pl: {
    title: "Rentenzahlung Rechner – Altersvorsorge Online | TheSmartCalculator",
    description: "Mit unserer Rentenzahlung-Berechnung ermitteln Sie einfach Ihre monatlichen Zahlungen, den Vorsorgebedarf und sichern Ihre Altersvorsorge präzise online mit Faktoren.",
    keywords: "rentenzahlung rechner, monatliche zahlungen, vorsorgebedarf tool, altersvorsorge, online berechnung, präzise tool, kostenloser rechner"
  },
  de: {
    title: "Kalkulator Wypłaty Renty – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora wypłaty renty online, aby obliczyć kwoty wypłat na podstawie czynników. Dokładne, darmowe narzędzie do planowania renty i dochodu.",
    keywords: "kalkulator wypłaty renty, obliczyć kwoty, czynniki tool, planowanie renty, online wypłata, dochód estymacja, darmowy tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && annuitypayoutcalculatorMeta[langHeader as keyof typeof annuitypayoutcalculatorMeta]
      ? langHeader
      : "en";

  const meta = annuitypayoutcalculatorMeta[language as keyof typeof annuitypayoutcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('annuity-payout-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('annuity-payout-calculator', 'en'),
        'pt-BR': getCanonicalUrl('annuity-payout-calculator', 'br'),
        'pl': getCanonicalUrl('annuity-payout-calculator', 'pl'),
        'de': getCanonicalUrl('annuity-payout-calculator', 'de'),
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

export default async function AnnuityPayoutCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
