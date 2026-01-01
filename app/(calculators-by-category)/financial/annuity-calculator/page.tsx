import { headers } from "next/headers";
import AnnuityCalculatorClient from "./annuity-calculator-client";

export default async function AnnuityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/annuity-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/annuity-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/annuity-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/annuity-calculator/en.json`)).default;
  }

  return <AnnuityCalculatorClient content={content} guideContent={guideContent} />;
}
