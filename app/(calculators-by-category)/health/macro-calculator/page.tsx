import { headers } from "next/headers";
import MacroCalculatorClient from "./macro-calculator-client";

export default async function MacroCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/macro-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/macro-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/macro-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/macro-calculator/en.json`)).default;
  }

  return <MacroCalculatorClient content={content} guideContent={guideContent} />;
}
