import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import AutoLoanCalculatorClient from "./auto-loan-calculator-client";


export default async function AutoLoanCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("auto-loan-calculator", language);
  const guideContent = await loadCalculatorGuideContent("auto-loan-calculator", language);

  return <AutoLoanCalculatorClient content={content} guideContent={guideContent} />;
}
