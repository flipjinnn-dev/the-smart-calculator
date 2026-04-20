import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crochet Calculator | Free Yarn, Gauge, Pricing & Time Calculator",
  description: "Use this crochet calculator to estimate yarn yardage, project cost, time, gauge adjustments, stitch counts, and pricing for any crochet project. Includes crochet yarn calculator, blanket calculator, gauge calculator, size calculator, hat calculator, sweater calculator, stitch calculator, price calculator, time calculator, cost calculator, and commission calculator.",
  keywords: [
    "crochet calculator",
    "crochet yarn calculator",
    "crochet blanket calculator",
    "crochet gauge calculator",
    "crochet size calculator",
    "crochet hat calculator",
    "crochet sweater calculator",
    "crochet stitch calculator",
    "crochet price calculator",
    "crochet time calculator",
    "crochet cost calculator",
    "crochet commission calculator",
    "crochet yarn amount calculator",
    "crochet blanket yarn calculator",
    "crochet increase calculator",
    "crochet decrease calculator",
    "crochet pricing calculator",
    "crochet yardage calculator",
    "crochet project calculator",
    "free crochet calculator",
    "crochet calculator online",
    "how much yarn for crochet blanket",
    "crochet gauge swatch calculator",
    "crochet pattern calculator",
    "crochet hook size calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/crochet-calculator"
  },
  openGraph: {
    title: "Crochet Calculator | Free Yarn, Gauge, Pricing & Time Calculator",
    description: "Free crochet calculator to estimate yarn yardage, project cost, time, gauge adjustments, stitch counts, and pricing for blankets, hats, sweaters, and commissions.",
    url: "https://www.thesmartcalculator.com/crochet-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crochet Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Crochet Calculator | Free Yarn, Gauge, Pricing & Time Calculator",
    description: "Free crochet calculator for yarn yardage, pricing, gauge, and time estimates. Perfect for blankets, hats, sweaters, and commissions.",
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

export default function CrochetCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
