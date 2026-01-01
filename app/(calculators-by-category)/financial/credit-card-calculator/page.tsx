import { headers } from "next/headers";
import CreditCardCalculatorClient from "./credit-card-calculator-client";

export default async function CreditCardCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/credit-card-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/credit-card-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/credit-card-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/credit-card-calculator/en.json`)).default;
  }

  return <CreditCardCalculatorClient content={content} guideContent={guideContent} />;
}
