import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for ovulation-calculator
const ovulationcalculatorMeta = {
  en: {
    title: "Ovulation Calculator – Fertile Window Online | TheSmartCalculator",
    description: "Use the Ovulation Calculator to estimate date and fertile window. Accurate, free online tool for family planning and cycle tracking.",
    keywords: "ovulation calculator, fertile window, date estimate, online ovulation, family planning, cycle tracking, free ovulation tool, window calculation"
  },
  br: {
    title: "Calculadora de Ovulação – Descubra Seus Dias Férteis",
    description: "Use a Calculadora de Ovulação para identificar seus dias férteis e planejar a gravidez. Tenha previsões precisas e acompanhamento fácil online.",
    keywords: "calculadora ovulação, janela fértil, estimativa data, online ovulação, planejamento familiar, rastreamento ciclo, gratuita ferramenta ovulação, cálculo janela"
  },
  pl: {
    title: "Kalkulator Owulacji – Oblicz Dni Płodne Online",
    description: "Użyj kalkulatora owulacji online, aby obliczyć dni płodne i niepłodne. Proste, dokładne i darmowe narzędzie dla kobiet planujących ciążę.",
    keywords: "kalkulator owulacji, okno płodne, estymacja data, online owulacja, planowanie rodziny, tracking cyklu, darmowe narzędzie owulacja, obliczenia okna"
  },
  de: {
    title: "Eisprungrechner – Fruchtbare Tage Berechnen | TheSmartCalculator",
    description: "Berechne mit dem Eisprungrechner deine fruchtbaren Tage. Ideal zur Familienplanung – schnell, zuverlässig und kostenlos online!",
    keywords: "eisprungrechner, fruchtbare tage, datum schätzung, online eisprung, familienplanung, zyklus tracking, kostenloser ovulations tool, fenster berechnung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ovulationcalculatorMeta[langHeader as keyof typeof ovulationcalculatorMeta]
      ? langHeader
      : "en";

  const meta = ovulationcalculatorMeta[language as keyof typeof ovulationcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ovulation-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }ovulation-calculator`,
      languages: {
        'en': getCanonicalUrl('ovulation-calculator', 'en'),
        'pt-BR': getCanonicalUrl('ovulation-calculator', 'br'),
        'pl': getCanonicalUrl('ovulation-calculator', 'pl'),
        'de': getCanonicalUrl('ovulation-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }ovulation-calculator`,
    },
  };
}

export default async function OvulationCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
