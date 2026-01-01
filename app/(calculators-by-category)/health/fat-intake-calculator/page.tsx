import { headers } from "next/headers";
import FatIntakeCalculatorClient from "./fat-intake-calculator-client";

export default async function FatIntakeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/fat-intake-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/fat-intake-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/fat-intake-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/fat-intake-calculator/en.json`)).default;
  }

  return <FatIntakeCalculatorClient content={content} guideContent={guideContent} />;
}
