import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/seatime-calculator"

  return {
    title: {
      absolute: "Seatime Calculator — Accurate Sea Time Calculation for Seafarers",
    },
    description: "Instantly calculate your total sea service in days and months with this free seatime calculator. Perfect for DG Shipping (India), MCA (UK), USCG (USA), and STCW applications. Track multiple voyages, avoid errors, and submit your CoC applications confidently.",
    keywords: "seatime calculator, sea time calculator, seatime calculator online, free seatime calculator, DG Shipping seatime calculator, seatime calculator MCA, seatime calculator USCG, Clyde Marine seatime calculator, seatime calculator in days, onboard maritime seatime calculator, seatime calculator Excel, seatime tracker, sea service calculator, CoC application, Certificate of Competency, STCW seatime, deck cadet seatime, OOW seatime requirements, AB seatime requirements, master license seatime, seafarer sea time, CDC seatime, maritime seatime calculation, sea service record, watchkeeping service calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Seatime Calculator — Accurate Sea Time Calculation for Seafarers",
      description: "Instantly calculate your total sea service in days and months with this free seatime calculator. Perfect for DG Shipping (India), MCA (UK), USCG (USA), and STCW applications.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Seatime Calculator - Accurate Sea Time Calculation for Seafarers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Seatime Calculator — Accurate Sea Time Calculation for Seafarers",
      description: "Instantly calculate your total sea service in days and months with this free seatime calculator. Perfect for DG Shipping (India), MCA (UK), USCG (USA), and STCW applications.",
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

export default function SeatimeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
