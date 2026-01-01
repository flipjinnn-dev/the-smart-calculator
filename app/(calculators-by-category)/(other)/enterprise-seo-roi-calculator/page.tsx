import { headers } from "next/headers";
import EnterpriseSeoRoiCalculatorClient from "./enterprise-seo-roi-calculator-client";

export default async function EnterpriseSeoRoiCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/enterprise-seo-roi-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/enterprise-seo-roi-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/enterprise-seo-roi-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/enterprise-seo-roi-calculator/en.json`)).default;
  }

  return <EnterpriseSeoRoiCalculatorClient content={content} guideContent={guideContent} />;
}
