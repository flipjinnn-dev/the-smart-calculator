import { headers } from "next/headers";
import SavingsCalculatorClient from "./savings-calculator-client";

export default async function SavingsCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/savings-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/savings-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/savings-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/savings-calculator/en.json`)).default;
  }

  return <SavingsCalculatorClient content={content} guideContent={guideContent} />;
}
