import { headers } from "next/headers";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import { calculatorsMeta } from "@/meta/calculators";
import SalaryCalculatorClient from "./salary-calculator-client";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  const calculatorId = 'salary-calculator';
  const meta = calculatorsMeta[calculatorId]?.[language] || calculatorsMeta[calculatorId]?.['en'];
  const canonicalUrl = getCanonicalUrl(calculatorId, language);

  return {
    title: meta?.title || 'Salary Calculator',
    description: meta?.description || 'Calculate salary and compensation',
    keywords: meta?.keywords || 'salary, calculator, compensation',
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
      title: meta?.title || 'Salary Calculator',
      description: meta?.description || 'Calculate salary and compensation',
      url: canonicalUrl,
      type: 'website',
    }
  };
}

export default async function SalaryCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/salary-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/salary-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/salary-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/salary-calculator/en.json`)).default;
  }

  return <SalaryCalculatorClient content={content} guideContent={guideContent} />;
}
