import { headers } from "next/headers";
import { Metadata } from "next";
import BreastImplantSizeCalculatorClient from "./breast-client";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.thesmartcalculator.com";
  const canonicalUrl = `${baseUrl}/implant-size-calculator`;

  return {
    title: "Breast Implant Size Calculator – Find Your Perfect Fit",
    description: "Use our Breast Implant Size Calculator to find the ideal implant volume and cup size for a natural, proportional look. Calculate cc to cup size conversions instantly.",
    keywords: "breast implant calculator, breast implant size calculator, breast implant cc calculator, implant size chart, breast augmentation calculator, breast implant cup size calculator",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Breast Implant Size Calculator – Find Your Perfect Fit",
      description: "Use our Breast Implant Size Calculator to find the ideal implant volume and cup size for a natural, proportional look.",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Breast Implant Size Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Breast Implant Size Calculator – Find Your Perfect Fit",
      description: "Calculate the ideal breast implant size for your body and desired cup size.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BreastImplantSizeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/breast-implant-size-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/breast-implant-size-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/breast-implant-size-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/breast-implant-size-calculator/en.json`)).default;
  }

  return <BreastImplantSizeCalculatorClient content={content} guideContent={guideContent} />;
}
