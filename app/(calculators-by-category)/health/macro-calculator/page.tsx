import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import MacroCalculatorClient from "./macro-calculator-client";

export default async function MacroCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("macro-calculator", language);
  const guideContent = await loadCalculatorGuideContent("macro-calculator", language);

  return <MacroCalculatorClient content={content} guideContent={guideContent} />;
}
