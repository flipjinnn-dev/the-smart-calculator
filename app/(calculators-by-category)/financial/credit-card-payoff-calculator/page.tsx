import { headers } from "next/headers";
import CreditCardPayoffCalculatorClient from "./credit-card-payoff-calculator-client";

export default async function CreditCardPayoffCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/credit-card-payoff-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/credit-card-payoff-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/credit-card-payoff-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/credit-card-payoff-calculator/en.json`)).default;
  }

  return <CreditCardPayoffCalculatorClient content={content} guideContent={guideContent} />;
}
