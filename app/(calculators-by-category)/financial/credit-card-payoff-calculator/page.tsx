import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CreditCardPayoffCalculatorClient from "./credit-card-payoff-calculator-client";


export default async function CreditCardPayoffCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("credit-card-payoff-calculator", language);
  const guideContent = await loadCalculatorGuideContent("credit-card-payoff-calculator", language);

  return <CreditCardPayoffCalculatorClient content={content} guideContent={guideContent} />;
}
