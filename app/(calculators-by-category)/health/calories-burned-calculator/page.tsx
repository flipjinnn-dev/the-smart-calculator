import { headers } from "next/headers";
import CaloriesBurnedCalculatorClient from "./calories-burned-calculator-client";

export default async function CaloriesBurnedCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/calories-burned-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/calories-burned-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/calorie-burned-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/calorie-burned-calculator/en.json`)).default;
  }

  return <CaloriesBurnedCalculatorClient content={content} guideContent={guideContent} />;
}
