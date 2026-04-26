import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Cartoon Character Wheel – Random Character Picker & Spinner",
  description: "Spin the Cartoon Character Wheel to pick random cartoon characters instantly. Free cartoon character wheel generator for drawing, games & fun. No signup needed!",
  keywords: [
    "cartoon character wheel",
    "cartoon character wheel generator",
    "cartoon character wheel spinner",
    "cartoon character wheel picker",
    "random cartoon character generator wheel",
    "cartoon character spin the wheel",
    "cartoon character drawing wheel",
    "wheel of cartoon characters",
    "Disney cartoon character wheel",
    "female cartoon character wheel",
    "girl cartoon character wheel",
    "random cartoon anime character wheel",
    "cartoon character name wheel",
    "cartoon character wheel of names",
    "random cartoon character spin the wheel",
    "popular cartoon character wheel",
    "cartoon character color wheel",
    "free cartoon character wheel",
    "online cartoon character spinner"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/cartoon-character-wheel"
  },
  openGraph: {
    title: "Cartoon Character Wheel – Random Character Picker & Spinner",
    description: "Spin the Cartoon Character Wheel to pick random cartoon characters instantly. Free cartoon character wheel generator for drawing, games & fun. No signup needed!",
    url: "https://www.thesmartcalculator.com/games/cartoon-character-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cartoon Character Wheel - Random Character Picker"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartoon Character Wheel – Random Character Picker & Spinner",
    description: "Spin the Cartoon Character Wheel to pick random cartoon characters instantly. Free cartoon character wheel generator for drawing, games & fun. No signup needed!",
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

export default function CartoonCharacterWheelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
