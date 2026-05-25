import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import DebtPayoffCalculatorClient from "./debt-payoff-calculator-client";

export default async function DebtPayoffCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("debt-payoff-calculator", language);
  const guideContent = await loadCalculatorGuideContent("debt-payoff-calculator", language);

  return <DebtPayoffCalculatorClient content={content} guideContent={guideContent} />;
}
