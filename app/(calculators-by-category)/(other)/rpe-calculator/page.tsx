import { headers } from "next/headers";
import RpeCalculatorClient from "./rpe-calculator-client";

export default async function RpeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/rpe-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/rpe-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/rpe-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/rpe-calculator/en.json`)).default;
  }

  return <RpeCalculatorClient content={content} guideContent={guideContent} />;
}
