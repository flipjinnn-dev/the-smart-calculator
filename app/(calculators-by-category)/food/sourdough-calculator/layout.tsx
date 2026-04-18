import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sourdough Calculator: Complete Guide to Hydration, Ratios & Loaves",
  description: "Free sourdough calculator for perfect bread. Calculate hydration percentages, baker's ratios, and scale recipes. Get exact measurements for flour, water, starter & salt.",
  keywords: [
    "sourdough calculator",
    "sourdough hydration calculator",
    "sourdough bread calculator",
    "sourdough starter hydration calculator",
    "baker's percentage calculator",
    "how to calculate sourdough hydration",
    "sourdough ratio calculator",
    "sourdough recipe calculator",
    "free sourdough calculator",
    "sourdough bread nutrition calculator",
    "calculate sourdough starter hydration",
    "sourdough dough calculator",
    "baker's math calculator",
    "sourdough scaling calculator",
    "true hydration calculator",
    "effective hydration sourdough",
    "sourdough ingredient calculator",
    "sourdough formula calculator",
    "baker's percentages",
    "sourdough hydration percentage",
    "how to calculate hydration of sourdough with starter",
    "sourdough starter calculator",
    "bread hydration calculator",
    "artisan bread calculator",
    "free bread calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/food/sourdough-calculator"
  },
  openGraph: {
    title: "Sourdough Calculator: Complete Guide to Hydration, Ratios & Loaves",
    description: "Free sourdough calculator for perfect bread. Calculate hydration percentages, baker's ratios, and scale recipes.",
    url: "https://www.thesmartcalculator.com/food/sourdough-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sourdough Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourdough Calculator: Complete Guide to Hydration, Ratios & Loaves",
    description: "Free sourdough calculator for perfect bread. Calculate hydration percentages, baker's ratios, and scale recipes.",
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

export default function SourdoughCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
