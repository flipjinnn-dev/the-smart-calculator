import { headers } from "next/headers";
import RetirementCalculatorClient from "./retirement-calculator-client";

export default async function RetirementCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/retirement-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/retirement-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/retirement-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/retirement-calculator/en.json`)).default;
  }

  return <RetirementCalculatorClient content={content} guideContent={guideContent} />;
}
