import { headers } from "next/headers";
import BodyFatCalculatorClient from "./body-fat-calculator-client";

export default async function BodyFatCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/body-fat-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/body-fat-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/body-fat-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/body-fat-calculator/en.json`)).default;
  }

  return <BodyFatCalculatorClient content={content} guideContent={guideContent} />;
}
