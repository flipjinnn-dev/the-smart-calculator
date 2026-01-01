import { headers } from "next/headers";
import TargetHeartRateCalculatorClient from "./target-heart-rate-calculator-client";

export default async function TargetHeartRateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/target-heart-rate-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/target-heart-rate-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/target-heart-rate-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/target-heart-rate-calculator/en.json`)).default;
  }

  return <TargetHeartRateCalculatorClient content={content} guideContent={guideContent} />;
}
