import Script from "next/script";
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "puppy-weight-calculator";

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
          name: "Puppy Weight Calculator",
          item: "https://www.thesmartcalculator.com/puppy-weight-calculator",
        },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Puppy Weight Calculator",
      description:
        "Use this puppy weight calculator to predict how big your puppy will get as an adult. Enter age, weight, and breed size for instant adult weight estimates.",
      applicationCategory: "HealthApplication",
      operatingSystem: "All",
      url: "https://www.thesmartcalculator.com/puppy-weight-calculator",
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

export default function PuppyWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="puppy-weight-calculator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
    </>
  );
}
