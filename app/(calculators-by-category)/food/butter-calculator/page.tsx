import { headers } from "next/headers";
import ButterCalculatorClient from "./butter-calculator-client";

export default async function ButterCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/butter-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/butter-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/butter-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/butter-calculator/en.json`)).default;
  }

  return <ButterCalculatorClient content={content} guideContent={guideContent} />;
}
