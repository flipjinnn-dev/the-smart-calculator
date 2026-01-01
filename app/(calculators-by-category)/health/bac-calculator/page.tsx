import { headers } from "next/headers";
import BacCalculatorClient from "./bac-calculator-client";

export default async function BacCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/bac-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/bac-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/bac-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/bac-calculator/en.json`)).default;
  }

  return <BacCalculatorClient content={content} guideContent={guideContent} />;
}
