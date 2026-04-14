import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/health/peth-test-calculator"

  return {
    title: {
      absolute: "Peth Test Calculator | Alcohol Clearance Date",
    },
    description: "Estimate your PEth level and alcohol clearance date using half-life science. Learn detection window, cutoff levels, and safe testing timeline.",
    keywords: "peth test calculator, peth calculator, peth level calculator, peth half life calculator, peth elimination calculator, peth test time frame, peth calculator online, peth blood test, phosphatidylethanol test, alcohol biomarker test, peth test detection window, peth test accuracy, how long does peth test take, can peth test detect one drink, peth test results, peth clearance calculator, alcohol abstinence test, peth test for court, peth test probation",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Peth Test Calculator | Alcohol Clearance Date",
      description: "Estimate your PEth level and alcohol clearance date using half-life science. Learn detection window, cutoff levels, and safe testing timeline.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Peth Test Calculator - Alcohol Clearance Date",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Peth Test Calculator | Alcohol Clearance Date",
      description: "Estimate your PEth level and alcohol clearance date using half-life science. Learn detection window, cutoff levels, and safe testing timeline.",
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

export default function PethTestCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
