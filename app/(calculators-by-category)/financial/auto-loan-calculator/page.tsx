import { headers } from "next/headers";
import AutoLoanCalculatorClient from "./auto-loan-calculator-client";

export default async function AutoLoanCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/auto-loan-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/auto-loan-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/auto-loan-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/auto-loan-calculator/en.json`)).default;
  }

  return <AutoLoanCalculatorClient content={content} guideContent={guideContent} />;
}
