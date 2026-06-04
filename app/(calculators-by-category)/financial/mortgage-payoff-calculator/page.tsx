import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import MortgagePayoffCalculatorClient from "./mortgage-payoff-calculator-client";

export default async function MortgagePayoffCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("mortgage-payoff-calculator", language);
  const guideContent = await loadCalculatorGuideContent("mortgage-payoff-calculator", language);

  return <MortgagePayoffCalculatorClient content={content} guideContent={guideContent} />;
}
