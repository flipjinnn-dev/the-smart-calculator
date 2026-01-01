import { headers } from "next/headers";
import CurrencyCalculatorClient from "./currency-calculator-client";

export default async function CurrencyCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/currency-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/currency-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/currency-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/currency-calculator/en.json`)).default;
  }

  return <CurrencyCalculatorClient content={content} guideContent={guideContent} />;
}
