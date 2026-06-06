import Script from "next/script";
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "future-value-calculator";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.thesmartcalculator.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Future Value Calculator",
          item: "https://www.thesmartcalculator.com/future-value-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Future Value Calculator – Investment Growth Calculator",
      description:
        "Use our free future value calculator to estimate investment growth with compound interest, monthly contributions, withdrawals, and inflation adjustment. Get instant results.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/future-value-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Organization",
        name: "The Smart Calculator",
        url: "https://www.thesmartcalculator.com/",
      },
    },
  ],
};

export default function FutureValueCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="future-value-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
