import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import ConceptionCalculatorClient from "./conception-calculator-client";


export default async function ConceptionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("conception-calculator", language);
  const guideContent = await loadCalculatorGuideContent("conception-calculator", language);

  return <ConceptionCalculatorClient content={content} guideContent={guideContent} />;
}
