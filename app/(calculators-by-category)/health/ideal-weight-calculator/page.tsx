import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import IdealWeightCalculatorClient from "./ideal-weight-calculator-client";

export default async function IdealWeightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("ideal-weight-calculator", language);
  const guideContent = await loadCalculatorGuideContent("ideal-weight-calculator", language);

  return <IdealWeightCalculatorClient content={content} guideContent={guideContent} />;
}
