import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import MeanValueTheoremCalculatorClient from "./mean-value-theorem-calculator-client";

export default async function MeanValueTheoremCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("mean-value-theorem-calculator", language);
  const guideContent = await loadCalculatorGuideContent("mean-value-theorem-calculator", language);

  return <MeanValueTheoremCalculatorClient content={content} guideContent={guideContent} />;
}
