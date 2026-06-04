import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import IndianaChildSupportCalculatorClient from "./indiana-child-support-calculator-client";

export default async function IndianaChildSupportCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("indiana-child-support-calculator", language);
  const guideContent = await loadCalculatorGuideContent("indiana-child-support-calculator", language);

  return <IndianaChildSupportCalculatorClient content={content} guideContent={guideContent} />;
}
