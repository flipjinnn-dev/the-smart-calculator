import { headers } from "next/headers";
import EmpiricalRuleCalculatorClient from "./empirical-rule-calculator-client";

export default async function EmpiricalRuleCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/empirical-rule-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/empirical-rule-calculator/en.json`)).default;
  }

  return <EmpiricalRuleCalculatorClient content={content} />;
}
