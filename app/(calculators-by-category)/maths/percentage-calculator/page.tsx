import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import PercentageCalculatorClient from "./percentage-calculator-client";

export default async function PercentageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("percentage-calculator", language);
  const guideContent = await loadCalculatorGuideContent("percentage-calculator", language);

  return <PercentageCalculatorClient content={content} guideContent={guideContent} />;
}
