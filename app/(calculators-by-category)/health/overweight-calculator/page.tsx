import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import OverweightCalculatorClient from "./overweight-calculator-client";


export default async function OverweightCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("overweight-calculator", language);
  const guideContent = await loadCalculatorGuideContent("overweight-calculator", language);

  return <OverweightCalculatorClient content={content} guideContent={guideContent} />;
}
