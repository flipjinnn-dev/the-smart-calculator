import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Combination Sum Calculator - Find All Number Combinations That Add Up",
  description: "Free combination sum calculator finds all unique groups of numbers that add up to your target. Supports number reuse, backtracking algorithm, Excel integration. Perfect for budget reconciliation, programming interviews & math problems.",
  keywords: [
    "combination sum calculator",
    "combination sum",
    "number combination sum calculator",
    "find combinations that equal a sum",
    "combination sum problem",
    "backtracking calculator",
    "combination sum calculator online",
    "free combination sum calculator",
    "combination sum excel",
    "combination sum google sheets",
    "how to find combinations that add up to a number",
    "combination sum algorithm",
    "leetcode combination sum",
    "combination sum type 1",
    "combination sum type 2",
    "combination sum with repetition",
    "combination sum without repetition",
    "budget reconciliation calculator",
    "invoice matching calculator",
    "combination vs permutation",
    "combination sum vs combination formula",
    "nCr vs combination sum",
    "combination sum interview question",
    "programming interview calculator",
    "recursive combination calculator",
    "subset sum calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/maths/combination-sum-calculator"
  },
  openGraph: {
    title: "Combination Sum Calculator - Find All Number Combinations That Add Up",
    description: "Free combination sum calculator finds all unique groups of numbers that add up to your target. Supports number reuse, backtracking algorithm, Excel integration.",
    url: "https://www.thesmartcalculator.com/maths/combination-sum-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Combination Sum Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Combination Sum Calculator - Find All Number Combinations That Add Up",
    description: "Free combination sum calculator finds all unique groups of numbers that add up to your target. Supports number reuse, backtracking algorithm, Excel integration.",
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

export default function CombinationSumCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
