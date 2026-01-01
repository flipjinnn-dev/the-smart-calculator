import { headers } from "next/headers";
import GfrCalculatorClient from "./gfr-calculator-client";

export default async function GfrCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/gfr-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/gfr-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/gfr-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/gfr-calculator/en.json`)).default;
  }

  return <GfrCalculatorClient content={content} guideContent={guideContent} />;
}
