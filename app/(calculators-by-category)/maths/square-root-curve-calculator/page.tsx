import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import { calculatorsMeta } from "@/meta/calculators";
import SquareRootCurveCalculatorClient from "./square-root-curve-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const calculatorId = 'square-root-curve-calculator';
  const meta = calculatorsMeta[calculatorId]?.[language] || calculatorsMeta[calculatorId]?.['en'];
  const canonicalUrl = getCanonicalUrl(calculatorId, language);

  return {
    title: meta?.title || 'Square Root Curve Calculator',
    description: meta?.description || 'Calculate square root curve values',
    keywords: meta?.keywords || 'square root, curve, calculator',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': getCanonicalUrl(calculatorId, 'en'),
        'pt-BR': getCanonicalUrl(calculatorId, 'br'),
        'pl': getCanonicalUrl(calculatorId, 'pl'),
        'de': getCanonicalUrl(calculatorId, 'de'),
        'es': getCanonicalUrl(calculatorId, 'es'),
      }
    },
    openGraph: {
      title: meta?.title || 'Square Root Curve Calculator',
      description: meta?.description || 'Calculate square root curve values',
      url: canonicalUrl,
      type: 'website',
    }
  };
}

export default async function SquareRootCurveCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/square-root-curve-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/square-root-curve-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/square-root-curve-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/square-root-curve-calculator/en.json`)).default;
  }

  return <SquareRootCurveCalculatorClient content={content} guideContent={guideContent} />;
}
