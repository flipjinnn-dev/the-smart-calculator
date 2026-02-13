import { headers } from "next/headers";
import GradeCurveCalculatorClient from "./grade-curve-calculator-client";

export default async function GradeCurveCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/grade-curve-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/grade-curve-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/grade-curve-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/grade-curve-calculator/en.json`)).default;
  }

  return <GradeCurveCalculatorClient content={content} guideContent={guideContent} />;
}
