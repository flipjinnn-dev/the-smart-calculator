import { headers } from "next/headers";
import MgToMlCalculatorClient from "./mg-to-ml-calculator-client";

export default async function MgToMlCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/mg-to-ml-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/mg-to-ml-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/mg-to-ml-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/mg-to-ml-calculator/en.json`)).default;
  }

  return <MgToMlCalculatorClient content={content} guideContent={guideContent} />;
}
