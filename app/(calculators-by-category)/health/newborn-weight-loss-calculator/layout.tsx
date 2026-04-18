import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newborn Weight Loss Calculator — How to Calculate, What's Normal",
  description: "Free newborn weight loss calculator. Calculate weight loss percentage in kg, lbs, or oz. Normal range is 7-10%. Get instant results and know when to call your pediatrician.",
  keywords: [
    "newborn weight loss calculator",
    "newborn weight loss percentage calculator",
    "baby weight loss calculator",
    "how to calculate newborn weight loss",
    "newborn weight loss formula",
    "normal newborn weight loss",
    "newborn weight loss percentage",
    "baby weight loss percentage",
    "newborn weight loss chart",
    "how much weight loss is normal for newborn",
    "newborn weight loss in kg",
    "newborn weight loss in pounds and ounces",
    "newborn weight loss in lbs",
    "calculate baby weight loss",
    "baby weight loss percentage formula",
    "newborn weight loss normal range",
    "when to worry about newborn weight loss",
    "newborn weight loss 10 percent",
    "newborn weight loss after birth",
    "breastfed baby weight loss",
    "formula fed baby weight loss",
    "newborn weight regain",
    "NEWT tool",
    "newborn weight tool",
    "free newborn weight loss calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/health/newborn-weight-loss-calculator"
  },
  openGraph: {
    title: "Newborn Weight Loss Calculator — How to Calculate, What's Normal",
    description: "Free newborn weight loss calculator. Calculate weight loss percentage in kg, lbs, or oz. Normal range is 7-10%.",
    url: "https://www.thesmartcalculator.com/health/newborn-weight-loss-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Newborn Weight Loss Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Newborn Weight Loss Calculator — How to Calculate, What's Normal",
    description: "Free newborn weight loss calculator. Calculate weight loss percentage in kg, lbs, or oz. Normal range is 7-10%.",
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

export default function NewbornWeightLossCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
