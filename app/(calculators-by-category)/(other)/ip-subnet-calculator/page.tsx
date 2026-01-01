import { headers } from "next/headers";
import IpSubnetCalculatorClient from "./ip-subnet-calculator-client";

export default async function IpSubnetCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/ip-subnet-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/ip-subnet-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/ip-subnet-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/ip-subnet-calculator/en.json`)).default;
  }

  return <IpSubnetCalculatorClient content={content} guideContent={guideContent} />;
}
