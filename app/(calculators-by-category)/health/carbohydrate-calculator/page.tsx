import { headers } from "next/headers";
import CarbohydrateCalculatorClient from "./carbohydrate-calculator-client";

export default async function CarbohydrateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/carbohydrate-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/carbohydrate-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/carbohydrate-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/carbohydrate-calculator/en.json`)).default;
  }

  return <CarbohydrateCalculatorClient content={content} guideContent={guideContent} />;
}
