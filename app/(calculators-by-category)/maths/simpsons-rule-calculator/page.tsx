import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import SimpsonsRuleCalculatorClient from "./simpsons-rule-calculator-client";


export default async function SimpsonsRuleCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("simpsons-rule-calculator", language);
  const guideContent = await loadCalculatorGuideContent("simpsons-rule-calculator", language);

  return <SimpsonsRuleCalculatorClient content={content} guideContent={guideContent} />;
}
