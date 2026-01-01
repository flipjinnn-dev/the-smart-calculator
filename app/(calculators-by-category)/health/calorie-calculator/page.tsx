import { headers } from "next/headers";
import CalorieCalculatorClient from "./calorie-calculator-client";

export default async function CalorieCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/calorie-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/calorie-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/calorie-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/calorie-calculator/en.json`)).default;
  }

  return <CalorieCalculatorClient content={content} guideContent={guideContent} />;
}
