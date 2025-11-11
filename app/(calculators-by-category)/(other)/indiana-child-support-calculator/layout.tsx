import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for indiana-child-support-calculator
const indianachildsupportcalculatorMeta = {
  en: {
    title: "Indiana Child Support Calculator – Estimate Payments | TheSmar",
    description: "Use the Indiana Child Support Calculator to estimate payments based on income and custody. Accurate, free online tool for legal planning and family budgeting in Indiana.",
    keywords: "indiana child support calculator, estimate payments, child support tool, income calculation, custody estimator, online child support, free indiana tool, family budgeting"
  },
  br: {
    title: "Indiana Child Support Calculator – Estimate Payments | TheSmar",
    description: "Use a Calculadora de Pensão Infantil Indiana para estimar pagamentos com base em renda e custódia. Ferramenta online precisa e gratuita para planejamento legal em Indiana.",
    keywords: "calculadora pensão indiana, estimar pagamentos, pensão infantil tool, renda cálculo, custódia estimativa, online pensão, gratuita ferramenta indiana"
  },
  pl: {
    title: "Indiana Child Support Calculator – Estimate Payments | TheSmar",
    description: "Użyj kalkulatora wsparcia dziecka Indiana, aby oszacować płatności na podstawie dochodu i opieki. Dokładne, darmowe narzędzie online do planowania prawnego w Indiana.",
    keywords: "kalkulator wsparcia dziecka indiana, obliczyć płatności, wsparcie tool, dochód obliczenia, opieka estymacja, online wsparcie, darmowy tool indiana"
  },
  de: {
    title: "Indiana Child Support Calculator – Estimate Payments | TheSmar",
    description: "Berechne mit dem Indiana Kindesunterhalt Rechner Zahlungen basierend auf Einkommen und Sorgerecht. Präzises, kostenloses Online-Tool für rechtliche Planung in Indiana.",
    keywords: "indiana kindesunterhalt rechner, zahlungen schätzen, unterhalt tool, einkommen berechnung, sorgerecht estimator, online unterhalt, kostenloser indiana tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && indianachildsupportcalculatorMeta[langHeader as keyof typeof indianachildsupportcalculatorMeta]
      ? langHeader
      : "en";

  const meta = indianachildsupportcalculatorMeta[language as keyof typeof indianachildsupportcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('indiana-child-support-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('indiana-child-support-calculator', 'en'),
        'pt-BR': getCanonicalUrl('indiana-child-support-calculator', 'br'),
        'pl': getCanonicalUrl('indiana-child-support-calculator', 'pl'),
        'de': getCanonicalUrl('indiana-child-support-calculator', 'de'),
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

export default async function IndianaChildSupportCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
