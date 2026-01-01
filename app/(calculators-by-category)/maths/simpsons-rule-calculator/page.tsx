import { headers } from "next/headers";
import SimpsonsRuleCalculatorClient from "./simpsons-rule-calculator-client";

export default async function SimpsonsRuleCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/simpsons-rule-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/simpsons-rule-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/simpsons-rule-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/simpsons-rule-calculator/en.json`)).default;
  }

  return <SimpsonsRuleCalculatorClient content={content} guideContent={guideContent} />;
}
