import { headers } from "next/headers";
import BattingAverageCalculatorClient from "./batting-average-calculator-client";

export default async function BattingAverageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/batting-average-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/batting-average-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/batting-average-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/batting-average-calculator/en.json`)).default;
  }

  return <BattingAverageCalculatorClient content={content} guideContent={guideContent} />;
}
