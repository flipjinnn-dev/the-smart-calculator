import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesmartcalculator.com/"),
  title: {
    default: "Smart Calculator - Free Online Calculators for Every Need",
    template: "%s | Smart Calculator",
  },
  description:
    "Access hundreds of free online calculators for finance, health, math, physics, and more. Fast, accurate, and easy-to-use calculation tools.",
  keywords:
    "calculator, online calculator, financial calculator, health calculator, math calculator, free tools",
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
    url: "https://www.thesmartcalculator.com/",
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
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "RehqhdOImhqlzUM1_EWsYdmed39YNrO6MQyARIW9rK4", // ✅ Google Site Verification
  },
  generator: "Smart Calculator",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Canonical + Basic Meta */}
        <link rel="canonical" href="https://www.thesmartcalculator.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Favicon & App Icons */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-18W2MEF31Q"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-18W2MEF31Q', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
