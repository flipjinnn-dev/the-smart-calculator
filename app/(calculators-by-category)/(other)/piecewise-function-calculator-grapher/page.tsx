import { headers } from "next/headers";
import PiecewiseFunctionCalculatorGrapherClient from "./piecewise-function-calculator-grapher-client";

export default async function PiecewiseFunctionCalculatorGrapherCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/piecewise-function-calculator-grapher/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/piecewise-function-calculator-grapher/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/piecewise-function-calculator-grapher/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/piecewise-function-calculator-grapher/en.json`)).default;
  }

  return <PiecewiseFunctionCalculatorGrapherClient content={content} guideContent={guideContent} />;
}
