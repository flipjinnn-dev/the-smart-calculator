import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for break-even-calculator
const breakevencalculatorMeta = {
  en: {
    title: "Break-Even Calculator – Find Units & Sales Value",
    description: "Calculate break-even units, sales value, and profit/loss using fixed costs, variable costs, and selling price. Free business profitability tool.",
    keywords: "break-even calculator, break-even point, break-even units, break-even sales value, fixed costs, variable costs, selling price, contribution margin, profit analysis, business profitability"
  },
  br: {
    title: "Calculadora Ponto de Equilíbrio – Unidades e Vendas",
    description: "Calcule unidades de equilíbrio, valor de vendas e lucro/prejuízo usando custos fixos, variáveis e preço de venda. Ferramenta gratuita de negócios.",
    keywords: "calculadora ponto equilíbrio, ponto de equilíbrio, unidades equilíbrio, valor vendas equilíbrio, custos fixos, custos variáveis, preço venda, margem contribuição, análise lucro"
  },
  pl: {
    title: "Kalkulator Progu Rentowności – Jednostki i Sprzedaż",
    description: "Oblicz jednostki progu rentowności, wartość sprzedaży i zysk/stratę używając kosztów stałych, zmiennych i ceny sprzedaży. Darmowe narzędzie biznesowe.",
    keywords: "kalkulator progu rentowności, próg rentowności, jednostki rentowności, wartość sprzedaży, koszty stałe, koszty zmienne, cena sprzedaży, marża kontrybucyjna, analiza zysku"
  },
  de: {
    title: "Break-Even Rechner – Einheiten & Umsatzwert Finden",
    description: "Berechnen Sie Break-Even-Einheiten, Umsatzwert und Gewinn/Verlust mit Fixkosten, variablen Kosten und Verkaufspreis. Kostenloses Business-Tool.",
    keywords: "break-even rechner, gewinnschwelle, break-even einheiten, umsatzwert, fixkosten, variable kosten, verkaufspreis, deckungsbeitrag, gewinnanalyse, unternehmensrentabilität"
  },
  es: {
    title: "Calculadora Punto Equilibrio – Unidades y Ventas",
    description: "Calcula unidades de equilibrio, valor de ventas y ganancia/pérdida usando costos fijos, variables y precio de venta. Herramienta gratuita de negocios.",
    keywords: "calculadora punto equilibrio, punto de equilibrio, unidades equilibrio, valor ventas equilibrio, costos fijos, costos variables, precio venta, margen contribución, análisis ganancia"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && breakevencalculatorMeta[langHeader as keyof typeof breakevencalculatorMeta]
      ? langHeader
      : "en";

  const meta = breakevencalculatorMeta[language as keyof typeof breakevencalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('break-even-calculator', language);

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('break-even-calculator', 'en'),
        'en': getCanonicalUrl('break-even-calculator', 'en'),
        'es': getCanonicalUrl('break-even-calculator', 'es'),
        'pt-BR': getCanonicalUrl('break-even-calculator', 'br'),
        'pl': getCanonicalUrl('break-even-calculator', 'pl'),
        'de': getCanonicalUrl('break-even-calculator', 'de'),
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

export default async function BreakEvenCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
