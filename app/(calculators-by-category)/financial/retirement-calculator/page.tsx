import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import RetirementCalculatorClient from "./retirement-calculator-client";

export default async function RetirementCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("retirement-calculator", language);
  const guideContent = await loadCalculatorGuideContent("retirement-calculator", language);

  return <RetirementCalculatorClient content={content} guideContent={guideContent} />;
}
