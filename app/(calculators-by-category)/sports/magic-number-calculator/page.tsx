import { headers } from "next/headers";
import MagicNumberCalculatorClient from "./magic-number-calculator-client";

export default async function MagicNumberCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/magic-number-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/magic-number-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/magic-number-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/magic-number-calculator/en.json`)).default;
  }

  return <MagicNumberCalculatorClient content={content} guideContent={guideContent} />;
}
