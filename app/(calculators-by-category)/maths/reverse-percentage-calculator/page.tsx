import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import { Metadata } from "next";
import ReversePercentageCalculatorClient from "./reverse-percentage-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/maths/reverse-percentage-calculator`;

  return {
    title: "Reverse Percentage Calculator",
    description: "Calculate original prices, discounts, or tax amounts instantly with our free reverse percentage calculator online. Find original values before percentage changes.",
    keywords: "reverse percentage calculator, reverse percentages calculator, reverse percentage calculator online, reverse percentage discount calculator, reverse percentage formula, how to calculate reverse percentages",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en': canonicalUrl,
      }
    },
    openGraph: {
      title: "Reverse Percentage Calculator – Find Original Prices Fast",
      description: "Calculate original prices, discounts, or tax amounts instantly with our free reverse percentage calculator online.",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Reverse Percentage Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Reverse Percentage Calculator – Find Original Prices Fast",
      description: "Calculate original values before percentage increases or decreases instantly.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ReversePercentageCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("reverse-percentage-calculator", language);
  const guideContent = await loadCalculatorGuideContent("reverse-percentage-calculator", language);

  return <ReversePercentageCalculatorClient content={content} guideContent={guideContent} />;
}
