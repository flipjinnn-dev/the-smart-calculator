import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for army-body-fat-calculator
const armybodyfatcalculatorMeta = {
  en: {
    title: "Army Body Fat Calculator – Percentage Online | TheSmartCalculator",
    description: "Use the Army Body Fat Calculator to estimate percentage using U.S. Army method. Accurate, free online tool for fitness tracking and military standards compliance.",
    keywords: "army body fat calculator, fat percentage, army method, fitness tool, online fat calculator, military standards, free army tool, body analysis"
  },
  br: {
    title: "Army Body Fat Calculator – Percentage Online | TheSmartCalcula",
    description: "Use a Calculadora Gordura Corporal Exército para estimar porcentagem pelo método do Exército dos EUA. Ferramenta precisa e gratuita para fitness e padrões militares.",
    keywords: "calculadora gordura exército, porcentagem gordura, método exército, ferramenta fitness, online gordura, padrões militares, gratuita tool"
  },
  pl: {
    title: "Army Body Fat Calculator – Percentage Online | TheSmartCalcula",
    description: "Użyj kalkulatora tkanki tłuszczowej armia online, aby oszacować procent metodą armii USA. Dokładne, darmowe narzędzie do śledzenia fitness i standardów.",
    keywords: "kalkulator tkanki armia, procent tłuszczu, metoda armia, narzędzie fitness, online tłuszcz, standardy wojskowe, darmowy tool"
  },
  de: {
    title: "Army Körperfett Rechner – Prozent Berechnen | TheSmartCalculator",
    description: "Berechne dein Körperfett mit dem Army Körperfett Rechner. Schnelle & genaue Analyse für Männer und Frauen – einfach, effektiv und kostenlos online!",
    keywords: "army körperfett rechner, prozent berechnen, analyse männer frauen, einfach tool, online fett, effektiv kostenlos, genaue rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && armybodyfatcalculatorMeta[langHeader as keyof typeof armybodyfatcalculatorMeta]
      ? langHeader
      : "en";

  const meta = armybodyfatcalculatorMeta[language as keyof typeof armybodyfatcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('army-body-fat-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('army-body-fat-calculator', 'en'),
        'pt-BR': getCanonicalUrl('army-body-fat-calculator', 'br'),
        'pl': getCanonicalUrl('army-body-fat-calculator', 'pl'),
        'de': getCanonicalUrl('army-body-fat-calculator', 'de'),
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

export default async function ArmyBodyFatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
