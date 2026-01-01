import { headers } from "next/headers";
import IncomeTaxCalculatorClient from "./income-tax-calculator-client";

export default async function IncomeTaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/income-tax-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/income-tax-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/income-tax-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/income-tax-calculator/en.json`)).default;
  }

  return <IncomeTaxCalculatorClient content={content} guideContent={guideContent} />;
}
