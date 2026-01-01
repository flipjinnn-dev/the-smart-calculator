import { headers } from "next/headers";
import BmiCalculatorClient from "./bmi-calculator-client";

export default async function BmiCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/bmi-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/bmi-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/bmi-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/bmi-calculator/en.json`)).default;
  }

  return <BmiCalculatorClient content={content} guideContent={guideContent} />;
}
