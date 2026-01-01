import { headers } from "next/headers";
import SalesTaxCalculatorClient from "./sales-tax-calculator-client";

export default async function SalesTaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/sales-tax-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/sales-tax-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/sales-tax-calulcator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/sales-tax-calulcator/en.json`)).default;
  }

  return <SalesTaxCalculatorClient content={content} guideContent={guideContent} />;
}
