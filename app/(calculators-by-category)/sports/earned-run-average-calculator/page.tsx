import { headers } from "next/headers";
import EarnedRunAverageCalculatorClient from "./earned-run-average-calculator-client";

export default async function EarnedRunAverageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/earned-run-average-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/earned-run-average-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/earned-run-average-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/earned-run-average-calculator/en.json`)).default;
  }

  return <EarnedRunAverageCalculatorClient content={content} guideContent={guideContent} />;
}
