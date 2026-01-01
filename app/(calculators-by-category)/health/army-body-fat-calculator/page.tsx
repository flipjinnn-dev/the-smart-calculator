import { headers } from "next/headers";
import ArmyBodyFatCalculatorClient from "./army-body-fat-calculator-client";

export default async function ArmyBodyFatCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/army-body-fat-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/army-body-fat-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/army-body-fat-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/army-body-fat-calculator/en.json`)).default;
  }

  return <ArmyBodyFatCalculatorClient content={content} guideContent={guideContent} />;
}
