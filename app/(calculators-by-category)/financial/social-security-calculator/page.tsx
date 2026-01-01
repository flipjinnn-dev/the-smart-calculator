import { headers } from "next/headers";
import SocialSecurityCalculatorClient from "./social-security-calculator-client";

export default async function SocialSecurityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/social-security-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/social-security-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/social-security-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/social-security-calculator/en.json`)).default;
  }

  return <SocialSecurityCalculatorClient content={content} guideContent={guideContent} />;
}
