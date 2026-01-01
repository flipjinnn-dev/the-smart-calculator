import { headers } from "next/headers";
import PercentageCalculatorClient from "./percentage-calculator-client";

export default async function PercentageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/percentage-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/percentage-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/percentage-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/percentage-calculator/en.json`)).default;
  }

  return <PercentageCalculatorClient content={content} guideContent={guideContent} />;
}
