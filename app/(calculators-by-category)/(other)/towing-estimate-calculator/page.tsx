import { headers } from "next/headers";
import TowingEstimateCalculatorClient from "./towing-estimate-calculator-client";

export default async function TowingEstimateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/towing-estimate-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/towing-estimate-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/towing-estimate-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/towing-estimate-calculator/en.json`)).default;
  }

  return <TowingEstimateCalculatorClient content={content} guideContent={guideContent} />;
}
