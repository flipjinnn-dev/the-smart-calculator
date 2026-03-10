import { Metadata } from "next"
import OVRCalculatorClient from "./OVRCalculatorClient"

export const metadata: Metadata = {
  title: 'OVR Calculator – Calculate Overall Rating Easily',
  description: 'Use our OVR Calculator to quickly compute overall ratings from stats, weights, and performance metrics. Fast, accurate, and easy to use.',
  keywords: 'ovr calculator, overall rating calculator, fc mobile ovr calculator, ovr calculator fifa mobile, ovr calculator ea fc, how to calculate ovr in fifa, team ovr calculator in fc mobile, ovr calculator renderz, ovr calculator online, ovr calculator fc 26',
  alternates: {
    canonical: 'https://www.thesmartcalculator.com/ovr-calculator',
    languages: {
      'x-default': 'https://www.thesmartcalculator.com/ovr-calculator',
      'en': 'https://www.thesmartcalculator.com/ovr-calculator',
    }
  },
  openGraph: {
    title: 'OVR Calculator – Calculate Overall Rating Easily',
    description: 'Use our OVR Calculator to quickly compute overall ratings from stats, weights, and performance metrics. Fast, accurate, and easy to use.',
    url: 'https://www.thesmartcalculator.com/ovr-calculator',
    type: 'website',
    siteName: 'Smart Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OVR Calculator – Calculate Overall Rating Easily',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OVR Calculator – Calculate Overall Rating Easily',
    description: 'Use our OVR Calculator to quickly compute overall ratings from stats, weights, and performance metrics. Fast, accurate, and easy to use.',
    images: ['/og-image.png'],
  },
}

export default function OVRCalculatorPage() {
  return <OVRCalculatorClient />
}
