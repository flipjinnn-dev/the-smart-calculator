import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import ScientificCalculatorClient from "./scientific-calculator-client";

export default async function ScientificCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("scientific-calculator", language);
  const guideContent = await loadCalculatorGuideContent("scientific-calculator", language);

  return <ScientificCalculatorClient content={content} guideContent={guideContent} />;
}
