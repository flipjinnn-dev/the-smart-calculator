import { headers } from "next/headers";
import PregnancyCalculatorClient from "./pregnancy-calculator-client";

export default async function PregnancyCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/pregnancy-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/pregnancy-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/pregnancy-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/pregnancy-calculator/en.json`)).default;
  }

  return <PregnancyCalculatorClient content={content} guideContent={guideContent} />;
}
