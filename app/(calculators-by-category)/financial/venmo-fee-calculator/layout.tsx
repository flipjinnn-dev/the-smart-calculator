import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/financial/venmo-fee-calculator"

  return {
    title: {
      absolute: "Venmo Fee Calculator | Instant Fee & Transfer Costs",
    },
    description: "Calculate Venmo fees instantly. See exact charges for instant transfers, credit card payments, and goods & services. Free, fast, no signup needed.",
    keywords: "venmo fee calculator, venmo fees, instant transfer fee, venmo credit card fee, goods and services fee, venmo business fee, calculate venmo fees, venmo fee structure, venmo vs paypal fees",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Venmo Fee Calculator | Instant Fee & Transfer Costs",
      description: "Calculate Venmo fees instantly. See exact charges for instant transfers, credit card payments, and goods & services. Free, fast, no signup needed.",
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Venmo Fee Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Venmo Fee Calculator | Instant Fee & Transfer Costs",
      description: "Calculate Venmo fees instantly. See exact charges for instant transfers, credit card payments, and goods & services. Free, fast, no signup needed.",
      images: ["/og-image.png"],
    },
  }
}

export default async function VenmoFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
