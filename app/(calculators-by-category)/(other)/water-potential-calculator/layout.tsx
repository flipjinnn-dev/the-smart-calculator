import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/water-potential-calculator"

  return {
    title: {
      absolute: "Water Potential Calculator | AP Biology & A-Level Guide",
    },
    description: "Calculate water potential (ψ) instantly using ψ = ψs + ψp. Includes osmotic, pressure potential & examples for AP Bio & A-Level labs.",
    keywords: "water potential calculator, water potential formula, osmotic potential calculator, ap biology water potential, a-level water potential, water potential calculator with temperature, calculate water potential, water potential of potato cells, water potential of zucchini cores, water potential equilibrium, ψ calculator, psi calculator biology, solute potential calculator, pressure potential calculator, turgor pressure calculator, plasmolysis calculator, water potential experiment, water potential lab, sucrose solution water potential, plant cell water potential",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Water Potential Calculator | AP Biology & A-Level Guide",
      description: "Calculate water potential (ψ) instantly using ψ = ψs + ψp. Includes osmotic, pressure potential & examples for AP Bio & A-Level labs.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Water Potential Calculator - AP Biology & A-Level",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Water Potential Calculator | AP Biology & A-Level Guide",
      description: "Calculate water potential (ψ) instantly using ψ = ψs + ψp. Includes osmotic, pressure potential & examples for AP Bio & A-Level labs.",
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

export default function WaterPotentialCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
