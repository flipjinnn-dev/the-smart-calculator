import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import InterestRateCalculatorClient from "./interest-rate-calculator-client";

export default async function InterestRateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("interest-rate-calculator", language);
  const guideContent = await loadCalculatorGuideContent("interest-rate-calculator", language);

  return <InterestRateCalculatorClient content={content} guideContent={guideContent} />;
}
