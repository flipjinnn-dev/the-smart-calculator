import { headers } from "next/headers";
import type { Metadata } from "next";
import { getStaticPageCanonicalUrl } from "@/lib/url-utils";

type Language = "en" | "br" | "pl" | "de" | "es";

const editorialPolicyMeta: Record<Language, { title: string; description: string; keywords: string }> = {
  en: {
    title: "Editorial Policy & Mission Statement - TheSmartCalculator",
    description: "Learn about TheSmartCalculator's editorial policy, mission statement, content accuracy standards, and commitment to providing reliable, user-friendly calculation tools.",
    keywords: "editorial policy, mission statement, content accuracy, calculator standards, transparency, user trust, reliable calculators, content creation process"
  },
  br: {
    title: "Política Editorial e Declaração de Missão - TheSmartCalculator",
    description: "Conheça a política editorial do TheSmartCalculator, declaração de missão, padrões de precisão de conteúdo e compromisso em fornecer ferramentas de cálculo confiáveis e fáceis de usar.",
    keywords: "política editorial, declaração de missão, precisão de conteúdo, padrões de calculadora, transparência, confiança do usuário, calculadoras confiáveis"
  },
  pl: {
    title: "Polityka Redakcyjna i Deklaracja Misji - TheSmartCalculator",
    description: "Dowiedz się o polityce redakcyjnej TheSmartCalculator, deklaracji misji, standardach dokładności treści i zaangażowaniu w dostarczanie niezawodnych, przyjaznych dla użytkownika narzędzi obliczeniowych.",
    keywords: "polityka redakcyjna, deklaracja misji, dokładność treści, standardy kalkulatorów, przejrzystość, zaufanie użytkowników, niezawodne kalkulatory"
  },
  de: {
    title: "Redaktionelle Richtlinien und Leitbild - TheSmartCalculator",
    description: "Erfahren Sie mehr über die redaktionellen Richtlinien von TheSmartCalculator, das Leitbild, die Standards für Inhaltsgenauigkeit und das Engagement für zuverlässige, benutzerfreundliche Berechnungstools.",
    keywords: "redaktionelle Richtlinien, Leitbild, Inhaltsgenauigkeit, Rechner-Standards, Transparenz, Nutzervertrauen, zuverlässige Rechner"
  },
  es: {
    title: "Política Editorial y Declaración de Misión - TheSmartCalculator",
    description: "Conozca la política editorial de TheSmartCalculator, declaración de misión, estándares de precisión de contenido y compromiso de proporcionar herramientas de cálculo confiables y fáciles de usar.",
    keywords: "política editorial, declaración de misión, precisión de contenido, estándares de calculadora, transparencia, confianza del usuario, calculadoras confiables"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  // Always use English-only metadata (no multilingual support)
  const meta = editorialPolicyMeta.en;
  const canonicalUrl = 'https://www.thesmartcalculator.com/editorial-policy-mission-statement';

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    }
  };
}

export default function EditorialPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
