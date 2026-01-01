import { headers } from "next/headers";
import ArrowSpeedCalculatorClient from "./arrow-speed-calculator-client";

export default async function ArrowSpeedCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/arrow-speed-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/arrow-speed-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/arrow-speed-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/arrow-speed-calculator/en.json`)).default;
  }

  return <ArrowSpeedCalculatorClient content={content} guideContent={guideContent} />;
}
