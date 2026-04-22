import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Candy Wheel – Spin & Pick Candy Instantly Online",
  description: "Spin the candy wheel to instantly pick a random candy. A fun, fair and interactive spinner for parties, classrooms and online games.",
  keywords: [
    "candy wheel",
    "candy wheel spinner",
    "random candy wheel",
    "candy picker wheel",
    "spin the wheel candy",
    "candy name generator",
    "random candy picker",
    "free candy wheel",
    "candy spinner",
    "candy wheel game",
    "candy prize wheel",
    "candy random picker",
    "spin wheel candy",
    "candy trivia wheel",
    "candy land wheel",
    "candy crush wheel",
    "candy ferris wheel",
    "candy bar wheel"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/candy-wheel"
  },
  openGraph: {
    title: "Candy Wheel – Spin & Pick Candy Instantly Online",
    description: "Spin the candy wheel to instantly pick a random candy. A fun, fair and interactive spinner for parties, classrooms and online games.",
    url: "https://www.thesmartcalculator.com/games/candy-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Candy Wheel - Random Candy Picker"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Candy Wheel – Spin & Pick Candy Instantly Online",
    description: "Spin the candy wheel to instantly pick a random candy. A fun, fair and interactive spinner for parties, classrooms and online games.",
    images: ["https://www.thesmartcalculator.com/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function CandyWheelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
