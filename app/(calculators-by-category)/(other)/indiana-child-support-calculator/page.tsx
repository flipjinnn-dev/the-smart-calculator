import { headers } from "next/headers";
import IndianaChildSupportCalculatorClient from "./indiana-child-support-calculator-client";

export default async function IndianaChildSupportCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/indiana-child-support-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/indiana-child-support-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/indiana-child-support-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/indiana-child-support-calculator/en.json`)).default;
  }

  return <IndianaChildSupportCalculatorClient content={content} guideContent={guideContent} />;
}
