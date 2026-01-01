import { headers } from "next/headers";
import CarJumpDistanceCalculatorClient from "./car-jump-distance-calculator-client";

export default async function CarJumpDistanceCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/car-jump-distance-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/car-jump-distance-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/car-jump-distance-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/car-jump-distance-calculator/en.json`)).default;
  }

  return <CarJumpDistanceCalculatorClient content={content} guideContent={guideContent} />;
}
