import { headers } from "next/headers";
import HeightCalculatorClient from "./height-calculator-client";

export default async function HeightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/height-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/height-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/height-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/height-calculator/en.json`)).default;
  }

  return <HeightCalculatorClient content={content} guideContent={guideContent} />;
}
