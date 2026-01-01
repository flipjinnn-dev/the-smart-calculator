import { headers } from "next/headers";
import EstateTaxCalculatorClient from "./estate-tax-calculator-client";

export default async function EstateTaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/estate-tax-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/estate-tax-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/estate-tax-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/estate-tax-calculator/en.json`)).default;
  }

  return <EstateTaxCalculatorClient content={content} guideContent={guideContent} />;
}
