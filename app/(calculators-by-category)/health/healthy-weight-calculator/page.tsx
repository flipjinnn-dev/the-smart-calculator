import { headers } from "next/headers";
import HealthyWeightCalculatorClient from "./healthy-weight-calculator-client";

export default async function HealthyWeightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/healthy-weight-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/healthy-weight-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/healthy-weight-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/healthy-weight-calculator/en.json`)).default;
  }

  return <HealthyWeightCalculatorClient content={content} guideContent={guideContent} />;
}
