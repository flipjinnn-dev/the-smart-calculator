import { headers } from "next/headers";
import RentCalculatorClient from "./rent-calculator-client";

export default async function RentCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/rent-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/rent-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/rent-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/rent-calculator/en.json`)).default;
  }

  return <RentCalculatorClient content={content} guideContent={guideContent} />;
}
