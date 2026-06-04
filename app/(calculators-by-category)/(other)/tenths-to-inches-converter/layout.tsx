import Script from "next/script";

import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "tenths-to-inches-converter";

export const dynamic = "force-static";

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
          name: "Tenths to Inches Calculator",
          item: "https://www.thesmartcalculator.com/tenths-to-inches-converter",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Tenths to Inches Calculator",
      description:
        "Free tenths to inches calculator to convert decimal feet into inches instantly. Accurate tool for surveying, construction, and engineering use.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/tenths-to-inches-converter",
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
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do surveyors convert tenths to inches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Surveyors multiply decimal foot values by 12 to get inches. For example, a GPS reading of 4.3 feet becomes 51.6 inches.",
          },
        },
        {
          "@type": "Question",
          name: "What is a tenth of a foot in inches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "One tenth of a foot (0.1 ft) equals exactly 1.2 inches.",
          },
        },
        {
          "@type": "Question",
          name: "How do you convert decimal feet to inches?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use the formula: Inches = Decimal Feet × 12. Enter your value in the calculator for instant results.",
          },
        },
      ],
    },
  ],
};

export default function TenthsToInchesConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="tenths-to-inches-converter-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
