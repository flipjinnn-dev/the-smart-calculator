import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blox Fruits Wheel Spin – Random Fruit, Sword & Race",
  description: "Spin the Blox Fruits Wheel to get random fruits, swords, guns, races, and fighting styles. Fast, free, and perfect for fun challenges.",
  keywords: [
    "blox fruits wheel",
    "blox fruit wheel",
    "blox fruits spin wheel",
    "blox fruit spin wheel",
    "wheel of blox fruits",
    "spin the wheel blox fruits",
    "blox fruits random wheel",
    "blox fruits wheel all fruits",
    "all fruits in blox fruits wheel",
    "blox fruits fruit wheel",
    "blox fruits wheel update 26",
    "blox fruits wheel update 27",
    "blox fruit spin wheel update 25",
    "blox fruits wheel swords",
    "blox fruits wheel guns",
    "blox fruits random gun wheel",
    "blox fruits wheel race",
    "blox fruits wheel fighting style",
    "blox fruits spin wheel fighting style",
    "spin wheel blox fruit",
    "blox fruit spin the wheel",
    "blox fruits wheel spin",
    "blox fruit spin wheel chances",
    "free blox fruits wheel",
    "blox fruits challenge wheel"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/blox-fruits-wheel"
  },
  openGraph: {
    title: "Blox Fruits Wheel Spin – Random Fruit, Sword & Race",
    description: "Spin the Blox Fruits Wheel to get random fruits, swords, guns, races, and fighting styles. Fast, free, and perfect for fun challenges.",
    url: "https://www.thesmartcalculator.com/games/blox-fruits-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blox Fruits Wheel"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blox Fruits Wheel Spin – Random Fruit, Sword & Race",
    description: "Spin the Blox Fruits Wheel to get random fruits, swords, guns, races, and fighting styles. Fast, free, and perfect for fun challenges.",
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

export default function BloxFruitsWheelLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
