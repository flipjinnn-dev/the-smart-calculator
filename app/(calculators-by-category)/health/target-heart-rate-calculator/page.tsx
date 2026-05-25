import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import TargetHeartRateCalculatorClient from "./target-heart-rate-calculator-client";

export default async function TargetHeartRateCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("target-heart-rate-calculator", language);
  const guideContent = await loadCalculatorGuideContent("target-heart-rate-calculator", language);

  return <TargetHeartRateCalculatorClient content={content} guideContent={guideContent} />;
}
