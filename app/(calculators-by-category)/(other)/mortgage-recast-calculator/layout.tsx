import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

import Script from "next/script";
const CALCULATOR_ID = "mortgage-recast-calculator";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/mortgage-recast-calculator#breadcrumbs",
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
          name: "Financial Calculators",
          item: "https://www.thesmartcalculator.com/financial",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Mortgage Recast Calculator",
          item: "https://www.thesmartcalculator.com/mortgage-recast-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.thesmartcalculator.com/mortgage-recast-calculator#webapp",
      name: "Mortgage Recast Calculator",
      description:
        "Use our free mortgage recast calculator to estimate your new monthly payment after a lump-sum payment. See savings, interest reduction, and amortization.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/mortgage-recast-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      dateModified: "2026-05-20",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "Hudson Hale",
        jobTitle: "Financial Calculator Expert",
        url: "https://www.thesmartcalculator.com/creator/hudson-hale",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.6",
        ratingCount: "890",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/mortgage-recast-calculator#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is mortgage recasting worth it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — it's worth it if your interest rate is good and you want lower monthly payments without refinancing costs. You save on monthly cash flow and total interest over time.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate recast mortgage payment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Enter your loan balance, interest rate, remaining term, and lump-sum payment in the calculator. It will instantly show your new monthly payment and total savings.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between mortgage recast and refinance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recasting keeps your same loan and just lowers payments. Refinancing replaces your loan completely with new terms, rate, and closing costs.",
          },
        },
        {
          "@type": "Question",
          name: "What are the mortgage recast requirements?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most lenders require a conventional loan, $5,000–$10,000 lump sum, current payments, and a small processing fee. Requirements vary by servicer.",
          },
        },
        {
          "@type": "Question",
          name: "Does mortgage recasting affect my credit score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — recasting does not involve a credit check or new application. Your credit score remains unchanged.",
          },
        },
        {
          "@type": "Question",
          name: "Should I recast my mortgage or make extra principal payments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Recasting lowers your monthly payment, while extra payments reduce loan term and interest. Many homeowners use both strategies together.",
          },
        },
        {
          "@type": "Question",
          name: "Can I recast an FHA, VA, or USDA mortgage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — government-backed loans are not eligible. Only conventional loans allow mortgage recasting through most lenders.",
          },
        },
      ],
    },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function MortgageRecastCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="mortgage-recast-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
