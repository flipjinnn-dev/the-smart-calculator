import { headers } from "next/headers";
import AgeCalculatorClient from "./age-calculator-client";

export default async function AgeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/age-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/age-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/age-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/age-calculator/en.json`)).default;
  }

  return <AgeCalculatorClient content={content} guideContent={guideContent} />;
}
