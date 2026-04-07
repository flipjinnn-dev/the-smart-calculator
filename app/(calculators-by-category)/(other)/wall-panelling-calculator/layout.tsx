import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/wall-panelling-calculator"

  return {
    title: {
      absolute: "Wall Panelling Calculator Free Online Tool, Formulas & Complete Guide",
    },
    description: "Calculate how much wall panelling you need instantly. Free UK calculator for MDF, shaker, dado, box & wood panels. Get accurate measurements, spacing & costs.",
    keywords: "wall panelling calculator, wall panelling calculator uk, panelling calculator, mdf panelling calculator, shaker panelling calculator, dado panelling calculator, box panelling calculator, wood panelling calculator, wall panel calculator, panelling spacing calculator, panelling height calculator, how to calculate wall panelling, wall panelling cost calculator, panelling measurement calculator, wall panel spacing, dado rail height calculator, shaker panel spacing, wall panelling uk, pvc wall panels calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Wall Panelling Calculator Free Online Tool, Formulas & Complete Guide",
      description: "Calculate how much wall panelling you need instantly. Free UK calculator for MDF, shaker, dado, box & wood panels. Get accurate measurements, spacing & costs.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Wall Panelling Calculator Free Online Tool, Formulas & Complete Guide",
      description: "Calculate how much wall panelling you need instantly. Free UK calculator for MDF, shaker, dado, box & wood panels. Get accurate measurements, spacing & costs.",
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
  }
}

export default function WallPanellingCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
