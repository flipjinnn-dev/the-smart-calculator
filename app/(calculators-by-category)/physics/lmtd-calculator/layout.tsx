import { Metadata } from "next"

export const metadata: Metadata = {
  title: "LMTD Calculator – Log Mean Temperature Difference Calculator",
  description: "Free LMTD calculator for heat exchangers. Calculate log mean temperature difference, correction factors, and thermal performance. Supports counterflow, parallel flow, shell-and-tube, and cross-flow configurations.",
  keywords: [
    "LMTD calculator",
    "log mean temperature difference calculator",
    "LMTD correction factor calculator",
    "heat exchanger LMTD calculator",
    "counterflow LMTD calculator",
    "parallel flow LMTD calculator",
    "shell and tube LMTD calculator",
    "cross flow LMTD calculator",
    "how to calculate LMTD",
    "LMTD formula",
    "LMTD calculation",
    "heat exchanger design calculator",
    "thermal design calculator",
    "LMTD correction factor",
    "TEMA correction factor",
    "counter current LMTD",
    "LMTD for condensers",
    "LMTD for evaporators",
    "plate heat exchanger LMTD",
    "LMTD Excel calculator",
    "free LMTD calculator",
    "online LMTD calculator",
    "heat transfer calculator",
    "temperature difference calculator",
    "Q=UA LMTD calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/physics/lmtd-calculator"
  },
  openGraph: {
    title: "LMTD Calculator – Log Mean Temperature Difference Calculator",
    description: "Free LMTD calculator for heat exchangers. Calculate log mean temperature difference, correction factors, and thermal performance.",
    url: "https://www.thesmartcalculator.com/physics/lmtd-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LMTD Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "LMTD Calculator – Log Mean Temperature Difference Calculator",
    description: "Free LMTD calculator for heat exchangers. Calculate log mean temperature difference, correction factors, and thermal performance.",
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

export default function LMTDCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
