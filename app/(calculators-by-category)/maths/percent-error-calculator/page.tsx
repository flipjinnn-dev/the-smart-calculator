import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import PercentErrorCalculatorClient from "./percent-error-calculator-client";


export default async function PercentErrorCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("percent-error", language);
  const guideContent = await loadCalculatorGuideContent("percent-error", language);

  return <PercentErrorCalculatorClient content={content} guideContent={guideContent} />;
}
