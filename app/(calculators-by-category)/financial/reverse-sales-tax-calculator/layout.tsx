import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";

// Multilingual SEO metadata for reverse-sales-tax-calculator
const reversesalestaxcalculatorMeta = {
  en: {
    title: "Reverse Sales Tax Calculator",
    description: "Use our Reverse Sales Tax Calculator to find the original pre-tax price and exact tax amount from any tax-inclusive total. Easy, fast, and free.",
    keywords: "reverse sales tax calculator, pre-tax price calculator, tax inclusive calculator, extract sales tax, back out sales tax, gross to net calculator"
  },
  br: {
    title: "Calculadora de Imposto sobre Vendas Reverso",
    description: "Use nossa Calculadora de Imposto sobre Vendas Reverso para encontrar o preço original antes dos impostos e o valor exato do imposto a partir de um total com imposto incluído.",
    keywords: "calculadora de imposto sobre vendas reverso, calculadora de preço antes de impostos, calculadora de imposto incluso, extrair imposto sobre vendas"
  },
  pl: {
    title: "Kalkulator Odwrotnego Podatku od Sprzedaży",
    description: "Użyj naszego kalkulatora odwrotnego podatku od sprzedaży, aby znaleźć oryginalną cenę przed opodatkowaniem i dokładną kwotę podatku z całkowitej kwoty zawierającej podatek.",
    keywords: "kalkulator odwrotnego podatku od sprzedaży, kalkulator ceny przed opodatkowaniem, kalkulator zawierający podatek"
  },
  de: {
    title: "Rückwärts-Umsatzsteuerrechner",
    description: "Verwenden Sie unseren Rückwärts-Umsatzsteuerrechner, um den ursprünglichen Preis vor Steuern und den genauen Steuerbetrag aus einem Gesamtbetrag mit Steuern zu ermitteln.",
    keywords: "rückwärts-umsatzsteuerrechner, preis vor steuern rechner, steuer inklusiv rechner, umsatzsteuer extrahieren"
  },
  es: {
    title: "Calculadora Inversa de Impuestos sobre las Ventas",
    description: "Utilice nuestra Calculadora inversa de impuestos sobre las ventas para encontrar el precio original antes de impuestos y el monto exacto del impuesto a partir de un total que incluye impuestos.",
    keywords: "calculadora inversa de impuestos sobre las ventas, calculadora de precios antes de impuestos, calculadora con impuestos incluidos, extraer impuestos sobre las ventas"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const language =
    langHeader && reversesalestaxcalculatorMeta[langHeader as keyof typeof reversesalestaxcalculatorMeta]
      ? langHeader
      : "en";

  const meta = reversesalestaxcalculatorMeta[language as keyof typeof reversesalestaxcalculatorMeta];

  // Generate correct canonical URL using localized slug
  const canonicalUrl = getCanonicalUrl('reverse-sales-tax-calculator', language);

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('reverse-sales-tax-calculator', 'en'),
        'en': getCanonicalUrl('reverse-sales-tax-calculator', 'en'),
        'es': getCanonicalUrl('reverse-sales-tax-calculator', 'es'),
        'pt-BR': getCanonicalUrl('reverse-sales-tax-calculator', 'br'),
        'pl': getCanonicalUrl('reverse-sales-tax-calculator', 'pl'),
        'de': getCanonicalUrl('reverse-sales-tax-calculator', 'de'),
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

export default async function ReverseSalesTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
