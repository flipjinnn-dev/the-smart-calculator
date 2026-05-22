import type { Metadata } from "next"
import { getCanonicalUrl } from "@/lib/url-utils"

const CALCULATOR_ID = "depop-fee-calculator"
const canonicalUrl = getCanonicalUrl(CALCULATOR_ID, "en")

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://www.thesmartcalculator.com"),
    title: {
      absolute: "Depop Fee Calculator — Calculate Your Exact Profit",
    },
    description: "Free Depop fee calculator for US, UK & Australia sellers. Calculate selling fees, processing fees & net profit instantly. 0% fees for US/UK sellers!",
    keywords: "depop fee calculator, depop fees, depop selling fee, depop transaction fee, depop fee calculator us, depop fee calculator uk, depop fee calculator australia, depop processing fee, depop boosted listing fee, depop profit calculator, depop payout calculator, free depop calculator, depop fee and transaction fee calculator, depop seller fees 2026, depop 0 percent fee, depop vs poshmark fees, depop shipping fees, depop bundle fees, depop refund fees",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        en: canonicalUrl,
      },
    },
    openGraph: {
      title: "Depop Fee Calculator — Calculate Your Exact Profit",
      description: "Free Depop fee calculator for US, UK & Australia sellers. Calculate selling fees, processing fees & net profit instantly. 0% fees for US/UK sellers!",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Depop Fee Calculator - Calculate Your Exact Profit",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Depop Fee Calculator — Calculate Your Exact Profit",
      description: "Free Depop fee calculator for US, UK & Australia sellers. Calculate selling fees, processing fees & net profit instantly. 0% fees for US/UK sellers!",
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

export default function DepopFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
