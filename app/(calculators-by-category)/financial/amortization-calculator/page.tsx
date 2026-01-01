import { headers } from "next/headers";
import AmortizationCalculatorClient from "./amortization-calculator-client";

export default async function AmortizationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/amortization-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/amortization-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/amortization-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/amortization-calculator/en.json`)).default;
  }

  return <AmortizationCalculatorClient content={content} guideContent={guideContent} />;
}
