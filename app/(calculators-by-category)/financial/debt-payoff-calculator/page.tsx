import { headers } from "next/headers";
import DebtPayoffCalculatorClient from "./debt-payoff-calculator-client";

export default async function DebtPayoffCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/debt-payoff-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/debt-payoff-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/debt-payoff-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/debt-payoff-calculator/en.json`)).default;
  }

  return <DebtPayoffCalculatorClient content={content} guideContent={guideContent} />;
}
