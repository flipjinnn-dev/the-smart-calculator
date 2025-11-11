import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for height-calculator
const heightcalculatorMeta = {
  en: {
    title: "Height Calculator – Estimate Growth Online | TheSmartCalculator",
    description: "Use the Height Calculator to estimate current or future height based on factors like age and genetics. Accurate, free online tool for health, planning, or curiosity.",
    keywords: "height calculator, estimate height, growth tool, online height, height prediction, genetics calculator, free height tool, health height"
  },
  br: {
    title: "Calculadora de Altura – Estime Crescimento | TheSmartCalculator",
    description: "Use a Calculadora de Altura para estimar sua altura futura ou atual. Ferramenta online rápida e precisa para curiosidade, saúde ou planejamento com base em fatores.",
    keywords: "calculadora de altura, estimar altura, crescimento tool, ferramenta altura online, saúde altura, planejamento calculadora, altura genética"
  },
  pl: {
    title: "Kalkulator Wzrostu – Przewiduj Wzrost Online | TheSmartCalculator",
    description: "Użyj kalkulatora wzrostu online, aby oszacować swój przyszły wzrost lub wzrost dziecka. Proste, szybkie i darmowe narzędzie zdrowotne do planowania.",
    keywords: "kalkulator wzrostu, oszacować wzrost, przyszły wzrost, narzędzie wzrost online, dziecko wzrost, darmowy kalkulator wzrost, zdrowotne narzędzie"
  },
  de: {
    title: "Grobenrechner – Große Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Grobenrechner Maßeinheiten schnell & genau. Kostenlos & einfach – ideal für Schule, Studium, Alltag und Handwerk! Einschätzung für Wachstum.",
    keywords: "grobenrechner, große berechnen, maßeinheiten tool, online rechner, schule studium, alltag handwerk, kostenloser groben tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && heightcalculatorMeta[langHeader as keyof typeof heightcalculatorMeta]
      ? langHeader
      : "en";

  const meta = heightcalculatorMeta[language as keyof typeof heightcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('height-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('height-calculator', 'en'),
        'pt-BR': getCanonicalUrl('height-calculator', 'br'),
        'pl': getCanonicalUrl('height-calculator', 'pl'),
        'de': getCanonicalUrl('height-calculator', 'de'),
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

export default async function HeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
