import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesmartcalculator.com"),
  title: "Shipping Cost Calculator | Fast Shipping Estimates",
  description:
    "Use our Shipping Price Calculator to get fast, accurate shipping estimates for local & worldwide delivery.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/shipping-cost-calculator",
  },
  openGraph: {
    title: "Shipping Cost Calculator | Fast Shipping Estimates",
    description:
      "Use our Shipping Price Calculator to get fast, accurate shipping estimates for local & worldwide delivery.",
    type: "website",
    url: "https://www.thesmartcalculator.com/shipping-cost-calculator",
    siteName: "Smart Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shipping Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping Cost Calculator | Fast Shipping Estimates",
    description:
      "Use our Shipping Price Calculator to get fast, accurate shipping estimates for local & worldwide delivery.",
    images: ["/og-image.png"],
  },
}

export default function ShippingCostCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
