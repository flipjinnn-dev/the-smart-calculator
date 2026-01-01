import { headers } from "next/headers";
import TdeeCalculatorClient from "./tdee-calculator-client";

export default async function TdeeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/tdee-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/tdee-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/tdee-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/tdee-calculator/en.json`)).default;
  }

  return <TdeeCalculatorClient content={content} guideContent={guideContent} />;
}
