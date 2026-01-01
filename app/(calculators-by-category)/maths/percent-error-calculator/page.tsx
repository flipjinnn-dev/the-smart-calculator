import { headers } from "next/headers";
import PercentErrorCalculatorClient from "./percent-error-calculator-client";

export default async function PercentErrorCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/percent-error-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/percent-error-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/percent-error-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/percent-error-calculator/en.json`)).default;
  }

  return <PercentErrorCalculatorClient content={content} guideContent={guideContent} />;
}
