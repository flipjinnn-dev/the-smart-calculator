import { headers } from "next/headers";
import MortgageCalculatorClient from "./mortgage-calculator-client";

export default async function MortgageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/mortgage-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/mortgage-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/mortgage-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/mortgage-calculator/en.json`)).default;
  }

  return <MortgageCalculatorClient content={content} guideContent={guideContent} />;
}
