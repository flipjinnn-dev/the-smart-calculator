import { headers } from "next/headers";
import GpaCalculatorClient from "./gpa-calculator-client";

export default async function GpaCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/gpa-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/gpa-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/gpa-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/gpa-calculator/en.json`)).default;
  }

  return <GpaCalculatorClient content={content} guideContent={guideContent} />;
}
