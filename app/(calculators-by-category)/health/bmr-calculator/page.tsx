import { headers } from "next/headers";
import BmrCalculatorClient from "./bmr-calculator-client";

export default async function BmrCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/bmr-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/bmr-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/bmr-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/bmr-calculator/en.json`)).default;
  }

  return <BmrCalculatorClient content={content} guideContent={guideContent} />;
}
