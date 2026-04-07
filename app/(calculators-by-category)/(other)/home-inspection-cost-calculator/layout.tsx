import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/home-inspection-cost-calculator"

  return {
    title: {
      absolute: "Home Inspection Cost Calculator | Estimate Prices",
    },
    description: "Estimate your home inspection cost instantly. Get accurate pricing based on size, age, location, and add-ons. Free calculator, no signup needed.",
    keywords: "home inspection cost calculator, home inspection cost, inspection cost estimator, home inspector cost, home inspection price, cost of home inspection, home inspection fees, ASHI inspection cost, InterNACHI inspector, home inspection estimate, property inspection cost, house inspection cost, home inspection calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Home Inspection Cost Calculator | Estimate Prices",
      description: "Estimate your home inspection cost instantly. Get accurate pricing based on size, age, location, and add-ons. Free calculator, no signup needed.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Home Inspection Cost Calculator | Estimate Prices",
      description: "Estimate your home inspection cost instantly. Get accurate pricing based on size, age, location, and add-ons. Free calculator, no signup needed.",
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
  }
}

export default function HomeInspectionCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
