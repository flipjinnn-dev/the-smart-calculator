import { headers } from "next/headers";
import DueDateCalculatorClient from "./due-date-calculator-client";

export default async function DueDateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/due-date-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/due-date-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/due-date-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/due-date-calculator/en.json`)).default;
  }

  return <DueDateCalculatorClient content={content} guideContent={guideContent} />;
}
