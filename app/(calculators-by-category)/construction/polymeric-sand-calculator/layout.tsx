import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/construction/polymeric-sand-calculator"

  return {
    title: {
      absolute: "Polymeric Sand Calculator — How Much Polymeric Sand Do I Need?",
    },
    description: "Free paver sand estimator to instantly find how many bags of polymeric jointing sand your project needs. Enter your area, joint width, and paver thickness and get an accurate result in seconds. Works for all major brands: Dominator, Techniseal, Alliance Gator, Gator Maxx, EZ Sand, and Unilock.",
    keywords: "polymeric sand calculator, paver sand calculator, polymeric sand estimator, joint sand calculator, how much polymeric sand do i need, polymeric sand coverage, polymeric sand bags needed, dominator polymeric sand calculator, techniseal polymeric sand calculator, alliance gator calculator, gator maxx calculator, polymeric jointing sand calculator, paver joint sand calculator, flagstone sand calculator, polymeric sand for pavers, polymeric sand coverage table, 50 lb bag polymeric sand coverage, polymeric sand per square foot, patio sand calculator, driveway sand calculator, walkway sand calculator, tumbled paver sand, wide joint polymeric sand, ez sand calculator, unilock sand calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Polymeric Sand Calculator — How Much Polymeric Sand Do I Need?",
      description: "Free paver sand estimator to instantly find how many bags of polymeric jointing sand your project needs. Works for Dominator, Techniseal, Alliance Gator, Gator Maxx, EZ Sand, and Unilock.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Polymeric Sand Calculator - How Much Polymeric Sand Do I Need?",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Polymeric Sand Calculator — How Much Polymeric Sand Do I Need?",
      description: "Free paver sand estimator to instantly find how many bags of polymeric jointing sand your project needs. Works for Dominator, Techniseal, Alliance Gator, Gator Maxx, EZ Sand, and Unilock.",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  }
}

export default function PolymericSandCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
