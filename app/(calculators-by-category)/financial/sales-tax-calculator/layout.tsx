import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for sales-tax-calculator
const salestaxcalculatorMeta = {
  en: {
    title: "Sales Tax Calculator",
    description: "Calculate sales tax accurately by state or region using our Sales Tax Calculator for smarter purchase planning.",
    keywords: "sales tax calculator, tax purchases, local rates, online sales, shopping tool, budgeting calculator, free tax tool, tax estimate"
  },
  br: {
    title: " Calculadora de Impostos sobre Vendas",
    description: "Use a calculadora de imposto sobre vendas para calcular taxas e valores rapidamente. Planeje seus pagamentos e simule agora mesmo!",
    keywords: "calculadora imposto vendas, imposto compras, taxas locais, online vendas, ferramenta compras, calculadora orçamento, gratuita ferramenta imposto, estimativa imposto"
  },
  pl: {
    title: "Kalkulator VAT – Oblicz Podatek VAT Online Szybko",
    description: "Użyj kalkulatora VAT online, aby łatwo obliczyć kwotę netto, brutto i podatek VAT. Proste, dokładne i darmowe narzędzie finansowe dla firm.",
    keywords: "kalkulator vat, obliczyć vat, kwota netto brutto, narzędzie finansowe, online vat, dokładne darmowe, firmy tool"
  },
  de: {
    title: "Umsatzsteuerrechner – Online Brutto-Netto-Berechnung",
    description: "Mit dem Umsatzsteuerrechner berechnen Sie schnell Brutto-, Netto- und Steuerbetrag. Ideal für Unternehmer & Selbstständige — Umsatzsteuer genau online ermitteln.",
    keywords: "umsatzsteuerrechner, steuer käufe, lokale raten, online umsatz, einkaufs tool, budget rechner, kostenloser steuer tool, steuer schätzung"
  }
,
  es: {
    title: "Calculadora del Impuesto sobre las Ventas – Calcula Rápido",
    description: "Calcula fácilmente el impuesto sobre las ventas con nuestra herramienta rápida y precisa. ¡Ahorra tiempo y evita errores ahora mismo!",
    keywords: "calculadora, impuesto, sobre, ventas, calcula, rápido, fácilmente, nuestra, herramienta, rápida, precisa, ahorra, tiempo, evita, errores"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && salestaxcalculatorMeta[langHeader as keyof typeof salestaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = salestaxcalculatorMeta[language as keyof typeof salestaxcalculatorMeta];
  
  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('sales-tax-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('sales-tax-calculator', 'en'),
        'en': getCanonicalUrl('sales-tax-calculator', 'en'),
        'es': getCanonicalUrl('sales-tax-calculator', 'es'),
        'pt-BR': getCanonicalUrl('sales-tax-calculator', 'br'),
        'pl': getCanonicalUrl('sales-tax-calculator', 'pl'),
        'de': getCanonicalUrl('sales-tax-calculator', 'de'),
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

export default async function SalesTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
