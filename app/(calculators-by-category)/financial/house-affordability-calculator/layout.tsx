import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for house-affordability-calculator
const houseaffordabilitycalculatorMeta = {
  en: {
    title: "House Affordability Calculator How Much Home You Can Buy",
    description: "Find out how much home you can afford based on income, expenses, and rates using our House Affordability Calculator.",
    keywords: "house affordability calculator, affordable house, income expenses, online affordability, home buying, planning tool, free house calculator, determine affordability"
  },
  br: {
    title: "Calculadora de Acessibilidade da Casa",
    description: "Use a Calculadora de Acessibilidade da Casa para saber se sua renda permite comprar uma casa e simular custos de habitação. Experimente agora!",
    keywords: "finanzrechner, affordable haus, einkommen ausgaben, online affordabilität, hauskauf, planung tool, kostenloser haus rechner, affordabilität bestimmen"
  },
  pl: {
    title: "Calculadora Acessibilidade Habitação – Simule Financiamento",
    description: "Use a Calculadora de Acessibilidade à Habitação para avaliar crédito e simular parcelas. Descubra se você pode financiar sua casa própria com precisão.",
    keywords: "calculadora acessibilidade habitação, casa afford, renda despesas, online acessibilidade, compra casa, ferramenta planejamento, gratuita calculadora, determinar acessibilidade"
  },
  de: {
    title: "Kalkulator Dostępności Domu – Dochód Online | TheSmartCalculator",
    description: "Użyj kalkulatora dostępności domu, aby określić affordalny dom na podstawie dochodu i wydatków. Dokładne, darmowe narzędzie do planowania kupna domu.",
    keywords: "house affordability rechner, affordable house, income expenses, online affordability, home buying, planning tool, kostenlos house rechner, determine affordability"
  }
,
  es: {
    title: "Calculadora de asequibilidad de vivienda: Encuentra tu hogar",
    description: "Calcula cuánto puedes pagar por una vivienda según tus ingresos y gastos. Planifica tu compra de casa con proyecciones claras y decisiones seguras.",
    keywords: "calculadora, asequibilidad, vivienda, encuentra, hogar, calcula, cuánto, puedes, pagar, según, ingresos, gastos, planifica, compra, casa"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && houseaffordabilitycalculatorMeta[langHeader as keyof typeof houseaffordabilitycalculatorMeta]
      ? langHeader
      : "en";

  const meta = houseaffordabilitycalculatorMeta[language as keyof typeof houseaffordabilitycalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('house-affordability-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('house-affordability-calculator', 'en'),
        'en': getCanonicalUrl('house-affordability-calculator', 'en'),
        'es': getCanonicalUrl('house-affordability-calculator', 'es'),
        'pt-BR': getCanonicalUrl('house-affordability-calculator', 'br'),
        'pl': getCanonicalUrl('house-affordability-calculator', 'pl'),
        'de': getCanonicalUrl('house-affordability-calculator', 'de'),
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

export default async function HouseAffordabilityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
