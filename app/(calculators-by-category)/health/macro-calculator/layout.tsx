import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for macro-calculator
const macrocalculatorMeta = {
  en: {
    title: "Macro Calculator – Macronutrients Online | TheSmartCalculator",
    description: "Use the Macro Calculator to calculate macronutrient requirements for your goals. Accurate, free online tool for diet and nutrition balance.",
    keywords: "macro calculator, macronutrients, requirements tool, online macro, diet balance, nutrition goals, free macro tool, goals calculation"
  },
  br: {
    title: "Calculadora Macro – Calcule Seus Macronutrientes Diários",
    description: "Use a Calculadora Macro para saber quantos carboidratos, proteínas e gorduras consumir por dia. Monte sua dieta com equilíbrio e precisão online.",
    keywords: "calculadora macro, macronutrientes, ferramenta requisitos, online macro, equilíbrio dieta, metas nutrição, gratuita ferramenta macro, cálculo metas"
  },
  pl: {
    title: "Kalkulator Makro – Oblicz Makroskładniki Online",
    description: "Użyj kalkulatora makro online, aby obliczyć białka, tłuszcze i węglowodany w diecie. Proste, dokładne i darmowe narzędzie zdrowotne dla każdego.",
    keywords: "kalkulator makro, makroskładniki, narzędzie wymagania, online makro, równowaga diety, cele odżywianie, darmowe narzędzie makro, obliczenia celów"
  },
  de: {
    title: "Makro Rechner – Berechne deine täglichen Makronährstoffe",
    description: "Berechne mit dem Makro Rechner dein ideales Verhältnis von Eiweiß, Kohlenhydraten & Fett. Schnell, präzise & kostenlos – perfekt für Fitness & Diät!",
    keywords: "makro rechner, makronährstoffe, bedarf tool, online makro, diät balance, ernährungsziele, kostenloser makro tool, ziele berechnung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && macrocalculatorMeta[langHeader as keyof typeof macrocalculatorMeta]
      ? langHeader
      : "en";

  const meta = macrocalculatorMeta[language as keyof typeof macrocalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('macro-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }macro-calculator`,
      languages: {
        'en': getCanonicalUrl('macro-calculator', 'en'),
        'pt-BR': getCanonicalUrl('macro-calculator', 'br'),
        'pl': getCanonicalUrl('macro-calculator', 'pl'),
        'de': getCanonicalUrl('macro-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }macro-calculator`,
    },
  };
}

export default async function MacroCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
