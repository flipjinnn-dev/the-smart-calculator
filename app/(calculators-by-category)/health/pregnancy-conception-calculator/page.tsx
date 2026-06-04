import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PregnancyConceptionCalculatorClient from "./pregnancy-conception-calculator-client";

export default async function PregnancyConceptionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("pregnancy-conception-calculator", language);
  const guideContent = await loadCalculatorGuideContent("pregnancy-conception-calculator", language);

  return <PregnancyConceptionCalculatorClient content={content} guideContent={guideContent} />;
}
