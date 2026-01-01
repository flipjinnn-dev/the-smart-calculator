import { headers } from "next/headers";
import MarriageCalculatorClient from "./marriage-calculator-client";

export default async function MarriageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/marriage-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/marriage-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/marriage-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/marriage-calculator/en.json`)).default;
  }

  return <MarriageCalculatorClient content={content} guideContent={guideContent} />;
}
