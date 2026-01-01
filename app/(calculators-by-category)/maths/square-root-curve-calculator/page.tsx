import { headers } from "next/headers";
import SquareRootCurveCalculatorClient from "./square-root-curve-calculator-client";

export default async function SquareRootCurveCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/square-root-curve-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/square-root-curve-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/square-root-curve-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/square-root-curve-calculator/en.json`)).default;
  }

  return <SquareRootCurveCalculatorClient content={content} guideContent={guideContent} />;
}
