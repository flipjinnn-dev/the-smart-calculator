import { headers } from "next/headers";
import InterestRateCalculatorClient from "./interest-rate-calculator-client";

export default async function InterestRateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/interest-rate-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/interest-rate-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/interest-rate-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/interest-rate-calculator/en.json`)).default;
  }

  return <InterestRateCalculatorClient content={content} guideContent={guideContent} />;
}
