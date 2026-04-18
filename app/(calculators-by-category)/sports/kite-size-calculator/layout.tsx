import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kite Size Calculator | Free Kitesurfing Kite Size Chart by Weight & Wind",
  description: "Use this kite size calculator to instantly determine the ideal kite size in square meters (m²) using proven formulas like weight (kg) ÷ wind (knots) × 2.2–2.4. Free kite size chart by weight, kite size wind calculator, kiteboard kite size, and kitesurfing kite size calculator with accurate results for all skill levels.",
  keywords: [
    "kite size calculator",
    "kite size chart",
    "kite size by weight",
    "kite size chart by weight",
    "kite size wind calculator",
    "kite size chart knots",
    "kite size chart m/s",
    "what size kite do I need",
    "how big should a kite be",
    "kiteboard kite size calculator",
    "kitesurfing kite size calculator",
    "kitesurf size calculator",
    "kite dimensions calculator",
    "kiteboard size calculator",
    "kite measurements",
    "kiteboarding kite size",
    "kite size for beginners",
    "kite size for advanced riders",
    "kite size chart wind speed",
    "kite size formula",
    "kite quiver calculator",
    "twintip kite size",
    "directional board kite size",
    "foil kite size",
    "kite size weight chart"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/sports/kite-size-calculator"
  },
  openGraph: {
    title: "Kite Size Calculator | Free Kitesurfing Kite Size Chart by Weight & Wind",
    description: "Use this kite size calculator to instantly determine the ideal kite size in square meters (m²). Free kite size chart by weight and wind speed for all skill levels.",
    url: "https://www.thesmartcalculator.com/sports/kite-size-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kite Size Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kite Size Calculator | Free Kitesurfing Kite Size Chart",
    description: "Free kite size calculator with charts by weight and wind speed. Get accurate kite size recommendations instantly.",
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

export default function KiteSizeCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
