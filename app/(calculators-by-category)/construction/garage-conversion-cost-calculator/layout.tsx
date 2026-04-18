import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Garage Conversion Cost Calculator UK | Instant Estimates 2026",
  description: "Calculate your garage conversion cost in seconds. Get accurate UK estimates for single/double garage conversions. Includes regional pricing, spec levels, and detailed breakdowns.",
  keywords: [
    "garage conversion cost calculator",
    "garage conversion cost uk",
    "garage conversion cost per m2",
    "how much does a garage conversion cost",
    "garage conversion calculator",
    "garage conversion cost",
    "cost of garage conversion",
    "garage conversion price",
    "garage conversion cost estimator",
    "single garage conversion cost",
    "double garage conversion cost",
    "garage conversion cost per square metre",
    "garage conversion cost breakdown",
    "integral garage conversion cost",
    "detached garage conversion cost",
    "garage to bedroom conversion cost",
    "garage to office conversion cost",
    "garage to adu conversion cost",
    "garage conversion cost london",
    "garage conversion building regulations",
    "garage conversion planning permission",
    "garage conversion roi",
    "garage conversion value added",
    "garage conversion quotes",
    "free garage conversion calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/garage-conversion-cost-calculator"
  },
  openGraph: {
    title: "Garage Conversion Cost Calculator UK | Instant Estimates 2026",
    description: "Calculate your garage conversion cost in seconds. Get accurate UK estimates for single/double garage conversions.",
    url: "https://www.thesmartcalculator.com/construction/garage-conversion-cost-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Garage Conversion Cost Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Conversion Cost Calculator UK | Instant Estimates 2026",
    description: "Calculate your garage conversion cost in seconds. Get accurate UK estimates for single/double garage conversions.",
    images: ["https://www.thesmartcalculator.com/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
}

export default function GarageConversionCostCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
