import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PregnancyWeightGainCalculatorClient from "./pregnancy-weight-gain-calculator-client";

export default async function PregnancyWeightGainCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("pregnancy-weight-gain-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pregnancy-weight-gain-calculator", language);

  return <PregnancyWeightGainCalculatorClient content={content} guideContent={guideContent} />;
}
