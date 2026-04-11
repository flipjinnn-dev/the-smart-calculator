import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/whatnot-fee-calculator"

  return {
    title: {
      absolute: "Whatnot Fee Calculator – Free Seller Profit Tool",
    },
    description: "Use our free Whatnot fees calculator to calculate seller fees for US, UK & Canada. Instant Whatnot cost calculator for commission, processing & net profit.",
    keywords: "whatnot fee calculator, whatnot seller fees, whatnot fees calculator, whatnot cost calculator, whatnot selling fee calculator, whatnot price calculator, whatnot fee calculator usa, whatnot fee calculator canada, whatnot fee calculator uk, whatnot seller fees uk calculator, whatnot shipping cost calculator, whatnot commission calculator, whatnot processing fee calculator, whatnot profit calculator, whatnot payout calculator, free whatnot fee calculator, whatnot seller fee breakdown, whatnot 8 percent fee, whatnot electronics fee, whatnot coins fee, whatnot $1500 threshold",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Whatnot Fee Calculator – Free Seller Profit Tool",
      description: "Use our free Whatnot fees calculator to calculate seller fees for US, UK & Canada. Instant Whatnot cost calculator for commission, processing & net profit.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Whatnot Fee Calculator - Free Seller Profit Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Whatnot Fee Calculator – Free Seller Profit Tool",
      description: "Use our free Whatnot fees calculator to calculate seller fees for US, UK & Canada. Instant Whatnot cost calculator for commission, processing & net profit.",
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

export default function WhatnotFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
