import { headers } from "next/headers";
import SquareFeetToCubicYardsCalculatorClient from "./square-feet-to-cubic-yards-calculator-client";

export default async function SquareFeetToCubicYardsCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/square-feet-to-cubic-yards-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/square-feet-to-cubic-yards-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/square-feet-to-cubic-yards-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/square-feet-to-cubic-yards-calculator/en.json`)).default;
  }

  return <SquareFeetToCubicYardsCalculatorClient content={content} guideContent={guideContent} />;
}
