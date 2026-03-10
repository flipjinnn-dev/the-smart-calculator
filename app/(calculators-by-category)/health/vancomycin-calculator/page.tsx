import { headers } from "next/headers";
import type { Metadata } from "next";
import { calculatorsMeta } from "@/meta/calculators";
import VancomycinCalculatorClient from "./vancomycin-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const calculatorId = 'vancomycin-calculator';
  const meta = calculatorsMeta[calculatorId]?.[language] || calculatorsMeta[calculatorId]?.['en'];
  const canonicalUrl = "/health/vancomycin-calculator";

  return {
    title: meta?.title || 'Vancomycin Calculator | AUC, Dose & Trough',
    description: meta?.description || 'Use our vancomycin calculator to estimate AUC, dose, trough levels, and dosing for pediatrics, renal impairment, and hemodialysis patients.',
    keywords: meta?.keywords || 'vancomycin calculator, vancomycin dosing calculator, vancomycin auc calculator',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta?.title || 'Vancomycin Calculator | AUC, Dose & Trough',
      description: meta?.description || 'Use our vancomycin calculator to estimate AUC, dose, trough levels, and dosing for pediatrics, renal impairment, and hemodialysis patients.',
      url: canonicalUrl,
      type: 'website',
      siteName: 'Smart Calculator',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: meta?.title || 'Vancomycin Calculator',
        },
      ],
    }
  };
}

export default async function VancomycinCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/vancomycin-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/vancomycin-calculator/en.json`)).default;
  }

  return <VancomycinCalculatorClient content={content} />;
}
