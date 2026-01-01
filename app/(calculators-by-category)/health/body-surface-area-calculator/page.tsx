import { headers } from "next/headers";
import BodySurfaceAreaCalculatorClient from "./body-surface-area-calculator-client";

export default async function BodySurfaceAreaCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/body-surface-area-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/body-surface-area-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/bsa-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/bsa-calculator/en.json`)).default;
  }

  return <BodySurfaceAreaCalculatorClient content={content} guideContent={guideContent} />;
}
