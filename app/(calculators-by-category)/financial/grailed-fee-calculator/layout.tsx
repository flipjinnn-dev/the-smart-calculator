import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/financial/grailed-fee-calculator"

  return {
    title: {
      absolute: "Grailed Fee Calculator — Calculate Grailed Fees & Payout Instantly",
    },
    description: "Calculate Grailed fees instantly and know your exact payout before you list or accept an offer. Enter your sale price, choose domestic or international, and see your Grailed commission, payment processing fees, and net earnings in seconds.",
    keywords: "grailed fee calculator, grailed fees, grailed seller fees, grailed commission, grailed payout calculator, grailed seller fee calculator, grailed buyer fee calculator, grailed and paypal fee calculator, calculate grailed fees, grailed processing fees, grailed stripe fees, how much does grailed take, grailed fee breakdown, grailed 9 percent fee, grailed international fees, grailed domestic fees, what is grailed fee, grailed fees 2026, grailed calculator, resale fee calculator, streetwear resale fees, designer resale calculator, grailed profit calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Grailed Fee Calculator — Calculate Grailed Fees & Payout Instantly",
      description: "Calculate Grailed fees instantly and know your exact payout before you list. Free Grailed fee calculator shows commission, processing fees, and net earnings in seconds.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Grailed Fee Calculator - Calculate Your Exact Payout",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Grailed Fee Calculator — Calculate Grailed Fees & Payout Instantly",
      description: "Calculate Grailed fees instantly and know your exact payout before you list. Free Grailed fee calculator shows commission, processing fees, and net earnings in seconds.",
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

export default function GrailedFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
