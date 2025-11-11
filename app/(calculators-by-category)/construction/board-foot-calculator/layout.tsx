import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for board-foot-calculator
const boardfootcalculatorMeta = {
  en: {
    title: "Board Foot Calculator – Lumber Materials Online | TheSmartCalculator",
    description: "Use the Board Foot Calculator to compute board feet for lumber and materials. Accurate, free online tool for construction, woodworking, and cost estimation.",
    keywords: "board foot calculator, lumber tool, materials calculation, online board, construction estimator, woodworking calculator, free foot tool, cost materials"
  },
  br: {
    title: "Calculadora Metros Cúbicos – Calcule Volume de Materiais",
    description: "Use a Calculadora de Metros Cúbicos para medir volumes de construção e materiais. Ferramenta rápida e precisa para obras e projetos online.",
    keywords: "calculadora metros cúbicos, volume construção, materiais medir, ferramenta obras online, projetos calculadora, precisa rápida, estimativas volume"
  },
  pl: {
    title: "Kalkulator Stóp Deski – Drewno Online | TheSmartCalculator",
    description: "Użyj kalkulatora stóp deski online, aby obliczyć stopy deski dla drewna i materiałów. Dokładne, darmowe narzędzie do budowy, stolarki i szacunku kosztów.",
    keywords: "kalkulator stóp deski, drewno tool, materiały obliczenia, online stopy, budowa estymacja, stolarka kalkulator, darmowy tool"
  },
  de: {
    title: "Brettfuß Rechner – Holz Materialien Online | TheSmartCalculator",
    description: "Berechne mit dem Brettfuß Rechner Brettfüße für Holz und Materialien. Präzises, kostenloses Tool für Bau, Holzarbeit und Kosten-Schätzung.",
    keywords: "brettfuß rechner, holz tool, materialien berechnung, online brett, bau schätzung, holzarbeit calculator, kostenloser tool"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && boardfootcalculatorMeta[langHeader as keyof typeof boardfootcalculatorMeta]
      ? langHeader
      : "en";

  const meta = boardfootcalculatorMeta[language as keyof typeof boardfootcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('board-foot-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('board-foot-calculator', 'en'),
        'pt-BR': getCanonicalUrl('board-foot-calculator', 'br'),
        'pl': getCanonicalUrl('board-foot-calculator', 'pl'),
        'de': getCanonicalUrl('board-foot-calculator', 'de'),
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

export default async function BoardFootCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
