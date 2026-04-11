import { headers } from "next/headers"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/msi-calculator"

  return {
    title: {
      absolute: "MSI Calculator – Power Supply, Wattage & PC Build Calculator",
    },
    description: "An MSI calculator helps you estimate your PC's power consumption, PSU wattage requirements, and component compatibility. It analyzes CPU, GPU, RAM, storage, and other hardware to calculate total wattage and recommend the ideal power supply for stable performance.",
    keywords: "msi calculator, msi power supply calculator, msi psu calculator, msi wattage calculator, msi pc build calculator, msi gpu calculator, msi bottleneck calculator, msi power consumption calculator, msi tdp calculator, msi afterburner calculator, msi dram calculator, msi motherboard calculator, msi price calculator, power supply calculator, psu wattage calculator, pc power calculator, kalkulator zasilacza msi, msi zasilacz kalkulator, msi calculator alimentation, pc build power calculator, gaming pc psu calculator, msi psu calculator reddit",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "MSI Calculator – Power Supply, Wattage & PC Build Calculator",
      description: "An MSI calculator helps you estimate your PC's power consumption, PSU wattage requirements, and component compatibility. It analyzes CPU, GPU, RAM, storage, and other hardware to calculate total wattage and recommend the ideal power supply.",
      url: canonicalUrl,
      siteName: "The Smart Calculator",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "MSI Calculator - Power Supply Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "MSI Calculator – Power Supply, Wattage & PC Build Calculator",
      description: "An MSI calculator helps you estimate your PC's power consumption, PSU wattage requirements, and component compatibility. It analyzes CPU, GPU, RAM, storage, and other hardware to calculate total wattage.",
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

export default function MSICalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
