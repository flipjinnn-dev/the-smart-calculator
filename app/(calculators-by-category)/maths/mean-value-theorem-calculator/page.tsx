import { headers } from "next/headers";
import MeanValueTheoremCalculatorClient from "./mean-value-theorem-calculator-client";

export default async function MeanValueTheoremCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/mean-value-theorem-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/mean-value-theorem-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/mean-value-theorem-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/mean-value-theorem-calculator/en.json`)).default;
  }

  return <MeanValueTheoremCalculatorClient content={content} guideContent={guideContent} />;
}
