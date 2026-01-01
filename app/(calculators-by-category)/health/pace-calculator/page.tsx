import { headers } from "next/headers";
import PaceCalculatorClient from "./pace-calculator-client";

export default async function PaceCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/pace-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/pace-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/pace-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/pace-calculator/en.json`)).default;
  }

  return <PaceCalculatorClient content={content} guideContent={guideContent} />;
}
