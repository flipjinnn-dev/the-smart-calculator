import { headers } from "next/headers";
import OverweightCalculatorClient from "./overweight-calculator-client";

export default async function OverweightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/overweight-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/overweight-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/overwieght-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/overwieght-calculator/en.json`)).default;
  }

  return <OverweightCalculatorClient content={content} guideContent={guideContent} />;
}
