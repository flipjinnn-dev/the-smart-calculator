import Script from "next/script";
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "vorici-calculator";

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
          name: "Vorici Calculator (PoE)",
          item: "https://www.thesmartcalculator.com/vorici-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Vorici Calculator (PoE) – Chromatic Orb Cost Calculator",
      description:
        "Calculate Chromatic Orb costs, socket color odds, average attempts, and success rates with our PoE Vorici Calculator for Path of Exile.",
      applicationCategory: "GameApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/vorici-calculator",
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

export default function VoriciCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="vorici-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
