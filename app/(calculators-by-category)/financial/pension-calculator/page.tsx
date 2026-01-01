import { headers } from "next/headers";
import PensionCalculatorClient from "./pension-calculator-client";

export default async function PensionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/pension-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/pension-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/pension-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/pension-calculator/en.json`)).default;
  }

  return <PensionCalculatorClient content={content} guideContent={guideContent} />;
}
