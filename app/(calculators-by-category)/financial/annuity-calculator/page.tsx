import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import AnnuityCalculatorClient from "./annuity-calculator-client";

export default async function AnnuityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("annuity-calculator", language);
  const guideContent = await loadCalculatorGuideContent("annuity-calculator", language);

  return <AnnuityCalculatorClient content={content} guideContent={guideContent} />;
}
