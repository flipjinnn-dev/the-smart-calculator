import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Extrapolation Calculator | Predict Future Values Online",
  description: "Use our extrapolation calculator to predict future values from data points using linear and exponential methods. Fast, accurate online forecasting tool.",
  keywords: [
    "extrapolation calculator",
    "linear extrapolation calculator",
    "extrapolation formula",
    "extrapolation calculator online",
    "extrapolation equation calculator",
    "extrapolation formula calculator",
    "extrapolation calculator with steps",
    "linear extrapolation formula",
    "extrapolation formula example",
    "how to calculate extrapolation",
    "extrapolation vs interpolation",
    "interpolation and extrapolation calculator",
    "interpolation extrapolation calculator",
    "exponential extrapolation calculator",
    "polynomial extrapolation",
    "Richardson extrapolation calculator",
    "retrograde extrapolation calculator",
    "BAC retrograde extrapolation calculator",
    "blood alcohol retrograde extrapolation calculator",
    "BAC back extrapolation calculator",
    "bac retrograde extrapolation calculator",
    "vancomycin extrapolated trough calculator",
    "extrapolation calculator excel",
    "linear extrapolation calculator excel",
    "how to calculate extrapolation in excel",
    "data extrapolation calculator",
    "extrapolate data calculator",
    "free extrapolation calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/maths/extrapolation-calculator"
  },
  openGraph: {
    title: "Extrapolation Calculator | Predict Future Values Online",
    description: "Use our extrapolation calculator to predict future values from data points using linear and exponential methods. Fast, accurate online forecasting tool.",
    url: "https://www.thesmartcalculator.com/maths/extrapolation-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Extrapolation Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Extrapolation Calculator | Predict Future Values Online",
    description: "Use our extrapolation calculator to predict future values from data points. Fast, accurate online forecasting tool.",
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

export default function ExtrapolationCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
