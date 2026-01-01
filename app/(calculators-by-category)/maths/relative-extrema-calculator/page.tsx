import { headers } from "next/headers";
import RelativeExtremaCalculatorClient from "./relative-extrema-calculator-client";

export default async function RelativeExtremaCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/relative-extrema-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/relative-extrema-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/relative-extrema-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/relative-extrema-calculator/en.json`)).default;
  }

  return <RelativeExtremaCalculatorClient content={content} guideContent={guideContent} />;
}
