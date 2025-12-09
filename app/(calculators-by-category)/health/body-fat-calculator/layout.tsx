import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for body-fat-calculator
const bodyfatcalculatorMeta = {
  en: {
    title: "Body Fat Calculator – Percentage Methods Online | TheSmartCalculator",
    description: "Use the Body Fat Calculator to estimate percentage using various methods. Accurate, free online tool for fitness tracking and health goals.",
    keywords: "body fat calculator, percentage tool, methods calculation, online fat, fitness tracker, health goals, free body calculator, estimate fat"
  },
  br: {
    title: "Calculadora Gordura Corporal – Percentual Ideal",
    description: "Use a Calculadora de Gordura Corporal para medir seu percentual de gordura. Acompanhe sua evolução física e melhore seus resultados com precisão.",
    keywords: "calculadora gordura corporal, percentual gordura, medir evolução, ferramenta física online, resultados precisos, métodos variados, saúde calculadora"
  },
  pl: {
    title: "Kalkulator Tkanki Tłuszczowej – Procent Tłuszczu",
    description: "Użyj body fat  – percentage methods online | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kontekst — za.",
    keywords: "\"\"Użyj kalkulatora tkanki tłuszczowej online, aby obliczyć procent tłuszczu w ciele. Proste, szybkie i dokładne narzędzie zdrowotne dla każdego.\"\", kalkulator tkanki tłuszczowej, procent tłuszczu, obliczyć ciało, narzędzie zdrowotne, online tłuszcz, szybkie dokładne, darmowy tool"
  },
  de: {
    title: "Body Fat Calculator – Percentage Methods Online | TheSmartCalc",
    description: "\"\"Berechne mit dem Körperfett Rechner deinen Körperfettanteil schnell & genau. Ideal für Fitness, Gesundheit und Gewichtsmanagement – kostenlos online!\"\"",
    keywords: "body fat rechner, percentage tool, methods calculation, online fat, fitness tracker, health goals, kostenlos body rechner, estimate fat"
  }
,
  es: {
    title: "Calculadora de Grasa Corporal – Mide tu % Fácil y Rápido",
    description: "Calcula tu porcentaje de grasa corporal al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y mejora tu salud ahora mismo!",
    keywords: "calculadora, grasa, corporal, mide, fácil, rápido, calcula, porcentaje, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, mejora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bodyfatcalculatorMeta[langHeader as keyof typeof bodyfatcalculatorMeta]
      ? langHeader
      : "en";

  const meta = bodyfatcalculatorMeta[language as keyof typeof bodyfatcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('body-fat-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('body-fat-calculator', 'en'),
        'es': getCanonicalUrl('body-fat-calculator', 'es'),
        'pt-BR': getCanonicalUrl('body-fat-calculator', 'br'),
        'pl': getCanonicalUrl('body-fat-calculator', 'pl'),
        'de': getCanonicalUrl('body-fat-calculator', 'de'),
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

export default async function BodyFatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
