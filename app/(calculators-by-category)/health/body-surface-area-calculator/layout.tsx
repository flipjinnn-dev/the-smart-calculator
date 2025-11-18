import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for body-surface-area-calculator
const bodysurfaceareacalculatorMeta = {
  en: {
    title: "Body Surface Area Calculator – BSA Methods Online | TheSmartCa",
    description: "Use the Body Surface Area Calculator to compute BSA using various methods. Accurate, free online tool for medical dosing and health assessments.",
    keywords: "body surface area calculator, bsa tool, methods calculation, online bsa, medical dosing, health assessment, free surface calculator, area estimate"
  },
  br: {
    title: "Body Surface Area Calculator – BSA Methods Online | TheSmartCa",
    description: "Use a Calculadora Área Superficial Corporal para calcular BSA com métodos variados. Ferramenta precisa e gratuita para dosagem médica e avaliações de saúde.",
    keywords: "calculadora área superficial, bsa tool, métodos cálculo, online bsa, dosagem médica, avaliação saúde, gratuita calculadora"
  },
  pl: {
    title: "Kalkulator Powierzchni Ciała – Oblicz Online | TheSmartCalculator",
    description: "Użyj kalkulatora powierzchni ciała online, aby obliczyć powierzchnię skóry i wskaźniki zdrowotne. Proste, szybkie i darmowe narzędzie dla każdego do medycznych celów.",
    keywords: "kalkulator powierzchni ciała, obliczyć powierzchnia, skóry wskaźniki, narzędzie zdrowotne, online powierzchnia, szybkie darmowe, medyczne tool"
  },
  de: {
    title: "Körperoberfläche Rechner – BSA Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Körperoberfläche Rechner (BSA) deine Körperfläche schnell & genau. Ideal für Medizin, Gesundheit und Dosierungsberechnung mit Methoden!",
    keywords: "körperoberfläche rechner, bsa berechnen, medizin gesundheit, dosierung tool, online körper, schnell genau, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && bodysurfaceareacalculatorMeta[langHeader as keyof typeof bodysurfaceareacalculatorMeta]
      ? langHeader
      : "en";

  const meta = bodysurfaceareacalculatorMeta[language as keyof typeof bodysurfaceareacalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('body-surface-area-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('body-surface-area-calculator', 'en'),
        'pt-BR': getCanonicalUrl('body-surface-area-calculator', 'br'),
        'pl': getCanonicalUrl('body-surface-area-calculator', 'pl'),
        'de': getCanonicalUrl('body-surface-area-calculator', 'de'),
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

export default async function BodySurfaceAreaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
