import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ERA Calculator | Free Earned Run Average Calculator for Baseball & Softball",
  description: "Free ERA calculator (Earned Run Average) for baseball and softball pitchers. Calculate ERA with 9-inning or 7-inning formulas. Includes MLB ERA standards, xERA explanation, Japanese era converter, and comprehensive pitching statistics guide.",
  keywords: [
    "ERA calculator",
    "earned run average calculator",
    "ERA calculator baseball",
    "ERA calculator MLB",
    "ERA calculator softball",
    "ERA calculator 9 innings",
    "ERA calculator 7 innings",
    "how to calculate ERA",
    "ERA formula",
    "ERA formula baseball",
    "what is ERA in baseball",
    "good ERA in baseball",
    "ERA rating scale",
    "expected ERA",
    "xERA calculator",
    "season ERA calculator",
    "relief pitcher ERA",
    "Japanese era calculator",
    "Japanese era converter",
    "Reiwa era calculator",
    "Heisei era calculator",
    "Showa era calculator",
    "era to years conversion",
    "Japanese era to Western year",
    "Gengō calculator",
    "free ERA calculator online"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/sports/era-calculator"
  },
  openGraph: {
    title: "ERA Calculator | Free Earned Run Average Calculator for Baseball & Softball",
    description: "Free ERA calculator for baseball and softball. Calculate earned run average with 9-inning or 7-inning formulas. Includes MLB ERA standards and Japanese era converter.",
    url: "https://www.thesmartcalculator.com/sports/era-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ERA Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ERA Calculator | Free Earned Run Average Calculator",
    description: "Calculate ERA for baseball and softball pitchers. Free online ERA calculator with 9-inning and 7-inning formulas.",
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

export default function ERACalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
