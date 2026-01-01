import { headers } from "next/headers";
import GallonsPerSquareFootCalculatorClient from "./gallons-per-square-foot-calculator-client";

export default async function GallonsPerSquareFootCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/gallons-per-square-foot-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/gallons-per-square-foot-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/gallons-per-square-foot-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/gallons-per-square-foot-calculator/en.json`)).default;
  }

  return <GallonsPerSquareFootCalculatorClient content={content} guideContent={guideContent} />;
}
