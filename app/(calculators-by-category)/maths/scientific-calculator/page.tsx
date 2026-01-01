import { headers } from "next/headers";
import ScientificCalculatorClient from "./scientific-calculator-client";

export default async function ScientificCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/scientific-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/scientific-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/scientific-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/scientific-calculator/en.json`)).default;
  }

  return <ScientificCalculatorClient content={content} guideContent={guideContent} />;
}
