import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rip Rap Calculator — Tons, Cubic Yards, Coverage & Cost Estimator",
  description: "Free rip rap calculator to estimate tons, cubic yards, coverage & cost. Calculate erosion control stone for channels, shorelines & slopes instantly. Get accurate results for rectangular areas, sloped banks, and circular ponds with density-based conversions.",
  keywords: [
    "rip rap calculator",
    "riprap calculator",
    "rip rap tonnage calculator",
    "rip rap cost calculator",
    "rip rap coverage calculator",
    "rip rap density calculator",
    "how to calculate rip rap",
    "rip rap calculation",
    "rip rap formula",
    "cubic yards to tons rip rap",
    "rip rap coverage per ton",
    "rip rap cost per ton",
    "erosion control calculator",
    "rip rap size calculator",
    "rip rap depth calculator",
    "rip rap estimator",
    "shoreline protection calculator",
    "stream bank stabilization",
    "rip rap tons per linear foot",
    "rip rap cubic yards",
    "rip rap stone calculator",
    "rip rap installation cost",
    "geotextile fabric rip rap",
    "rip rap design",
    "rip rap vs gabion"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/rip-rap-calculator"
  },
  openGraph: {
    title: "Rip Rap Calculator — Tons, Cubic Yards, Coverage & Cost Estimator",
    description: "Free rip rap calculator to estimate tons, cubic yards, coverage & cost. Calculate erosion control stone for channels, shorelines & slopes instantly.",
    url: "https://www.thesmartcalculator.com/construction/rip-rap-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rip Rap Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rip Rap Calculator — Tons, Cubic Yards, Coverage & Cost Estimator",
    description: "Free rip rap calculator to estimate tons, cubic yards, coverage & cost. Calculate erosion control stone for channels, shorelines & slopes instantly.",
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
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
}

export default function RipRapCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
