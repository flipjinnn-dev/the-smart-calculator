import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import VelocityCalculatorClient from "./velocity-calculator-client";

export default async function VelocityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("velocity", language);
  const guideContent = await loadCalculatorGuideContent("velocity", language);

  return <VelocityCalculatorClient content={content} guideContent={guideContent} />;
}
