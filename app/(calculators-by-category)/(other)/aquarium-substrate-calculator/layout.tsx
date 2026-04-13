import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aquarium Substrate Calculator: How Much Gravel, Sand, or Soil Do You Need?",
  description: "Use this aquarium substrate calculator to instantly determine the exact volume and weight of substrate your aquarium requires. Free aquarium gravel calculator, aquarium sand calculator, and planted aquarium substrate calculator. Calculate substrate needs for all tank sizes from nano to 200-gallon displays. Get precise results in liters, kilograms, or pounds with our aquarium substrate volume calculator.",
  keywords: [
    "aquarium substrate calculator",
    "aquarium gravel calculator",
    "aquarium sand calculator",
    "planted aquarium substrate calculator",
    "aquarium substrate volume calculator",
    "aquarium gravel amount calculator",
    "aquarium sand volume calculator",
    "aquarium soil substrate calculator",
    "aquarium substrate for plants calculator",
    "aquarium substrate depth calculator",
    "aquarium gravel depth calculator",
    "aquarium sand depth calculator",
    "how much substrate for aquarium",
    "aquarium substrate calculator liters",
    "aquarium substrate calculator kg",
    "fish tank substrate calculator",
    "planted tank substrate calculator",
    "aquasoil calculator",
    "ada amazonia calculator",
    "fluval stratum calculator",
    "seachem flourite calculator",
    "aquarium gravel weight calculator",
    "aquarium sand weight calculator",
    "substrate calculator for planted tanks",
    "how much gravel for aquarium"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/aquarium-substrate-calculator"
  },
  openGraph: {
    title: "Aquarium Substrate Calculator: How Much Gravel, Sand, or Soil Do You Need?",
    description: "Free aquarium substrate calculator to determine exact volume and weight of gravel, sand, or soil for your tank. Calculate substrate needs instantly.",
    url: "https://www.thesmartcalculator.com/aquarium-substrate-calculator",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aquarium Substrate Calculator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquarium Substrate Calculator: How Much Gravel, Sand, or Soil Do You Need?",
    description: "Free aquarium substrate calculator to determine exact volume and weight of gravel, sand, or soil for your tank.",
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

export default function AquariumSubstrateCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
