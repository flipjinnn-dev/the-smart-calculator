import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import InvestmentCalculatorClient from "./investment-calculator-client";


export default async function InvestmentCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("investment-calculator", language);
  const guideContent = await loadCalculatorGuideContent("investment-calculator", language);

  return <InvestmentCalculatorClient content={content} guideContent={guideContent} />;
}
