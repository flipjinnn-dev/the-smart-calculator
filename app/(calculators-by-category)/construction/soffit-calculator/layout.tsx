import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Soffit Calculator | Area, Vent & Cost Estimate",
  description: "Use our soffit calculator to estimate soffit area, vents, fascia, panels & cost. Free tool for soffit replacement and roofing projects 2026. Calculate soffit panels, ventilation requirements, J-channel, and total project cost instantly.",
  keywords: [
    "soffit calculator",
    "soffit area calculator",
    "soffit vent calculator",
    "soffit cost calculator",
    "soffit replacement calculator",
    "soffit and fascia calculator",
    "vinyl soffit calculator",
    "aluminum soffit calculator",
    "how to calculate soffit",
    "soffit calculation",
    "soffit formula",
    "soffit panels needed",
    "soffit vents needed",
    "soffit ventilation calculator",
    "soffit coverage calculator",
    "linear feet of soffit",
    "soffit cost per square foot",
    "soffit installation cost",
    "soffit material calculator",
    "j-channel calculator",
    "fascia calculator",
    "roof soffit calculator",
    "eave soffit calculator",
    "soffit estimator",
    "free soffit calculator"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/construction/soffit-calculator"
  },
  openGraph: {
    title: "Soffit Calculator | Area, Vent & Cost Estimate",
    description: "Use our soffit calculator to estimate soffit area, vents, fascia, panels & cost. Free tool for soffit replacement and roofing projects 2026.",
    url: "https://www.thesmartcalculator.com/construction/soffit-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soffit Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Soffit Calculator | Area, Vent & Cost Estimate",
    description: "Use our soffit calculator to estimate soffit area, vents, fascia, panels & cost. Free tool for soffit replacement and roofing projects 2026.",
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

export default function SoffitCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
