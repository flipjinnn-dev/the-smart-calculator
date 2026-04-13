import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/construction/loft-conversion-cost-calculator"

  return {
    title: {
      absolute: "Loft Conversion Cost Calculator | Instant Estimates for Dormer, Velux & More",
    },
    description: "Calculate loft conversion costs instantly for UK projects. Get accurate estimates for Velux, dormer, hip-to-gable, mansard, and L-shaped conversions. Free calculator shows detailed breakdown, cost per m², build time, and ROI. Based on 2026 UK market data.",
    keywords: "loft conversion cost calculator, loft conversion calculator, cost of loft conversion uk calculator, average loft conversion cost calculator, dormer loft conversion cost calculator, velux loft conversion cost calculator, loft conversion cost basic, loft conversion price calculator, loft conversion cost per m2, how much does a loft conversion cost, loft conversion cost uk, dormer loft conversion cost, velux loft conversion cost, hip to gable loft conversion cost, mansard loft conversion cost, loft conversion calculator online, loft conversion estimate calculator, loft conversion roi calculator, uk loft conversion costs 2026",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Loft Conversion Cost Calculator | Instant Estimates for Dormer, Velux & More",
      description: "Calculate loft conversion costs instantly for UK projects. Get accurate estimates for Velux, dormer, hip-to-gable, mansard conversions. Free calculator with detailed breakdown.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Loft Conversion Cost Calculator - UK Estimates",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Loft Conversion Cost Calculator | Instant Estimates for Dormer, Velux & More",
      description: "Calculate loft conversion costs instantly for UK projects. Get accurate estimates for Velux, dormer, hip-to-gable, mansard conversions. Free calculator with detailed breakdown.",
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

export default function LoftConversionCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
