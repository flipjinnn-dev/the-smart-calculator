import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for gfr-calculator
const gfrcalculatorMeta = {
  en: {
    title: "GFR Calculator – Filtration Rate Online | TheSmartCalculator",
    description: "Use the GFR Calculator to estimate Glomerular Filtration Rate from creatinine. Accurate, free online tool for kidney health monitoring and medical assessment.",
    keywords: "gfr calculator, glomerular filtration rate, creatinine tool, online gfr, kidney health, medical assessment, free gfr tool, rate estimate"
  },
  br: {
    title: "Calculadora GFR – Filtração Renal Online | TheSmartCalculator",
    description: "Use a Calculadora GFR para estimar taxa de filtração glomerular de creatinina. Ferramenta precisa para monitoramento de saúde renal e avaliação médica.",
    keywords: "calculadora gfr, taxa filtração glomerular, ferramenta creatinina, online gfr, saúde renal, avaliação médica, gratuita tool"
  },
  pl: {
    title: "Kalkulator GFR – Filtracja Online | TheSmartCalculator",
    description: "Użyj kalkulatora GFR online, aby obliczyć wskaźnik filtracji kłębuszkowej i ocenić funkcję nerek. Proste, dokładne i darmowe narzędzie zdrowotne.",
    keywords: "kalkulator gfr, wskaźnik filtracji kłębuszkowej, narzędzie kreatynina, online gfr, zdrowie nerek, ocena medyczna, darmowy tool"
  },
  de: {
    title: "GFR Rechner – Nierenfunktion Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem GFR Rechner deine Nierenfunktion schnell und genau. Ideal zur Kontrolle der Gesundheit – einfach & kostenlos online für medizinische Bewertung.",
    keywords: "gfr rechner, glomeruläre filtrationsrate, kreatinin tool, online gfr, nieren gesundheit, medizinische bewertung, kostenloser gfr tool, rate schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gfrcalculatorMeta[langHeader as keyof typeof gfrcalculatorMeta]
      ? langHeader
      : "en";

  const meta = gfrcalculatorMeta[language as keyof typeof gfrcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gfr-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }gfr-calculator`,
      languages: {
        'en': getCanonicalUrl('gfr-calculator', 'en'),
        'pt-BR': getCanonicalUrl('gfr-calculator', 'br'),
        'pl': getCanonicalUrl('gfr-calculator', 'pl'),
        'de': getCanonicalUrl('gfr-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }gfr-calculator`,
    },
  };
}

export default async function GfrCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
