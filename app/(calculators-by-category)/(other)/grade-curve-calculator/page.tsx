import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import GradeCurveCalculatorClient from "./grade-curve-calculator-client";

export default async function GradeCurveCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("grade-curve-calculator", language);
  const guideContent = await loadCalculatorGuideContent("grade-curve-calculator", language);

  return <GradeCurveCalculatorClient content={content} guideContent={guideContent} />;
}
