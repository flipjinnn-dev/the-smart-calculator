import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import FinanceCalculatorClient from "./finance-calculator-client";

export default async function FinanceCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("finance-calculator", language);
  const guideContent = await loadCalculatorGuideContent("finance-calculator", language);

  return <FinanceCalculatorClient content={content} guideContent={guideContent} />;
}
