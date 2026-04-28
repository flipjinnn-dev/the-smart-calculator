import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Clash Royale Wheel – Spin & Get Random Cards Instantly",
  description: "Use the Clash Royale Wheel to spin and instantly get random cards, decks, or champions. Free, fair, and perfect for Clash Royale challenges.",
  keywords: [
    "clash royale wheel",
    "clash royale spin wheel",
    "wheel clash royale",
    "clash royale random wheel",
    "spin wheel clash royale",
    "wheel of names clash royale",
    "clash royale wheel spinner",
    "clash royale spinning wheel",
    "clash royale card wheel",
    "clash royale deck wheel",
    "clash royale challenge wheel",
    "clash royale evo wheel",
    "clash royale champion wheel",
    "clash royale card generator",
    "clash royale deck generator",
    "clash royale random card",
    "clash royale spin the wheel challenge",
    "clash royale wheel of fortune",
    "free clash royale wheel",
    "clash royale tournament wheel",
    "clash royale game wheel"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/clash-royale-wheel"
  },
  openGraph: {
    title: "Clash Royale Wheel – Spin & Get Random Cards Instantly",
    description: "Use the Clash Royale Wheel to spin and instantly get random cards, decks, or champions. Free, fair, and perfect for Clash Royale challenges.",
    url: "https://www.thesmartcalculator.com/games/clash-royale-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clash Royale Wheel - Random Card Spinner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Clash Royale Wheel – Spin & Get Random Cards Instantly",
    description: "Use the Clash Royale Wheel to spin and instantly get random cards, decks, or champions. Free, fair, and perfect for Clash Royale challenges.",
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

export default function ClashRoyaleWheelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
