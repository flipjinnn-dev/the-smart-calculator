import { Metadata } from "next";
import NoticePeriodCalculatorClient from "./notice-period-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/notice-period-calculator`;

  return {
    title: "Notice Period Calculator – Calculate Last Working Day",
    description: "Free online notice period calculator to instantly find your last working day, notice duration, end date, and estimate notice period pay accurately.",
    keywords: "notice period calculator, calculate notice period, last working day calculator, notice period end date, notice period pay calculator, resignation calculator, employment notice calculator, notice duration calculator, calendar days calculator, working days calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Notice Period Calculator – Calculate Last Working Day",
      description: "Free online notice period calculator to instantly find your last working day, notice duration, end date, and estimate notice period pay accurately.",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Notice Period Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Notice Period Calculator – Calculate Last Working Day",
      description: "Calculate your last working day, notice duration, and notice period pay instantly.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function NoticePeriodCalculatorPage() {
  return <NoticePeriodCalculatorClient />;
}
