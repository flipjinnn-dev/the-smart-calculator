import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PeriodCalculatorClient from "./period-calculator-client";

export default async function PeriodCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("period-calculator", language);
  const guideContent = await loadCalculatorGuideContent("period-calculator", language);

  return <PeriodCalculatorClient content={content} guideContent={guideContent} />;
}
