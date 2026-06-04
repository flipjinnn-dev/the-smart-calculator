import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import LeanBodyMassCalculatorClient from "./lean-body-mass-calculator-client";

export default async function LeanBodyMassCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("lean-body-mass-calculator", language);
  const guideContent = await loadCalculatorGuideContent("lean-body-mass-calculator", language);

  return <LeanBodyMassCalculatorClient content={content} guideContent={guideContent} />;
}
