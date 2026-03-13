import { Metadata } from "next";
import TwinFlameCalculatorClient from "./twin-flame-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Twin Flame Calculator - Free Online Tool",
    description:
      "Use our twin flame calculator free to check spiritual compatibility by name, date of birth, numerology, birth chart, and lunar match.",
    alternates: {
      canonical: "https://www.thesmartcalculator.com/twin-flame-calculator",
      languages: {
        'x-default': "https://www.thesmartcalculator.com/twin-flame-calculator",
        'en': "https://www.thesmartcalculator.com/twin-flame-calculator",
      }
    },
    openGraph: {
      title: "Twin Flame Calculator - Free Online Tool",
      description: "Use our twin flame calculator free to check spiritual compatibility by name, date of birth, numerology, birth chart, and lunar match.",
      url: "https://www.thesmartcalculator.com/twin-flame-calculator",
      type: "website",
      siteName: "Smart Calculator",
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: "Twin Flame Calculator - Free Online Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Twin Flame Calculator - Free Online Tool",
      description: "Use our twin flame calculator free to check spiritual compatibility by name, date of birth, numerology, birth chart, and lunar match.",
      images: ["/og-image.png"],
    },
  };
}

export default async function TwinFlameCalculatorPage() {
  let content = null;
  let guideContent = null;

  try {
    content = (await import(`@/app/content/calculator-ui/twin-flame-calculator/en.json`)).default;
  } catch {
    content = null;
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/twin-flame-calculator/en.json`)).default;
  } catch {
    guideContent = null;
  }
  return <TwinFlameCalculatorClient content={content} guideContent={guideContent} />;
}
