import { headers } from "next/headers";
import InterestCalculatorClient from "./interest-calculator-client";

export default async function InterestCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/interest-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/interest-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/interest-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/interest-calculator/en.json`)).default;
  }

  return <InterestCalculatorClient content={content} guideContent={guideContent} />;
}
