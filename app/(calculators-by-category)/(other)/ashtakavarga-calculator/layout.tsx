import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ashtakavarga Calculator: Free Online Vedic Astrology Bindu Points Tool by Date of Birth",
  description: "Free ashtakavarga calculator online delivers your complete ashtakavarga chart and ashtakavarga points in seconds. Get sarvashtakavarga chart calculator results, bhinnashtakavarga scores for every planet, and precise Vedic predictions for career, marriage, health, wealth, and longevity. This ashtakavarga bindu calculator uses ancient rules from Brihat Parashara Hora Shastra.",
  keywords: [
    "ashtakavarga calculator",
    "ashtakavarga calculator online",
    "ashtakavarga calculator free",
    "ashtakavarga calculator by date of birth",
    "sarvashtakavarga chart calculator",
    "bhinnashtakavarga calculator",
    "ashtakavarga bindu calculator",
    "ashtakavarga points calculator",
    "lagna ashtakavarga calculator",
    "moon ashtakavarga calculator",
    "saturn ashtakavarga calculator",
    "venus ashtakavarga calculator",
    "ashtakavarga chart calculator",
    "ashtakavarga vedic astrology",
    "ashtakavarga calculation",
    "how to calculate ashtakavarga",
    "ashtakavarga rules",
    "ashtakavarga predictions",
    "free ashtakavarga calculator",
    "online ashtakavarga calculator",
    "vedic astrology calculator",
    "bindu calculator",
    "sarvashtakavarga calculator",
    "bhinnashtakavarga chart",
    "ashtakavarga marriage prediction"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/ashtakavarga-calculator"
  },
  openGraph: {
    title: "Ashtakavarga Calculator: Free Online Vedic Astrology Bindu Points Tool by Date of Birth",
    description: "Free ashtakavarga calculator online delivers your complete ashtakavarga chart and ashtakavarga points in seconds. Get sarvashtakavarga chart calculator results, bhinnashtakavarga scores for every planet, and precise Vedic predictions.",
    url: "https://www.thesmartcalculator.com/ashtakavarga-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ashtakavarga Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashtakavarga Calculator: Free Online Vedic Astrology Bindu Points Tool by Date of Birth",
    description: "Free ashtakavarga calculator online delivers your complete ashtakavarga chart and ashtakavarga points in seconds. Get sarvashtakavarga chart calculator results.",
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

export default function AshtakavargaCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
