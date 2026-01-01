import { headers } from "next/headers";
import BallisticCoefficientCalculatorClient from "./ballistic-coefficient-calculator-client";

export default async function BallisticCoefficientCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/ballistic-coefficient-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/ballistic-coefficient-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/ballistic-coefficient-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/ballistic-coefficient-calculator/en.json`)).default;
  }

  return <BallisticCoefficientCalculatorClient content={content} guideContent={guideContent} />;
}
