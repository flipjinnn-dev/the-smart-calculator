import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import MixedFractionCalculatorClient from "./mixed-fraction-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/maths/calculator/mixed-fraction-calculator`;

  return {
    title: "Mixed Fraction Calculator | Mixed Numbers Solver Tool",
    description:
      "Mixed fraction calculator for mixed numbers: all four operations, improper fraction and decimal conversion, GCF simplification, and step-by-step working — free online.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        en: canonicalUrl,
      },
    },
    openGraph: {
      title: "Mixed Fraction Calculator | Mixed Numbers Solver Tool",
      description:
        "Mixed fraction calculator for mixed numbers: all four operations, improper fraction and decimal conversion, GCF simplification, and step-by-step working — free online.",
      url: canonicalUrl,
      type: "website",
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: "Mixed Fraction Calculator" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mixed Fraction Calculator | Mixed Numbers Solver Tool",
      description:
        "Mixed fraction calculator for mixed numbers: all four operations, improper fraction and decimal conversion, GCF simplification, and step-by-step working — free online.",
    },
  };
}

export default async function MixedFractionCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (await import(`@/app/content/calculator-ui/mixed-fraction-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/mixed-fraction-calculator/en.json`)).default;
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/mixed-fraction-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/mixed-fraction-calculator/en.json`)).default;
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thesmartcalculator.com/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Mixed Fraction Calculator",
            item: "https://www.thesmartcalculator.com/maths/calculator/mixed-fraction-calculator",
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Mixed Fraction Calculator | The Smart Calculator",
        description:
          "Mixed fraction calculator for mixed numbers: all four operations, improper fraction and decimal conversion, GCF simplification, and step-by-step working — free online.",
        applicationCategory: "CalculatorApplication",
        operatingSystem: "Web",
        softwareVersion: "9.2.1",
        url: "https://www.thesmartcalculator.com/",
        mainEntityOfPage: "https://www.thesmartcalculator.com/maths/calculator/mixed-fraction-calculator",
        image: "https://www.thesmartcalculator.com/logo.png",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", ratingCount: "2500", bestRating: "5", worstRating: "1" },
        author: { "@type": "Organization", name: "Felix Yacoub" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does a mixed fraction calculator with steps work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It converts each mixed number to an improper fraction, applies your selected operation, finds the LCD for addition and subtraction, then simplifies using GCF — showing every stage separately.",
            },
          },
          {
            "@type": "Question",
            name: "Can I calculate three mixed fractions at once?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most tools handle two values at a time. Solve the first two, then use that result as your first input for the third fraction.",
            },
          },
          {
            "@type": "Question",
            name: "How does the improper fraction to mixed number calculator work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Divide numerator by denominator. The quotient becomes the whole number, the remainder becomes the new numerator. For example 17 ÷ 5 = 3 remainder 2, so 17/5 = 3 2/5.",
            },
          },
          {
            "@type": "Question",
            name: "How do I simplify mixed fractions to lowest terms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Find the GCF of numerator and denominator, then divide both by it. For 6/8, GCF is 2 — result is 3/4. Enable the simplify toggle to handle this automatically.",
            },
          },
          {
            "@type": "Question",
            name: "Does the mixed fraction to decimal calculator work for all operations?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Select \"Decimal\" as output format. For example 2 3/4 becomes 2 + 0.75 = 2.75. Works for addition, subtraction, multiplication, and division results.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between a mixed number and an improper fraction?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A mixed number combines whole and fraction parts like 3 2/5. An improper fraction has numerator larger than denominator like 17/5. Both represent the same value. This mixed numbers calculator converts between both formats instantly.",
            },
          },
          {
            "@type": "Question",
            name: "Does this tool work with negative mixed numbers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Enter a negative sign before the whole number. The tool handles negative values across all four operations and shows correct signs throughout every step.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="mixed-fraction-calculator-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <MixedFractionCalculatorClient content={content} guideContent={guideContent} />
    </>
  );
}
