import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import TdeeCalculatorClient from "./tdee-calculator-client";

export default async function TdeeCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("tdee-calculator", language);
  const guideContent = await loadCalculatorGuideContent("tdee-calculator", language);

  return <TdeeCalculatorClient content={content} guideContent={guideContent} />;
}
