import { headers } from "next/headers";
import OvulationCalculatorClient from "./ovulation-calculator-client";

export default async function OvulationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/ovulation-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/ovulation-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/ovulation-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/ovulation-calculator/en.json`)).default;
  }

  return <OvulationCalculatorClient content={content} guideContent={guideContent} />;
}
