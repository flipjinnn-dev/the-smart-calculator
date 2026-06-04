import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import HealthyWeightCalculatorClient from "./healthy-weight-calculator-client";

export default async function HealthyWeightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("healthy-weight-calculator", language);
  const guideContent = await loadCalculatorGuideContent("healthy-weight-calculator", language);

  return <HealthyWeightCalculatorClient content={content} guideContent={guideContent} />;
}
