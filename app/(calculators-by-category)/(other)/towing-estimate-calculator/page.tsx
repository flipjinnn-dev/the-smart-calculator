import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import TowingEstimateCalculatorClient from "./towing-estimate-calculator-client";

export default async function TowingEstimateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("towing-estimate-calculator", language);
  const guideContent = await loadCalculatorGuideContent("towing-estimate-calculator", language);

  return <TowingEstimateCalculatorClient content={content} guideContent={guideContent} />;
}
