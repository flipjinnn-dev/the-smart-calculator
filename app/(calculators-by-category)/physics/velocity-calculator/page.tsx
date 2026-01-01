import { headers } from "next/headers";
import VelocityCalculatorClient from "./velocity-calculator-client";

export default async function VelocityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/velocity-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/velocity-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/velocity-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/velocity-calculator/en.json`)).default;
  }

  return <VelocityCalculatorClient content={content} guideContent={guideContent} />;
}
