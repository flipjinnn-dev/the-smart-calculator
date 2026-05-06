import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import PercentageDecreaseCalculatorClient from "./percentage-decrease-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/maths/percentage-decrease`;

  return {
    title: "Percentage Decrease Calculator | Find % Decrease",
    description:
      "Free online percentage decrease calculator: enter original and new values, get instant results with full step-by-step working. No login required.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        en: canonicalUrl,
      },
    },
    openGraph: {
      title: "Percentage Decrease Calculator | Find % Decrease",
      description:
        "Free online percentage decrease calculator: enter original and new values, get instant results with full step-by-step working. No login required.",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Percentage Decrease Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Percentage Decrease Calculator | Find % Decrease",
      description:
        "Free online percentage decrease calculator: enter original and new values, get instant results with full step-by-step working. No login required.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PercentageDecreaseCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content = null;
  let guideContent = null;

  try {
    content = (
      await import(
        `@/app/content/calculator-ui/percentage-decrease-calculator/${language}.json`
      )
    ).default;
  } catch {
    content = (
      await import(`@/app/content/calculator-ui/percentage-decrease-calculator/en.json`)
    ).default;
  }

  try {
    guideContent = (
      await import(
        `@/app/content/calculator-guide/percentage-decrease-calculator/${language}.json`
      )
    ).default;
  } catch {
    guideContent = (
      await import(`@/app/content/calculator-guide/percentage-decrease-calculator/en.json`)
    ).default;
  }

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.thesmartcalculator.com/#breadcrumb",
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
            name: "Percentage Decrease Calculator",
            item: "https://www.thesmartcalculator.com/maths/percentage-decrease",
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": "https://www.thesmartcalculator.com/#webapp",
        name: "The Smart Calculator",
        description:
          "Free percentage decrease calculator: enter original and new values, get instant results with full step-by-step working. No login required.",
        applicationCategory: "EducationalApplication",
        operatingSystem: "All",
        softwareVersion: "9.2.1",
        url: "https://www.thesmartcalculator.com/",
        image: "https://www.thesmartcalculator.com/logo.png",
        downloadUrl: "https://www.thesmartcalculator.com/maths/percentage-decrease",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          ratingCount: "2000",
          bestRating: "5",
          worstRating: "1",
        },
        author: {
          "@type": "Organization",
          name: "Felix Yacoub",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.thesmartcalculator.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the formula for percentage decrease?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The formula is: ((Original Value - New Value) / Original Value) x 100. Subtract the new value from the original, divide by the original, and multiply by 100.",
            },
          },
          {
            "@type": "Question",
            name: "How do you calculate percentage decrease between two numbers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Subtract the new number from the original number. Divide that result by the original number. Multiply by 100. That is your percentage decrease.",
            },
          },
          {
            "@type": "Question",
            name: "How do I find percentage decrease without a calculator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the formula manually. Example: Original = 200, New = 160. Difference = 40. 40 / 200 = 0.20. 0.20 x 100 = 20% decrease.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between percent decrease and percent change?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Percent change covers both increases and decreases. Percent decrease specifically applies when the new value is lower. Both use the same formula structure but percent change can be positive or negative.",
            },
          },
          {
            "@type": "Question",
            name: "What if my new value is higher than the original value?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You have a percentage increase, not a decrease. Use a percentage increase calculator in that case.",
            },
          },
          {
            "@type": "Question",
            name: "Is percentage decrease the same as a discount percentage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. When a price drops from one number to another, the discount percentage and the percentage decrease are calculated using the exact same formula.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate percentage decrease in Excel?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use this Excel formula: =((A1-B1)/A1)*100 where A1 is the original value and B1 is the new value.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="percentage-decrease-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      <PercentageDecreaseCalculatorClient
        content={content}
        guideContent={guideContent}
      />
    </>
  );
}
