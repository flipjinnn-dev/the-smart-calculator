import { headers } from "next/headers";
import LeanBodyMassCalculatorClient from "./lean-body-mass-calculator-client";

export default async function LeanBodyMassCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/lean-body-mass-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/lean-body-mass-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/lean-body-mass-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/lean-body-mass-calculator/en.json`)).default;
  }

  return <LeanBodyMassCalculatorClient content={content} guideContent={guideContent} />;
}
