import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CreditCardCalculatorClient from "./credit-card-calculator-client";

export default async function CreditCardCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("credit-card-calculator", language);
  const guideContent = await loadCalculatorGuideContent("credit-card-calculator", language);

  return <CreditCardCalculatorClient content={content} guideContent={guideContent} />;
}
