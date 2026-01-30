import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for finance-calculator
const financecalculatorMeta = {
  en: {
    title: "Finance Calculator Savings & Investment Planning",
    description: "Estimate savings, loans, investments, and future finances with our Finance Calculator to make smarter money decisions easily.",
    keywords: "finance calculator, comprehensive, tool, various, financial, calculations"
  },
  br: {
    title: "Conversor de Moedas Online – Cotações em Tempo Real",
    description: "Use o Conversor de Moedas para ver taxas de câmbio atualizadas. Converta valores com rapidez e precisão em várias moedas do mundo.",
    keywords: "conversor moedas, cotações tempo real, taxas câmbio, converta valores, online moedas, precisão rapidez, mundo finanças"
  },
  pl: {
    title: "Kalkulator Finansowy – Oblicz Wyniki Finansowe",
    description: "Skorzystaj z kalkulatora finansowego online, aby łatwo analizować dane finansowe. Proste narzędzie do szybkich i dokładnych obliczeń finansowych.",
    keywords: "kalkulator finansowy, kompleksowe, narzędzie, różne, finansowe, obliczenia"
  },
  de: {
    title: "Finanzrechner – Online Tools für Ihre Finanzen",
    description: "Mit dem Finanzrechner analysieren Sie Kredite, Anlagen und Haushaltsbudget. Der Finanzrechner bietet schnelle Online-Berechnungen für Ihre Finanzen.",
    keywords: "finanzrechner, umfassend, tool, verschiedene, finanzielle, berechnungen"
  }
,
  es: {
    title: "Calculadora Financiera – Gestiona Préstamos, Inversiones e Intereses",
    description: "Utiliza nuestra calculadora financiera para calcular préstamos, planificar inversiones y controlar los intereses de manera rápida y eficiente.",
    keywords: "calculadora, financiera, gestiona, préstamos, inversiones, intereses, utiliza, nuestra, calcular, planificar, controlar, manera, rápida, eficiente"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && financecalculatorMeta[langHeader as keyof typeof financecalculatorMeta]
      ? langHeader
      : "en";

  const meta = financecalculatorMeta[language as keyof typeof financecalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('finance-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('finance-calculator', 'en'),
        'en': getCanonicalUrl('finance-calculator', 'en'),
        'es': getCanonicalUrl('finance-calculator', 'es'),
        'pt-BR': getCanonicalUrl('finance-calculator', 'br'),
        'pl': getCanonicalUrl('finance-calculator', 'pl'),
        'de': getCanonicalUrl('finance-calculator', 'de'),
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

export default async function FinanceCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
