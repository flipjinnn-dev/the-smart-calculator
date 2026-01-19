import { headers } from "next/headers";
import WebsiteCostCalculatorClient from "./website-cost-calculator-client";

export default async function WebsiteCostCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/website-cost-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/website-cost-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/website-cost-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/website-cost-calculator/en.json`)).default;
  }

  return <WebsiteCostCalculatorClient content={content} guideContent={guideContent} />;
}
