import { headers } from "next/headers";
import FieldingPercentageCalculatorClient from "./fielding-percentage-calculator-client";

export default async function FieldingPercentageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/fielding-percentage-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/fielding-percentage-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/fielding-percentage-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/fielding-percentage-calculator/en.json`)).default;
  }

  return <FieldingPercentageCalculatorClient content={content} guideContent={guideContent} />;
}
