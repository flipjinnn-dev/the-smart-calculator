import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import IncomeTaxCalculatorClient from "./income-tax-calculator-client";

export default async function IncomeTaxCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("income-tax-calculator", language);
  const guideContent = await loadCalculatorGuideContent("income-tax-calculator", language);

  return <IncomeTaxCalculatorClient content={content} guideContent={guideContent} />;
}
