import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PaymentCalculatorClient from "./payment-calculator-client";

export default async function PaymentCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("payment-calculator", language);
  const guideContent = await loadCalculatorGuideContent("payment-calculator", language);

  return <PaymentCalculatorClient content={content} guideContent={guideContent} />;
}
