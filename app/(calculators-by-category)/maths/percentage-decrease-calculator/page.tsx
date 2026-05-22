import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import { getCanonicalUrl } from "@/lib/url-utils";
import { calculatorsMeta } from "@/meta/calculators";
import {
  getCalculatorAlternateLanguages,
  withSelfReferencingHreflang,
} from "@/lib/seo-hreflang";
import PercentageDecreaseCalculatorClient from "./percentage-decrease-calculator-client";

const CALCULATOR_ID = "percentage-decrease-calculator";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const pathname =
    headersList.get("x-pathname") || "/maths/percentage-decrease";
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonicalUrl = getCanonicalUrl(CALCULATOR_ID, language);
  const meta =
    calculatorsMeta[CALCULATOR_ID]?.[language] ||
    calculatorsMeta[CALCULATOR_ID]?.en;

  return {
    metadataBase: new URL("https://www.thesmartcalculator.com"),
    title: meta?.title || "Percentage Decrease Calculator | Find % Decrease",
    description:
      meta?.description ||
      "Use our percentage decrease calculator to find percent decrease between two numbers instantly with formula, steps, and accurate results.",
    keywords: meta?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: withSelfReferencingHreflang(
        getCalculatorAlternateLanguages(CALCULATOR_ID),
        canonicalUrl,
        path
      ),
    },
    openGraph: {
      title: meta?.title || "Percentage Decrease Calculator | Find % Decrease",
      description:
        meta?.description ||
        "Use our percentage decrease calculator to find percent decrease between two numbers instantly with formula, steps, and accurate results.",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta?.title || "Percentage Decrease Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title || "Percentage Decrease Calculator | Find % Decrease",
      description:
        meta?.description ||
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
            item: "https://www.thesmartcalculator.com/maths/percentage-decrease-calculator",
          },
        ],
      },
      {
        "@type": "WebApplication",
        "@id": "https://www.thesmartcalculator.com/#webapp",
        name: "Percentage Decrease Calculator | Find % Decrease",
        description:
          "Use our percentage decrease calculator to find percent decrease between two numbers instantly with formula, steps, and accurate results.",
        applicationCategory: "CalculatorApplication",
        operatingSystem: "All",
        softwareVersion: "9.2.1",
        url: "https://www.thesmartcalculator.com/maths/percentage-decrease-calculator",
        mainEntityOfPage:
          "https://www.thesmartcalculator.com/maths/percentage-decrease-calculator",
        image: "https://www.thesmartcalculator.com/logo.png",
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
              text: "((Original Value − New Value) ÷ Original Value) × 100",
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
            name: "How do I find percentage decrease without a calculator?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Difference ÷ Original × 100",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between percent decrease and percent change?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Percent change includes increase and decrease; percent decrease is only when value goes down.",
            },
          },
          {
            "@type": "Question",
            name: "What if my new value is higher than the original value?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Then it is a percentage increase, not a decrease.",
            },
          },
          {
            "@type": "Question",
            name: "Is percentage decrease the same as a discount percentage?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, both use the same formula.",
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
