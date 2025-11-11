import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for mean-value-theorem-calculator
const meanvaluetheoremcalculatorMeta = {
  en: {
    title: "Mean Value Theorem Calculator – Curve Points Online | TheSmart",
    description: "Use the Mean Value Theorem Calculator to find points on a curve. Accurate, free online tool for calculus and math analysis.",
    keywords: "mean value theorem calculator, curve points, theorem tool, online mean, calculus analysis, math curve, free theorem tool, point finder"
  },
  br: {
    title: "Calculadora Teorema Valor Médio – Curva Online | TheSmartCalculator",
    description: "Use a Calculadora Teorema Valor Médio para encontrar pontos em uma curva. Ferramenta precisa para cálculo e análise matemática.",
    keywords: "calculadora teorema valor médio, pontos curva, ferramenta teorema, online médio, análise cálculo, curva matemática, gratuita ferramenta teorema, buscador ponto"
  },
  pl: {
    title: "Mean Value Theorem Calculator – Curve Points Online | TheSmart",
    description: "Użyj mean value theorem  – curve points online | thesmartcalculator do szybkich i dokładnych wyników. Proste dane wejściowe, czytelne wyniki i pomocny kontekst.",
    keywords: "durchschnittsrechner, kurvenpunkte, theorem tool, online durchschnitt, kalkül analyse, math kurve, kostenloser theorem tool, punkt finder"
  },
  de: {
    title: "Mean Value Theorem Calculator – Curve Points Online | TheSmart",
    description: "Berechne mit dem Durchschnittsrechner den Mittelwert deiner Zahlen. Schnell, genau & kostenlos – ideal für Schule, Statistik & Alltag!",
    keywords: "mean value theorem rechner, curve points, theorem tool, online mean, calculus analysis, math curve, kostenlos theorem tool, point finder"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && meanvaluetheoremcalculatorMeta[langHeader as keyof typeof meanvaluetheoremcalculatorMeta]
      ? langHeader
      : "en";

  const meta = meanvaluetheoremcalculatorMeta[language as keyof typeof meanvaluetheoremcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('mean-value-theorem-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }mean-value-theorem-calculator`,
      languages: {
        'en': getCanonicalUrl('mean-value-theorem-calculator', 'en'),
        'pt-BR': getCanonicalUrl('mean-value-theorem-calculator', 'br'),
        'pl': getCanonicalUrl('mean-value-theorem-calculator', 'pl'),
        'de': getCanonicalUrl('mean-value-theorem-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }mean-value-theorem-calculator`,
    },
  };
}

export default async function MeanValueTheoremCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
