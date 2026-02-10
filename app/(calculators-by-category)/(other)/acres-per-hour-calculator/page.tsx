import { headers } from "next/headers";
import AcresPerHourCalculatorClient from "./acres-per-hour-calculator-client";

export default async function AcresPerHourCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/acres-per-hour-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/acres-per-hour-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/acres-per-hour-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/acres-per-hour-calculator/en.json`)).default;
  }

  return <AcresPerHourCalculatorClient content={content} guideContent={guideContent} />;
}
