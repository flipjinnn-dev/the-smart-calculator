import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

import Script from "next/script";
const CALCULATOR_ID = "invisalign-cost-calculator";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/invisalign-cost-calculator#breadcrumbs",
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
          name: "Other Calculators",
          item: "https://www.thesmartcalculator.com/other",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Invisalign Cost Calculator",
          item: "https://www.thesmartcalculator.com/invisalign-cost-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.thesmartcalculator.com/invisalign-cost-calculator#webapp",
      name: "Invisalign Cost Calculator",
      description:
        "Estimate Invisalign total treatment cost, monthly payments, and out-of-pocket expenses by treatment type, insurance benefit, down payment, and financing term.",
      applicationCategory: "HealthApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/invisalign-cost-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      dateModified: "2026-05-20",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "Neo Nicholas",
        jobTitle: "Health Calculator Expert",
        url: "https://www.thesmartcalculator.com/creator/neo-nicholas",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "1500",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/invisalign-cost-calculator#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does Invisalign cost on average?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The average Invisalign cost in the United States ranges from $3,000 to $8,000 depending on treatment complexity, provider location, and case duration.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use insurance to reduce my Invisalign cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Most PPO dental insurance plans cover Invisalign the same way they cover traditional braces. Benefits typically range from $1,000 to $3,000 depending on your plan.",
          },
        },
        {
          "@type": "Question",
          name: "What is a good Invisalign monthly payment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most patients finance Invisalign over 12 to 36 months. At $4,500 out-of-pocket over 24 months, you pay roughly $187 per month with no interest through an in-office plan.",
          },
        },
        {
          "@type": "Question",
          name: "Does Invisalign offer a payment plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Most orthodontists offer in-house Invisalign payment plans with little or no interest. Third-party financing through CareCredit and Lending Club also offer extended terms up to 60 months.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Invisalign cost without insurance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Without insurance, Invisalign treatment typically costs between $3,000 and $8,000 depending on treatment complexity, duration, and your orthodontist's fees.",
          },
        },
      ],
    },
  ],
};


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function InvisalignCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="invisalign-cost-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
