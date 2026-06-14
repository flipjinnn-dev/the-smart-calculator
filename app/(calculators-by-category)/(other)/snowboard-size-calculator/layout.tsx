import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

import Script from "next/script";
const CALCULATOR_ID = "snowboard-size-calculator";

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
          name: "Snowboard Size Calculator",
          item: "https://www.thesmartcalculator.com/snowboard-size-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Snowboard Size Calculator",
      description:
        "Find your perfect snowboard size in seconds by height, weight, boot size, and riding style.",
      applicationCategory: "SportsApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/snowboard-size-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.4",
        ratingCount: "892",
        bestRating: "5",
        worstRating: "1",
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
          name: "What size snowboard do I need for my height?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Multiply your height in cm by 0.85 for a baseline length, then adjust for weight, skill, and riding style. Use the snowboard size calculator above for your exact recommended range.",
          },
        },
        {
          "@type": "Question",
          name: "How do I know if I need a wide snowboard?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your boot size is US men's 11 or larger, choose a wide board to prevent toe and heel drag when turning.",
          },
        },
        {
          "@type": "Question",
          name: "Should beginners choose a shorter snowboard?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Shorter boards are easier to turn and build confidence faster. Beginners should pick the shorter end of the recommended size range.",
          },
        },
      ],
    },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function SnowboardSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="snowboard-size-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
