import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Country Wheel – Spin & Pick a Random Country Instantly",
  description: "Spin the Country Wheel to pick a random country instantly. Use this fun tool for games, travel ideas, geography learning, and challenges online.",
  keywords: [
    "country wheel",
    "random country wheel",
    "country wheel spinner",
    "wheel of countries",
    "country picker wheel",
    "random country generator wheel",
    "country spin the wheel",
    "countries wheel",
    "all 197 countries wheel",
    "europe countries wheel",
    "european countries wheel",
    "wheel of every country",
    "country randomizer wheel",
    "random country generator wheel",
    "country picker wheel",
    "country wheel generator",
    "country spinning wheel",
    "geography wheel",
    "travel wheel",
    "world countries wheel",
    "country selection wheel",
    "free country wheel",
    "online country spinner"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/country-wheel"
  },
  openGraph: {
    title: "Country Wheel – Spin & Pick a Random Country Instantly",
    description: "Spin the Country Wheel to pick a random country instantly. Use this fun tool for games, travel ideas, geography learning, and challenges online.",
    url: "https://www.thesmartcalculator.com/games/country-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Country Wheel - Random Country Picker"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Country Wheel – Spin & Pick a Random Country Instantly",
    description: "Spin the Country Wheel to pick a random country instantly. Use this fun tool for games, travel ideas, geography learning, and challenges online.",
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

export default function CountryWheelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
