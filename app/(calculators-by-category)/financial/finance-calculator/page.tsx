import { headers } from "next/headers";
import FinanceCalculatorClient from "./finance-calculator-client";

export default async function FinanceCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/finance-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/finance-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/finance-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/finance-calculator/en.json`)).default;
  }

  return <FinanceCalculatorClient content={content} guideContent={guideContent} />;
}
