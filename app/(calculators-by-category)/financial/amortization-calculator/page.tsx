import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import AmortizationCalculatorClient from "./amortization-calculator-client";

export const dynamic = "force-dynamic";

export default async function AmortizationCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("amortization-calculator", language);
  const guideContent = await loadCalculatorGuideContent("amortization-calculator", language);

  return <AmortizationCalculatorClient content={content} guideContent={guideContent} />;
}
