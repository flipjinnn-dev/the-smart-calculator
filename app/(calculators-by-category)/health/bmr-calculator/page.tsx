import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BmrCalculatorClient from "./bmr-calculator-client";

export default async function BmrCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("bmr-calculator", language);
  const guideContent = await loadCalculatorGuideContent("bmr-calculator", language);

  return <BmrCalculatorClient content={content} guideContent={guideContent} />;
}
