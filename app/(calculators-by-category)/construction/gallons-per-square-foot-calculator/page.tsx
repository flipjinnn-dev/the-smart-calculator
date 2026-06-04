import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import GallonsPerSquareFootCalculatorClient from "./gallons-per-square-foot-calculator-client";

export default async function GallonsPerSquareFootCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("gallons-per-square-foot", language);
  const guideContent = await loadCalculatorGuideContent("gallons-per-square-foot", language);

  return <GallonsPerSquareFootCalculatorClient content={content} guideContent={guideContent} />;
}
