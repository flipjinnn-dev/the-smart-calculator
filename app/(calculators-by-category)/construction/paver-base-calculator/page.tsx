import { headers } from "next/headers";
import PaverBaseCalculatorClient from "./paver-base-calculator-client";

export default async function PaverBaseCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/paver-base-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/paver-base-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/paver-base-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/paver-base-calculator/en.json`)).default;
  }

  return <PaverBaseCalculatorClient content={content} guideContent={guideContent} />;
}
