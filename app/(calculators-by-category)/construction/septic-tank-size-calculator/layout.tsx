import Script from "next/script";

import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "septic-tank-size-calculator";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.thesmartcalculator.com/construction/septic-tank-size-calculator#breadcrumbs",
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
          name: "Construction Calculators",
          item: "https://www.thesmartcalculator.com/construction",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Septic Tank Size Calculator",
          item: "https://www.thesmartcalculator.com/construction/septic-tank-size-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://www.thesmartcalculator.com/construction/septic-tank-size-calculator#webapp",
      name: "Septic Tank Size Calculator",
      description:
        "Estimate septic tank size, capacity, gallons, and wastewater requirements based on bedrooms, occupants, soil type, garbage disposal, and washing machine usage.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/construction/septic-tank-size-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      dateModified: "2026-05-08",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: "Hudson Hale",
        jobTitle: "Construction Calculator Expert",
        url: "https://www.thesmartcalculator.com/creator/hudson-hale",
        image:
          "https://cdn.sanity.io/images/f0wclefz/production/b34d2fb577af1f8bf9dafb230a8b42239f90a149-800x800.jpg",
        sameAs: "https://www.thesmartcalculator.com/creator/hudson-hale",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "312",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://www.thesmartcalculator.com/construction/septic-tank-size-calculator#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What size septic tank do I need for a 3-bedroom house?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 3-bedroom house requires a minimum 1,000-gallon septic tank. Most professionals recommend 1,000–1,500 gallons to handle peak wastewater flow comfortably.",
          },
        },
        {
          "@type": "Question",
          name: "What size septic tank do I need for a 4-bedroom house?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 4-bedroom house needs at least 1,250 gallons. A 1,500-gallon tank is the safer long-term choice for a 4-bedroom home.",
          },
        },
        {
          "@type": "Question",
          name: "How is septic tank size calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Septic tank size is calculated by multiplying daily wastewater flow (in gallons per day) by a 2-day retention time, then adding a safety buffer. For example, 400 gpd x 2 = 800 gallons minimum capacity.",
          },
        },
        {
          "@type": "Question",
          name: "How many gallons septic tank do I need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most residential homes need a minimum of 1,000 gallons. The exact amount depends on your number of bedrooms, occupants, daily water usage, and soil type. Use the calculator above for a precise answer.",
          },
        },
        {
          "@type": "Question",
          name: "How big should a septic tank be for a family of 5?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A family of 5 typically needs a 1,250–1,500-gallon septic tank. Higher occupancy increases daily wastewater flow, which raises the required tank capacity.",
          },
        },
        {
          "@type": "Question",
          name: "Does a garbage disposal affect septic tank size?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A garbage disposal increases solid waste accumulation inside the tank. Most professionals recommend sizing up by 250–500 gallons when a garbage disposal is present in the home.",
          },
        },
        {
          "@type": "Question",
          name: "What is the minimum septic tank size allowed by code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most residential building codes set 750–1,000 gallons as the absolute minimum septic tank size. Always verify the exact requirement with your local health department before installation.",
          },
        },
      ],
    },
  ],
};

export default function SepticTankSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="septic-tank-size-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
