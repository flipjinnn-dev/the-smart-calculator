import type { Metadata } from "next";
import Script from "next/script";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "roofing-calculator";

export const dynamic = "force-static";

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.thesmartcalculator.com/construction/roofing-calculator#breadcrumb",
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
          item: "https://www.thesmartcalculator.com/construction/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Roofing Calculator",
          item: "https://www.thesmartcalculator.com/construction/roofing-calculator",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.thesmartcalculator.com/construction/roofing-calculator#webpage",
      url: "https://www.thesmartcalculator.com/construction/roofing-calculator",
      name: "Roofing Calculator | Roof Area & Cost Estimate",
      description:
        "Estimate roof area, pitch, materials, and cost instantly with our roofing calculator. Get accurate roof squares, waste %, and replacement estimate.",
      inLanguage: "en",
      isPartOf: {
        "@id": "https://www.thesmartcalculator.com/#website",
      },
      breadcrumb: {
        "@id": "https://www.thesmartcalculator.com/construction/roofing-calculator#breadcrumb",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.thesmartcalculator.com/#website",
      url: "https://www.thesmartcalculator.com/",
      name: "The Smart Calculator",
      publisher: {
        "@id": "https://www.thesmartcalculator.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.thesmartcalculator.com/#organization",
      name: "The Smart Calculator",
      url: "https://www.thesmartcalculator.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.thesmartcalculator.com/logo.png",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.thesmartcalculator.com/construction/roofing-calculator#app",
      name: "Roofing Calculator",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      url: "https://www.thesmartcalculator.com/construction/roofing-calculator",
      image: "https://www.thesmartcalculator.com/logo.png",
      description:
        "Use this roofing calculator to estimate roof area in square feet, roofing squares, materials, and replacement cost in seconds.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: {
        "@id": "https://www.thesmartcalculator.com/#organization",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1276",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.thesmartcalculator.com/construction/roofing-calculator#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I calculate roof area from the ground?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Measure your home's ground-level length and width in feet. Multiply them to get the base area, then divide by the cosine of your roof pitch angle. Example: A 50 × 30 ft home with a 25° pitch gives approximately 1,655 sq ft of actual roof area.",
          },
        },
        {
          "@type": "Question",
          name: "What is a roofing square and how many shingles does it need?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "One roofing square equals 100 square feet of roof surface. Standard asphalt shingles usually require 3 bundles per roofing square. Add 10%–15% extra material for waste and cuts.",
          },
        },
        {
          "@type": "Question",
          name: "What is the average roof replacement cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Asphalt shingle roof replacement typically costs between $4,500 and $12,000 for an average-size home. Metal roofing generally costs more depending on material type, labor, and roof complexity.",
          },
        },
        {
          "@type": "Question",
          name: "What roof pitch is most common on homes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The most common residential roof pitch ranges between 4/12 and 6/12. This slope provides efficient drainage, manageable installation cost, and compatibility with most roofing materials.",
          },
        },
        {
          "@type": "Question",
          name: "How much roofing waste percentage should I add?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Add around 10% waste for simple roofs and 15%–20% for complex roofs with valleys, hips, skylights, or dormers.",
          },
        },
        {
          "@type": "Question",
          name: "Can this calculator estimate metal roofing cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The calculator can estimate metal roofing cost based on roof size, slope, material coverage, and installation rates.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between a gable roof and a shed roof?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A gable roof has two sloping sides meeting at a ridge, while a shed roof has a single sloping surface in one direction.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function RoofingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id={`${CALCULATOR_ID}-json-ld`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {children}
    </>
  );
}
