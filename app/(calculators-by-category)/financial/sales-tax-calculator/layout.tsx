import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for sales-tax-calculator
const salestaxcalculatorMeta = {
  en: {
    title: "Sales Tax Calculator – Purchases Online | TheSmartCalculator",
    description: "Use the Sales Tax Calculator to calculate sales tax for purchases based on local rates. Accurate, free online tool for shopping and budgeting.",
    keywords: "sales tax calculator, tax purchases, local rates, online sales, shopping tool, budgeting calculator, free tax tool, tax estimate"
  },
  br: {
    title: "Calculadora de Imposto de Vendas – Oblicz Podatek VAT Online Szybko",
    description: "Użyj kalkulatora VAT online, aby łatwo obliczyć kwotę netto, brutto i podatek VAT. Proste, dokładne i darmowe narzędzie finansowe dla firm.",
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
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
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
