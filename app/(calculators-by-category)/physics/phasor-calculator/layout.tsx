import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/physics/phasor-calculator"

  return {
    title: {
      absolute: "Phasor Calculator Guide: AC Circuits Made Simple",
    },
    description: "Learn phasor calculator concepts for AC circuits, conversions, impedance, and power factor. Simple guide with formulas, examples, and FAQs.",
    keywords: "phasor calculator, phasor conversion, rectangular to polar, polar to rectangular, ac circuit analysis, impedance calculator, complex number calculator, phasor diagram, euler formula, atan2 calculator, electrical engineering calculator, power factor calculator, ac ohm's law, phasor arithmetic, sinusoid to phasor, three phase phasor, RLC circuit phasor, phasor addition, phasor multiplication, electrical phasor, ac steady state analysis, complex impedance, phasor domain, time domain to phasor",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Phasor Calculator Guide: AC Circuits Made Simple",
      description: "Learn phasor calculator concepts for AC circuits, conversions, impedance, and power factor. Simple guide with formulas, examples, and FAQs.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Phasor Calculator - AC Circuits Made Simple",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Phasor Calculator Guide: AC Circuits Made Simple",
      description: "Learn phasor calculator concepts for AC circuits, conversions, impedance, and power factor. Simple guide with formulas, examples, and FAQs.",
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

export default function PhasorCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
