import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CriticalPointCalculatorClient from "./critical-point-calculator-client";

export default async function CriticalPointCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("critical-point-calculator", language);
  const guideContent = await loadCalculatorGuideContent("critical-point-calculator", language);

  return <CriticalPointCalculatorClient content={content} guideContent={guideContent} />;
}
