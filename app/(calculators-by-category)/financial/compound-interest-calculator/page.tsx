import { headers } from "next/headers";
import CompoundInterestCalculatorClient from "./compound-interest-calculator-client";

export default async function CompoundInterestCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/compound-interest-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/compound-interest-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/compound-interest-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/compound-interest-calculator/en.json`)).default;
  }

  return <CompoundInterestCalculatorClient content={content} guideContent={guideContent} />;
}