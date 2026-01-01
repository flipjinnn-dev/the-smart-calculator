import { headers } from "next/headers";
import TimeCalculatorClient from "./time-calculator-client";

export default async function TimeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/time-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/time-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/time-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/time-calculator/en.json`)).default;
  }

  return <TimeCalculatorClient content={content} guideContent={guideContent} />;
}
