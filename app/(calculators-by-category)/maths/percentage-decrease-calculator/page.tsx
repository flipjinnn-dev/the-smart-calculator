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
      "Use our percentage decrease calculator to find percent decrease between two numbers instantly with formula, steps, and accurate results.",
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
        "Use our percentage decrease calculator to find percent decrease between two numbers instantly with formula, steps, and accurate results.",
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
        "Use our percentage decrease calculator to find percent decrease between two numbers instantly with formula, steps, and accurate results.",
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
          "Free percentage decrease calculator helps you calculate percentage decrease between two numbers instantly with formula, steps, and accurate results.",
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
              text: "((Original Value - New Value) / Original Value) x 100",
            },
          },
          {
            "@type": "Question",
            name: "How do you calculate percentage decrease between two numbers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Subtract new value from original, divide by original, then multiply by 100.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate percentage decrease in Excel?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "=((A1-B1)/A1)*100",
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
