import { headers } from "next/headers";
import CubicYardCalculatorClient from "./cubic-yard-calculator-client";

export default async function CubicYardCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/cubic-yard-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/cubic-yard-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/cubic-yard-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/cubic-yard-calculator/en.json`)).default;
  }

  return <CubicYardCalculatorClient content={content} guideContent={guideContent} />;
}
