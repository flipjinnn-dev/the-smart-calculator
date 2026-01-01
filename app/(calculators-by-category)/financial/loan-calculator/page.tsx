import { headers } from "next/headers";
import LoanCalculatorClient from "./loan-calculator-client";

export default async function LoanCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/loan-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/loan-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/loan-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/loan-calculator/en.json`)).default;
  }

  return <LoanCalculatorClient content={content} guideContent={guideContent} />;
}
