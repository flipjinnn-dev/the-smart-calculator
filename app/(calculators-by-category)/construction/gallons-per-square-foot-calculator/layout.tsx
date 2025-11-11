import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for gallons-per-square-foot-calculator
const gallonspersquarefootcalculatorMeta = {
  en: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Use the Gallons per Square Foot Calculator to estimate gallons needed per square foot for painting or flooring. Accurate, free online tool for construction and home improvement.",
    keywords: "gallons per square foot calculator, painting gallons, flooring estimator, online gallons tool, material needs, home improvement, construction tool, square foot estimate"
  },
  br: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Use a Calculadora Litros por Metro Quadrado para estimar litros para pintura ou piso. Ferramenta precisa para construção e melhorias em casa.",
    keywords: "calculadora litros metro, pintura litros, estimador piso, ferramenta online litros, necessidades material, melhoria casa, ferramenta construção, estimativa metro quadrado"
  },
  pl: {
    title: "Gallons per Square Foot Calculator – Painting Online | TheSmar",
    description: "Użyj kalkulatora litrów na metr kwadratowy online, aby oszacować litry do malowania lub podłogi. Dokładne narzędzie do budowy i ulepszeń domowych.",
    keywords: "kalkulator litrów metr kwadratowy, litry malowanie, estymator podłogi, narzędzie online litry, potrzeby material, ulepszenie domu, narzędzie budowa, estymacja metr kwadratowy"
  },
  de: {
    title: "Gallonen pro Quadratfuß Rechner – Malen Online | TheSmartCalculator",
    description: "Nutzen Sie den gallons per square foot  – painting online | thesmartcalculator für schnelle, genaue Ergebnisse. Einfache Eingaben, klare Ausgaben und nützlicher.",
    keywords: "gallonen quadratfuß rechner, malen gallonen, boden estimator, online gallonen tool, materialbedarf, heimverbesserung, bau tool, quadratfuß schätzung"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && gallonspersquarefootcalculatorMeta[langHeader as keyof typeof gallonspersquarefootcalculatorMeta]
      ? langHeader
      : "en";

  const meta = gallonspersquarefootcalculatorMeta[language as keyof typeof gallonspersquarefootcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('gallons-per-square-foot-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('gallons-per-square-foot-calculator', 'en'),
        'pt-BR': getCanonicalUrl('gallons-per-square-foot-calculator', 'br'),
        'pl': getCanonicalUrl('gallons-per-square-foot-calculator', 'pl'),
        'de': getCanonicalUrl('gallons-per-square-foot-calculator', 'de'),
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

export default async function GallonsPerSquareFootCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
