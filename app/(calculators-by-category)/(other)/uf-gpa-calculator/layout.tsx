import type { Metadata } from "next";

import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "uf-gpa-calculator";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

const canonicalUrl = "https://www.thesmartcalculator.com/uf-gpa-calculator";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thesmartcalculator.com"),
  title: "UF GPA Calculator | Calculate GPA Instantly UF",
  description:
    "Use UF GPA Calculator to calculate semester, cumulative, science & transfer GPA instantly with UF grading scale. 100% free and accurate tool.",
  alternates: {
    canonical: canonicalUrl,
  },
  keywords: [
    "UF GPA calculator",
    "University of Florida GPA",
    "UF grading scale",
    "UF cumulative GPA",
    "UF semester GPA",
    "UF grade point deficit",
    "DPC calculator UF",
    "UF science GPA",
    "UF transfer GPA",
    "GPA calculator Gainesville",
  ],
  openGraph: {
    title: "UF GPA Calculator | Calculate GPA Instantly UF",
    description:
      "Use UF GPA Calculator to calculate semester, cumulative, science & transfer GPA instantly with UF grading scale. 100% free and accurate tool.",
    url: canonicalUrl,
    siteName: "The Smart Calculator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UF GPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UF GPA Calculator | Calculate GPA Instantly UF",
    description:
      "Use UF GPA Calculator to calculate semester, cumulative, science & transfer GPA instantly with UF grading scale. 100% free and accurate tool.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UfGpaCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
