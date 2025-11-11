import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for conception-calculator
const conceptioncalculatorMeta = {
  en: {
    title: "Conception Calculator – Date Estimate Online | TheSmartCalculator",
    description: "Use the Conception Calculator to estimate date based on ovulation and intercourse. Accurate, free online tool for pregnancy planning and timeline tracking.",
    keywords: "conception calculator, date estimate, ovulation tool, intercourse calculation, online conception, pregnancy planning, free date tool, timeline tracker"
  },
  br: {
    title: "Conception Calculator – Date Estimate Online | TheSmartCalcula",
    description: "Use a Calculadora de Concepção para estimar a data em que ocorreu a gravidez. Saiba quando seu bebê foi concebido com precisão e facilidade online.",
    keywords: "calculadora concepção, data gravidez, bebê concebido, ferramenta online, precisão facilidade, planejamento gravidez, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Poczęcia – Data Online | TheSmartCalculator",
    description: "Użyj kalkulatora poczęcia online, aby obliczyć przewidywaną datę poczęcia i dni płodne. Proste, dokładne i darmowe narzędzie dla przyszłych rodziców.",
    keywords: "kalkulator poczęcia, data poczęcia, dni płodne, narzędzie rodzice, online poczęcie, dokładne darmowe, proste narzędzie"
  },
  de: {
    title: "Empfängnisrechner – Termin Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Empfängnisrechner den genauen Empfängnistag und Geburtstermin. Einfach, schnell und kostenlos – ideal für Familienplanung und Timeline!",
    keywords: "empfängnisrechner, termin berechnen, empfängnistag tool, geburtstermin, familienplanung, schnell kostenlos, ideal rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && conceptioncalculatorMeta[langHeader as keyof typeof conceptioncalculatorMeta]
      ? langHeader
      : "en";

  const meta = conceptioncalculatorMeta[language as keyof typeof conceptioncalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('conception-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }conception-calculator`,
      languages: {
        'en': getCanonicalUrl('conception-calculator', 'en'),
        'pt-BR': getCanonicalUrl('conception-calculator', 'br'),
        'pl': getCanonicalUrl('conception-calculator', 'pl'),
        'de': getCanonicalUrl('conception-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }conception-calculator`,
    },
  };
}

export default async function ConceptionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
