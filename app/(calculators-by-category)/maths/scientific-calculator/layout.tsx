import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for scientific-calculator
const scientificcalculatorMeta = {
  en: {
    title: "Scientific Calculator – Advanced Calculations Online | TheSmar",
    description: "Use the Scientific Calculator to perform advanced mathematical calculations and graphing. Accurate, free online tool for science, engineering, and education.",
    keywords: "scientific calculator, advanced calculations, graphing tool, online scientific, science tool, engineering calculator, education math, free scientific tool"
  },
  br: {
    title: "Scientific Calculator – Advanced Calculations Online | TheSmar",
    description: "Use a Calculadora Científica para realizar cálculos matemáticos avançados e gráficos. Ferramenta precisa e gratuita para ciência, engenharia e educação.",
    keywords: "calculadora científica, cálculos avançados, ferramenta gráficos, online científica, ferramenta ciência, calculadora engenharia, matemática educação, gratuita ferramenta científica"
  },
  pl: {
    title: "Kalkulator Naukowy – Obliczenia Matematyczne Online",
    description: "Użyj kalkulatora naukowego online, aby wykonywać zaawansowane obliczenia matematyczne, funkcje i wzory. Proste, szybkie i darmowe narzędzie.",
    keywords: "kalkulator naukowy, zaawansowane obliczenia, narzędzie wykresy, online naukowy, narzędzie nauka, kalkulator inżynieria, matematyka edukacja, darmowe narzędzie naukowe"
  },
  de: {
    title: "Wissenschaftlicher Taschenrechner – Online & kostenlos nutzen",
    description: "Nutze den wissenschaftlichen Taschenrechner online für komplexe Berechnungen. Schnell, genau & kostenlos – ideal für Schule, Studium & Technik!",
    keywords: "wissenschaftlicher taschenrechner, fortgeschrittene berechnungen, graphing tool, online wissenschaftlich, wissenschaft tool, ingenieur rechner, bildung math, kostenloser wissenschaftlich tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && scientificcalculatorMeta[langHeader as keyof typeof scientificcalculatorMeta]
      ? langHeader
      : "en";

  const meta = scientificcalculatorMeta[language as keyof typeof scientificcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('scientific-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }scientific-calculator`,
      languages: {
        'en': getCanonicalUrl('scientific-calculator', 'en'),
        'pt-BR': getCanonicalUrl('scientific-calculator', 'br'),
        'pl': getCanonicalUrl('scientific-calculator', 'pl'),
        'de': getCanonicalUrl('scientific-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }scientific-calculator`,
    },
  };
}

export default async function ScientificCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
