import type { Metadata } from "next";
import Script from "next/script";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import AcresPerHourCalculatorClient from "./acres-per-hour-calculator-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("acres-per-hour-calculator");
}

export default function AcresPerHourCalculator() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.thesmartcalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Other Calculators",
            "item": "https://www.thesmartcalculator.com/other"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Acres Per Hour Calculator",
            "item": "https://www.thesmartcalculator.com/acres-per-hour-calculator"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.thesmartcalculator.com/#organization",
        "name": "Smart Calculator",
        "url": "https://www.thesmartcalculator.com",
        "logo": "https://www.thesmartcalculator.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1 614-596-2581",
          "contactType": "technical support",
          "contactOption": "TollFree",
          "areaServed": ["US","GB","DE","ES","PL","PT"],
          "availableLanguage": ["en","es","German","Polish","Portuguese"]
        },
        "sameAs": [
          "https://x.com/SmartCalculat0r",
          "https://www.instagram.com/thesmartcalculators/",
          "https://www.youtube.com/@TheSmartCalculators",
          "https://www.linkedin.com/company/smart-calculator/",
          "https://www.pinterest.com/thesmartcalculators/_saved/",
          "https://www.thesmartcalculator.com/"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Acres Per Hour Calculator",
        "description": "Calculate acres per hour for mowing, planting, spraying, and tillage using width, speed, and efficiency",
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "ratingCount": "850"
        }
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Acres Per Hour",
        "description": "Learn how to calculate acres per hour for farm equipment using working width, speed, and field efficiency",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Measure Working Width",
            "text": "Measure the actual working width of your implement in feet. Use the effective width, not the rated width."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Determine Ground Speed",
            "text": "Determine your average operating speed in miles per hour. Use realistic average, not maximum speed."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Estimate Field Efficiency",
            "text": "Estimate realistic field efficiency percentage based on field conditions, turns, and obstacles."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Apply Formula",
            "text": "Use the formula: Acres per Hour = (Width × Speed × Efficiency) ÷ 8.25"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is an acres per hour calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When realistic field efficiency is used, estimates are usually within 5–15% of real-world results."
            }
          },
          {
            "@type": "Question",
            "name": "What is the formula for acres per hour?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Acres per Hour = (Width × Speed × Efficiency) ÷ 8.25, where width is in feet, speed is in mph, and efficiency is a decimal (e.g., 0.75 for 75%)."
            }
          },
          {
            "@type": "Question",
            "name": "Why is 8.25 used in the acres per hour formula?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "8.25 is a conversion constant. It comes from dividing 43,560 (square feet per acre) by 5,280 (feet per mile per hour), which equals approximately 8.25."
            }
          },
          {
            "@type": "Question",
            "name": "Can one calculator work for all equipment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The same acres per hour formula applies to mowing, planting, spraying, and tillage—only the inputs change."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <AcresPerHourCalculatorClient />
      <Script
        id="acres-per-hour-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
