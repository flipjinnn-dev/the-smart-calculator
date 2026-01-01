import { headers } from "next/headers";
import OneRepMaxCalculatorClient from "./one-rep-max-calculator-client";

export default async function OneRepMaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/one-rep-max-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/one-rep-max-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/one-rap-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/one-rap-calculator/en.json`)).default;
  }

  return <OneRepMaxCalculatorClient content={content} guideContent={guideContent} />;
}
