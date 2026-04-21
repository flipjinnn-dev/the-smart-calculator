import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Celebrity Wheel Spin – Random Famous Person Picker",
  description: "Spin the Celebrity Wheel to get random famous people instantly. Use this free celebrity spinner for games, fun challenges, and creative ideas.",
  keywords: [
    "celebrity wheel",
    "celebrity wheel spinner",
    "random celebrity wheel",
    "celebrity picker wheel",
    "spin the wheel celebrity",
    "celebrity name generator",
    "random famous person generator",
    "free celebrity wheel",
    "celebrity spinner",
    "random celebrity picker",
    "celebrity wheel game",
    "famous person wheel",
    "celebrity random picker",
    "spin wheel celebrity",
    "celebrity trivia wheel"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/celebrity-wheel"
  },
  openGraph: {
    title: "Celebrity Wheel Spin – Random Famous Person Picker",
    description: "Spin the Celebrity Wheel to get random famous people instantly. Use this free celebrity spinner for games, fun challenges, and creative ideas.",
    url: "https://www.thesmartcalculator.com/games/celebrity-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Celebrity Wheel - Random Famous Person Picker"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Celebrity Wheel Spin – Random Famous Person Picker",
    description: "Spin the Celebrity Wheel to get random famous people instantly. Use this free celebrity spinner for games, fun challenges, and creative ideas.",
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

export default function CelebrityWheelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
