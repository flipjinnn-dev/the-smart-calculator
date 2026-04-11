import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/construction/flange-weight-calculator"

  return {
    title: {
      absolute: "Flange Weight Calculator – Accurate, Fast & Easy Online Tool",
    },
    description: "A flange weight calculator helps you determine the weight of a flange in kilograms (kg) or pounds by using standard formulas based on outer diameter, inner diameter, thickness, and material density. It is widely used in piping, fabrication, and engineering industries to estimate load, cost, and transport requirements.",
    keywords: "flange weight calculator, flange weight calculator in kg, blind flange weight calculator, weld neck flange weight calculator, slip on flange weight calculator, raised face flange weight calculator, ring flange weight calculator, reducing flange weight calculator, carbon steel flange weight calculator, stainless steel flange weight calculator, ms flange weight calculator, ss flange weight calculator, pipe flange weight calculator, flange weight chart, asme flange weight calculator, flange weight calculator excel, flange weight and dimensions, flange weight formula, calculate flange weight, online flange weight calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Flange Weight Calculator – Accurate, Fast & Easy Online Tool",
      description: "A flange weight calculator helps you determine the weight of a flange in kilograms (kg) or pounds by using standard formulas based on outer diameter, inner diameter, thickness, and material density.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Flange Weight Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flange Weight Calculator – Accurate, Fast & Easy Online Tool",
      description: "A flange weight calculator helps you determine the weight of a flange in kilograms (kg) or pounds by using standard formulas based on outer diameter, inner diameter, thickness, and material density.",
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

export default function FlangeWeightCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
