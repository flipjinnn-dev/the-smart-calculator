import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for cubic-yard-calculator
const cubicyardcalculatorMeta = {
  en: {
    title: "Cubic Yard Calculator – Volume Materials Online | TheSmartCalculator",
    description: "Use the Cubic Yard Calculator to compute cubic yards for concrete, soil, and materials. Accurate, free online tool for construction and landscaping estimates.",
    keywords: "cubic yard calculator, volume tool, materials calculation, online cubic, construction estimator, landscaping calculator, free yard tool, concrete soil"
  },
  br: {
    title: "Calculadora Metros Cúbicos – Calcule Volume de Materiais",
    description: "Use a Calculadora de Metros Cúbicos para medir volumes de construção e materiais. Ferramenta rápida e precisa para obras e projetos online.",
    keywords: "calculadora metros cúbicos, volume construção, materiais medir, ferramenta obras online, projetos calculadora, precisa rápida, estimativas volume"
  },
  pl: {
    title: "Cubic Yard Calculator – Volume Materials Online | TheSmartCalc",
    description: "Użyj kalkulatora metrów sześciennych online, aby obliczyć objętości betonu, gleby i materiałów. Dokładne, darmowe narzędzie do budowy i krajobrazu.",
    keywords: "kalkulator metrów sześciennych, objętość tool, materiały obliczenia, online metry, budowa estymacja, krajobraz kalkulator, darmowy tool"
  },
  de: {
    title: "Kubikyard Rechner – Volumen Berechnen Online | TheSmartCalculator",
    description: "Berechne mit dem Kubikyard Rechner Kubikyards für Beton, Boden und Materialien. Präzises, kostenloses Tool für Bau und Landschaftsschätzungen.",
    keywords: "kubikyard rechner, volumen berechnen, beton boden, materialien tool, online kubik, bau landschaft, kostenloser rechner"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && cubicyardcalculatorMeta[langHeader as keyof typeof cubicyardcalculatorMeta]
      ? langHeader
      : "en";

  const meta = cubicyardcalculatorMeta[language as keyof typeof cubicyardcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('cubic-yard-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl('cubic-yard-calculator', 'en'),
        'pt-BR': getCanonicalUrl('cubic-yard-calculator', 'br'),
        'pl': getCanonicalUrl('cubic-yard-calculator', 'pl'),
        'de': getCanonicalUrl('cubic-yard-calculator', 'de'),
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

export default async function CubicYardCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
