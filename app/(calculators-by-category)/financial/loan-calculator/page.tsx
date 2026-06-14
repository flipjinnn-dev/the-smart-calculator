import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import LoanCalculatorClient from "./loan-calculator-client";


export default async function LoanCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("loan-calculator", language);
  const guideContent = await loadCalculatorGuideContent("loan-calculator", language);

  return <LoanCalculatorClient content={content} guideContent={guideContent} />;
}
