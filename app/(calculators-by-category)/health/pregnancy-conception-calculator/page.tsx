import { headers } from "next/headers";
import PregnancyConceptionCalculatorClient from "./pregnancy-conception-calculator-client";

export default async function PregnancyConceptionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/pregnancy-conception-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/pregnancy-conception-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/pregnancy-conception-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/pregnancy-conception-calculator/en.json`)).default;
  }

  return <PregnancyConceptionCalculatorClient content={content} guideContent={guideContent} />;
}
