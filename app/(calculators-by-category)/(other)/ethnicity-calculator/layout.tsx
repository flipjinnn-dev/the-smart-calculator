import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/ethnicity-calculator"

  return {
    title: {
      absolute: "Ethnicity Calculator – Calculate Your Ethnic % Fast",
    },
    description: "Use our ethnicity percentage calculator to calculate ethnicity, estimate baby ethnicity, and explore your ethnic background instantly online free.",
    keywords: "ethnicity calculator, ethnicity percentage calculator, calculate ethnicity, baby ethnicity calculator, DNA ethnicity calculator, ethnic background calculator, ethnicity calculator based on parents, free ethnicity calculator, ethnicity estimate calculator, cultural ethnicity calculator, genetic ethnicity calculator, BMI calculator with ethnicity, ethnicity by face, ethnicity calculator ancestry, ethnic percentage calculator, calculate baby ethnicity, parent ethnicity calculator, grandparent ethnicity calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Ethnicity Calculator – Calculate Your Ethnic % Fast",
      description: "Use our ethnicity percentage calculator to calculate ethnicity, estimate baby ethnicity, and explore your ethnic background instantly online free.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ethnicity Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ethnicity Calculator – Calculate Your Ethnic % Fast",
      description: "Use our ethnicity percentage calculator to calculate ethnicity, estimate baby ethnicity, and explore your ethnic background instantly online free.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  }
}

export default function EthnicityCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
