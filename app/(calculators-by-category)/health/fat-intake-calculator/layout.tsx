import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for fat-intake-calculator
const fatintakecalculatorMeta = {
  en: {
    title: "Fat Intake Calculator – Daily Goals Online | TheSmartCalculator",
    description: "Use the Fat Intake Calculator to estimate daily fat needs based on activity and goals. Accurate, free online tool for diet balancing and nutrition.",
    keywords: "fat intake calculator, daily goals, activity tool, needs calculation, online fat, diet balancing, free intake tool, nutrition planning"
  },
  br: {
    title: "Calculadora de Gordura – Ingestão Diária Online | TheSmartCalculator",
    description: "Use a Calculadora de Gordura para estimar necessidades diárias de gordura com base em atividade. Ferramenta precisa para equilíbrio dietético e nutrição.",
    keywords: "calculadora gordura, diária necessidades, atividade base, equilíbrio dietético, online gordura, nutrição planning, precisa tool"
  },
  pl: {
    title: "Kalkulator Spożycia Tłuszczu – Cele Online | TheSmartCalculator",
    description: "Użyj kalkulatora spożycia tłuszczu online, aby oszacować dzienne potrzeby tłuszczu na podstawie aktywności. Dokładne, darmowe narzędzie do diety i odżywiania.",
    keywords: "kalkulator spożycia tłuszczu, dzienne cele, aktywność tool, potrzeby obliczenia, online tłuszcz, dieta równowaga, darmowy tool"
  },
  de: {
    title: "Fettzufuhr Rechner – Bedarf Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Fettzufuhr Rechner deinen täglichen Fettbedarf basierend auf Aktivität und Zielen. Präzises Tool für Diät und Ernährungsplanung kostenlos.",
    keywords: "fettzufuhr rechner, bedarf berechnen, täglichen fett, aktivität ziele, online fett, diät planung, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && fatintakecalculatorMeta[langHeader as keyof typeof fatintakecalculatorMeta]
      ? langHeader
      : "en";

  const meta = fatintakecalculatorMeta[language as keyof typeof fatintakecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('fat-intake-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }fat-intake-calculator`,
      languages: {
        'en': getCanonicalUrl('fat-intake-calculator', 'en'),
        'pt-BR': getCanonicalUrl('fat-intake-calculator', 'br'),
        'pl': getCanonicalUrl('fat-intake-calculator', 'pl'),
        'de': getCanonicalUrl('fat-intake-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }fat-intake-calculator`,
    },
  };
}

export default async function FatIntakeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
