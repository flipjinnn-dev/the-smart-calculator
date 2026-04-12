import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home Reversion Calculator — Estimate Your Equity Release Payout Instantly",
  description: "Use our free home reversion calculator to estimate your equity release payout. Calculate how much cash you can release from your property based on age, property value, and share sold. Get instant results for home reversion plans in the UK.",
  keywords: [
    "home reversion calculator",
    "equity release calculator",
    "home reversion plan",
    "home reversion equity release calculator",
    "home reversion value calculator",
    "reversion value calculator",
    "home reversion scheme",
    "equity release",
    "home reversion plan calculator",
    "calculate home reversion",
    "home reversion payout",
    "home reversion vs lifetime mortgage",
    "home reversion vs reverse mortgage",
    "home reversion minimum age",
    "home reversion costs",
    "home reversion plan UK",
    "equity release plan",
    "home reversion formula",
    "home reversion discount rate",
    "FCA regulated equity release",
    "Equity Release Council",
    "home reversion pros and cons",
    "home reversion calculator UK",
    "free home reversion calculator",
    "home reversion estimate"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/home-reversion-calculator"
  },
  openGraph: {
    title: "Home Reversion Calculator — Estimate Your Equity Release Payout Instantly",
    description: "Use our free home reversion calculator to estimate your equity release payout. Calculate how much cash you can release from your property based on age, property value, and share sold.",
    url: "https://www.thesmartcalculator.com/home-reversion-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Home Reversion Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Reversion Calculator — Estimate Your Equity Release Payout Instantly",
    description: "Use our free home reversion calculator to estimate your equity release payout. Calculate how much cash you can release from your property based on age, property value, and share sold.",
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

export default function HomeReversionCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
