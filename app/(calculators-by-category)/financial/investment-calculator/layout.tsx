import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for investment-calculator
const investmentcalculatorMeta = {
  en: {
    title: "Investment Calculator Return on Investment",
    description: "Estimate investment returns and future value using our Investment Calculator for wealth growth.",
    keywords: "investment calculator, returns growth, projections tool, online investment, planning calculator, financial forecasting, free investment tool, growth estimate"
  },
  br: {
    title: "Calculadora de Investimentos – Simule Ganhos e Rendimentos",
    description: "Use a Calculadora de Investimentos para simular rendimentos, juros e lucros. Planeje seus ganhos com resultados rápidos e precisos online.",
    keywords: "calculadora investimentos, crescimento retornos, ferramenta projeções, online investimento, calculadora planejamento, previsão financeira, gratuita ferramenta investimento, estimativa crescimento"
  },
  pl: {
    title: "Kalkulator Inwestycyjny – Oblicz Zysk z Inwestycji",
    description: "Użyj kalkulatora inwestycyjnego online, aby obliczyć zyski, odsetki i zwrot z inwestycji. Proste, dokładne i darmowe narzędzie finansowe.",
    keywords: "kalkulator inwestycyjny, wzrost zwrotów, narzędzie projekcji, online inwestycja, kalkulator planowania, prognozowanie finansowe, darmowe narzędzie inwestycyjne, estymacja wzrostu"
  },
  de: {
    title: "Investitionsrechner – Rendite & Wachstum online berechnen",
    description: "Mit dem Investitionsrechner ermitteln Sie Rendite, Kapitalentwicklung und Risiken. Nutzen Sie den Investitionsrechner für fundierte Anlageentscheidungen.",
    keywords: "investitionsrechner, rendite wachstum, projekte tool, online investition, planungsrechner, finanzvorhersage, kostenloser investitions tool, wachstum schätzung"
  }
,
  es: {
    title: "Calculadora de Inversiones – Calcula Rendimiento y Capital",
    description: "Utiliza nuestra calculadora de inversiones para planificar tu inversión, estimar el rendimiento y gestionar tu capital de manera eficiente y sencilla.",
    keywords: "calculadora, inversiones, calcula, rendimiento, capital, utiliza, nuestra, planificar, inversión, estimar, gestionar, manera, eficiente, sencilla"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && investmentcalculatorMeta[langHeader as keyof typeof investmentcalculatorMeta]
      ? langHeader
      : "en";

  const meta = investmentcalculatorMeta[language as keyof typeof investmentcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('investment-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('investment-calculator', 'en'),
        'en': getCanonicalUrl('investment-calculator', 'en'),
        'es': getCanonicalUrl('investment-calculator', 'es'),
        'pt-BR': getCanonicalUrl('investment-calculator', 'br'),
        'pl': getCanonicalUrl('investment-calculator', 'pl'),
        'de': getCanonicalUrl('investment-calculator', 'de'),
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

export default async function InvestmentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
