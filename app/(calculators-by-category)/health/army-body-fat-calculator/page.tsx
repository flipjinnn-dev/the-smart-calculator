import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import ArmyBodyFatCalculatorClient from "./army-body-fat-calculator-client";

export default async function ArmyBodyFatCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("army-body-fat-calculator", language);
  const guideContent = await loadCalculatorGuideContent("army-body-fat-calculator", language);

  return <ArmyBodyFatCalculatorClient content={content} guideContent={guideContent} />;
}
