import { headers } from "next/headers";
import PeriodCalculatorClient from "./period-calculator-client";

export default async function PeriodCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/period-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/period-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/period-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/period-calculator/en.json`)).default;
  }

  return <PeriodCalculatorClient content={content} guideContent={guideContent} />;
}
