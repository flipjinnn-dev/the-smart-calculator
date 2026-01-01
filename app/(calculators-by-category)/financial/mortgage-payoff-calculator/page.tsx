import { headers } from "next/headers";
import MortgagePayoffCalculatorClient from "./mortgage-payoff-calculator-client";

export default async function MortgagePayoffCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/mortgage-payoff-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/mortgage-payoff-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/mortgage-payoff-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/mortgage-payoff-calculator/en.json`)).default;
  }

  return <MortgagePayoffCalculatorClient content={content} guideContent={guideContent} />;
}
