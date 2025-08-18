import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://smartcalculator.com"),
  title: {
    default: "Smart Calculator - Free Online Calculators for Every Need",
    template: "%s | Smart Calculator",
  },
  description:
    "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
  keywords: "calculator, online calculator, financial calculator, health calculator, math calculator, free tools",
  authors: [{ name: "Smart Calculator Team" }],
  creator: "Smart Calculator",
  publisher: "Smart Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartcalculator.com",
    siteName: "Smart Calculator",
    title: "Smart Calculator - Free Online Calculators",
    description: "Access hundreds of free online calculators for every need",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smart Calculator - Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Calculator - Free Online Calculators",
    description: "Access hundreds of free online calculators for every need",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://smartcalculator.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
