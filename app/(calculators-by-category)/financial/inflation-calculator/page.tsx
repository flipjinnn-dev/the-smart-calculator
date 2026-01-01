import { headers } from "next/headers";
import InflationCalculatorClient from "./inflation-calculator-client";

export default async function InflationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/inflation-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/inflation-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/inflation-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/inflation-calculator/en.json`)).default;
  }

  return <InflationCalculatorClient content={content} guideContent={guideContent} />;
}
