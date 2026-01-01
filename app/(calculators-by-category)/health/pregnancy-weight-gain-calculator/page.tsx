import { headers } from "next/headers";
import PregnancyWeightGainCalculatorClient from "./pregnancy-weight-gain-calculator-client";

export default async function PregnancyWeightGainCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/pregnancy-weight-gain-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/pregnancy-weight-gain-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/pregnancy-weight-gain-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/pregnancy-weight-gain-calculator/en.json`)).default;
  }

  return <PregnancyWeightGainCalculatorClient content={content} guideContent={guideContent} />;
}
