import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Wheel Of Chores — Free Spin & Assign Chores Fairly",
  description: "Spin the Wheel Of Chores and assign household tasks fairly in seconds. Free chore wheel generator for kids, adults & roommates. No sign-up needed — try now!",
  keywords: [
    "wheel of chores",
    "chore wheel",
    "chore wheel generator",
    "digital chore wheel",
    "chore wheel generator online",
    "printable chore wheel",
    "spin wheel chore chart",
    "chore wheel for kids",
    "chore wheel for roommates",
    "randomizer system",
    "decision wheel mechanism",
    "probability fairness",
    "behavior management systems",
    "family productivity methods",
    "education-based chore systems",
    "household chore wheel",
    "free chore wheel",
    "online chore spinner",
    "chore assignment tool"
  ],
  alternates: {
    canonical: "https://www.thesmartcalculator.com/games/chore-wheel"
  },
  openGraph: {
    title: "Wheel Of Chores — Free Spin & Assign Chores Fairly",
    description: "Spin the Wheel Of Chores and assign household tasks fairly in seconds. Free chore wheel generator for kids, adults & roommates. No sign-up needed — try now!",
    url: "https://www.thesmartcalculator.com/games/chore-wheel",
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "https://www.thesmartcalculator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wheel Of Chores - Free Chore Assignment Tool"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Wheel Of Chores — Free Spin & Assign Chores Fairly",
    description: "Spin the Wheel Of Chores and assign household tasks fairly in seconds. Free chore wheel generator for kids, adults & roommates. No sign-up needed — try now!",
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

export default function ChoreWheelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
