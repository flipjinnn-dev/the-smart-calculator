import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import PregnancyCalculatorClient from "./pregnancy-calculator-client";

export default async function PregnancyCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("pregnancy-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pregnancy-calculator", language);

  return <PregnancyCalculatorClient content={content} guideContent={guideContent} />;
}
