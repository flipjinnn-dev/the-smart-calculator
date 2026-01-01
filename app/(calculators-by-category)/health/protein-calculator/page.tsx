import { headers } from "next/headers";
import ProteinCalculatorClient from "./protein-calculator-client";

export default async function ProteinCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/protein-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/protein-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/protien-intake-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/protien-intake-calculator/en.json`)).default;
  }

  return <ProteinCalculatorClient content={content} guideContent={guideContent} />;
}
