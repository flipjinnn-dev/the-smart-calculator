import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fix and Flip Calculator | ARV & ROI Tool",
  description: "Use this fix and flip calculator to estimate profit, ROI, ARV, rehab, financing, holding and selling costs for accurate real estate deal analysis. Free fix and flip calculator online with 70% rule, hard money loan calculator, and complete deal analysis for house flipping investors.",
  keywords: [
    "fix and flip calculator",
    "fix and flip calculator online",
    "fix and flip calculator free",
    "property flip calculator",
    "real estate deal calculator",
    "house flipping calculator",
    "fix and flip profit calculator",
    "fix and flip deal calculator",
    "fix and flip real estate calculator",
    "fix and flip ARV calculator",
    "fix and flip rehab calculator",
    "fix and flip loan calculator",
    "fix and flip mortgage calculator",
    "fix and flip house calculator",
    "fix and flip ROI calculator",
    "hard money fix and flip loan",
    "hard money loan fix and flip calculator",
    "wholesaling fix and flip buy formula calculator",
    "fix and flip calculator Excel",
    "fix and flip calculator Excel free download",
    "fix and flip calculator Google Sheets",
    "fix and flip calculator app",
    "best fix and flip calculator online",
    "fix and flip spreadsheet",
    "70% rule calculator",
    "ARV calculator",
    "house flip profit calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/financial/fix-and-flip-calculator"
  },
  openGraph: {
    title: "Fix and Flip Calculator | ARV & ROI Tool",
    description: "Use this fix and flip calculator to estimate profit, ROI, ARV, rehab, financing, holding and selling costs for accurate real estate deal analysis.",
    url: "https://www.thesmartcalculator.com/financial/fix-and-flip-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fix and Flip Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix and Flip Calculator | ARV & ROI Tool",
    description: "Free fix and flip calculator to estimate profit, ROI, ARV, and all costs for house flipping deals.",
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

export default function FixAndFlipCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
