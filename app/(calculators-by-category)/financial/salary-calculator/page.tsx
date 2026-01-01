import { headers } from "next/headers";
import SalaryCalculatorClient from "./salary-calculator-client";

export default async function SalaryCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/salary-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/salary-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/salary-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/salary-calculator/en.json`)).default;
  }

  return <SalaryCalculatorClient content={content} guideContent={guideContent} />;
}
