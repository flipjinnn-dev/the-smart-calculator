import { headers } from "next/headers";
import BodyTypeCalculatorClient from "./body-type-calculator-client";

export default async function BodyTypeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/body-type-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/body-type-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/body-type-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/body-type-calculator/en.json`)).default;
  }

  return <BodyTypeCalculatorClient content={content} guideContent={guideContent} />;
}
