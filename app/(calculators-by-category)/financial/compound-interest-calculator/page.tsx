import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import CompoundInterestCalculatorClient from "./compound-interest-calculator-client";

export default async function CompoundInterestCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("compound-interest-calculator", language);
  const guideContent = await loadCalculatorGuideContent("compound-interest-calculator", language);

  return <CompoundInterestCalculatorClient content={content} guideContent={guideContent} />;
}