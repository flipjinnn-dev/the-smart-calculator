import { headers } from "next/headers";
import InvestmentCalculatorClient from "./investment-calculator-client";

export default async function InvestmentCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/investment-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/investment-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/investment-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/investment-calculator/en.json`)).default;
  }

  return <InvestmentCalculatorClient content={content} guideContent={guideContent} />;
}
