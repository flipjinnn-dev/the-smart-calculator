import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for ballistic-coefficient-calculator
const ballisticcoefficientcalculatorMeta = {
  en: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Use the Ballistic Coefficient Calculator to compute coefficient for projectiles. Accurate, free online tool for ballistics analysis and shooting planning.",
    keywords: "ballistic coefficient calculator, projectile tool, coefficient calculation, online ballistic, shooting planner, free coefficient tool, analysis ballistics"
  },
  br: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Use a Calculadora Coeficiente Balístico para calcular coeficiente de projéteis. Ferramenta precisa e gratuita para análise balística e planejamento de tiro.",
    keywords: "calculadora coeficiente balístico, projétil tool, cálculo coeficiente, online balístico, planejamento tiro, gratuita tool, análise balística"
  },
  pl: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Użyj kalkulatora współczynnika balistycznego online, aby obliczyć współczynnik dla pocisków. Dokładne, darmowe narzędzie do analizy balistycznej i planowania.",
    keywords: "kalkulator współczynnika balistycznego, pocisk tool, obliczyć współczynnik, online balistyczny, planowanie strzelanie, darmowy tool, analiza balistyczna"
  },
  de: {
    title: "Ballistic Coefficient Calculator – Projectile Online | TheSmar",
    description: "Berechne mit dem Ballistischen Koeffizient Rechner den Koeffizienten für Projektile. Präzises, kostenloses Tool für Ballistik-Analyse und Schussplanung.",
    keywords: "ballistischer koeffizient rechner, projektil tool, koeffizient berechnen, online ballistik, schuss planung, kostenloser tool, analyse ballistik"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && ballisticcoefficientcalculatorMeta[langHeader as keyof typeof ballisticcoefficientcalculatorMeta]
      ? langHeader
      : "en";

  const meta = ballisticcoefficientcalculatorMeta[language as keyof typeof ballisticcoefficientcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('ballistic-coefficient-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }ballistic-coefficient-calculator`,
      languages: {
        'en': getCanonicalUrl('ballistic-coefficient-calculator', 'en'),
        'pt-BR': getCanonicalUrl('ballistic-coefficient-calculator', 'br'),
        'pl': getCanonicalUrl('ballistic-coefficient-calculator', 'pl'),
        'de': getCanonicalUrl('ballistic-coefficient-calculator', 'de'),
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.thesmartcalculator.com/${
        language !== "en" ? `${language}/` : ""
      }ballistic-coefficient-calculator`,
    },
  };
}

export default async function BallisticCoefficientCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
