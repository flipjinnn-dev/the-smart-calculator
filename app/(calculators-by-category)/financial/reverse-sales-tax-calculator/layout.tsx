import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = "https://www.thesmartcalculator.com/financial/reverse-sales-tax-calculator";

  return {
    title: {
      absolute: "Reverse Sales Tax Calculator",
    },
    description: "Reverse Sales Tax Calculator: Easily calculate original price before tax. Enter total amount & tax rate to get accurate pre-tax value instantly.",
    keywords: "reverse sales tax calculator, pre-tax price calculator, tax inclusive calculator, extract sales tax, back out sales tax, gross to net calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Reverse Sales Tax Calculator",
      description: "Reverse Sales Tax Calculator: Easily calculate original price before tax. Enter total amount & tax rate to get accurate pre-tax value instantly.",
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Reverse Sales Tax Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Reverse Sales Tax Calculator",
      description: "Reverse Sales Tax Calculator: Easily calculate original price before tax. Enter total amount & tax rate to get accurate pre-tax value instantly.",
      images: ["/og-image.png"],
    },
  };
}

export default async function ReverseSalesTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
