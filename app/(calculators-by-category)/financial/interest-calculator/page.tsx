import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import InterestCalculatorClient from "./interest-calculator-client";

export default async function InterestCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("interest-calculator", language);
  const guideContent = await loadCalculatorGuideContent("interest-calculator", language);

  return <InterestCalculatorClient content={content} guideContent={guideContent} />;
}
