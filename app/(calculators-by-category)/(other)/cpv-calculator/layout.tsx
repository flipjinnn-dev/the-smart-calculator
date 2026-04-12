import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/cpv-calculator"

  return {
    title: {
      absolute: "CPV Calculator – Calculate Cost Per View Free Online",
    },
    description: "Use our free CPV calculator to calculate cost per view instantly. Learn the CPV formula, how to calculate CPV for YouTube ads, convert CPV to CPM, and reduce your ad spend.",
    keywords: "cpv calculator, cost per view calculator, cpv formula, calculate cpv, youtube cpv calculator, cpv to cpm converter, cpv calculation, how to calculate cpv, google ads cpv, video ad cost calculator, cpv bidding, trueview cpv, average cpv, good cpv, cpv vs cpm, cpv vs cpc, lower cpv, reduce cpv, cpv benchmarks, youtube advertising cost, video advertising calculator, ad spend calculator, view cost calculator, marketing calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "CPV Calculator – Calculate Cost Per View Free Online",
      description: "Use our free CPV calculator to calculate cost per view instantly. Learn the CPV formula, how to calculate CPV for YouTube ads, convert CPV to CPM, and reduce your ad spend.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "CPV Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "CPV Calculator – Calculate Cost Per View Free Online",
      description: "Use our free CPV calculator to calculate cost per view instantly. Learn the CPV formula, how to calculate CPV for YouTube ads, convert CPV to CPM, and reduce your ad spend.",
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

export default function CPVCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
