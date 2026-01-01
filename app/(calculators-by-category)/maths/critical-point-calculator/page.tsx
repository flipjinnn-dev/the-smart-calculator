import { headers } from "next/headers";
import CriticalPointCalculatorClient from "./critical-point-calculator-client";

export default async function CriticalPointCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/critical-point-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/critical-point-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/critical-point-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/critical-point-calculator/en.json`)).default;
  }

  return <CriticalPointCalculatorClient content={content} guideContent={guideContent} />;
}
