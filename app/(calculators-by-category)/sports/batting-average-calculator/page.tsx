import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BattingAverageCalculatorClient from "./batting-average-calculator-client";


export default async function BattingAverageCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("batting-average", language);
  const guideContent = await loadCalculatorGuideContent("batting-average", language);

  return <BattingAverageCalculatorClient content={content} guideContent={guideContent} />;
}
