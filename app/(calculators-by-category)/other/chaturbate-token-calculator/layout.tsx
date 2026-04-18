import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chaturbate Token Calculator – Convert Tokens to USD/EUR",
  description: "Free Chaturbate token calculator. Convert tokens to USD or EUR instantly. Models earn $0.05 per token. Check 100, 500, 1000 tokens value now.",
  keywords: [
    "chaturbate token calculator",
    "chaturbate tokens to usd",
    "chaturbate token value",
    "chaturbate token converter",
    "chaturbate tokens to dollars",
    "chaturbate token to usd calculator",
    "how much is 1 chaturbate token",
    "how much is 100 tokens on chaturbate",
    "how much is 500 tokens on chaturbate",
    "how much is 1000 tokens on chaturbate",
    "chaturbate token price",
    "chaturbate model earnings",
    "chaturbate payout",
    "chaturbate tokens to eur",
    "chaturbate token calculator eur",
    "chaturbate broadcaster earnings",
    "chaturbate token rate",
    "chaturbate token conversion chart",
    "free chaturbate token calculator",
    "chaturbate earnings calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/other/chaturbate-token-calculator"
  },
  openGraph: {
    title: "Chaturbate Token Calculator – Convert Tokens to USD/EUR",
    description: "Free Chaturbate token calculator. Convert tokens to USD or EUR instantly. Models earn $0.05 per token.",
    url: "https://www.thesmartcalculator.com/other/chaturbate-token-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chaturbate Token Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaturbate Token Calculator – Convert Tokens to USD/EUR",
    description: "Free Chaturbate token calculator. Convert tokens to USD or EUR instantly. Models earn $0.05 per token.",
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

export default function ChaturbateTokenCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
