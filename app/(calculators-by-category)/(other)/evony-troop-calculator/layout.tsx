import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/games/evony-troop-calculator"

  return {
    title: {
      absolute: "Evony Troop Calculator | RSS, Power & Cost Tool",
    },
    description: "Use Evony Troop Calculator to estimate troop cost, RSS, power, training & healing. Plan T1–T16 troops, optimize PvP & save resources easily.",
    keywords: "evony troop calculator, evony troop cost calculator, evony rss calculator, evony troop power calculator, evony troop tier calculator, evony troop training calculator, evony troop healing cost calculator, evony troop layering calculator, evony troop build calculator, evony calculator, evony the king's return calculator, t1 to t16 troops, mounted cavalry cost, ground infantry cost, ranged troops cost, siege troops cost, evony resource calculator, evony training cost, evony power gain calculator, evony keep level troops, evony pvp calculator, evony boss troop calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Evony Troop Calculator | RSS, Power & Cost Tool",
      description: "Use Evony Troop Calculator to estimate troop cost, RSS, power, training & healing. Plan T1–T16 troops, optimize PvP & save resources easily.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Evony Troop Calculator - RSS, Power & Cost Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Evony Troop Calculator | RSS, Power & Cost Tool",
      description: "Use Evony Troop Calculator to estimate troop cost, RSS, power, training & healing. Plan T1–T16 troops, optimize PvP & save resources easily.",
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

export default function EvonyTroopCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
