import { headers } from "next/headers";
import ConceptionCalculatorClient from "./conception-calculator-client";

export default async function ConceptionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/conception-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/conception-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/conception-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/conception-calculator/en.json`)).default;
  }

  return <ConceptionCalculatorClient content={content} guideContent={guideContent} />;
}
