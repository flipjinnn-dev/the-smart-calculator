import { headers } from "next/headers";
import AnorexicBmiCalculatorClient from "./anorexic-bmi-calculator-client";

export default async function AnorexicBmiCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/anorexic-bmi-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/anorexic-bmi-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/anorexic-bmi-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/anorexic-bmi-calculator/en.json`)).default;
  }

  return <AnorexicBmiCalculatorClient content={content} guideContent={guideContent} />;
}
