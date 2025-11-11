import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for due-date-calculator
const duedatecalculatorMeta = {
  en: {
    title: "Due Date Calculator – Pregnancy Timeline Online | TheSmartCalculator",
    description: "Use the Due Date Calculator to estimate date based on last period or conception. Accurate, free online tool for pregnancy tracking and planning.",
    keywords: "due date calculator, pregnancy timeline, last period, conception tool, online due, tracking calculator, free date tool, planning pregnancy"
  },
  br: {
    title: "Calculadora Data Vencimento – Descubra Sua DPP",
    description: "Use a Calculadora de Data de Vencimento para estimar a data provável do parto. Acompanhe sua gestação com praticidade e precisão online.",
    keywords: "calculadora data vencimento, dpp estimar, parto provável, acompanhe gestação, online data, precisão praticidade, período base"
  },
  pl: {
    title: "Kalkulator Terminu Porodu – Oblicz Datę Porodu Online",
    description: "Użyj kalkulatora terminu porodu online, aby dokładnie obliczyć przewidywaną datę porodu. Proste, szybkie i darmowe narzędzie dla przyszłych mam do śledzenia.",
    keywords: "kalkulator terminu porodu, data porodu, obliczyć przewidywana, narzędzie mamy, online termin, szybkie darmowe, śledzenie ciąża"
  },
  de: {
    title: "Fristenrechner – Online Berechnung gesetzlicher Fristen",
    description: "Nutzen Sie den Fristenrechner zur exakten Berechnung von Kündigungs-, Einspruchs- oder Zahlungsfristen. Der Fristenrechner unterstützt Sie zuverlässig bei Zeitgrenzen.",
    keywords: "fristenrechner, fristen berechnen, kündigungs einspruchs, zahlungsfristen tool, online fristen, zuverlässig unterstützt, zeitgrenzen rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && duedatecalculatorMeta[langHeader as keyof typeof duedatecalculatorMeta]
      ? langHeader
      : "en";

  const meta = duedatecalculatorMeta[language as keyof typeof duedatecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('due-date-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }due-date-calculator`,
      languages: {
        'en': getCanonicalUrl('due-date-calculator', 'en'),
        'pt-BR': getCanonicalUrl('due-date-calculator', 'br'),
        'pl': getCanonicalUrl('due-date-calculator', 'pl'),
        'de': getCanonicalUrl('due-date-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }due-date-calculator`,
    },
  };
}

export default async function DueDateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
