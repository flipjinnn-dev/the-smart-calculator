import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for marriage-calculator
const marriagecalculatorMeta = {
  en: {
    title: "Marriage Calculator",
    description: "Plan combined finances, expenses, and budgeting as a couple using our Marriage Calculator for financial harmony.",
    keywords: "marriage calculator, wedding cost, budget planner, wedding expenses, marriage planning, financial preparation, online wedding tool, free marriage calculator"
  },
  br: {
    title: "Calculadora de casamento",
    description: "Use a calculadora de casamento para calcular custos e despesas do seu evento. Planeje seu casamento e simule agora mesmo!",
    keywords: "calculadora casamento, custo casamento, planejamento orçamento, despesas casamento, planejamento casamento, preparação financeira, ferramenta online casamento"
  },
  pl: {
    title: "Kalkulator Ślubny – Planowanie Kosztów Wesela | TheSmartCalculator",
    description: "Użyj kalkulatora ślubnego, aby oszacować koszty ślubu, planowanie budżetu i wydatki. Darmowe narzędzie online do planowania ślubu i przygotowania finansowego.",
    keywords: "kalkulator ślubny, koszt ślubu, planowanie budżetu, wydatki ślubne, planowanie ślubu, przygotowanie finansowe, narzędzie online ślub"
  },
  de: {
    title: "Hochzeitsrechner – Kosten & Budget Planer | TheSmartCalculator",
    description: "Nutzen Sie den Hochzeitsrechner zur Schätzung der Hochzeitskosten, Budgetplanung und Ausgaben. Kostenloses Online-Tool für Hochzeitsplanung und finanzielle Vorbereitung.",
    keywords: "hochzeitsrechner, hochzeitskosten, budgetplanung, hochzeitsausgaben, hochzeitsplanung, finanzielle vorbereitung, online hochzeit tool"
  }
  ,
  es: {
    title: "Calculadora de Matrimonio: Descubre tu Compatibilidad Hoy",
    description: "Usa nuestra calculadora de matrimonio y conoce tu compatibilidad con tu pareja al instante. ¡Descubre si están hechos el uno para el otra ahora!",
    keywords: "calculadora, matrimonio, descubre, compatibilidad, nuestra, conoce, pareja, instante, están, hechos, otra, ahora"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && marriagecalculatorMeta[langHeader as keyof typeof marriagecalculatorMeta]
      ? langHeader
      : "en";

  const meta = marriagecalculatorMeta[language as keyof typeof marriagecalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('marriage-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('marriage-calculator', 'en'),
        'en': getCanonicalUrl('marriage-calculator', 'en'),
        'es': getCanonicalUrl('marriage-calculator', 'es'),
        'pt-BR': getCanonicalUrl('marriage-calculator', 'br'),
        'pl': getCanonicalUrl('marriage-calculator', 'pl'),
        'de': getCanonicalUrl('marriage-calculator', 'de'),
      }
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
    },
  };
}

export default async function MarriageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
