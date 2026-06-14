import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CubicYardCalculatorClient from "./cubic-yard-calculator-client";


export default async function CubicYardCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("cubic-yard", language);
  const guideContent = await loadCalculatorGuideContent("cubic-yard", language);

  return <CubicYardCalculatorClient content={content} guideContent={guideContent} />;
}
