import { headers } from "next/headers";
import CakePanCalculatorClient from "./cake-pan-calculator-client";

export default async function CakePanCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/cake-pan-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/cake-pan-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/cake-pan-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/cake-pan-calculator/en.json`)).default;
  }

  return <CakePanCalculatorClient content={content} guideContent={guideContent} />;
}
