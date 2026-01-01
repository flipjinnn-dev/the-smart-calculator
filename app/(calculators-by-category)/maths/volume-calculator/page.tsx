import { headers } from "next/headers";
import VolumeCalculatorClient from "./volume-calculator-client";

export default async function VolumeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/volume-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/volume-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/volume-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/volume-calculator/en.json`)).default;
  }

  return <VolumeCalculatorClient content={content} guideContent={guideContent} />;
}
