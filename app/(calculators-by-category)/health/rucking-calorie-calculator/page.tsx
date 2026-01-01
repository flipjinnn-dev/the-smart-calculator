import { headers } from "next/headers";
import RuckingCalorieCalculatorClient from "./rucking-calorie-calculator-client";

export default async function RuckingCalorieCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/rucking-calorie-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/rucking-calorie-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/rucking-calorie-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/rucking-calorie-calculator/en.json`)).default;
  }

  return <RuckingCalorieCalculatorClient content={content} guideContent={guideContent} />;
}
