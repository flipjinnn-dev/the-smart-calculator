import { headers } from "next/headers";
import FieldingIndependentPitchingCalculatorClient from "./fielding-independent-pitching-calculator-client";

export default async function FieldingIndependentPitchingCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/fielding-independent-pitching-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/fielding-independent-pitching-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/fielding-independent-pitching-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/fielding-independent-pitching-calculator/en.json`)).default;
  }

  return <FieldingIndependentPitchingCalculatorClient content={content} guideContent={guideContent} />;
}
