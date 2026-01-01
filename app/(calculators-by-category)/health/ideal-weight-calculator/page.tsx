import { headers } from "next/headers";
import IdealWeightCalculatorClient from "./ideal-weight-calculator-client";

export default async function IdealWeightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/ideal-weight-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/ideal-weight-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/ideal-weight-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/ideal-weight-calculator/en.json`)).default;
  }

  return <IdealWeightCalculatorClient content={content} guideContent={guideContent} />;
}
