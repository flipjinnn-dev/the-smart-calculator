import { headers } from "next/headers";
import HouseAffordabilityCalculatorClient from "./house-affordability-calculator-client";

export default async function HouseAffordabilityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/house-affordability-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/house-affordability-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/house-affordability-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/house-affordability-calculator/en.json`)).default;
  }

  return <HouseAffordabilityCalculatorClient content={content} guideContent={guideContent} />;
}
