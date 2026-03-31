import { headers } from "next/headers";
import ReverseSalesTaxCalculatorClient from "./reverse-sales-tax-calculator-client";

export default async function ReverseSalesTaxCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;

  try {
    content = (await import(`@/app/content/calculator-ui/reverse-sales-tax-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/reverse-sales-tax-calculator/en.json`)).default;
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/reverse-sales-tax-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/reverse-sales-tax-calculator/en.json`)).default;
  }

  return <ReverseSalesTaxCalculatorClient content={content} guideContent={guideContent} />;
}
