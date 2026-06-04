import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import EarnedRunAverageCalculatorClient from "./earned-run-average-calculator-client";

export default async function EarnedRunAverageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("earned-run-average", language);
  const guideContent = await loadCalculatorGuideContent("earned-run-average", language);

  return <EarnedRunAverageCalculatorClient content={content} guideContent={guideContent} />;
}
